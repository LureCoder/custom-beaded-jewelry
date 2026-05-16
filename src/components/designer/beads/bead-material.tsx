// bead-material.tsx: 珠子材质 — 根据材质类型生成材质
'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { useDesignerStore } from '@/lib/designer/store';
import { getMaterialById } from '@/lib/designer/materials';
import { logger } from '@/lib/designer/logger';

const MATERIAL_COLORS: Record<string, string> = {
  'red-sandalwood': '#8B4513',
  'sandalwood': '#DEB887',
  'bodhi-seed': '#F5DEB3',
  'clear-quartz': '#E8E8E8',
  'amethyst': '#9966CC',
  'turquoise': '#40E0D0',
  'lapis-lazuli': '#26619C',
};

export function useBeadMaterial() {
  const materialId = useDesignerStore((state) => state.config.materialId);
  
  const material = useMemo(() => {
    const materialData = getMaterialById(materialId);
    const color = MATERIAL_COLORS[materialId] || '#8B4513';
    
    logger.debug('🎨 材质创建', {
      materialId,
      color,
      category: materialData?.category,
    });
    
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: materialData?.category === 'gemstone' ? 0.1 : 0.6,
      metalness: materialData?.category === 'gemstone' ? 0.1 : 0,
      envMapIntensity: 0.5,
    });
    
    return mat;
  }, [materialId]);
  
  return material;
}

export function getSpacerMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FFD700'),
    roughness: 0.3,
    metalness: 0.6,
  });
}
