// new-arrivals.tsx: 首页新品展示 — Embla Carousel 按日期读取新品图片
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (images.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-[var(--color-bg-secondary)]">
      <div className="max-w-[1080px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-12">
          <div className="w-8 h-px bg-[var(--color-border)] mx-auto mb-4" />
          <h2 className="font-serif text-2xl tracking-[0.15em] text-[var(--color-text-muted)]">
            · {t("title")} ·
          </h2>
          <div className="w-8 h-px bg-[var(--color-border)] mx-auto mt-4" />
          {date && (
            <p className="mt-4 text-xs text-[var(--color-text-muted)]">{date}</p>
          )}
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {images.map((src, index) => (
                <div
                  key={src}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] px-3"
                >
                  <div className="relative aspect-[4/5] rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
                    <Image
                      src={src}
                      alt={`${t("image_alt")} ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33.333vw"
                      className="object-cover"
                      priority={index < 3}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {images.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ${
                    index === selectedIndex
                      ? "bg-[var(--color-accent)]"
                      : "bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]"
                  }`}
                  aria-label={`${t("slide")} ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { NewArrivals };
