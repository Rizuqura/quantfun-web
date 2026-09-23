"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "About", href: "/#about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Project", href: "/project" },
  { label: "Network", href: "/#network" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isProject = pathname === "/project";
  const isPortfolio = pathname === "/portfolio";
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 min-h-nav py-2 flex items-center ${isPortfolio ? "text-[#efefea] bg-[#111313]/95 backdrop-blur-md border-b border-white/10" : "text-[#111111]"} ${isProject ? "bg-[#f3f2ee]/95 backdrop-blur-md border-b border-black/10" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-x flex items-center gap-6">
        <a
          href="/"
          className="flex-shrink-0 mt-[clamp(4px,0.5vh+2px,10px)]"
          aria-label="QuantFun home"
        >
          <img
            src="/img/web-logo.png"
            alt="QuantFun Technologies"
            width={150}
            height={92}
            className={`block w-[clamp(90px,80px+5vw,150px)] h-auto ${isPortfolio ? "invert" : ""}`}
          />
        </a>

        <ul className="flex flex-1 flex-wrap items-center justify-end gap-x-[clamp(1.25rem,1rem+3vw,10rem)] gap-y-2 ml-auto">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`text-nav transition-opacity duration-250 ease-in-out hover:opacity-100 focus-visible:outline-offset-4 ${pathname === item.href ? "opacity-100 underline underline-offset-8" : "opacity-80"}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
