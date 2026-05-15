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
    children: "默认标签",
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
