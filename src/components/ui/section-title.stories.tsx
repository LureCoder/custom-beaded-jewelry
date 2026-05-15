import type { Meta, StoryObj } from "@storybook/react";
import { SectionTitle } from "./section-title";

const meta = {
  title: "ui/SectionTitle",
  component: SectionTitle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "select",
      options: ["center", "left"],
    },
  },
} satisfies Meta<typeof SectionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Centered: Story = {
  args: {
    title: "精选念珠",
    subtitle: "每一串都由匠人精心制作",
    align: "center",
  },
};

export const LeftAligned: Story = {
  args: {
    title: "材质与工艺",
    subtitle: "来自大自然的馈赠，匠人亲手打磨",
    align: "left",
  },
};

export const TitleOnly: Story = {
  args: {
    title: "定制流程",
    align: "center",
  },
};
