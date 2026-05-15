import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardSwatch,
  CardHeader,
  CardContent,
  CardFooter,
  CardColorLabel,
  CardGradient,
  CardImage,
  CardProductImage,
  CardProductInfo,
  CardProductTitle,
  CardProfileInfo,
  CardProfileName,
  CardHeroContent,
  CardHeroTitle,
  CardOverlay,
  CardOverlayContent,
} from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import { ArrowRight } from "lucide-react";

const meta = {
  title: "ui/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "swatch", "elevated", "outlined", "product", "profile", "hero", "gradient", "overlay"],
    },
    hoverable: { control: "boolean" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    className: "w-72",
    children: (
      <>
        <CardHeader subtitle="天然六道木，手工打磨">
          六道木手持念珠
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            每颗珠子都经过匠人精心挑选，蕴含祝福与用心。
          </p>
        </CardContent>
        <CardFooter>
          <span className="text-[var(--color-accent)] font-medium">￥168</span>
          <Badge variant="accent">精选</Badge>
        </CardFooter>
      </>
    ),
  },
};

export const Swatch: Story = {
  args: {
    variant: "swatch",
    className: "w-64",
    children: (
      <>
        <CardSwatch color="#FFB900" />
        <CardContent>
          <CardColorLabel label="Amber 400" color="#FFB900" />
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            琥珀光 — 温暖的金色光辉，如同烛光般柔和。
          </p>
        </CardContent>
      </>
    ),
  },
};

export const SwatchDark: Story = {
  args: {
    variant: "swatch",
    className: "w-64",
    children: (
      <>
        <CardSwatch color="#0C0C0A" />
        <CardContent>
          <CardColorLabel label="Ink Black" color="#0C0C0A" />
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            深空 — 页面主背景色，深邃而宁静。
          </p>
        </CardContent>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    className: "w-72",
    children: (
      <>
        <CardSwatch color="#C9A96E" />
        <CardContent>
          <CardColorLabel label="Warm Gold" color="#C9A96E" />
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            品牌主色，用于强调关键交互元素。
          </p>
        </CardContent>
      </>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    className: "w-72",
    children: (
      <>
        <CardHeader subtitle="天然材质">紫檀木佛珠</CardHeader>
        <CardContent>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            精选印度小叶紫檀，密度高油性好，盘玩后色泽深沉。
          </p>
        </CardContent>
        <CardFooter>
          <span className="text-[var(--color-accent)] font-medium">￥298</span>
        </CardFooter>
      </>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    variant: "default",
    hoverable: true,
    className: "w-72",
    children: (
      <>
        <CardSwatch />
        <CardContent>
          <h3 className="font-serif font-semibold text-[var(--color-text-primary)]">
            凤眼菩提手持
          </h3>
          <p className="mt-1 text-[var(--color-accent)] font-medium text-sm">
            ￥198
          </p>
        </CardContent>
      </>
    ),
  },
};

export const ProductCard: StoryObj = {
  render: () => (
    <Card variant="default" hoverable className="w-64 overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-bg-secondary)] flex items-center justify-center">
        <span className="text-[var(--color-text-muted)] text-sm">产品图片</span>
      </div>
      <CardContent>
        <h3 className="font-serif font-semibold text-[var(--color-text-primary)]">
          六道木手持念珠
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[var(--color-accent)] font-medium">￥168</span>
          <span className="text-xs text-[var(--color-text-muted)]">
            已定制 286 次
          </span>
        </div>
      </CardContent>
    </Card>
  ),
};

export const ColorPaletteGrid: StoryObj = {
  render: () => {
    const colors = [
      { label: "Amber 50", color: "#FFFBEB" },
      { label: "Amber 100", color: "#FEF3C7" },
      { label: "Amber 200", color: "#FDE68A" },
      { label: "Amber 300", color: "#FCD34D" },
      { label: "Amber 400", color: "#FBBF24" },
      { label: "Amber 500", color: "#F59E0B" },
      { label: "Amber 600", color: "#D97706" },
      { label: "Amber 700", color: "#B45309" },
      { label: "Amber 800", color: "#92400E" },
      { label: "Amber 900", color: "#78350F" },
      { label: "Amber 950", color: "#451A03" },
    ];

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-[600px]">
        {colors.map((c) => (
          <Card key={c.label} variant="swatch" className="overflow-hidden">
            <CardSwatch color={c.color} />
            <CardContent>
              <CardColorLabel label={c.label} color={c.color} />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  },
};

export const ProductCardMacBook: StoryObj = {
  render: () => (
    <Card variant="product" className="w-80">
      <CardGradient from="#FDE047" to="#FDE68A" direction="to-b">
        <CardProductImage
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop"
          alt="MacBook Pro"
        />
        <CardProductInfo>
          <CardProductTitle>MacBook Pro 14 inch</CardProductTitle>
          <Button variant="default" className="bg-black text-white hover:bg-black/90 rounded-full px-8">
            Shop now
          </Button>
        </CardProductInfo>
      </CardGradient>
    </Card>
  ),
};

export const ProfileCard: StoryObj = {
  render: () => (
    <Card variant="profile" className="w-80">
      <CardImage
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop"
        alt="Hannah Laurent"
        aspectRatio="aspect-[4/5]"
      />
      <CardProfileInfo
        gradientFrom="rgba(124,58,237,0.8)"
        gradientVia="rgba(99,102,241,0.6)"
        className="flex items-end justify-between"
      >
        <CardProfileName>Hannah Laurent</CardProfileName>
        <button className="w-12 h-12 rounded-full bg-[#FDE047] flex items-center justify-center shrink-0">
          <ArrowRight className="w-6 h-6 text-black" />
        </button>
      </CardProfileInfo>
    </Card>
  ),
};

export const HeroCard: StoryObj = {
  render: () => (
    <Card variant="hero" className="w-80">
      <CardImage
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop"
        alt="Create color scales"
        aspectRatio="aspect-[4/5]"
      />
      <CardHeroContent>
        <CardHeroTitle>
          Create <span className="text-[#FDE047]">color scales</span> in seconds.
        </CardHeroTitle>
      </CardHeroContent>
    </Card>
  ),
};

export const GradientCard: StoryObj = {
  render: () => (
    <Card variant="gradient" className="w-80">
      <CardGradient from="#FCD34D" to="#FEF3C7" direction="to-b">
        <CardProductImage
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
          alt="AirPods Max"
        />
        <CardProductInfo>
          <CardProductTitle>AirPods Max Midnight</CardProductTitle>
          <Button variant="default" className="bg-black text-white hover:bg-black/90 rounded-full px-8">
            Shop now
          </Button>
        </CardProductInfo>
      </CardGradient>
    </Card>
  ),
};

export const OverlayCard: StoryObj = {
  render: () => (
    <Card variant="overlay" className="w-80">
      <CardImage
        src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop"
        alt="Create color scales"
        aspectRatio="aspect-[4/5]"
      />
      <CardOverlay position="bottom">
        <CardOverlayContent blur>
          <h3 className="text-3xl font-bold text-white leading-tight">
            Create <span className="text-[#FDE047]">color scales</span> in seconds.
          </h3>
        </CardOverlayContent>
      </CardOverlay>
    </Card>
  ),
};
