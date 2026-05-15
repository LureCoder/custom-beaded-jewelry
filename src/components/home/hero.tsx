// hero.tsx: 首页 Hero 区域 — 品牌 Slogan 和双 CTA
"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

function HomeHero() {
  const t = useTranslations("hero");
  const nextRef = useRef<HTMLDivElement>(null);

  const scrollToNext = () => {
    nextRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 40%, rgba(255,185,0,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <ScrollReveal direction="up" delay={0}>
          <p className="font-serif text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-6">
            {t("brand")}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={150}>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight tracking-wide text-[var(--color-text-primary)]">
            {t("slogan")}
          </h1>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={300}>
          <p className="mt-4 font-serif italic text-lg md:text-xl text-[var(--color-text-secondary)]">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={450}>
          <div className="mt-16 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a
              href="/customize"
              className="inline-flex items-center justify-center px-8 py-3 text-sm tracking-[0.1em] uppercase rounded-[var(--radius-md)] border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg-primary)] transition-all duration-600"
            >
              {t("cta_primary")}
            </a>
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3 text-sm tracking-[0.1em] uppercase rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-600"
            >
              {t("cta_secondary")}
            </a>
          </div>
        </ScrollReveal>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer" onClick={scrollToNext}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[var(--color-text-muted)] opacity-40 animate-[hero-scroll_3s_ease-in-out_infinite]"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>

      <div ref={nextRef} className="absolute bottom-0" />

      <style>{`
        @keyframes hero-scroll {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 0.7; transform: translateY(4px); }
        }
      `}</style>
    </section>
  );
}

export { HomeHero };
