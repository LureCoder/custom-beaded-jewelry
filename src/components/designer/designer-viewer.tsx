// designer-viewer.tsx: Designer 主视图 — 3D 场景 + 配置面板
'use client';

import { DesignerCanvas } from './scene/canvas';
import { MalaScene } from './beads/mala-scene';
import { MaterialPanelClient } from './panels/material-panel-client';
import { ConfigPanel } from './panels/config-panel';
import { useDesignerStore } from '@/lib/designer/store';
import type { MaterialCategoryConfig } from '@/lib/get-materials';

interface DesignerViewerProps {
  materials: MaterialCategoryConfig[];
}

export function DesignerViewer({ materials }: DesignerViewerProps) {
  return (
    <div className="fixed inset-0 flex flex-col pt-14">

      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        <div className="hidden lg:block w-80 border-r border-[var(--color-border)] overflow-y-auto scrollbar-hide">
          <MaterialPanelClient materials={materials} />
        </div>

        <div className="flex-1 relative min-h-0">
          <DesignerCanvas>
            <MalaScene />
          </DesignerCanvas>

          <div className="absolute bottom-4 left-4 right-4 lg:hidden">
            <div className="bg-[var(--color-bg-primary)]/90 backdrop-blur-sm rounded-[var(--radius-lg)] border border-[var(--color-border)] p-4">
              <MobileMaterialSelector materials={materials} />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-[var(--color-border)] overflow-y-auto scrollbar-hide">
          <ConfigPanel />
        </div>
      </div>
    </div>
  );
}

function MobileMaterialSelector({ materials }: { materials: MaterialCategoryConfig[] }) {
  const materialId = useDesignerStore((state) => state.config.materialId);
  const setMaterial = useDesignerStore((state) => state.setMaterial);

  const allMaterials = materials.flatMap((g) => 
    Object.entries(g.materials).map(([id, mat]) => ({ id, ...mat }))
  );

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
      {allMaterials.slice(0, 5).map((material) => (
        <button
          key={material.id}
          onClick={() => setMaterial(material.id)}
          className={`
            flex-shrink-0 px-3 py-2 rounded-[var(--radius-md)] text-xs
            border transition-all duration-300
            ${materialId === material.id
              ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
              : 'border-[var(--color-border)]'
            }
          `}
        >
          {material.name.zh}
        </button>
      ))}
    </div>
  );
}
