// new-arrivals.tsx: 首页新品展示 — 横向滚动画廊，支持触摸滑动
"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

interface NewArrivalsProps {
  images: string[];
  date: string;
}

function NewArrivals({ images, date }: NewArrivalsProps) {
  const t = useTranslations("new_arrivals");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    slidesToScroll: 3,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (images.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-[var(--color-bg-secondary)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12 px-6 md:px-12 lg:px-24">
          <div className="w-8 h-px bg-[var(--color-border)] mx-auto mb-4" />
          <h2 className="font-serif text-2xl tracking-[0.15em] text-[var(--color-text-muted)]">
            · {t("title")} ·
          </h2>
          <div className="w-8 h-px bg-[var(--color-border)] mx-auto mt-4" />
          {date && (
            <p className="mt-4 text-xs text-[var(--color-text-muted)]">{date}</p>
          )}
        </div>

        <div className="relative mx-6 md:mx-12 lg:mx-24 p-3 md:p-4 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-bg-primary)] shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y cursor-grab active:cursor-grabbing">
              {images.map((src, index) => (
                <div
                  key={src}
                  className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] pl-4 pr-4 first:pl-0"
                >
                  <div className="relative aspect-[3/4] rounded-[var(--radius-sm)] overflow-hidden">
                    <Image
                      src={src}
                      alt={`${t("image_alt")} ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, 33.333vw"
                      className="object-cover"
                      priority={index < 3}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {canScrollPrev && (
            <button
              type="button"
              onClick={scrollPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
              aria-label={t("prev")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[var(--color-text-secondary)]"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {canScrollNext && (
            <button
              type="button"
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
              aria-label={t("next")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[var(--color-text-secondary)]"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export { NewArrivals };
