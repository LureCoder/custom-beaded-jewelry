// materials.tsx: 首页质区块 — 材质工艺左右交错图文
"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

function HomeMaterials() {
  const t = useTranslations("materials");

  const MATERIALS = [
    {
      name: t("mat1_name"),
      english: t("mat1_english"),
      description: [t("mat1_desc1"), t("mat1_desc2"), t("mat1_desc3"), t("mat1_desc4")],
      verse: t("mat1_verse"),
      gradient: "from-[#2A1A18] to-[#1A100E]",
      imageSide: "left" as const,
    },
    {
      name: t("mat2_name"),
      english: t("mat2_english"),
      description: [t("mat2_desc1"), t("mat2_desc2"), t("mat2_desc3")],
      verse: t("mat2_verse"),
      gradient: "from-[#1A2028] to-[#0E141E]",
      imageSide: "right" as const,
    },
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

        <div className="mt-16 space-y-20">
          {MATERIALS.map((material, i) => (
            <ScrollReveal key={material.name} direction="up" delay={i * 200}>
              <div className={`flex flex-col ${material.imageSide === "right" ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-16`}>
                <div className={`w-full md:w-1/2 aspect-square rounded-[var(--radius-md)] bg-gradient-to-br ${material.gradient} flex items-center justify-center`}>
                  <div className="w-20 h-20 rounded-full border border-[var(--color-border)] flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--color-text-muted)]">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <h3 className="font-serif text-xl text-[var(--color-text-primary)]">
                    {material.name}
                    <span className="font-serif italic text-sm text-[var(--color-text-muted)] ml-2">· {material.english}</span>
                  </h3>

                  <div className="mt-6 space-y-2">
                    {material.description.map((line, idx) => (
                      <p key={idx} className="font-[400] text-sm leading-relaxed text-[var(--color-text-secondary)]">{line}</p>
                    ))}
                  </div>

                  <p className="mt-6 font-serif italic text-xs text-[var(--color-text-muted)]">— {material.verse} —</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { HomeMaterials };
