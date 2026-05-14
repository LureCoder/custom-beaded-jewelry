"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

const NAV_LINKS = [
  { href: "/", label: "首页" },
  { href: "/customize", label: "定制" },
  { href: "/shop", label: "商城" },
  { href: "/encyclopedia", label: "百科" },
  { href: "/about", label: "关于" },
];

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const mounted = theme !== undefined;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setThemeOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  const themeIcon = !mounted ? "○" : theme === "dark" ? "🌙" : "🔆";

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-out
        ${scrolled
          ? "bg-[var(--color-bg-glass)] backdrop-blur-[20px]"
          : "bg-transparent"
        }
      `}
    >
      <nav className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-lg tracking-wider text-[var(--color-text-primary)]"
        >
          <span className="text-[var(--color-accent)]">念珠</span>工坊
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm tracking-wide text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute bottom-[-2px] left-1/2 w-0 h-[2px] bg-[var(--color-accent)] transition-all duration-300 -translate-x-1/2 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/customize"
            className="hidden md:inline-flex px-4 py-1.5 text-sm border border-[var(--color-accent)] text-[var(--color-accent)] rounded-[var(--radius-md)] hover:bg-[var(--color-accent-muted)] transition-all duration-300"
          >
            开始定制
          </Link>

          <button
            type="button"
            className="relative p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            aria-label="购物车"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6.5 6.5h11L19 17H7L6.5 6.5z" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="17" cy="20" r="1" />
            </svg>
          </button>

          <div className="relative">
            <button
              type="button"
              className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-all duration-300 hover:rotate-90"
              onClick={() => setThemeOpen(!themeOpen)}
              aria-label="切换主题"
            >
              <span className="text-lg leading-none">{themeIcon}</span>
            </button>

            {themeOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setThemeOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 z-50 w-32 rounded-[var(--radius-lg)] bg-[var(--color-bg-glass)] backdrop-blur-[20px] border border-[var(--color-border)] shadow-lg overflow-hidden">
                  <button
                    type="button"
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
                    onClick={() => { setTheme("dark"); setThemeOpen(false); }}
                  >
                    <span>🌙</span> 深色
                    {theme === "dark" && (
                      <span className="ml-auto text-[var(--color-accent)]">✓</span>
                    )}
                  </button>
                  <button
                    type="button"
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
                    onClick={() => { setTheme("light"); setThemeOpen(false); }}
                  >
                    <span>🔆</span> 浅色
                    {theme === "light" && (
                      <span className="ml-auto text-[var(--color-accent)]">✓</span>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-[var(--color-text-secondary)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="菜单"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-[var(--color-bg-glass)] backdrop-blur-[20px] border-t border-[var(--color-border)]">
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/customize"
              className="block text-center py-2 border border-[var(--color-accent)] text-[var(--color-accent)] rounded-[var(--radius-md)]"
              onClick={() => setMobileOpen(false)}
            >
              开始定制
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export { Navigation };
