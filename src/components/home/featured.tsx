// featured.tsx: 首页观区块 — 精选念珠产品网格
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const PRODUCTS = [
  { slug: "huaiye-108-8-set-001", nameKey: "product1_name", subKey: "product1_sub" },
  { slug: "kuke-108-7-set-001", nameKey: "product2_name", subKey: "product2_sub" },
  { slug: "yangzhiyu-108-8-set-001", nameKey: "product3_name", subKey: "product3_sub" },
] as const;

function HomeFeatured() {
  const t = useTranslations("featured");

  return (
    <section className="py-20 md:py-32 bg-[var(--color-bg-secondary)]">
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

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {PRODUCTS.map((product, i) => (
            <ScrollReveal key={product.slug} direction="up" delay={i * 150}>
              <a href="/shop" className="group block">
                <div className="aspect-[4/5] w-full rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)] transition-[border-color] duration-600 group-hover:border-[var(--color-border-hover)]">
                  <Image
                    src={`/images/products/${product.slug}/hero.jpeg`}
                    alt={t(product.nameKey)}
                    width={400}
                    height={500}
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-4 font-serif text-sm text-[var(--color-text-primary)]">{t(product.nameKey)}</p>
                <p className="mt-0.5 font-[400] text-xs text-[var(--color-text-muted)]">{t(product.subKey)}</p>
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
