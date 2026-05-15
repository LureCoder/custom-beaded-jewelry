// page.tsx: 首页 — 组装 Hero/Steps/Featured/Materials/BrandStory 区块
import { HomeHero } from "@/components/home/hero";
import { HomeSteps } from "@/components/home/steps";
import { HomeFeatured } from "@/components/home/featured";
import { HomeMaterials } from "@/components/home/materials";
import { HomeBrandStory } from "@/components/home/brand-story";

export default function HomePage() {
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
