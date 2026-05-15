// materials.tsx: 首页质区块 — 材质工艺左右交错图文
"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

const MATERIALS = [
  {
    name: "紫檀",
    english: "Red Sandalwood",
    description: [
      "产于东南亚，质地坚硬",
      "纹理细腻，色如紫铜",
      "匠人手工打磨至 2000 目",
      "触感温润如玉",
    ],
    verse: "每一颗珠，都是一次呼吸",
    gradient: "from-[#2A1A18] to-[#1A100E]",
    imageSide: "left" as const,
  },
  {
    name: "白水晶",
    english: "Clear Quartz",
    description: [
      "自然形成，六方晶系",
      "通透如冰，内含天然冰裂",
      "能量纯粹，助益冥想",
    ],
    verse: "每一颗珠，都是一次觉知",
    gradient: "from-[#1A2028] to-[#0E141E]",
    imageSide: "right" as const,
  },
];

function HomeMaterials() {
  return (
    <section className="py-32 bg-[var(--color-bg-primary)]">
      <div className="max-w-[1080px] mx-auto px-6 md:px-12 lg:px-24">
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center">
            <div className="w-8 h-px bg-[var(--color-border)] mx-auto mb-4" />
            <h2 className="font-serif text-2xl tracking-[0.15em] text-[var(--color-text-muted)]">
              · 质 ·
            </h2>
            <div className="w-8 h-px bg-[var(--color-border)] mx-auto mt-4" />
          </div>
        </ScrollReveal>

        <div className="mt-16 space-y-20">
          {MATERIALS.map((material, i) => (
            <ScrollReveal key={material.name} direction="up" delay={i * 200}>
              <div
                className={`flex flex-col ${
                  material.imageSide === "right" ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-8 md:gap-16`}
              >
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
                    <span className="font-serif italic text-sm text-[var(--color-text-muted)] ml-2">
                      · {material.english}
                    </span>
                  </h3>

                  <div className="mt-6 space-y-2">
                    {material.description.map((line, idx) => (
                      <p key={idx} className="font-[300] text-sm leading-relaxed text-[var(--color-text-secondary)]">
                        {line}
                      </p>
                    ))}
                  </div>

                  <p className="mt-6 font-serif italic text-xs text-[var(--color-text-muted)]">
                    — {material.verse} —
                  </p>
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
