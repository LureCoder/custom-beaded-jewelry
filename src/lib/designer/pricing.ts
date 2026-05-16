// pricing.ts: 价格计算逻辑 — 念珠定价规则
import type { DesignConfig } from '@/types/config';
import { getMaterialById } from './materials';
import { logger } from './logger';

export function calculatePrice(config: DesignConfig): number {
  const material = getMaterialById(config.materialId);
  
  if (!material) {
    logger.warn('⚠️ 材质未找到', { materialId: config.materialId });
    return 0;
  }
  
  const { bead, accessory } = config;
  
  const basePrice = material.pricing.basePrice * bead.count;
  
  const diameterPrice = material.pricing.pricePerMm * bead.diameter * bead.count;
  
  let accessoryPrice = 0;
  if (accessory.tassel) {
    accessoryPrice += 28;
  }
  if (accessory.pendant) {
    accessoryPrice += 48;
  }
  if (accessory.counter) {
    accessoryPrice += 38;
  }
  
  const craftsmanshipFee = bead.count > 54 ? 68 : 48;
  
  const total = basePrice + diameterPrice + accessoryPrice + craftsmanshipFee;
  
  const finalPrice = roundToEight(total);
  
  logger.priceCalculated({
    materialId: config.materialId,
    beadCount: bead.count,
    beadDiameter: bead.diameter,
    basePrice,
    diameterPrice,
    accessoryPrice,
    craftsmanshipFee,
    total: finalPrice,
  });
  
  return finalPrice;
}

function roundToEight(price: number): number {
  const rounded = Math.ceil(price / 10) * 10 - 2;
  logger.debug('🔢 价格取整', { original: price, rounded });
  return rounded;
}

export function formatPrice(price: number): string {
  return `¥${price}`;
}
