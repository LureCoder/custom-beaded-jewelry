import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta = {
  title: "ui/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "accent", "outline"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "默认",
    variant: "default",
  },
};

export const Accent: Story = {
  args: {
    children: "精选",
    variant: "accent",
  },
};

export const Outline: Story = {
  args: {
    children: "限量",
    variant: "outline",
  },
};

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex items-center gap-4 p-6 bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)]">
      <Badge variant="default">默认</Badge>
      <Badge variant="accent">精选</Badge>
      <Badge variant="outline">限量</Badge>
    </div>
  ),
};
