// page.tsx: 首页 — 组装 Hero/NewArrivals/Featured/Materials/BrandStory 区块
import { HomeHero } from "@/components/home/hero";
import { NewArrivals } from "@/components/home/new-arrivals";
import { HomeFeatured } from "@/components/home/featured";
import { HomeMaterials } from "@/components/home/materials";
import { HomeBrandStory } from "@/components/home/brand-story";
import { getNewArrivals } from "@/lib/get-new-arrivals";

export default function HomePage() {
  const { date, images } = getNewArrivals();

  return (
    <>
      <HomeHero />
      <NewArrivals images={images} date={date} />
      <HomeFeatured />
      <HomeMaterials />
      <HomeBrandStory />
    </>
  );
}
