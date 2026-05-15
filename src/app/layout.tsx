import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/lib/theme";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "空性念珠 — 手工定制念佛念珠 | Kongxing Mala",
  description:
    "空性念珠 (Kongxing Mala) 提供高品质手工定制念佛念珠。天然材质，匠人精制。在线自定义设计你的专属念珠，开启每日静心修行。",
  openGraph: {
    title: "空性念珠 — 手工定制念佛念珠 | Kongxing Mala",
    description:
      "天然材质，匠人精制。在线自定义设计你的专属念珠。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`dark ${fontVariables}`} suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
