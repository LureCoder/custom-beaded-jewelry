// locale-switcher.tsx: 中/EN 语言切换 — 极简文字按钮
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";

function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (next: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className="flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase font-[400] text-[var(--color-text-muted)]">
      <button
        type="button"
        onClick={() => switchLocale("zh")}
        className={`transition-colors duration-600 cursor-pointer ${
          locale === "zh" ? "text-[var(--color-accent)]" : "hover:text-[var(--color-accent)]"
        }`}
        disabled={isPending}
      >
        中
      </button>
      <span className="text-[var(--color-text-muted)] select-none">/</span>
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={`transition-colors duration-600 cursor-pointer ${
          locale === "en" ? "text-[var(--color-accent)]" : "hover:text-[var(--color-accent)]"
        }`}
        disabled={isPending}
      >
        EN
      </button>
    </div>
  );
}

export { LocaleSwitcher };
