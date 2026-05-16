// utils.ts: Designer 工具函数
import type { BeadConfig } from '@/types/config';
import { logger } from './logger';

export interface BeadPosition {
  position: [number, number, number];
  isSpacer: boolean;
  index: number;
}

export function calculateBeadPositions(config: BeadConfig): BeadPosition[] {
  const { count, diameter } = config;
  const positions: BeadPosition[] = [];

  logger.beadPositionsCalculated(count, 0, 0);

  const radius = diameter / 20;

  const totalAngle = Math.PI * 2;
  const angleStep = totalAngle / count;

  const circleRadius = count > 1
    ? (radius * 2.2) / (2 * Math.sin(angleStep / 2))
    : radius * 2;

  for (let i = 0; i < count; i++) {
    const angle = i * angleStep;
    const x = Math.cos(angle) * circleRadius;
    const z = Math.sin(angle) * circleRadius;
    const y = 0;

    const isSpacer = i > 0 && i % 27 === 0;

    positions.push({
      position: [x, y, z],
      isSpacer,
      index: i,
    });
  }

  return positions;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
