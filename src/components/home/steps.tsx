// steps.tsx: 首页择·合·成区块 — 三步骤自然排列
"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

const STEPS = [
  {
    title: "择",
    description: "从天然木材、水晶、玛瑙中挑选你心仪的珠材，感受不同材质的温度与能量",
  },
  {
    title: "合",
    description: "隔珠、流苏、坠饰自由搭配，让每颗配饰都诉说你的心意",
  },
  {
    title: "成",
    description: "3D 预览你的专属念珠，确认即开始由匠人亲手打磨制作",
  },
];

function HomeSteps() {
  return (
    <section className="py-32 bg-[var(--color-bg-primary)]">
      <div className="max-w-[1080px] mx-auto px-6 md:px-12 lg:px-24">
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center">
            <div className="w-8 h-px bg-[var(--color-border)] mx-auto mb-4" />
            <h2 className="font-serif text-2xl tracking-[0.15em] text-[var(--color-text-muted)]">
              · 择 ·
            </h2>
            <div className="w-8 h-px bg-[var(--color-border)] mx-auto mt-4" />
          </div>
        </ScrollReveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.title} direction="up" delay={i * 200}>
              <div className="text-center">
                <h3 className="font-serif text-4xl text-[var(--color-text-primary)]">
                  {step.title}
                </h3>
                <p className="mt-3 mb-4 text-sm text-[var(--color-text-muted)]">—</p>
                <p className="font-[300] text-sm leading-relaxed text-[var(--color-text-secondary)] max-w-[240px] mx-auto">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { HomeSteps };
