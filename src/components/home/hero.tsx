// hero.tsx: 首页 Hero 区域 — 品牌 Slogan、背景图和双 CTA
"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

function HomeHero() {
  const t = useTranslations("hero");
  const nextRef = useRef<HTMLDivElement>(null);

  const scrollToNext = () => {
    nextRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <Image
        src="/images/background/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div
        className="absolute inset-0 pointer-events-none dark:hidden"
        style={{
          background: "rgba(255,255,255,0.82)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{
          background: "rgba(0,0,0,0.5)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 40%, rgba(255,185,0,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-[720px] mx-auto">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight tracking-wide text-[var(--color-text-primary)]">
          {t("slogan")}
        </h1>

        <p className="mt-4 font-display italic text-lg md:text-xl text-[var(--color-text-secondary)]">
          {t("subtitle")}
        </p>

        <div className="mt-16 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <a
            href="/designer"
            className="inline-flex items-center justify-center px-10 py-3.5 text-sm tracking-[0.1em] uppercase rounded-[var(--radius-md)] border-2 border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg-primary)] transition-[background-color,color,border-color] duration-600"
          >
            {t("cta_primary")}
          </a>
          <a
            href="/shop"
            className="inline-flex items-center justify-center px-10 py-3.5 text-sm tracking-[0.1em] uppercase rounded-[var(--radius-md)] border-2 border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-[border-color,color] duration-600"
          >
            {t("cta_secondary")}
          </a>
        </div>
      </div>

      <button type="button" className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] rounded-sm" onClick={scrollToNext} aria-label="Scroll to next section">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          className="text-[var(--color-text-muted)] opacity-40 animate-[hero-scroll_3s_ease-in-out_infinite]"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>

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
