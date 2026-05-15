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
        <p className="text-[var(--color-text-primary)]">从下方出现的卡片</p>
      </div>
    ),
  },
};

export const FromLeft: Story = {
  args: {
    direction: "left",
    children: (
      <div className="w-64 p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-center">
        <p className="text-[var(--color-text-primary)]">从左侧滑入</p>
      </div>
    ),
  },
};

export const FromRight: Story = {
  args: {
    direction: "right",
    children: (
      <div className="w-64 p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-center">
        <p className="text-[var(--color-text-primary)]">从右侧滑入</p>
      </div>
    ),
  },
};

export const StaggeredGrid: StoryObj = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {["A", "B", "C"].map((letter, i) => (
        <ScrollReveal key={letter} direction="up" delay={i * 0.15}>
          <div className="w-32 h-32 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex items-center justify-center text-2xl font-serif text-[var(--color-accent)]">
            {letter}
          </div>
        </ScrollReveal>
      ))}
    </div>
  ),
};
