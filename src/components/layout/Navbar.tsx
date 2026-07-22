const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Research", href: "#research" },
  { label: "Network", href: "#network" },
];

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-nav flex items-center text-[#111111]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="w-full flex items-center px-[260px]">
        <a href="/" className="flex-shrink-0 mt-[10px]" aria-label="QuantFun home">
          <img
            src="/img/web-logo.png"
            alt="QuantFun Technologies"
            width={150}
            height={92}
            className="block"
          />
        </a>

        <ul className="flex items-center gap-[209px] ml-auto">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-nav transition-all duration-250 ease-in-out opacity-80 hover:opacity-100 hover:scale-125"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
