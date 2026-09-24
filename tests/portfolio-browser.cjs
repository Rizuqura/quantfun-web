const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  fs.mkdirSync(path.resolve('.tmp'), { recursive: true });
  const deadline = setTimeout(() => { console.error('Browser verification timed out'); process.exit(1); }, 45000);
  const browser = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--remote-debugging-port=9334', '--user-data-dir=' + path.resolve('.tmp/chrome-profile'), 'about:blank',
  ], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
  let logs = '';
  browser.stderr.on('data', (b) => { logs += b; });
  let ws;
  try {
    let tabs;
    for (let i = 0; i < 25; i++) {
      try { tabs = await (await fetch('http://127.0.0.1:9334/json/list')).json(); break; } catch { await sleep(200); }
    }
    if (!tabs) throw new Error('Browser did not start: ' + logs);
    ws = new WebSocket(tabs.find((t) => t.type === 'page').webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
    let id = 0;
    const pending = new Map();
    const runtimeErrors = [];
    ws.onmessage = ({ data }) => {
      const message = JSON.parse(data);
      if (message.method === 'Runtime.exceptionThrown') runtimeErrors.push(message.params.exceptionDetails.text);
      if (message.id && pending.has(message.id)) {
        const { resolve, reject } = pending.get(message.id);
        pending.delete(message.id);
        message.error ? reject(new Error(JSON.stringify(message.error))) : resolve(message.result);
      }
    };
    const send = (method, params = {}) => new Promise((resolve, reject) => { const key = ++id; pending.set(key, { resolve, reject }); ws.send(JSON.stringify({ id: key, method, params })); });
    const evaluate = async (expression) => {
      const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
      return result.result.value;
    };
    const screenshot = async (name) => {
      const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
      fs.writeFileSync(path.resolve('.tmp', name + '.png'), Buffer.from(result.data, 'base64'));
    };
    await send('Runtime.enable'); await send('Page.enable'); await send('Network.enable'); await send('Log.enable');
    await send('Emulation.setFocusEmulationEnabled', { enabled: true });
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: (process.env.PORTFOLIO_BASE_URL || 'http://localhost:3100') + '/portfolio' });
    for (let i = 0; i < 30; i++) {
      if (await evaluate('document.querySelectorAll("[data-asset]").length === 20')) break;
      await sleep(200);
    }
    await sleep(1000);
    assert.equal(await evaluate('document.querySelectorAll("tbody tr").length'), 10);
    assert.equal(await evaluate('document.querySelectorAll("svg[aria-label*=allocation]").length'), 3);
    assert.equal(await evaluate('document.querySelectorAll("#permanent-capital [data-asset]").length'), 5);
    assert.equal(await evaluate('document.querySelectorAll("#position-trade [data-asset]").length'), 5);
    assert.equal(await evaluate('(()=>{const ids=Array.from(document.querySelectorAll("[id]")).map(x=>x.id);return ids.length === new Set(ids).size})()'), true);
    assert.equal(await evaluate('Array.from(document.images).filter(x=>!x.complete || !x.naturalWidth).length'), 0);
    assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true);
    await screenshot('portfolio-desktop');
    const slicePoint = await evaluate(`(()=>{const r=document.querySelector('[data-asset=BTC]').ownerSVGElement.getBoundingClientRect();return {x:r.x+64/400*r.width,y:r.y+171/400*r.height}})()`);
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...slicePoint });
    await sleep(350);
    assert.equal(await evaluate('document.querySelector("[data-asset=BTC]").getAttribute("aria-pressed")'), 'true');
    assert.notEqual(await evaluate('getComputedStyle(document.querySelector("[data-asset=BTC]")).transform'), 'none');
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 5, y: 5 });
    await sleep(250);
    assert.equal(await evaluate('document.querySelector("[role=tooltip]") === null'), true);
    const legendSelector = 'ul[aria-label="Select a portfolio position"] button';
    await evaluate(`Array.from(document.querySelectorAll('${legendSelector}')).find(b=>b.textContent.includes('BTC')).focus()`);
    await sleep(650);
    assert.equal(await evaluate('document.querySelector("[data-asset=BTC]").getAttribute("aria-pressed")'), 'true');
    assert.equal(await evaluate('document.querySelector("tbody tr[data-active=true]").textContent.includes("BTC")'), true);
    assert.equal(await evaluate('document.querySelector("[role=tooltip]").textContent.includes("13.48%")'), true);
    assert.equal(await evaluate('document.querySelector("[aria-label=\\"Choose an investment thesis\\"] [aria-pressed=true]").textContent'), 'BTC');
    assert.equal(await evaluate(`(()=>{const el=document.querySelector('[aria-label="Thesis cards. Swipe or use left and right arrow keys."]');return Math.abs(el.scrollLeft - (el.children[3].offsetLeft-el.children[0].offsetLeft)) < 3})()`), true);
    await screenshot('portfolio-btc');
    await evaluate('document.querySelector("[aria-label=\\"Next investment thesis\\"]").click()');
    await sleep(650);
    assert.equal(await evaluate('document.querySelector("[data-asset=GLD]").getAttribute("aria-pressed")'), 'true');
    await evaluate('document.querySelector("[data-asset=TSLA]").focus()');
    await sleep(650);
    assert.equal(await evaluate('document.querySelector("#position-trade [aria-label=\\"Next investment thesis\\"]").disabled'), true);
    await evaluate('document.activeElement.blur()');
    await sleep(200);
    assert.equal(await evaluate('document.querySelector("[role=tooltip]") === null'), true);
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await evaluate(`Array.from(document.querySelectorAll('${legendSelector}')).find(b=>b.textContent.includes('COIN')).click()`);
    await sleep(250);
    assert.equal(await evaluate('document.querySelector("#position-trade [aria-label=\\"Choose an investment thesis\\"] [aria-pressed=true]").textContent'), 'COIN');
    await evaluate(`document.querySelector('[aria-label="Choose an investment thesis"] button').click()`);
    await sleep(200);
    const dragSelector = '[aria-label="Thesis cards. Swipe or use left and right arrow keys."]';
    await evaluate(`document.querySelector('${dragSelector}').scrollIntoView({block:'start',behavior:'instant'})`);
    const dragRect = await evaluate(`(()=>{const r=document.querySelector('${dragSelector}').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width}})()`);
    const dragStart = dragRect.x + dragRect.width * .85;
    const dragY = Math.max(180, dragRect.y + 180);
    await send('Input.dispatchMouseEvent', {type:'mousePressed',x:dragStart,y:dragY,button:'left',clickCount:1});
    for(let i=1;i<=12;i++){await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:dragStart-dragRect.width*.7*i/12,y:dragY,button:'left',buttons:1});await sleep(20);}
    await send('Input.dispatchMouseEvent', {type:'mouseReleased',x:dragStart-dragRect.width*.7,y:dragY,button:'left',clickCount:1});
    await sleep(650);
    assert.equal(await evaluate(`document.querySelector('[aria-label="Choose an investment thesis"] [aria-pressed=true]').textContent`), 'VOO');
    await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await send('Emulation.setTouchEmulationEnabled', { enabled: true });
    await evaluate('window.scrollTo({top:0,behavior:"instant"})');
    await sleep(400);
    assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true);
    await screenshot('portfolio-mobile');
    await evaluate('document.querySelector("[aria-label=\\"Choose an investment thesis\\"] button").click()');
    await sleep(200);
    const viewportSelector = '[aria-label="Thesis cards. Swipe or use left and right arrow keys."]';
    await evaluate(`document.querySelector('${viewportSelector}').scrollIntoView({block:'start',behavior:'instant'})`);
    const rect = await evaluate(`(()=>{const r=document.querySelector('${viewportSelector}').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}})()`);
    const y = Math.max(160, rect.y + 150);
    await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 340, y }] });
    for (let i = 1; i <= 12; i++) { await send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 340 - 23 * i, y }] }); await sleep(20); }
    await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await sleep(800);
    const swiped = await evaluate('document.querySelector("[aria-label=\\"Choose an investment thesis\\"] [aria-pressed=true]").textContent');
    assert.notEqual(swiped, 'TSM');
    assert.equal(await evaluate(`document.querySelector('[data-asset=${swiped}]').getAttribute('aria-pressed')`), 'true');
    assert.deepEqual(runtimeErrors, []);
    console.log(JSON.stringify({ desktop: 'pass', pointerHoverAndLift: 'pass', mouseDrag: 'pass', focusAndCrossComponentSync: 'pass', nextAndBoundary: 'pass', reducedMotion: 'pass', mobileOverflow: 'pass', nativeSwipe: 'pass', swipedTo: swiped, runtimeErrors }, null, 2));
  } finally {
    clearTimeout(deadline);
    if (ws) ws.close();
    browser.kill();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
