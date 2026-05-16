// [locale]/layout.tsx: 本地化根布局 — NextIntlClientProvider + Navigation/Footer + 语言过渡
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navigation } from "@/components/layout/navigation";
import { ConditionalFooter } from "@/components/shared/conditional-footer";
import { LocalePendingProvider, LocaleTransition } from "@/components/shared/locale-transition";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "zh" | "en")) notFound();

  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: `${t("slogan")} — Kongxing Mala`,
    description: t("subtitle"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "zh" | "en")) notFound();

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocalePendingProvider>
        <a href="#main-content" className="skip-link">
          {t("skip_to_content")}
        </a>
        <Navigation />
        <LocaleTransition>
          <main id="main-content">{children}</main>
        </LocaleTransition>
        <ConditionalFooter />
      </LocalePendingProvider>
    </NextIntlClientProvider>
  );
}
