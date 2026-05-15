// [locale]/layout.tsx: 本地化根布局 — NextIntlClientProvider + Navigation/Footer
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

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

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
