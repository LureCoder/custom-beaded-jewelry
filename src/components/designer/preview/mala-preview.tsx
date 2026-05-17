// mala-preview.tsx: 念珠骨架预览 — 112念珠（含三通）环形布局 + 动态材质分配
'use client';

import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
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
const MM_TO_PX = 3.78;

const BACK_CLOUD_ID = -1;
const DISCIPLE_START = -10;

const DISCIPLE_BEADS = [
  { x: -9,  y: 0,  label: '109' },
  { x: 9,   y: 0,  label: '112' },
  { x: -13, y: 16, label: '110' },
  { x: 13,  y: 16, label: '113' },
  { x: -17, y: 32, label: '111' },
  { x: 17,  y: 32, label: '114' },
];

const SEGMENTS = [
  { indices: Array.from({ length: 27 }, (_, i) => i + 1), label: '1' },
  { indices: Array.from({ length: 27 }, (_, i) => i + 29), label: '2' },
  { indices: Array.from({ length: 27 }, (_, i) => i + 57), label: '3' },
  { indices: Array.from({ length: 27 }, (_, i) => i + 85), label: '4' },
];

interface BeadData {
  index: number;
  type: 'main' | 'crown' | 'waist';
  x: number;
  y: number;
  size: number;
  mainBeadIndex: number;
}

function getBeadPosition(index: number, radius: number): { x: number; y: number } {
  const anglePerBead = (2 * Math.PI) / TOTAL_POSITIONS;
  const guruAngle = Math.PI / 2;
  const angle = guruAngle + index * anglePerBead;

  return {
    x: Math.round(radius * Math.cos(angle)),
    y: Math.round(radius * Math.sin(angle)),
  };
}

function getSegmentIndex(beadArrayIndex: number): number {
  if (beadArrayIndex >= 1 && beadArrayIndex <= 27) return 0;
  if (beadArrayIndex >= 29 && beadArrayIndex <= 55) return 1;
  if (beadArrayIndex >= 57 && beadArrayIndex <= 83) return 2;
  if (beadArrayIndex >= 85 && beadArrayIndex <= 111) return 3;
  return -1;
}

function generateBeads(
  radius: number,
  sizes: { main: number; waist: number; crown: number },
  segDiameters: Record<number, number>,
  globalDiameter: number,
): BeadData[] {
  const beads: BeadData[] = [];

  let mainBeadCount = 0;

  for (let i = 0; i < TOTAL_POSITIONS; i++) {
    if (i === GURU_INDEX) continue;

    const pos = getBeadPosition(i, radius);
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

    let size: number;
    if (type === 'crown') {
      size = sizes.crown;
    } else if (type === 'waist') {
      size = sizes.waist;
    } else {
      const segIdx = getSegmentIndex(i);
      const effectiveDiam = segIdx >= 0 && segDiameters[segIdx] ? segDiameters[segIdx] : globalDiameter;
      size = Math.round(effectiveDiam * MM_TO_PX);
    }

    beads.push({
      index: i,
      type,
      x: pos.x,
      y: pos.y,
      size,
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
      data-bead={bead.index}
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
  isSelected,
  onClick,
  guruSize,
  guruRadius,
  stupaSize,
}: {
  material: MaterialConfig | null;
  isSelected: boolean;
  onClick: () => void;
  guruSize: number;
  guruRadius: number;
  stupaSize: number;
}) {
  const locale = useLocale();
  const name = material ? (locale === 'en' ? material.name.en : material.name.zh) : '';

  const sq = guruSize;
  const guruH = Math.round(sq * 1.5);
  const st = stupaSize;
  const totalHeight = guruH + st;

  const outlinePath = `M 0 0 L ${sq} 0 L ${sq} ${guruH} L ${sq / 2} ${totalHeight} L 0 ${guruH} Z`;

  return (
    <div
      className="absolute cursor-pointer transition-all duration-600"
      style={{
        left: `calc(50% - ${guruSize / 2}px)`,
        top: `calc(50% + ${guruRadius}px - ${guruSize / 2}px)`,
        width: `${sq}px`,
        height: `${totalHeight}px`,
        zIndex: 300,
        transform: isSelected ? 'scale(1.2)' : 'scale(1)',
      }}
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ width: '100%', height: '100%' }}
          viewBox={`0 0 ${sq} ${totalHeight}`}
        >
          <path
            d={outlinePath}
            fill={material ? 'transparent' : 'var(--color-bg-secondary)'}
            stroke={material ? 'transparent' : 'var(--color-accent)'}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {isSelected && (
            <path
              d={outlinePath}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="4"
              strokeLinejoin="round"
              opacity="0.7"
              transform={`translate(0, 0)`}
            />
          )}
        </svg>

        <div
          className="relative overflow-hidden"
          style={{ width: '100%', height: `${guruH}px` }}
        >
          {material && (
            <Image
              src={material.thumbnail}
              alt={name}
              fill
              sizes={`${sq}px`}
              className="object-contain"
            />
          )}
        </div>

        <div
          className={material
            ? 'bg-gradient-to-b from-[var(--color-accent)] to-[var(--color-accent-hover)]'
            : ''
          }
          style={{
            width: '100%',
            height: `${st}px`,
            clipPath: `polygon(0% 0%, 100% 0%, 50% 100%)`,
          }}
        />
      </div>
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
  const segmentDiameters = useDesignerStore((s) => s.config.segmentDiameters);
  const globalDiameter = useDesignerStore((s) => s.config.bead.diameter);

  const effectiveDiameters = useMemo(() => {
    const diams: number[] = [];
    for (let s = 0; s < 4; s++) {
      diams.push(segmentDiameters[s] || globalDiameter);
    }
    const maxDiam = Math.max(...diams, globalDiameter, 6);
    return { segmentDiams: diams, maxDiam };
  }, [segmentDiameters, globalDiameter]);

  const beadSizes = useMemo(() => {
    const maxBase = Math.round(effectiveDiameters.maxDiam * MM_TO_PX);
    return {
      main: Math.round(globalDiameter * MM_TO_PX),
      waist: Math.round(globalDiameter * 1.24 * MM_TO_PX),
      crown: Math.round(globalDiameter * 1.47 * MM_TO_PX),
      guru: Math.round(effectiveDiameters.maxDiam * 1.12 * MM_TO_PX),
      disciple: Math.round(globalDiameter * MM_TO_PX),
      counter: Math.round(globalDiameter * 0.88 * MM_TO_PX),
      clip: Math.round(globalDiameter * 0.88 * MM_TO_PX),
      maxBase,
    };
  }, [effectiveDiameters, globalDiameter]);

  const ringRadius = useMemo(() => {
    const mainPx = effectiveDiameters.maxDiam * MM_TO_PX;
    const waistPx = Math.max(effectiveDiameters.maxDiam, globalDiameter) * 1.24 * MM_TO_PX;
    const crownPx = Math.max(effectiveDiameters.maxDiam, globalDiameter) * 1.47 * MM_TO_PX;
    const guruPx = effectiveDiameters.maxDiam * 1.12 * MM_TO_PX;

    const gap = 1.4;
    const adj = TOTAL_POSITIONS / (2 * Math.PI);

    const rMain = MAIN_BEADS * effectiveDiameters.maxDiam * MM_TO_PX / (2 * Math.PI) + mainPx * 0.25;
    const rWaist = adj * ((mainPx + waistPx) / 2 + gap);
    const rCrown = adj * ((mainPx + crownPx) / 2 + gap);
    const rGuru = adj * ((mainPx + guruPx) / 2 + gap);

    return Math.round(Math.max(rMain, rWaist, rCrown, rGuru));
  }, [effectiveDiameters, globalDiameter]);

  const guruDisplaySize = beadSizes.guru;
  const stupaDisplaySize = Math.round(guruDisplaySize * 0.6);
  const guruTotalHeight = Math.round(guruDisplaySize * 1.5) + stupaDisplaySize;
  const containerWidth = Math.ceil((ringRadius * 2 + beadSizes.crown + 60) / 2) * 2;
  const containerHeight = Math.ceil((ringRadius * 2 + guruDisplaySize + stupaDisplaySize + 60) / 2) * 2;

  const requiredSize = Math.max(containerWidth, containerHeight);
  const fitScale = useMemo(() => {
    if (typeof window === 'undefined') return 1;
    return Math.min(1, (window.innerWidth * 0.6) / requiredSize);
  }, [requiredSize]);

  const [scale, setScale] = useState(1);
  const fitScaleRef = useRef(fitScale);
  fitScaleRef.current = fitScale;

  const handleZoomIn = useCallback(() => setScale((s) => Math.min(s + 0.2, 4)), []);
  const handleZoomOut = useCallback(() => setScale((s) => Math.max(s - 0.2, 0.3)), []);
  const handleReset = useCallback(() => {
    setScale(fitScaleRef.current);
    setPosition({ x: 0, y: 0 });
  }, []);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const hasDraggedRef = useRef(false);

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

  const beads = useMemo(
    () => generateBeads(ringRadius, beadSizes, segmentDiameters, globalDiameter),
    [ringRadius, beadSizes, segmentDiameters, globalDiameter],
  );
  const sortedBeads = useMemo(() => [...beads].sort((a, b) => a.y - b.y), [beads]);

  const frameLinePath = useMemo(() => {
    const points: string[] = [];
    const steps = 360;
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * 2 * Math.PI;
      const x = Math.round(ringRadius * Math.cos(angle));
      const y = Math.round(ringRadius * Math.sin(angle));
      if (i === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }
    points.push('Z');
    return points.join(' ');
  }, [ringRadius]);

  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const lines: string[] = [];
    lines.push('直径: ' + effectiveDiameters.maxDiam + 'mm / 全局: ' + globalDiameter + 'mm');
    lines.push('容器: ' + containerWidth + '×' + containerHeight + ' (偶数: ' + (containerWidth % 2 === 0 && containerHeight % 2 === 0 ? '✅' : '⚠️') + ')');
    lines.push('环形半径: ' + ringRadius + 'px');
    const svgEl = document.querySelector('[data-ring-frame]');
    if (svgEl) {
      const rect = svgEl.getBoundingClientRect();
      lines.push('SVG实际: ' + Math.round(rect.width) + '×' + Math.round(rect.height));
      lines.push('SVG差: ' + Math.round(rect.width - containerWidth) + ',' + Math.round(rect.height - containerHeight));
      lines.push('SVG左上: (' + Math.round(rect.left) + ',' + Math.round(rect.top) + ')');
      lines.push('SVG中心: (' + Math.round(rect.left + rect.width/2) + ',' + Math.round(rect.top + rect.height/2) + ')');
    }
    const centerEl = document.querySelector('[data-center-dot]');
    if (centerEl) {
      const rect2 = centerEl.getBoundingClientRect();
      lines.push('红点中心: (' + Math.round(rect2.left + rect2.width/2) + ',' + Math.round(rect2.top + rect2.height/2) + ')');
    }
    const firstBeadEl = document.querySelector('[data-bead="1"]');
    if (firstBeadEl) {
      const r = firstBeadEl.getBoundingClientRect();
      lines.push('首珠中心: (' + Math.round(r.left + r.width/2) + ',' + Math.round(r.top + r.height/2) + ')');
    }
    if (beads.length > 0) {
      const first = beads[0];
      const dist = Math.round(Math.sqrt(first.x * first.x + first.y * first.y));
      lines.push('首珠距心: ' + dist + ' (半径: ' + ringRadius + ') ' + (dist === ringRadius ? '✅' : '⚠️'));
      const allOk = beads.every((b) => Math.abs(Math.round(Math.sqrt(b.x * b.x + b.y * b.y)) - ringRadius) <= 1);
      lines.push('全部同心: ' + (allOk ? '✅' : '⚠️'));
    }
    setDebugInfo(lines);
  }, [ringRadius, beads, containerWidth, containerHeight, effectiveDiameters, globalDiameter]);

  const getMaterialForBead = (bead: BeadData): MaterialConfig | null => {
    if (singleBeadOverrides[bead.index] !== undefined) {
      const id = singleBeadOverrides[bead.index];
      return findMaterialById(materials, id);
    }
    const id = materialAssignment[bead.type];
    if (id) return findMaterialById(materials, id);
    return null;
  };

  const setMaterialForSegment = useDesignerStore((s) => s.setMaterialForSegment);
  const [segmentDropHover, setSegmentDropHover] = useState<number | null>(null);

  const handleDrop = useCallback(
    (segIdx: number, e: React.DragEvent) => {
      e.preventDefault();
      setSegmentDropHover(null);
      const raw = e.dataTransfer.getData('application/x-mala-material');
      if (!raw) return;
      try {
        const { materialId, diameter } = JSON.parse(raw);
        setMaterialForSegment(segIdx, SEGMENTS[segIdx].indices, materialId, diameter);
      } catch {
        const materialId = e.dataTransfer.getData('text/plain');
        if (materialId) {
          setMaterialForSegment(segIdx, SEGMENTS[segIdx].indices, materialId, globalDiameter);
        }
      }
    },
    [setMaterialForSegment, globalDiameter],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const segmentArcPaths = useMemo(() => {
    const anglePerBead = (2 * Math.PI) / TOTAL_POSITIONS;
    const guruAngle = Math.PI / 2;
    const r = ringRadius;
    const gap = 0.8 * anglePerBead;

    return SEGMENTS.map((seg) => {
      const a1 = guruAngle + seg.indices[0] * anglePerBead - gap;
      let a2 = guruAngle + seg.indices[seg.indices.length - 1] * anglePerBead + gap;

      if (a2 > 2 * Math.PI && a1 < 2 * Math.PI) {
        return {
          path1: `M ${r * Math.cos(a1)} ${r * Math.sin(a1)} A ${r} ${r} 0 0 1 ${r} ${r * Math.sin(Math.PI / 2)}`,
          path2: `M ${r} ${r * Math.sin(Math.PI / 2)} A ${r} ${r} 0 0 1 ${r * Math.cos(a2 - 2 * Math.PI)} ${r * Math.sin(a2 - 2 * Math.PI)}`,
        };
      }

      const x1 = r * Math.cos(a1);
      const y1 = r * Math.sin(a1);
      const x2 = r * Math.cos(a2);
      const y2 = r * Math.sin(a2);
      return { path1: `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`, path2: null };
    });
  }, [ringRadius]);

  const getGuruMaterial = (): MaterialConfig | null => {
    const id = materialAssignment.guru;
    if (id) return findMaterialById(materials, id);
    return null;
  };

  const labels = useMemo(() => {
    const result: LabelData[] = [];

    beads.forEach((bead) => {
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

    const guruLabel = t('guru_bead');
    if (guruLabel) {
      const guruY = ringRadius;
      const angle = Math.PI / 4;
      const labelDistance = 100;
      const lineAngleOffset = Math.PI / 4;

      const labelX = Math.cos(angle) * labelDistance;
      const labelY = guruY + Math.sin(angle) * labelDistance;

      const lineStartX = Math.cos(angle) * (beadSizes.guru / 2 + 2);
      const lineStartY = guruY + Math.sin(angle) * (beadSizes.guru / 2 + 2);

      const lineAngle = angle + Math.PI + lineAngleOffset;
      const lineEndX = labelX + Math.cos(lineAngle) * 15;
      const lineEndY = labelY + Math.sin(lineAngle) * 15;

      result.push({
        label: guruLabel,
        labelX,
        labelY,
        lineStartX,
        lineStartY,
        lineEndX,
        lineEndY,
      });
    }

    return result;
  }, [beads, t, ringRadius, beadSizes]);

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
          width: containerWidth,
          height: containerHeight,
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        }}
      >
        <svg
          className="absolute"
          style={{ width: '100%', height: '100%', left: 0, top: 0, overflow: 'visible' }}
          data-ring-frame
          viewBox={`${-containerWidth / 2} ${-containerHeight / 2} ${containerWidth} ${containerHeight}`}
        >
          <path
            d={frameLinePath}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
            opacity="0.6"
          />

          <line x1={-ringRadius - 20} y1="0" x2={ringRadius + 20} y2="0" stroke="red" strokeWidth="1" opacity="0.5" />
          <line x1="0" y1={-ringRadius - 20} x2="0" y2={ringRadius + 20} stroke="red" strokeWidth="1" opacity="0.5" />
          <circle cx="0" cy="0" r="3" fill="red" opacity="0.9" />
          <circle cx="0" cy="0" r="5" fill="none" stroke="lime" strokeWidth="1" opacity="0.9" />
        </svg>

        <div
           className="absolute pointer-events-none"
           data-center-dot
           style={{
            left: '50%',
            top: '50%',
            width: '4px',
            height: '4px',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            backgroundColor: 'red',
            borderRadius: '50%',
            opacity: 0.8,
          }}
        />

        <svg
          className="absolute"
          style={{ width: '100%', height: '100%', left: 0, top: 0, pointerEvents: 'none', overflow: 'visible' }}
          viewBox={`${-containerWidth / 2} ${-containerHeight / 2} ${containerWidth} ${containerHeight}`}
        >
          {segmentArcPaths.map((segPath, segIdx) => (
            <g key={segIdx} style={{ pointerEvents: 'auto' }}>
              <path
                d={segPath.path1}
                fill="none"
                stroke={segmentDropHover === segIdx ? 'var(--color-accent)' : 'transparent'}
                strokeWidth="40"
                strokeLinecap="round"
                opacity={segmentDropHover === segIdx ? 0.3 : 0}
                className="transition-all duration-300"
                onDragOver={handleDragOver}
                onDragEnter={() => setSegmentDropHover(segIdx)}
                onDragLeave={() => setSegmentDropHover(null)}
                onDrop={(e) => handleDrop(segIdx, e)}
              />
              {segPath.path2 && (
                <path
                  d={segPath.path2}
                  fill="none"
                  stroke={segmentDropHover === segIdx ? 'var(--color-accent)' : 'transparent'}
                  strokeWidth="40"
                  strokeLinecap="round"
                  opacity={segmentDropHover === segIdx ? 0.3 : 0}
                  className="transition-all duration-300"
                  onDragOver={handleDragOver}
                  onDragEnter={() => setSegmentDropHover(segIdx)}
                  onDragLeave={() => setSegmentDropHover(null)}
                  onDrop={(e) => handleDrop(segIdx, e)}
                />
              )}
            </g>
          ))}
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
          isSelected={selectedBead === GURU_INDEX}
          guruSize={beadSizes.guru}
          guruRadius={ringRadius}
          stupaSize={stupaDisplaySize}
          onClick={() => {
            if (!hasDraggedRef.current) {
              selectBead(selectedBead === GURU_INDEX ? null : GURU_INDEX);
            }
          }}
        />

        {(
          <div
            className="absolute cursor-pointer transition-all duration-600"
            style={{
              left: `calc(50% - 13.5px)`,
              top: `calc(50% + ${ringRadius}px - ${beadSizes.guru / 2}px + ${guruTotalHeight}px + 14px)`,
              width: '27px',
              height: '9px',
              zIndex: 290,
              transform: selectedBead === BACK_CLOUD_ID ? 'scale(1.2)' : 'scale(1)',
            }}
            onClick={() => {
              if (!hasDraggedRef.current) {
                selectBead(selectedBead === BACK_CLOUD_ID ? null : BACK_CLOUD_ID);
              }
            }}
          >
            <div
              className={`
                relative w-full h-full border-2 transition-all duration-600
                border-[var(--color-accent)] bg-[var(--color-bg-secondary)]
                ${selectedBead === BACK_CLOUD_ID ? 'ring-2 ring-[var(--color-accent)] ring-offset-2' : ''}
              `}
            />
          </div>
        )}

        {DISCIPLE_BEADS.map((bead, i) => {
          const beadId = DISCIPLE_START + i;
          const dSize = beadSizes.main;
          return (
            <div
              key={i}
              className="absolute cursor-pointer transition-all duration-600"
              style={{
                left: `calc(50% + ${bead.x}px - ${dSize / 2}px)`,
                top: `calc(50% + ${ringRadius}px - ${beadSizes.guru / 2}px + ${guruTotalHeight}px + 14px + 9px + 6px + 14px + ${bead.y}px - ${dSize / 2}px)`,
                width: `${dSize}px`,
                height: `${dSize}px`,
                zIndex: 280,
                transform: selectedBead === beadId ? 'scale(1.3)' : 'scale(1)',
              }}
              onClick={() => {
                if (!hasDraggedRef.current) {
                  selectBead(selectedBead === beadId ? null : beadId);
                }
              }}
            >
              <div
                className={`
                  relative w-full h-full rounded-full border-2 transition-all duration-600
                  flex items-center justify-center
                  border-[var(--color-border)] bg-[var(--color-bg-secondary)]
                  ${selectedBead === beadId ? 'ring-2 ring-[var(--color-accent)] ring-offset-2' : ''}
                `}
              >
                <span
                  className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[var(--color-text-primary)] pointer-events-none select-none"
                  style={{ textShadow: '0 0 1px rgba(0,0,0,0.2)' }}
                >
                  {bead.label}
                </span>
              </div>
            </div>
          );
        })}

        <svg
          className="absolute pointer-events-none"
          style={{ width: '100%', height: '100%', left: 0, top: 0, overflow: 'visible' }}
          viewBox={`${-containerWidth / 2} ${-containerHeight / 2} ${containerWidth} ${containerHeight}`}
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

      <div
        className="absolute top-4 left-4 z-[9999] pointer-events-none"
        style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,0,0,0.7)', lineHeight: '1.4' }}
      >
        {debugInfo.map((l, i) => <div key={i}>{l}</div>)}
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
