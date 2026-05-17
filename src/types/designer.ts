// designer.ts: Designer 页面类型定义 — UI 状态和操作

import type { AccessoryConfig, TasselConfig, PendantConfig, CounterConfig, BeadPositionType } from './config';

export type ActivePanel = 'materials' | 'config' | 'size';

export interface DesignerUIState {
  activePanel: ActivePanel;
  isSaving: boolean;
  isARMode: boolean;
  selectedBeadIndex: number | null;
}

export interface DesignerSceneState {
  cameraPosition: [number, number, number];
  autoRotate: boolean;
}

export interface DesignerActions {
  setMaterial: (materialId: string) => void;
  setBeadCount: (count: number) => void;
  setBeadDiameter: (diameter: 6 | 8 | 10 | 12) => void;
  setWristSize: (size: number) => void;
  addTassel: (config: TasselConfig) => void;
  addPendant: (config: PendantConfig) => void;
  addCounter: (config: CounterConfig) => void;
  removeAccessory: (type: 'tassel' | 'pendant' | 'counter') => void;
  updatePrice: () => void;
  resetConfig: () => void;
  saveDesign: () => Promise<string>;
  loadDesign: (id: string) => Promise<void>;
  setActivePanel: (panel: ActivePanel) => void;
  toggleARMode: () => void;
  setSelectedBead: (index: number | null) => void;
  setMaterialForType: (type: BeadPositionType, materialId: string) => void;
  setMaterialForSingleBead: (index: number, materialId: string) => void;
  selectBead: (index: number | null) => void;
}
