// featured.tsx: 首页观区块 — 精选念珠产品网格
"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

function HomeFeatured() {
  const t = useTranslations("featured");

  const PRODUCTS = [
    { name: t("product1_name"), subtitle: t("product1_sub"), gradient: "from-[#2A2520] to-[#1A1610]" },
    { name: t("product2_name"), subtitle: t("product2_sub"), gradient: "from-[#2A1A18] to-[#1A100E]" },
    { name: t("product3_name"), subtitle: t("product3_sub"), gradient: "from-[#1A2028] to-[#0E141E]" },
    { name: t("product4_name"), subtitle: t("product4_sub"), gradient: "from-[#28201A] to-[#1A140E]" },
  ];

  return (
    <section className="py-32 bg-[var(--color-bg-secondary)]">
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

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {PRODUCTS.map((product, i) => (
            <ScrollReveal key={product.name} direction="up" delay={i * 150}>
              <a href="/shop" className="group block">
                <div className={`aspect-[4/5] w-full rounded-[var(--radius-md)] bg-gradient-to-b ${product.gradient} flex items-center justify-center transition-all duration-600 group-hover:border-[var(--color-border-hover)]`}>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-full border border-[var(--color-border)] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--color-text-muted)]">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="12" cy="12" r="2" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="mt-4 font-serif text-sm text-[var(--color-text-primary)]">{product.name}</p>
                <p className="mt-0.5 font-[400] text-xs text-[var(--color-text-muted)]">{product.subtitle}</p>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={600}>
          <div className="mt-12 text-center">
            <a href="/shop" className="inline-flex text-sm tracking-[0.05em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-600">
              {t("view_all")}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export { HomeFeatured };
