// brand-story.tsx: 首页寂区块 — 品牌寄语和转化入口
"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

function HomeBrandStory() {
  return (
    <section className="py-24 bg-[var(--color-bg-secondary)]">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <ScrollReveal direction="up" delay={0}>
          <div className="w-8 h-px bg-[var(--color-border)] mx-auto mb-4" />
          <h2 className="font-serif text-2xl tracking-[0.15em] text-[var(--color-text-muted)]">
            · 寂 ·
          </h2>
          <div className="w-8 h-px bg-[var(--color-border)] mx-auto mt-4" />
        </ScrollReveal>

        <div className="mt-16 space-y-8">
          <ScrollReveal direction="up" delay={150}>
            <p className="font-[300] text-base leading-loose text-[var(--color-text-secondary)]">
              每一条念珠，都是一次修行的见证。
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={300}>
            <p className="font-[300] text-base leading-loose text-[var(--color-text-secondary)]">
              我们用手工打磨每一颗珠的过程，本身就是一种修习。
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={450}>
            <p className="font-[300] text-base leading-loose text-[var(--color-text-secondary)]">
              从选材到穿配，从打磨到加持，每一步都带着觉知与敬意。
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={600}>
          <p className="mt-8 font-serif italic text-sm text-[var(--color-text-muted)]">
            — 不为物役，不以物喜 —
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={750}>
          <div className="mt-10">
            <a
              href="/customize"
              className="inline-flex items-center justify-center px-8 py-3 text-sm tracking-[0.1em] uppercase rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-600"
            >
              静心之旅
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export { HomeBrandStory };
