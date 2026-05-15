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
    title: "观",
    subtitle: "精选念珠，每一串都由匠人精心制作",
    align: "center",
  },
};

export const LeftAligned: Story = {
  args: {
    title: "质",
    subtitle: "来自大自然的馈赠，匠人亲手打磨",
    align: "left",
  },
};

export const TitleOnly: Story = {
  args: {
    title: "寂",
    align: "center",
  },
};

export const AllExamples: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-16 w-[400px] p-8 bg-[var(--color-bg-primary)] rounded-[var(--radius-lg)]">
      <SectionTitle title="择" subtitle="择物 · 选择心仪的材质" align="center" />
      <SectionTitle title="观" subtitle="观看 · 欣赏匠人作品" align="center" />
      <SectionTitle title="质" subtitle="质地 · 感受天然材质" align="left" />
      <SectionTitle title="寂" align="center" />
    </div>
  ),
};
