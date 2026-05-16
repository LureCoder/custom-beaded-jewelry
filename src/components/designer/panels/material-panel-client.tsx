// material-panel-client.tsx: 材质选择面板客户端 — 每个尺寸显示为独立卡片
'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useDesignerStore } from '@/lib/designer/store';
import type { MaterialCategoryConfig, MaterialConfig } from '@/lib/get-materials';
import Image from 'next/image';

interface MaterialVariantCardProps {
  id: string;
  material: MaterialConfig;
  size: number;
  isSelected: boolean;
  onSelect: () => void;
}

function MaterialVariantCard({ id, material, size, isSelected, onSelect }: MaterialVariantCardProps) {
  const locale = useLocale();
  const [isHovered, setIsHovered] = useState(false);
  const [isDetailHovered, setIsDetailHovered] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const name = locale === 'en' ? material.name.en : material.name.zh;

  useEffect(() => {
    if (isHovered || isDetailHovered) {
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

      setShowDetail(false);
    }

    return () => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
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
          <div className="relative aspect-square rounded-[var(--radius-sm)] overflow-hidden">
            <Image
              src={material.thumbnail}
              alt={`${name} ${size}${material.sizeUnit}`}
              fill
              sizes="100px"
              className="object-contain"
            />
          </div>

          <span className="text-sm text-[var(--color-text-primary)] text-left">
            {name}
          </span>

          <span className="text-xs text-[var(--color-text-secondary)]">
            {size}{material.sizeUnit}
          </span>
        </button>

        {showDetail && (
          <div 
            className="absolute left-full top-0 ml-3 z-50 w-72 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] shadow-lg animate-fade-in-slide"
            onMouseEnter={() => setIsDetailHovered(true)}
            onMouseLeave={() => setIsDetailHovered(false)}
          >
            <h4 className="font-medium text-[var(--color-text-primary)] mb-2">
              {name} {size}{material.sizeUnit}
            </h4>
            
            <div className="text-xs text-[var(--color-text-secondary)] space-y-1 mb-3">
              <p>{locale === 'en' ? 'Origin' : '产地'}: {material.properties.origin}</p>
              <p>{locale === 'en' ? 'Energy' : '能量'}: {material.properties.energy}</p>
            </div>

            {material.photos.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-[var(--color-text-muted)]">
                  {locale === 'en' ? 'Actual Photos' : '实物图'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {material.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImage(photo.path);
                      }}
                      className="relative aspect-square rounded-[var(--radius-sm)] overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors bg-[var(--color-bg-secondary)]"
                    >
                      <Image
                        src={photo.path}
                        alt={locale === 'en' ? photo.description.en : photo.description.zh}
                        fill
                        sizes="80px"
                        className="object-contain"
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

interface MaterialPanelClientProps {
  materials: MaterialCategoryConfig[];
  accessories: MaterialCategoryConfig[];
}

export function MaterialPanelClient({ materials, accessories }: MaterialPanelClientProps) {
  const t = useTranslations('designer');
  const locale = useLocale();
  const materialId = useDesignerStore((state) => state.config.materialId);
  const beadDiameter = useDesignerStore((state) => state.config.bead.diameter);
  const setMaterial = useDesignerStore((state) => state.setMaterial);
  const setBeadDiameter = useDesignerStore((state) => state.setBeadDiameter);

  const [selectedAccessory, setSelectedAccessory] = useState<{ category: string; id: string; size: number } | null>(null);

  const handleSelect = (materialId: string, size: number) => {
    setMaterial(materialId);
    setBeadDiameter(size as 6 | 8 | 10 | 12);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="font-serif text-xl tracking-[0.15em] text-[var(--color-text-muted)]">
        {t('select_material')}
      </h2>

      {materials.map((category) => (
        <div key={category.category} className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">
            {locale === 'en' ? category.label.en : category.label.zh}
          </h3>

          <div className="grid grid-cols-3 gap-3">
            {Object.entries(category.materials).map(([matId, material]) =>
              material.sizes.map((size) => (
                <MaterialVariantCard
                  key={`${matId}-${size}`}
                  id={matId}
                  material={material}
                  size={size}
                  isSelected={materialId === matId && beadDiameter === size}
                  onSelect={() => handleSelect(matId, size)}
                />
              ))
            )}
          </div>
        </div>
      ))}

      {accessories.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">
            {locale === 'en' ? 'Accessories' : '配件类'}
          </h3>

          {accessories.map((category) => (
            <div key={category.category} className="flex flex-col gap-2">
              <h4 className="text-xs text-[var(--color-text-muted)] tracking-[0.1em]">
                {locale === 'en' ? category.label.en : category.label.zh}
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(category.materials).map(([accId, accessory]) =>
                  accessory.sizes.map((size) => (
                    <MaterialVariantCard
                      key={`${accId}-${size}`}
                      id={accId}
                      material={accessory}
                      size={size}
                      isSelected={
                        selectedAccessory?.category === category.category &&
                        selectedAccessory?.id === accId &&
                        selectedAccessory?.size === size
                      }
                      onSelect={() =>
                        setSelectedAccessory({ category: category.category, id: accId, size })
                      }
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
