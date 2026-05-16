// navigation.tsx: 全局导航栏 — 品牌名 / 导航链接 / 当前页高亮 / 磨砂玻璃背景
"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import { LocaleSwitcher } from "@/components/shared/locale-switcher";

function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();

  const NAV_LINKS = [
    { href: "/customize", label: t("customize") },
    { href: "/shop", label: t("shop") },
    { href: "/encyclopedia", label: t("encyclopedia") },
    { href: "/about", label: t("about") },
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-glass)] backdrop-blur-[12px] border-b border-[var(--color-border)]">
      <nav className="max-w-[1080px] mx-auto px-6 md:px-12 lg:px-24 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-[400] text-sm tracking-[0.15em] uppercase text-[var(--color-text-primary)]"
        >
          {t("brand")}
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-4 text-sm tracking-[0.1em] uppercase font-[400] text-[var(--color-text-secondary)]">
            {NAV_LINKS.map((link, i) => (
              <span key={link.href} className="flex items-center gap-4">
                {i > 0 && <span className="text-[var(--color-text-secondary)]">·</span>}
                <Link
                  href={link.href}
                  className={`transition-colors duration-600 ${
                    isActive(link.href)
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
                  }`}
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>

          <span className="w-px h-4 bg-[var(--color-border)] mx-2" />

          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>

        <div className="md:hidden flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeSwitcher />
          <button
            type="button"
            className="p-2 text-[var(--color-text-secondary)]"
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
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 bg-[var(--color-bg-glass)] backdrop-blur-[12px] border-b border-[var(--color-border)]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-2 text-sm transition-colors duration-600 ${
                isActive(link.href)
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
              }`}
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
