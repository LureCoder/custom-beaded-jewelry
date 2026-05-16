// controls.tsx: 相机控制 — OrbitControls 配置
'use client';

import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import { useDesignerStore } from '@/lib/designer/store';

export function DesignerControls() {
  const controlsRef = useRef<OrbitControlsType>(null);
  const { camera } = useThree();
  const autoRotate = useDesignerStore((state) => state.scene.autoRotate);

  useEffect(() => {
    return () => {
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={2}
      maxDistance={10}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2}
      autoRotate={autoRotate}
      autoRotateSpeed={0.5}
      dampingFactor={0.05}
      enableDamping
    />
  );
}
