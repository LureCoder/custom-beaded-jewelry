// steps.tsx: 首页择·合·成区块 — 三步骤自然排列
"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

function HomeSteps() {
  const t = useTranslations("steps");

  const STEPS = [
    { title: t("step1_title"), description: t("step1_desc") },
    { title: t("step2_title"), description: t("step2_desc") },
    { title: t("step3_title"), description: t("step3_desc") },
  ];

  return (
    <section className="py-32 bg-[var(--color-bg-primary)]">
      <div className="max-w-[1080px] mx-auto px-6 md:px-12 lg:px-24">
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center">
            <div className="w-8 h-px bg-[var(--color-border)] mx-auto mb-4" />
            <h2 className="font-serif text-2xl tracking-[0.15em] text-[var(--color-text-muted)]">
              · {t("title")} ·
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
                <p className="font-[400] text-sm leading-relaxed text-[var(--color-text-secondary)] max-w-[240px] mx-auto">
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
