// layout.tsx: 根布局 — 仅提供 html/body 框架和 ThemeProvider，内容由 [locale] 布局管理
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://kongxingmala.com"),
  title: "空性念珠 — 手工定制念佛念珠 | Kongxing Mala",
  description:
    "空性念珠 (Kongxing Mala) 提供高品质手工定制念佛念珠。天然材质，匠人精制。",
  openGraph: {
    title: "空性念珠 — 手工定制念佛念珠 | Kongxing Mala",
    description: "天然材质，匠人精制。在线自定义设计你的专属念珠。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`dark ${fontVariables}`} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
