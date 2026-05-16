// config-panel.tsx: 配置面板 — 珠数、直径、配饰
'use client';

import { useTranslations } from 'next-intl';
import { useDesignerStore } from '@/lib/designer/store';
import { formatPrice } from '@/lib/designer/pricing';

const BEAD_COUNTS = [18, 27, 36, 54, 108];
const BEAD_DIAMETERS = [6, 8, 10, 12] as const;

export function ConfigPanel() {
  const t = useTranslations('designer');
  const config = useDesignerStore((state) => state.config);
  const setBeadCount = useDesignerStore((state) => state.setBeadCount);
  const setBeadDiameter = useDesignerStore((state) => state.setBeadDiameter);
  const addTassel = useDesignerStore((state) => state.addTassel);
  const removeAccessory = useDesignerStore((state) => state.removeAccessory);
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="font-serif text-xl tracking-[0.15em] text-[var(--color-text-muted)]">
        {t('config')}
      </h2>
      
      <div className="flex flex-col gap-4">
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">
          {t('bead_count')}
        </label>
        <div className="flex gap-2 flex-wrap">
          {BEAD_COUNTS.map((count) => (
            <button
              key={count}
              onClick={() => setBeadCount(count)}
              className={`
                px-4 py-2 rounded-[var(--radius-md)] text-sm
                border transition-all duration-300
                ${config.bead.count === count
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                  : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/50'
                }
              `}
            >
              {count}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">
          {t('bead_diameter')}
        </label>
        <div className="flex gap-2">
          {BEAD_DIAMETERS.map((diameter) => (
            <button
              key={diameter}
              onClick={() => setBeadDiameter(diameter)}
              className={`
                px-4 py-2 rounded-[var(--radius-md)] text-sm
                border transition-all duration-300
                ${config.bead.diameter === diameter
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                  : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/50'
                }
              `}
            >
              {diameter}mm
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">
          {t('accessories')}
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (config.accessory.tassel) {
                removeAccessory('tassel');
              } else {
                addTassel({ color: '#8B4513', length: 10, material: 'silk' });
              }
            }}
            className={`
              px-4 py-2 rounded-[var(--radius-md)] text-sm
              border transition-all duration-300
              ${config.accessory.tassel
                ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                : 'border-[var(--color-border)] hover:border-[var(--color-accent)]/50'
              }
            `}
          >
            {t('tassel')}
          </button>
        </div>
      </div>
      
      <div className="mt-auto pt-6 border-t border-[var(--color-border)]">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[var(--color-text-secondary)]">
            {t('total_price')}
          </span>
          <span className="text-2xl font-serif text-[var(--color-accent)]">
            {formatPrice(config.totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
