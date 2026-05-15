import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, SkeletonCard } from "./loading-skeleton";

const meta = {
  title: "ui/LoadingSkeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    variant: "text",
    className: "w-64",
  },
};

export const CardSkeleton: Story = {
  args: {
    variant: "card",
    className: "w-64",
  },
};

export const Image: Story = {
  args: {
    variant: "image",
    className: "w-32",
  },
};

export const ProductGrid: StoryObj = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[400px]">
      <SkeletonCard count={2} />
    </div>
  ),
};
