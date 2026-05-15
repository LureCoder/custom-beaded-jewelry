// brand-story.tsx: 首页寂区块 — 品牌寄语和转化入口
"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

function HomeBrandStory() {
  const t = useTranslations("story");

  return (
    <section className="py-24 bg-[var(--color-bg-secondary)]">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <ScrollReveal direction="up" delay={0}>
          <div className="w-8 h-px bg-[var(--color-border)] mx-auto mb-4" />
          <h2 className="font-serif text-2xl tracking-[0.15em] text-[var(--color-text-muted)]">
            · {t("title")} ·
          </h2>
          <div className="w-8 h-px bg-[var(--color-border)] mx-auto mt-4" />
        </ScrollReveal>

        <div className="mt-16 space-y-8">
          <ScrollReveal direction="up" delay={150}>
            <p className="font-[400] text-base leading-loose text-[var(--color-text-secondary)]">{t("line1")}</p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={300}>
            <p className="font-[400] text-base leading-loose text-[var(--color-text-secondary)]">{t("line2")}</p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={450}>
            <p className="font-[400] text-base leading-loose text-[var(--color-text-secondary)]">{t("line3")}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={600}>
          <p className="mt-8 font-serif italic text-sm text-[var(--color-text-muted)]">— {t("verse")} —</p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={750}>
          <div className="mt-10">
            <a
              href="/customize"
              className="inline-flex items-center justify-center px-8 py-3 text-sm tracking-[0.1em] uppercase rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-600"
            >
              {t("cta")}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export { HomeBrandStory };
