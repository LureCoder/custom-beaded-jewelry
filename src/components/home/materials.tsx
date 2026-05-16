// materials.tsx: 首页质区块 — 材质工艺左右交错图文
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const MATERIALS = [
  { slug: "sandalwood", nameKey: "mat1_name", englishKey: "mat1_english", descKeys: ["mat1_desc1", "mat1_desc2", "mat1_desc3", "mat1_desc4"], verseKey: "mat1_verse", imageSide: "left" as const },
  { slug: "clear-quartz", nameKey: "mat2_name", englishKey: "mat2_english", descKeys: ["mat2_desc1", "mat2_desc2", "mat2_desc3"], verseKey: "mat2_verse", imageSide: "right" as const },
] as const;

function HomeMaterials() {
  const t = useTranslations("materials");

  return (
    <section className="py-20 md:py-32 bg-[var(--color-bg-primary)]">
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
            <ScrollReveal key={material.slug} direction="up" delay={i * 200}>
              <div className={`flex flex-col ${material.imageSide === "right" ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-16`}>
                <div className="w-full md:w-1/2 aspect-square rounded-[var(--radius-md)] overflow-hidden">
                  <Image
                    src={`/images/materials/${material.slug}/hero.jpeg`}
                    alt={t(material.nameKey)}
                    width={600}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-full md:w-1/2">
                  <h3 className="font-serif text-xl text-[var(--color-text-primary)]">
                    {t(material.nameKey)}
                    <span className="font-serif italic text-sm text-[var(--color-text-muted)] ml-2">· {t(material.englishKey)}</span>
                  </h3>

                  <div className="mt-6 space-y-2">
                    {material.descKeys.map((key) => (
                      <p key={key} className="font-[400] text-sm leading-relaxed text-[var(--color-text-secondary)]">{t(key)}</p>
                    ))}
                  </div>

                  <p className="mt-6 font-serif italic text-xs text-[var(--color-text-muted)]">— {t(material.verseKey)} —</p>
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
