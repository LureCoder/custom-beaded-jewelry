// locale-switcher.tsx: 中/EN 语言切换 — 极简文字按钮，消费 LocaleContext
"use client";

import { useLocaleContext } from "@/components/shared/locale-transition";

function LocaleSwitcher() {
  const { isPending, switchLocale, currentLocale } = useLocaleContext();

  return (
    <div className="flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase font-[400] text-[var(--color-text-muted)]">
      <button
        type="button"
        onClick={() => switchLocale("zh")}
        className={`transition-colors duration-600 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] rounded-sm ${
          currentLocale === "zh" ? "text-[var(--color-accent)]" : "hover:text-[var(--color-accent)]"
        }`}
        disabled={isPending}
      >
        中
      </button>
      <span className="text-[var(--color-text-muted)] select-none">/</span>
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={`transition-colors duration-600 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] rounded-sm ${
          currentLocale === "en" ? "text-[var(--color-accent)]" : "hover:text-[var(--color-accent)]"
        }`}
        disabled={isPending}
      >
        EN
      </button>
    </div>
  );
}

export { LocaleSwitcher };
