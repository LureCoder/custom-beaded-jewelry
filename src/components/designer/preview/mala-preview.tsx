// mala-preview.tsx: 念珠骨架预览 — 112念珠（含三通）环形布局 + 动态材质分配
'use client';

import { useMemo, useState, useCallback, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useDesignerStore } from '@/lib/designer/store';
import type { MaterialCategoryConfig, MaterialConfig } from '@/lib/get-materials';
import Image from 'next/image';

interface MalaPreviewProps {
  materials: MaterialCategoryConfig[];
}

const MAIN_BEADS = 108;
const TOTAL_POSITIONS = 112;
const GURU_INDEX = 0;
const CROWN_INDEX = 56;
const WAIST_INDICES = [28, 84];
const BASE_RADIUS = 350;

const BEAD_SIZES = {
  main: 15,
  waist: 17,
  crown: 19,
  guru: 19,
  disciple: 15,
  counter: 15,
  clip: 15,
};

const GURU_DISPLAY_SIZE = BEAD_SIZES.guru;
const STUPA_DISPLAY_SIZE = Math.round(GURU_DISPLAY_SIZE * 0.6);
const CONTAINER_HEIGHT = BASE_RADIUS * 2 + GURU_DISPLAY_SIZE + STUPA_DISPLAY_SIZE + 60;
const CONTAINER_WIDTH = BASE_RADIUS * 2 + BEAD_SIZES.crown + 60;

interface BeadData {
  index: number;
  type: 'main' | 'crown' | 'waist';
  x: number;
  y: number;
  size: number;
  mainBeadIndex: number;
}

function getBeadPosition(index: number): { x: number; y: number } {
  const anglePerBead = (2 * Math.PI) / TOTAL_POSITIONS;
  const guruAngle = Math.PI / 2;
  const angle = guruAngle + index * anglePerBead;
  
  return {
    x: Math.round(BASE_RADIUS * Math.cos(angle)),
    y: Math.round(BASE_RADIUS * Math.sin(angle)),
  };
}

function generateBeads(): BeadData[] {
  const beads: BeadData[] = [];
  
  let mainBeadCount = 0;
  
  for (let i = 0; i < TOTAL_POSITIONS; i++) {
    if (i === GURU_INDEX) continue;
    
    const pos = getBeadPosition(i);
    let type: 'main' | 'crown' | 'waist' = 'main';
    let mainBeadIndex = mainBeadCount;
    
    if (i === CROWN_INDEX) {
      type = 'crown';
      mainBeadIndex = -1;
    } else if (WAIST_INDICES.includes(i)) {
      type = 'waist';
      mainBeadIndex = -1;
    } else {
      mainBeadCount++;
    }
    
    beads.push({
      index: i,
      type,
      x: pos.x,
      y: pos.y,
      size: type === 'crown' ? BEAD_SIZES.crown : type === 'waist' ? BEAD_SIZES.waist : BEAD_SIZES.main,
      mainBeadIndex,
    });
  }
  
  return beads;
}

function findMaterialById(materials: MaterialCategoryConfig[], id: string): MaterialConfig | null {
  for (const category of materials) {
    for (const [matId, mat] of Object.entries(category.materials)) {
      if (matId === id) return mat;
    }
  }
  return null;
}

function BeadNode({
  bead,
  material,
  isSelected,
  onClick,
}: {
  bead: BeadData;
  material: MaterialConfig | null;
  isSelected: boolean;
  onClick: () => void;
}) {
  const locale = useLocale();
  const t = useTranslations('designer');
  const name = material ? (locale === 'en' ? material.name.en : material.name.zh) : '';

  const displaySize = bead.size;

  const typeBorderClass =
    bead.type === 'crown'
      ? 'border-[var(--color-accent)]'
      : bead.type === 'waist'
        ? 'border-[var(--color-text-muted)]'
        : 'border-[var(--color-border)]';

  const label = bead.type === 'crown' ? t('crown_bead') : bead.type === 'waist' ? t('waist_bead') : null;

  return (
    <div
      className="absolute cursor-pointer transition-all duration-600"
      style={{
        left: `calc(50% + ${bead.x}px - ${displaySize / 2}px)`,
        top: `calc(50% + ${bead.y}px - ${displaySize / 2}px)`,
        width: `${displaySize}px`,
        height: `${displaySize}px`,
        zIndex: Math.round(bead.y) + 200,
        transform: isSelected ? 'scale(1.2)' : 'scale(1)',
      }}
      onClick={onClick}
    >
      <div
        className={`
          relative w-full h-full rounded-full overflow-hidden
          flex items-center justify-center
          border-2 transition-all duration-600
          ${material
            ? 'border-transparent'
            : `${typeBorderClass} bg-[var(--color-bg-secondary)]`
          }
          ${isSelected
            ? 'ring-2 ring-[var(--color-accent)] ring-offset-2'
            : ''
          }
        `}
      >
        {material && (
          <Image
            src={material.thumbnail}
            alt={name}
            fill
            sizes={`${displaySize}px`}
            className="object-contain"
          />
        )}
        {bead.type === 'main' && (
          <span
            className={`
              absolute inset-0 flex items-center justify-center
              text-[10px] font-bold
              ${material ? 'text-white' : 'text-[var(--color-text-primary)]'}
              pointer-events-none select-none
            `}
            style={{ textShadow: material ? '0 1px 2px rgba(0,0,0,0.9)' : '0 0 1px rgba(0,0,0,0.2)' }}
          >
            {bead.mainBeadIndex + 1}
          </span>
        )}
      </div>
    </div>
  );
}

function GuruBeadSet({
  material,
}: {
  material: MaterialConfig | null;
}) {
  const locale = useLocale();
  const name = material ? (locale === 'en' ? material.name.en : material.name.zh) : '';

  const guruSize = BEAD_SIZES.guru;
  const stupaSize = STUPA_DISPLAY_SIZE;
  const guruRadius = BASE_RADIUS;

  return (
    <div
      className="absolute transition-all duration-600"
      style={{
        left: `calc(50% - ${guruSize / 2}px)`,
        top: `calc(50% + ${guruRadius}px - ${guruSize / 2}px)`,
        width: `${guruSize}px`,
        height: `${guruSize + stupaSize + 4}px`,
        zIndex: 300,
      }}
    >
      <div
        className={`
          relative w-full rounded-full overflow-hidden
          flex items-center justify-center
          border-2 transition-all duration-600
          ${material
            ? 'border-transparent'
            : 'border-[var(--color-accent)] bg-[var(--color-bg-secondary)]'
          }
        `}
        style={{
          width: `${guruSize}px`,
          height: `${guruSize}px`,
        }}
      >
        {material && (
          <Image
            src={material.thumbnail}
            alt={name}
            fill
            sizes={`${guruSize}px`}
            className="object-contain"
          />
        )}
      </div>

      <div
        className={`
          absolute left-1/2 -translate-x-1/2
          rounded-full overflow-hidden
          flex items-center justify-center
          border-2 transition-all duration-600
          ${material
            ? 'border-transparent bg-gradient-to-b from-[var(--color-accent)] to-[var(--color-accent-hover)]'
            : 'border-[var(--color-accent)] bg-[var(--color-bg-secondary)]'
          }
        `}
        style={{
          width: `${stupaSize}px`,
          height: `${stupaSize}px`,
          top: `${guruSize + 4}px`,
        }}
      />
    </div>
  );
}

function ZoomControls({
  scale,
  onZoomIn,
  onZoomOut,
  onReset,
}: {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}) {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
      <button
        onClick={onZoomIn}
        disabled={scale >= 4}
        className="w-10 h-10 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors disabled:opacity-30"
      >
        +
      </button>
      <button
        onClick={onReset}
        className="w-10 h-10 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] flex items-center justify-center text-xs text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)] transition-colors"
      >
        {Math.round(scale * 100)}%
      </button>
      <button
        onClick={onZoomOut}
        disabled={scale <= 0.3}
        className="w-10 h-10 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors disabled:opacity-30"
      >
        −
      </button>
    </div>
  );
}

interface LabelData {
  label: string;
  labelX: number;
  labelY: number;
  lineStartX: number;
  lineStartY: number;
  lineEndX: number;
  lineEndY: number;
}

export function MalaPreview({ materials }: MalaPreviewProps) {
  const t = useTranslations('designer');
  const materialAssignment = useDesignerStore((s) => s.config.materialAssignment);
  const singleBeadOverrides = useDesignerStore((s) => s.config.singleBeadOverrides);
  const selectedBead = useDesignerStore((s) => s.config.selectedBead);
  const selectBead = useDesignerStore((s) => s.selectBead);

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const hasDraggedRef = useRef(false);

  const handleZoomIn = useCallback(() => setScale((s) => Math.min(s + 0.2, 4)), []);
  const handleZoomOut = useCallback(() => setScale((s) => Math.max(s - 0.2, 0.3)), []);
  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: position.x,
      posY: position.y,
    };
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    
    if (!hasDraggedRef.current && Math.sqrt(dx * dx + dy * dy) > 5) {
      hasDraggedRef.current = true;
    }
    
    setPosition({
      x: dragStartRef.current.posX + dx,
      y: dragStartRef.current.posY + dy,
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      posX: position.x,
      posY: position.y,
    };
  }, [position]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartRef.current.x;
    const dy = touch.clientY - dragStartRef.current.y;
    
    if (!hasDraggedRef.current && Math.sqrt(dx * dx + dy * dy) > 5) {
      hasDraggedRef.current = true;
    }
    
    setPosition({
      x: dragStartRef.current.posX + dx,
      y: dragStartRef.current.posY + dy,
    });
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const beads = useMemo(() => generateBeads(), []);
  const sortedBeads = useMemo(() => [...beads].sort((a, b) => a.y - b.y), [beads]);
  
  const frameLinePath = useMemo(() => {
    const points: string[] = [];
    const steps = 360;
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * 2 * Math.PI;
      const x = Math.round(BASE_RADIUS * Math.cos(angle));
      const y = Math.round(BASE_RADIUS * Math.sin(angle));
      if (i === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }
    points.push('Z');
    return points.join(' ');
  }, []);

  const getMaterialForBead = (bead: BeadData): MaterialConfig | null => {
    if (singleBeadOverrides[bead.index] !== undefined) {
      const id = singleBeadOverrides[bead.index];
      return findMaterialById(materials, id);
    }
    const id = materialAssignment[bead.type];
    if (id) return findMaterialById(materials, id);
    return null;
  };

  const getGuruMaterial = (): MaterialConfig | null => {
    const id = materialAssignment.guru;
    if (id) return findMaterialById(materials, id);
    return null;
  };

  const labels = useMemo(() => {
    const result: LabelData[] = [];
    
    beads.forEach(bead => {
      let label: string | null = null;
      if (bead.type === 'crown') {
        label = t('crown_bead');
      } else if (bead.type === 'waist') {
        label = t('waist_bead');
      }
      
      if (label) {
        const angle = Math.atan2(bead.y, bead.x);
        const labelDistance = 50;
        const lineAngleOffset = Math.PI / 4;
        
        const labelX = bead.x + Math.cos(angle) * labelDistance;
        const labelY = bead.y + Math.sin(angle) * labelDistance;
        
        const lineStartX = bead.x + Math.cos(angle) * (bead.size / 2 + 2);
        const lineStartY = bead.y + Math.sin(angle) * (bead.size / 2 + 2);
        
        const lineAngle = angle + Math.PI + lineAngleOffset;
        const lineEndX = labelX + Math.cos(lineAngle) * 15;
        const lineEndY = labelY + Math.sin(lineAngle) * 15;
        
        result.push({
          label,
          labelX,
          labelY,
          lineStartX,
          lineStartY,
          lineEndX,
          lineEndY,
        });
      }
    });
    
    return result;
  }, [beads, t]);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)] overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative transition-transform duration-600"
        style={{
          width: CONTAINER_WIDTH,
          height: CONTAINER_HEIGHT,
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          width={CONTAINER_WIDTH}
          height={CONTAINER_HEIGHT}
          viewBox={`${-CONTAINER_WIDTH/2} ${-CONTAINER_HEIGHT/2} ${CONTAINER_WIDTH} ${CONTAINER_HEIGHT}`}
        >
          <path
            d={frameLinePath}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
        
        {sortedBeads.map((bead) => (
          <BeadNode
            key={bead.index}
            bead={bead}
            material={getMaterialForBead(bead)}
            isSelected={selectedBead === bead.index}
            onClick={() => {
              if (!hasDraggedRef.current) {
                selectBead(selectedBead === bead.index ? null : bead.index);
              }
            }}
          />
        ))}

        <GuruBeadSet
          material={getGuruMaterial()}
        />
        
        <svg
          className="absolute inset-0 pointer-events-none"
          width={CONTAINER_WIDTH}
          height={CONTAINER_HEIGHT}
          viewBox={`${-CONTAINER_WIDTH/2} ${-CONTAINER_HEIGHT/2} ${CONTAINER_WIDTH} ${CONTAINER_HEIGHT}`}
        >
          {labels.map((label, i) => (
            <line
              key={i}
              x1={label.lineStartX}
              y1={label.lineStartY}
              x2={label.lineEndX}
              y2={label.lineEndY}
              stroke="var(--color-border)"
              strokeWidth="1"
            />
          ))}
        </svg>
        
        {labels.map((label, i) => (
          <div
            key={i}
            className="
              absolute
              px-2 py-0.5 rounded
              bg-[var(--color-bg-secondary)] border border-[var(--color-border)]
              text-[10px] text-[var(--color-text-muted)]
              whitespace-nowrap pointer-events-none
              z-50
            "
            style={{
              left: `calc(50% + ${label.labelX}px)`,
              top: `calc(50% + ${label.labelY}px)`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {label.label}
          </div>
        ))}
      </div>

      <ZoomControls
        scale={scale}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
      />
    </div>
  );
}
