import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { ShoppingCart, ArrowRight, Heart, Settings } from "lucide-react";

const meta = {
  title: "ui/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "gradient", "glass", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "xl", "icon", "icon-xs", "icon-sm", "icon-lg", "icon-xl"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "开始定制",
    variant: "default",
    size: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "浏览成品",
    variant: "secondary",
    size: "default",
  },
};

export const Outline: Story = {
  args: {
    children: "查看详情",
    variant: "outline",
    size: "default",
  },
};

export const Ghost: Story = {
  args: {
    children: "取消",
    variant: "ghost",
    size: "default",
  },
};

export const Gradient: Story = {
  args: {
    children: "立即购买",
    variant: "gradient",
    size: "default",
  },
};

export const Glass: Story = {
  args: {
    children: "毛玻璃按钮",
    variant: "glass",
    size: "default",
  },
};

export const Destructive: Story = {
  args: {
    children: "删除项目",
    variant: "destructive",
    size: "default",
  },
};

export const Link: Story = {
  args: {
    children: "了解更多",
    variant: "link",
    size: "default",
  },
};

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4 w-[400px]">
      <Button variant="default" size="lg">默认按钮 — 琥珀橙</Button>
      <Button variant="secondary" size="lg">次要按钮 — 浅橙底</Button>
      <Button variant="outline" size="lg">描边按钮</Button>
      <Button variant="ghost" size="lg">幽灵按钮</Button>
      <Button variant="gradient" size="lg">渐变按钮</Button>
      <Button variant="glass" size="lg">毛玻璃按钮</Button>
      <Button variant="destructive" size="lg">危险按钮</Button>
      <Button variant="link" size="lg">链接按钮</Button>
    </div>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex items-end gap-3">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="default">Default</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
    </div>
  ),
};

export const WithIcon: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>
        <ShoppingCart className="size-4" />
        加入购物车
      </Button>
      <Button variant="secondary">
        下一步
        <ArrowRight className="size-4" />
      </Button>
      <Button variant="outline">
        <Heart className="size-4" />
        收藏
      </Button>
      <Button variant="ghost" size="icon">
        <Settings className="size-4" />
      </Button>
      <Button variant="gradient" size="icon-lg">
        <ShoppingCart className="size-5" />
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: "不可用",
    variant: "default",
    disabled: true,
  },
};
