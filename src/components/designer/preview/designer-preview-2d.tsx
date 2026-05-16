// designer-preview-2d.tsx: 2D 念珠预览 — 用材质图片渲染环形念珠
'use client';

import { useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useDesignerStore } from '@/lib/designer/store';
import type { MaterialCategoryConfig } from '@/lib/get-materials';
import Image from 'next/image';

interface DesignerPreview2DProps {
  materials: MaterialCategoryConfig[];
}

const DISPLAY_COUNT = 36;
const BEAD_SIZE = 40;

function generateRingPositions(total: number): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];

  for (let i = 0; i < total; i++) {
    const t = i / total;
    const angle = t * Math.PI * 2 - Math.PI / 2;
    const radius = 140;
    const x = Math.round(Math.cos(angle) * radius);
    const y = Math.round(Math.sin(angle) * radius);
    positions.push({ x, y });
  }

  return positions;
}

export function DesignerPreview2D({ materials }: DesignerPreview2DProps) {
  const locale = useLocale();
  const t = useTranslations('designer');
  const materialId = useDesignerStore((state) => state.config.materialId);
  const beadDiameter = useDesignerStore((state) => state.config.bead.diameter);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const material = useMemo(() => {
    for (const category of materials) {
      for (const [id, mat] of Object.entries(category.materials)) {
        if (id === materialId) return mat;
      }
    }
    return null;
  }, [materials, materialId]);

  const ringPositions = useMemo(() => generateRingPositions(DISPLAY_COUNT), []);

  const name = material
    ? (locale === 'en' ? material.name.en : material.name.zh)
    : '';

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
      <div className="relative flex items-center justify-center">
        <div
          className="relative"
          style={{
            width: 340,
            height: 340,
          }}
        >
          {ringPositions.map((pos, i) => (
            <div
              key={i}
              className="absolute transition-all duration-300"
              style={{
                left: `calc(50% + ${pos.x}px - ${BEAD_SIZE / 2}px)`,
                top: `calc(50% + ${pos.y}px - ${BEAD_SIZE / 2}px)`,
                width: `${BEAD_SIZE}px`,
                height: `${BEAD_SIZE}px`,
                zIndex: pos.y > 0 ? 10 + Math.round(pos.y) : 1 + Math.round(pos.y),
                transform: selectedIndex === i ? 'scale(1.3)' : 'scale(1)',
              }}
              onMouseEnter={() => setSelectedIndex(i)}
              onMouseLeave={() => setSelectedIndex(null)}
            >
              <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                {material && (
                  <Image
                    src={material.thumbnail}
                    alt={`${name} ${beadDiameter}mm`}
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                )}
              </div>
              {i % 9 === 0 && i !== 0 && (
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)]" />
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            {name || t('select_material')}
          </p>
          {material && (
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              {beadDiameter}{material.sizeUnit} · {material.properties.origin}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
