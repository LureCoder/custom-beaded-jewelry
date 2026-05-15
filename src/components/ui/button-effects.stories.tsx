import type { Meta, StoryObj } from "@storybook/react";
import {
  ShineButton,
  LiftButton,
  FloatButton,
  BorderPulseButton,
  ShimmerButton,
  GlowRingButton,
  SlideFillButton,
  RippleBurstButton,
  BorderFlowButton,
} from "./button-effects";

const meta = {
  title: "ui/Button Effects",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;

export const Showcase: StoryObj = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 w-[800px]">
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)]">
        <h4 className="font-serif font-semibold text-[var(--color-text-primary)] text-sm">Shine 光扫</h4>
        <p className="text-xs text-[var(--color-text-muted)] text-center">hover 斜光扫过</p>
        <ShineButton size="sm">加入购物车</ShineButton>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)]">
        <h4 className="font-serif font-semibold text-[var(--color-text-primary)] text-sm">Lift 上浮</h4>
        <p className="text-xs text-[var(--color-text-muted)] text-center">hover 升起发光</p>
        <LiftButton size="sm">立即购买</LiftButton>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)]">
        <h4 className="font-serif font-semibold text-[var(--color-text-primary)] text-sm">Float 漂浮</h4>
        <p className="text-xs text-[var(--color-text-muted)] text-center">持续上下浮动</p>
        <FloatButton size="sm">立即体验</FloatButton>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)]">
        <h4 className="font-serif font-semibold text-[var(--color-text-primary)] text-sm">Border Pulse</h4>
        <p className="text-xs text-[var(--color-text-muted)] text-center">hover 边框脉动</p>
        <BorderPulseButton size="sm">查看详情</BorderPulseButton>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)]">
        <h4 className="font-serif font-semibold text-[var(--color-text-primary)] text-sm">Shimmer 流光</h4>
        <p className="text-xs text-[var(--color-text-muted)] text-center">持续金属光泽</p>
        <ShimmerButton size="sm">探索更多</ShimmerButton>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)]">
        <h4 className="font-serif font-semibold text-[var(--color-text-primary)] text-sm">Slide Fill</h4>
        <p className="text-xs text-[var(--color-text-muted)] text-center">hover 填充展开</p>
        <SlideFillButton size="sm">确认提交</SlideFillButton>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)]">
        <h4 className="font-serif font-semibold text-[var(--color-text-primary)] text-sm">Ripple Burst</h4>
        <p className="text-xs text-[var(--color-text-muted)] text-center">hover 涟漪扩散</p>
        <RippleBurstButton size="sm">开始定制</RippleBurstButton>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)]">
        <h4 className="font-serif font-semibold text-[var(--color-text-primary)] text-sm">Glow Ring</h4>
        <p className="text-xs text-[var(--color-text-muted)] text-center">hover 光晕旋转</p>
        <GlowRingButton size="sm">悬停我</GlowRingButton>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)]">
        <h4 className="font-serif font-semibold text-[var(--color-text-primary)] text-sm">Border Flow</h4>
        <p className="text-xs text-[var(--color-text-muted)] text-center">hover 流光边框</p>
        <BorderFlowButton size="sm">流光边框</BorderFlowButton>
      </div>
    </div>
  ),
};

export const Shine: StoryObj = {
  render: () => <ShineButton size="lg">加入购物车</ShineButton>,
};

export const Lift: StoryObj = {
  render: () => <LiftButton size="lg">立即购买</LiftButton>,
};

export const Float: StoryObj = {
  render: () => <FloatButton size="lg">立即体验</FloatButton>,
};

export const BorderPulse: StoryObj = {
  render: () => <BorderPulseButton size="lg">查看详情</BorderPulseButton>,
};

export const Shimmer: StoryObj = {
  render: () => <ShimmerButton size="lg">探索更多</ShimmerButton>,
};

export const SlideFill: StoryObj = {
  render: () => <SlideFillButton size="lg">确认提交</SlideFillButton>,
};

export const RippleBurst: StoryObj = {
  render: () => <RippleBurstButton size="lg">开始定制</RippleBurstButton>,
};

export const GlowRing: StoryObj = {
  render: () => <GlowRingButton size="lg">悬停我</GlowRingButton>,
};

export const BorderFlow: StoryObj = {
  render: () => <BorderFlowButton size="lg">流光边框</BorderFlowButton>,
};
