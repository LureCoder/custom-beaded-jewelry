import type { Meta, StoryObj } from "@storybook/react";
import { ScrollReveal } from "./scroll-reveal";

const meta = {
  title: "ui/ScrollReveal",
  component: ScrollReveal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["up", "down", "left", "right", "none"],
    },
  },
} satisfies Meta<typeof ScrollReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FromUp: Story = {
  args: {
    direction: "up",
    children: (
      <div className="w-64 p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-center">
        <p className="font-[400] text-sm text-[var(--color-text-primary)]">从下方缓缓出现</p>
      </div>
    ),
  },
};

export const FromLeft: Story = {
  args: {
    direction: "left",
    children: (
      <div className="w-64 p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-center">
        <p className="font-[400] text-sm text-[var(--color-text-primary)]">从左侧滑入</p>
      </div>
    ),
  },
};

export const FromRight: Story = {
  args: {
    direction: "right",
    children: (
      <div className="w-64 p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-center">
        <p className="font-[400] text-sm text-[var(--color-text-primary)]">从右侧滑入</p>
      </div>
    ),
  },
};

export const WithDelay: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <ScrollReveal direction="up" delay={0}>
        <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
          <p className="font-[400] text-sm text-[var(--color-text-primary)]">第一个出现</p>
        </div>
      </ScrollReveal>
      <ScrollReveal direction="up" delay={200}>
        <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
          <p className="font-[400] text-sm text-[var(--color-text-primary)]">第二个出现</p>
        </div>
      </ScrollReveal>
      <ScrollReveal direction="up" delay={400}>
        <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
          <p className="font-[400] text-sm text-[var(--color-text-primary)]">第三个出现</p>
        </div>
      </ScrollReveal>
    </div>
  ),
};
