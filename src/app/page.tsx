// page.tsx: 根路径重定向 — 根据浏览器语言自动跳转 /zh 或 /en
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
