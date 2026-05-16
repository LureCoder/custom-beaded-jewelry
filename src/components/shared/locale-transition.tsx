// locale-transition.tsx: 语言切换过渡 — Context 传递 isPending + switchLocale
"use client";

import { createContext, useContext, useCallback, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

interface LocaleContextValue {
  isPending: boolean;
  switchLocale: (next: string) => void;
  currentLocale: string;
}

const LocaleContext = createContext<LocaleContextValue>({
  isPending: false,
  switchLocale: () => {},
  currentLocale: "zh",
});

function useLocaleContext() {
  return useContext(LocaleContext);
}

function LocalePendingProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = useCallback(
    (next: string) => {
      if (next === locale) return;
      startTransition(() => {
        router.replace(pathname, { locale: next });
      });
    },
    [locale, pathname, router]
  );

  return (
    <LocaleContext.Provider value={{ isPending, switchLocale, currentLocale: locale }}>
      {children}
    </LocaleContext.Provider>
  );
}

function LocaleTransition({ children }: { children: React.ReactNode }) {
  const { isPending } = useLocaleContext();

  return (
    <div
      className="transition-opacity duration-300 ease-out"
      style={{ opacity: isPending ? 0.3 : 1 }}
    >
      {children}
    </div>
  );
}

export { LocalePendingProvider, LocaleTransition, useLocaleContext };
