// mala-scene.tsx: 念珠场景 — 完整 3D 场景组装
'use client';

import { Suspense } from 'react';
import { Html } from '@react-three/drei';
import { Mala } from './mala';
import { DesignerControls } from '../scene/controls';
import { DesignerLighting } from '../scene/lighting';
import { DesignerEnvironment } from '../scene/environment';
import { Center } from '@react-three/drei';
import { useTranslations } from 'next-intl';

function LoadingFallback() {
  const t = useTranslations('common');

  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 text-sm text-[var(--color-text-muted)]">
        <div className="w-5 h-5 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-accent)] animate-spin" />
        <span>{t('loading')}</span>
      </div>
    </Html>
  );
}

export function MalaScene() {
  return (
    <>
      <DesignerLighting />
      <DesignerEnvironment />
      <DesignerControls />

      <Suspense fallback={<LoadingFallback />}>
        <Center>
          <Mala />
        </Center>
      </Suspense>
    </>
  );
}
