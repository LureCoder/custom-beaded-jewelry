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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 w-[800px] bg-[var(--color-bg-primary)]">
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
        <h4 className="font-serif text-sm text-[var(--color-text-primary)]">Shine 光扫</h4>
        <p className="font-[300] text-xs text-[var(--color-text-muted)]">hover 斜光扫过</p>
        <ShineButton size="sm">启程</ShineButton>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
        <h4 className="font-serif text-sm text-[var(--color-text-primary)]">Lift 上浮</h4>
        <p className="font-[300] text-xs text-[var(--color-text-muted)]">hover 升起发光</p>
        <LiftButton size="sm">静心之旅</LiftButton>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
        <h4 className="font-serif text-sm text-[var(--color-text-primary)]">Float 漂浮</h4>
        <p className="font-[300] text-xs text-[var(--color-text-muted)]">持续上下浮动</p>
        <FloatButton size="sm">观览</FloatButton>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
        <h4 className="font-serif text-sm text-[var(--color-text-primary)]">Border Pulse</h4>
        <p className="font-[300] text-xs text-[var(--color-text-muted)]">hover 边框脉动</p>
        <BorderPulseButton size="sm">查看详情</BorderPulseButton>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
        <h4 className="font-serif text-sm text-[var(--color-text-primary)]">Shimmer 流光</h4>
        <p className="font-[300] text-xs text-[var(--color-text-muted)]">持续金属光泽</p>
        <ShimmerButton size="sm">探索</ShimmerButton>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
        <h4 className="font-serif text-sm text-[var(--color-text-primary)]">Slide Fill</h4>
        <p className="font-[300] text-xs text-[var(--color-text-muted)]">hover 填充展开</p>
        <SlideFillButton size="sm">确认</SlideFillButton>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
        <h4 className="font-serif text-sm text-[var(--color-text-primary)]">Ripple Burst</h4>
        <p className="font-[300] text-xs text-[var(--color-text-muted)]">hover 涟漪扩散</p>
        <RippleBurstButton size="sm">结缘</RippleBurstButton>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
        <h4 className="font-serif text-sm text-[var(--color-text-primary)]">Glow Ring</h4>
        <p className="font-[300] text-xs text-[var(--color-text-muted)]">hover 光晕旋转</p>
        <GlowRingButton size="sm">悬停</GlowRingButton>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
        <h4 className="font-serif text-sm text-[var(--color-text-primary)]">Border Flow</h4>
        <p className="font-[300] text-xs text-[var(--color-text-muted)]">hover 流光边框</p>
        <BorderFlowButton size="sm">流光</BorderFlowButton>
      </div>
    </div>
  ),
};

export const Shine: StoryObj = {
  render: () => <ShineButton size="lg">启程</ShineButton>,
};

export const Lift: StoryObj = {
  render: () => <LiftButton size="lg">静心之旅</LiftButton>,
};

export const Float: StoryObj = {
  render: () => <FloatButton size="lg">观览</FloatButton>,
};

export const BorderPulse: StoryObj = {
  render: () => <BorderPulseButton size="lg">查看详情</BorderPulseButton>,
};

export const Shimmer: StoryObj = {
  render: () => <ShimmerButton size="lg">探索</ShimmerButton>,
};

export const SlideFill: StoryObj = {
  render: () => <SlideFillButton size="lg">确认</SlideFillButton>,
};

export const RippleBurst: StoryObj = {
  render: () => <RippleBurstButton size="lg">结缘</RippleBurstButton>,
};

export const GlowRing: StoryObj = {
  render: () => <GlowRingButton size="lg">悬停</GlowRingButton>,
};

export const BorderFlow: StoryObj = {
  render: () => <BorderFlowButton size="lg">流光</BorderFlowButton>,
};
