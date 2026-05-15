// footer.tsx: 全局页脚 — 品牌名 / 导航 / 版权三行极简布局
"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

function Footer() {
  const t = useTranslations("nav");

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
      <div className="max-w-[400px] mx-auto px-6 py-16 text-center">
        <Link
          href="/"
          className="font-[400] text-sm tracking-[0.15em] uppercase text-[var(--color-text-primary)]"
        >
          {t("brand")}
        </Link>

        <div className="mt-4 text-xs tracking-[0.1em] uppercase font-[400] text-[var(--color-text-muted)] flex items-center justify-center gap-3">
          <Link href="/customize" className="hover:text-[var(--color-accent)] transition-colors duration-500">{t("customize")}</Link>
          <span>·</span>
          <Link href="/shop" className="hover:text-[var(--color-accent)] transition-colors duration-500">{t("shop")}</Link>
          <span>·</span>
          <Link href="/encyclopedia" className="hover:text-[var(--color-accent)] transition-colors duration-500">{t("encyclopedia")}</Link>
          <span>·</span>
          <Link href="/about" className="hover:text-[var(--color-accent)] transition-colors duration-500">{t("about")}</Link>
        </div>

        <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
          <p className="text-xs font-[300] text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} {t("brand")} &middot; All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
