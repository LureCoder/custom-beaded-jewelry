import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardSwatch,
  CardHeader,
  CardContent,
  CardFooter,
  CardColorLabel,
  CardImage,
} from "./card";
import { Badge } from "./badge";

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
      options: ["default", "swatch", "elevated", "outlined"],
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
          <p className="font-[300] text-sm text-[var(--color-text-secondary)] leading-relaxed">
            每颗珠子都经过匠人精心挑选，蕴含祝福与用心。
          </p>
        </CardContent>
        <CardFooter>
          <span className="font-serif text-sm text-[var(--color-accent)]">￥168</span>
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
          <p className="mt-2 font-[300] text-sm text-[var(--color-text-secondary)]">
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
          <p className="mt-2 font-[300] text-sm text-[var(--color-text-secondary)]">
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
          <p className="mt-2 font-[300] text-sm text-[var(--color-text-secondary)]">
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
          <p className="font-[300] text-sm text-[var(--color-text-secondary)] leading-relaxed">
            精选印度小叶紫檀，密度高油性好，盘玩后色泽深沉。
          </p>
        </CardContent>
        <CardFooter>
          <span className="font-serif text-sm text-[var(--color-accent)]">￥298</span>
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
        <CardSwatch color="#C9A96E" />
        <CardContent>
          <h3 className="font-serif font-semibold text-[var(--color-text-primary)]">
            凤眼菩提手持
          </h3>
          <p className="mt-1 font-serif text-sm text-[var(--color-accent)]">
            ￥198
          </p>
        </CardContent>
      </>
    ),
  },
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
          <Card key={c.label} variant="swatch">
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

export const ProductCard: StoryObj = {
  render: () => (
    <Card variant="default" hoverable className="w-64">
      <div className="aspect-square bg-gradient-to-br from-[var(--color-bg-tertiary)] to-[var(--color-bg-secondary)] flex items-center justify-center">
        <span className="font-[300] text-xs text-[var(--color-text-muted)]">产品图片</span>
      </div>
      <CardContent>
        <h3 className="font-serif font-semibold text-[var(--color-text-primary)]">
          六道木手持念珠
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="font-serif text-sm text-[var(--color-accent)]">￥168</span>
          <span className="font-[300] text-xs text-[var(--color-text-muted)]">
            已定制 286 次
          </span>
        </div>
      </CardContent>
    </Card>
  ),
};
