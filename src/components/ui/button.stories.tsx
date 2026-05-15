import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

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
      options: ["default", "secondary", "outline", "ghost", "destructive"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "xl", "icon", "icon-sm", "icon-lg"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "启程",
    variant: "default",
    size: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "观览",
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

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4 w-[400px] p-6 bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)]">
      <div className="flex items-center justify-between">
        <span className="font-[300] text-xs text-[var(--color-text-muted)] tracking-[0.1em] uppercase">default</span>
        <Button variant="default">启程</Button>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-[300] text-xs text-[var(--color-text-muted)] tracking-[0.1em] uppercase">secondary</span>
        <Button variant="secondary">观览</Button>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-[300] text-xs text-[var(--color-text-muted)] tracking-[0.1em] uppercase">outline</span>
        <Button variant="outline">查看详情</Button>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-[300] text-xs text-[var(--color-text-muted)] tracking-[0.1em] uppercase">ghost</span>
        <Button variant="ghost">取消</Button>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-[300] text-xs text-[var(--color-text-muted)] tracking-[0.1em] uppercase">destructive</span>
        <Button variant="destructive">删除</Button>
      </div>
    </div>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex items-end gap-4 p-6 bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)]">
      <Button variant="default" size="sm">小</Button>
      <Button variant="default">中</Button>
      <Button variant="default" size="lg">大</Button>
      <Button variant="default" size="xl">超大</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: "启程",
    variant: "default",
    disabled: true,
  },
};
