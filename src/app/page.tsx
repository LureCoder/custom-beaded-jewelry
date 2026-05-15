// page.tsx: 首页 — 组装 Hero/Steps/Featured/Materials/BrandStory 区块
import type { Metadata } from "next";
import { HomeHero } from "@/components/home/hero";
import { HomeSteps } from "@/components/home/steps";
import { HomeFeatured } from "@/components/home/featured";
import { HomeMaterials } from "@/components/home/materials";
import { HomeBrandStory } from "@/components/home/brand-story";

export const metadata: Metadata = {
  title: "空性念珠 — 手工定制念佛念珠 | Kongxing Mala",
  description:
    "空性念珠 (Kongxing Mala) 提供高品质手工定制念佛念珠。天然材质，匠人精制。一念清净，一串菩提。",
  openGraph: {
    title: "空性念珠 — 手工定制念佛念珠 | Kongxing Mala",
    description:
      "天然材质，匠人精制。在线自定义设计你的专属念珠。",
    images: ["/images/og-home.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeSteps />
      <HomeFeatured />
      <HomeMaterials />
      <HomeBrandStory />
    </>
  );
}
