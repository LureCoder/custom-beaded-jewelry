// material-panel.tsx: 材质选择面板 — 每个尺寸显示为独立卡片
'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useDesignerStore } from '@/lib/designer/store';
import { MATERIAL_GROUPS } from '@/lib/designer/materials';
import type { Material } from '@/types/material';
import Image from 'next/image';

interface MaterialVariantCardProps {
  material: Material;
  size: number;
  isSelected: boolean;
  onSelect: () => void;
}

function MaterialVariantCard({ material, size, isSelected, onSelect }: MaterialVariantCardProps) {
  const locale = useLocale();
  const [isHovered, setIsHovered] = useState(false);
  const [isDetailHovered, setIsDetailHovered] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const name = locale === 'en' ? material.name.en : material.name.zh;

  useEffect(() => {
    if (isHovered || isDetailHovered) {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      
      if (!showDetail) {
        showTimeoutRef.current = setTimeout(() => {
          setShowDetail(true);
        }, 500);
      }
    } else {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
        showTimeoutRef.current = null;
      }
      
      hideTimeoutRef.current = setTimeout(() => {
        setShowDetail(false);
      }, 1000);
    }

    return () => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isHovered, isDetailHovered, showDetail]);

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={onSelect}
          className={`
            relative flex flex-col gap-2 p-3 rounded-[var(--radius-md)]
            border transition-all duration-300 w-full
            ${isSelected
              ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
              : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/50'
            }
          `}
        >
          <div className="relative aspect-square rounded-[var(--radius-sm)] overflow-hidden bg-[var(--color-bg-secondary)]">
            <Image
              src={material.images.thumb}
              alt={`${name} ${size}mm`}
              fill
              sizes="100px"
              className="object-cover"
            />
          </div>

          <span className="text-sm text-[var(--color-text-primary)] text-left">
            {name}
          </span>

          <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-2 py-1 rounded text-center">
            {size}mm
          </span>
        </button>

        {showDetail && (
          <div 
            className="absolute left-full top-0 ml-3 z-50 w-72 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] shadow-lg animate-fade-in-slide"
            onMouseEnter={() => setIsDetailHovered(true)}
            onMouseLeave={() => setIsDetailHovered(false)}
          >
            <h4 className="font-medium text-[var(--color-text-primary)] mb-2">
              {name} {size}mm
            </h4>
            
            <div className="text-xs text-[var(--color-text-secondary)] space-y-1 mb-3">
              <p>{locale === 'en' ? 'Origin' : '产地'}: {material.properties.origin}</p>
              <p>{locale === 'en' ? 'Hardness' : '硬度'}: {material.properties.hardness}</p>
              {material.properties.energy && (
                <p>{locale === 'en' ? 'Energy' : '能量'}: {material.properties.energy}</p>
              )}
            </div>

            {material.actualPhotos.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-[var(--color-text-muted)]">
                  {locale === 'en' ? 'Actual Photos' : '实物图'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {material.actualPhotos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImage(photo.imagePath);
                      }}
                      className="relative aspect-square rounded-[var(--radius-sm)] overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
                    >
                      <Image
                        src={photo.imagePath}
                        alt={locale === 'en' ? photo.description.en : photo.description.zh}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative w-[90vw] h-[90vh] max-w-4xl max-h-[80vh]">
            <Image
              src={lightboxImage}
              alt={name}
              fill
              sizes="90vw"
              className="object-contain"
            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function MaterialPanel() {
  const t = useTranslations('designer');
  const locale = useLocale();
  const materialId = useDesignerStore((state) => state.config.materialId);
  const beadDiameter = useDesignerStore((state) => state.config.bead.diameter);
  const setMaterial = useDesignerStore((state) => state.setMaterial);
  const setBeadDiameter = useDesignerStore((state) => state.setBeadDiameter);

  const handleSelect = (materialId: string, size: number) => {
    setMaterial(materialId);
    setBeadDiameter(size as 6 | 8 | 10 | 12);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="font-serif text-xl tracking-[0.15em] text-[var(--color-text-muted)]">
        {t('select_material')}
      </h2>

      {MATERIAL_GROUPS.map((group) => (
        <div key={group.category} className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">
            {locale === 'en' ? group.label.en : group.label.zh}
          </h3>

          <div className="grid grid-cols-3 gap-3">
            {group.materials.map((material) =>
              material.sizes.map((size) => (
                <MaterialVariantCard
                  key={`${material.id}-${size}`}
                  material={material}
                  size={size}
                  isSelected={materialId === material.id && beadDiameter === size}
                  onSelect={() => handleSelect(material.id, size)}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
