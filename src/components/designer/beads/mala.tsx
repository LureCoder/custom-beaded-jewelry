// mala.tsx: 念珠串 — InstancedMesh 性能优化
'use client';

import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useDesignerStore } from '@/lib/designer/store';
import { calculateBeadPositions } from '@/lib/designer/utils';
import { useBeadMaterial, getSpacerMaterial } from './bead-material';
import { logger } from '@/lib/designer/logger';

export function Mala() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const spacerMeshRef = useRef<THREE.InstancedMesh>(null);
  
  const bead = useDesignerStore((state) => state.config.bead);
  const beadMaterial = useBeadMaterial();
  const spacerMaterial = useMemo(() => getSpacerMaterial(), []);
  
  const { positions, spacerIndices } = useMemo(() => {
    const allPositions = calculateBeadPositions(bead);
    const regularPositions = allPositions.filter((p) => !p.isSpacer);
    const spacerPositions = allPositions.filter((p) => p.isSpacer);
    
    logger.info('📿 念珠串创建', {
      total: allPositions.length,
      regular: regularPositions.length,
      spacers: spacerPositions.length,
    });
    
    return {
      positions: regularPositions,
      spacerIndices: spacerPositions.map((p) => p.index),
    };
  }, [bead]);
  
  const beadRadius = bead.diameter / 20;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  useEffect(() => {
    if (!meshRef.current || positions.length === 0) return;
    
    positions.forEach((pos, i) => {
      dummy.position.set(...pos.position);
      dummy.scale.setScalar(beadRadius);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    
    logger.debug('🔄 珠子矩阵更新', { count: positions.length });
  }, [positions, beadRadius, dummy]);
  
  useEffect(() => {
    if (!spacerMeshRef.current || spacerIndices.length === 0) return;
    
    const spacerPositions = positions.filter((_, i) => 
      spacerIndices.some((idx) => Math.abs(i - idx) < 3)
    );
    
    spacerPositions.forEach((pos, i) => {
      dummy.position.set(...pos.position);
      dummy.scale.setScalar(beadRadius * 0.6);
      dummy.updateMatrix();
      spacerMeshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    spacerMeshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, spacerIndices, beadRadius, dummy]);
  
  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, positions.length]}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[1, 16, 16]} />
        <primitive object={beadMaterial} attach="material" />
      </instancedMesh>
      
      {spacerIndices.length > 0 && (
        <instancedMesh
          ref={spacerMeshRef}
          args={[undefined, undefined, spacerIndices.length]}
          castShadow
        >
          <sphereGeometry args={[1, 12, 12]} />
          <primitive object={spacerMaterial} attach="material" />
        </instancedMesh>
      )}
    </group>
  );
}
