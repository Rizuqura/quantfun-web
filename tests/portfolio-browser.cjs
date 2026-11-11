const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const baseURL = process.env.PORTFOLIO_BASE_URL || 'http://localhost:3100';

(async () => {
  fs.mkdirSync(path.resolve('.tmp'), { recursive: true });
  const browser = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--remote-debugging-port=9334', '--user-data-dir=' + path.resolve('.tmp/portfolio-factsheet-chrome'), 'about:blank',
  ], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
  const deadline = setTimeout(() => { browser.kill(); console.error('Browser verification timed out'); process.exit(1); }, 45000);
  let logs = '';
  browser.stderr.on('data', (b) => { logs += b; });
  browser.on('error', error => { logs += error.message; });
  let ws;
  try {
    const response = await fetch(baseURL + '/portfolio');
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.doesNotMatch(html, /valueIDR|valueUSD|fxIDRPerUSD|portfolioRole|priceTargets|costBasis|entryDate|thesisState|VOO|SCHD|Vanguard|Schwab/);
    console.log('Public HTML and disclosure fields verified.');
    let tabs;
    for (let i = 0; i < 25; i++) {
      try { tabs = await (await fetch('http://127.0.0.1:9334/json/list')).json(); break; } catch { await sleep(200); }
    }
    if (!tabs) throw new Error('Browser did not start: ' + logs);
    ws = new WebSocket(tabs.find((t) => t.type === 'page').webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
    console.log('Browser connected.');
    let id = 0;
    const pending = new Map();
    const runtimeErrors = [];
    ws.onmessage = ({ data }) => {
      const message = JSON.parse(data);
      if (message.method === 'Runtime.exceptionThrown') runtimeErrors.push(message.params.exceptionDetails.text);
      if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
        runtimeErrors.push(message.params.args.map(arg => arg.value || arg.description).join(' '));
      }
      if (message.id && pending.has(message.id)) {
        const { resolve, reject, timer } = pending.get(message.id);
        clearTimeout(timer);
        pending.delete(message.id);
        message.error ? reject(new Error(JSON.stringify(message.error))) : resolve(message.result);
      }
    };
    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const key = ++id;
      const timer = setTimeout(() => { pending.delete(key); reject(new Error('Browser command timed out: ' + method + '\n' + logs)); }, 10000);
      pending.set(key, { resolve, reject, timer });
      ws.send(JSON.stringify({ id: key, method, params }));
    });
    const evaluate = async (expression) => {
      const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
      return result.result.value;
    };
    const screenshot = async (name) => {
      const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
      fs.writeFileSync(path.resolve('.tmp', name + '.png'), Buffer.from(result.data, 'base64'));
    };
    const checkLabels = async () => {
      assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true, 'page overflows horizontally');
      assert.equal(await evaluate(`Array.from(document.querySelectorAll('main li button')).every(button => {
        const [swatch, identity, weight] = Array.from(button.children).map(el => el.getBoundingClientRect());
        const bounds = button.getBoundingClientRect();
        return identity.x >= swatch.right && weight.x >= identity.right - 1 &&
          weight.right <= bounds.right + 1 && identity.width > 0;
      })`), true, 'allocation labels overlap');
    };
    await send('Runtime.enable'); await send('Page.enable');
    await send('Emulation.setFocusEmulationEnabled', { enabled: true });
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: baseURL + '/portfolio' });
    console.log('Portfolio opened.');
    for (let i = 0; i < 40; i++) {
      if (await evaluate('document.querySelectorAll("[data-asset]").length === 7')) break;
      await sleep(200);
    }
    await evaluate('Promise.race([document.fonts.ready.then(() => true), new Promise(resolve => setTimeout(() => resolve(false), 3000))])');
    await sleep(700);
    assert.match(await evaluate('document.title'), /November 2026 Portfolio Factsheet/);
    const text = await evaluate('document.querySelector("main").innerText');
    assert.match(text, /Monthly Portfolio\s+Factsheet/);
    assert.match(text, /Reporting date: November 1, 2026/);
    assert.match(text, /Rp2,693,025/);
    assert.match(text, /USD\s+147\.97/);
    assert.match(text, /USD equivalent estimated/);
    assert.equal((text.match(/Rp/g) || []).length, 1);
    assert.doesNotMatch(text, /Strategic Trade|Trading Strategy|Investment Thesis|Conviction|Valuation|Return Target|CORE|POSITION TRADE/i);
    const labels = await evaluate('Array.from(document.querySelectorAll("main li button")).map(el => el.innerText.replace(/\\s+/g, " ").trim())');
    assert.deepEqual(labels, [
      'S&P500 Diversified index & thematic exposure 33.67%', 'TSM TSMC 20.31%', 'Cash 14.99%',
      'BTC Bitcoin 14.41%', 'GOOGL Alphabet Class A 8.02%', 'MSTR Strategy Inc. 7.77%',
      'GOTO GoTo Gojek Tokopedia 0.84%',
    ]);
    assert.equal(await evaluate('document.querySelectorAll("main svg").length'), 1);
    assert.equal(await evaluate('document.querySelectorAll("main li img").length'), 7);
    assert.equal(await evaluate('document.querySelectorAll("[data-chart-logo] image").length'), 7);
    assert.equal(await evaluate('Array.from(document.querySelectorAll("main li img")).every(img => getComputedStyle(img).borderRadius === "50%")'), true);
    assert.equal(await evaluate(`Array.from(document.querySelectorAll('[data-chart-logo]')).every(mark => {
      const bounds = mark.querySelector('circle').getBoundingClientRect();
      return Array.from(document.querySelectorAll('[data-chart-logo]')).every(other => {
        if (other === mark) return true;
        const otherBounds = other.querySelector('circle').getBoundingClientRect();
        return bounds.right <= otherBounds.left || bounds.left >= otherBounds.right || bounds.bottom <= otherBounds.top || bounds.top >= otherBounds.bottom;
      });
    })`), true, 'chart logos must not overlap');
    assert.equal(await evaluate('document.querySelector("main li:first-child img").getAttribute("src")'), '/ticker-logo/SP500.png');
    assert.equal(await evaluate('document.querySelector("main a[download]").getAttribute("href")'), '/reports/quantfun-portfolio-2026-11.pdf');
    assert.equal(await evaluate('Array.from(document.images).filter(x => !x.complete || !x.naturalWidth).length'), 0);
    await checkLabels();
    await screenshot('portfolio-desktop');
    const point = await evaluate(`(() => {
      const r = document.querySelector('[data-asset=TSM]').ownerSVGElement.getBoundingClientRect();
      return { x: r.x + 251 / 400 * r.width, y: r.y + 330 / 400 * r.height };
    })()`);
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point });
    await sleep(150);
    assert.equal(await evaluate('document.querySelector("[data-asset=TSM]").getAttribute("aria-pressed")'), 'true');
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 2, y: 2 });
    await evaluate('document.querySelector("[data-asset=GOOGL]").focus()');
    await sleep(100);
    assert.equal(await evaluate('document.querySelector("main li:nth-child(5) button").getAttribute("aria-pressed")'), 'true');
    assert.match(await evaluate('document.querySelector("[aria-live=polite]").innerText'), /8.02%/);
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
    assert.equal(await evaluate('document.querySelector("[data-asset=GOOGL]").getAttribute("aria-pressed")'), 'false');
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await evaluate('document.querySelector("main li:last-child button").click()');
    assert.match(await evaluate('document.querySelector("[aria-live=polite]").innerText'), /0.84%/);
    let printCalls = 0;
    await evaluate('window.print = () => { window.__printCalls = (window.__printCalls || 0) + 1; }; Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Print / Save PDF")).click()');
    printCalls = await evaluate('window.__printCalls');
    assert.equal(printCalls, 1, 'export button must open browser print');
    for (const width of [1024, 768, 390, 320]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: 1, mobile: width < 768 });
      await checkLabels();
      if (width === 390) {
        await send('Emulation.setTouchEmulationEnabled', { enabled: true });
        await evaluate('document.activeElement.blur(); window.scrollTo({top:0,behavior:"instant"})');
        await screenshot('portfolio-mobile');
        await evaluate('document.querySelector("[data-asset=CASH]").scrollIntoView({block:"center",behavior:"instant"})');
        const cash = await evaluate(`(() => {
          const r = document.querySelector('[data-asset=CASH]').ownerSVGElement.getBoundingClientRect();
          const angle = 133 * Math.PI / 180;
          return { x: r.x + (200 + 140 * Math.cos(angle)) / 400 * r.width, y: r.y + (200 + 140 * Math.sin(angle)) / 400 * r.height };
        })()`);
        await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [cash] });
        await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        await sleep(200);
        assert.equal(await evaluate('document.querySelector("[data-asset=CASH]").getAttribute("aria-pressed")'), 'true');
      }
    }
    await send('Emulation.setTouchEmulationEnabled', { enabled: false });
    await send('Emulation.setDeviceMetricsOverride', { width: 794, height: 1123, deviceScaleFactor: 1, mobile: false });
    await send('Emulation.setEmulatedMedia', { media: 'print' });
    await evaluate('window.scrollTo({top:0,behavior:"instant"})');
    assert.equal(await evaluate('getComputedStyle(document.querySelector("nav")).display'), 'none');
    assert.equal(await evaluate('document.querySelector("main a[download]").getClientRects().length'), 0);
    assert.equal(await evaluate('Array.from(document.querySelectorAll("button")).filter(b => b.textContent.includes("Print / Save PDF")).every(b => getComputedStyle(b).display === "none")'), true);
    assert.equal(await evaluate('Array.from(document.querySelectorAll("[data-asset]")).every(el => getComputedStyle(el).opacity === "1")'), true);
    assert.equal(await evaluate('Array.from(document.querySelectorAll("[data-asset]")).every(el => getComputedStyle(el).outlineStyle === "none" && getComputedStyle(el).stroke === "none")'), true);
    await checkLabels();
    await screenshot('portfolio-print');
    const pdf = await send('Page.printToPDF', { preferCSSPageSize: true, displayHeaderFooter: false, printBackground: false });
    const pdfBuffer = Buffer.from(pdf.data, 'base64');
    fs.writeFileSync(path.resolve('.tmp/portfolio-november-2026.pdf'), pdfBuffer);
    assert.equal((pdfBuffer.toString('latin1').match(/\/Type\s*\/Page\b/g) || []).length, 1, 'factsheet must fit on one PDF page');
    assert.deepEqual(runtimeErrors, []);
    console.log(JSON.stringify({
      contentAndPrivacy: 'pass', desktopAndMobileLabels: 'pass', hoverKeyboardAndTouch: 'pass',
      reducedMotion: 'pass', exportButton: 'pass', singlePagePDF: 'pass', runtimeErrors,
    }, null, 2));
  } finally {
    clearTimeout(deadline);
    if (ws) ws.close();
    browser.kill();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
