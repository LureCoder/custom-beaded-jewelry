// canvas.tsx: 3D Canvas 包装器 — React Three Fiber 场景容器
'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import type { ReactNode } from 'react';

interface DesignerCanvasProps {
  children: ReactNode;
}

export function DesignerCanvas({ children }: DesignerCanvasProps) {
  return (
    <Canvas
      camera={{
        position: [0, 2, 5],
        fov: 45,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
      }}
      shadows
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
    >
      {children}
      <Preload all />
    </Canvas>
  );
}
