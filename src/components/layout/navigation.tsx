// navigation.tsx: 全局导航栏 — 品牌标志 NIAN·ZHU 和 3 项导航链接
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/shop", label: "商城" },
  { href: "/encyclopedia", label: "百科" },
  { href: "/about", label: "关于" },
];

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-out
        ${
          scrolled
            ? "bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]"
            : "bg-transparent"
        }
      `}
    >
      <nav className="max-w-[1080px] mx-auto px-6 md:px-12 lg:px-24 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-sm tracking-[0.15em] uppercase text-[var(--color-text-primary)]"
        >
          NIAN·ZHU
        </Link>

        <div className="hidden md:flex items-center gap-4 text-xs tracking-[0.1em] uppercase font-[300] text-[var(--color-text-muted)]">
          {NAV_LINKS.map((link, i) => (
            <span key={link.href} className="flex items-center gap-4">
              {i > 0 && <span className="text-[var(--color-text-muted)]">·</span>}
              <Link
                href={link.href}
                className="hover:text-[var(--color-accent)] transition-colors duration-500"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-[var(--color-text-secondary)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="菜单"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export { Navigation };
