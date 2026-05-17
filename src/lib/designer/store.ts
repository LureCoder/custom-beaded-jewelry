// store.ts: Designer 状态管理 — Zustand store with immer
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { nanoid } from 'nanoid';
import type { DesignConfig, AccessoryConfig, BeadPositionType } from '@/types/config';
import { calculatePrice } from './pricing';
import { logger } from './logger';

const DEFAULT_BEAD_COUNT = 108;
const DEFAULT_BEAD_DIAMETER = 8;

function getDefaultConfig(): DesignConfig {
  return {
    id: nanoid(),
    materialId: 'red-sandalwood',
    bead: {
      count: DEFAULT_BEAD_COUNT,
      diameter: DEFAULT_BEAD_DIAMETER,
    },
    accessory: {},
    wristSize: 16,
    totalPrice: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    materialAssignment: {
      main: 'red-sandalwood',
      crown: 'red-sandalwood',
      waist: 'red-sandalwood',
      guru: 'red-sandalwood',
      disciple: 'red-sandalwood',
    },
    singleBeadOverrides: {},
    selectedBead: null,
  };
}

interface DesignerState {
  config: DesignConfig;
  ui: {
    activePanel: 'materials' | 'config' | 'size';
    isSaving: boolean;
    isARMode: boolean;
    selectedBeadIndex: number | null;
  };
  scene: {
    cameraPosition: [number, number, number];
    autoRotate: boolean;
  };

  setMaterial: (materialId: string) => void;
  setBeadCount: (count: number) => void;
  setBeadDiameter: (diameter: 6 | 8 | 10 | 12) => void;
  setWristSize: (size: number) => void;
  addTassel: (config: { color: string; length: number; material: 'silk' | 'hemp' }) => void;
  addPendant: (config: { type: string; material: string }) => void;
  addCounter: (config: { material: 'copper' | 'silver' }) => void;
  removeAccessory: (type: keyof AccessoryConfig) => void;
  updatePrice: () => void;
  resetConfig: () => void;
  setActivePanel: (panel: 'materials' | 'config' | 'size') => void;
  toggleARMode: () => void;
  setSelectedBead: (index: number | null) => void;
  setMaterialForType: (type: BeadPositionType, materialId: string) => void;
  setMaterialForSingleBead: (index: number, materialId: string) => void;
  selectBead: (index: number | null) => void;
}

export const useDesignerStore = create<DesignerState>()(
  immer((set) => ({
    config: getDefaultConfig(),

    ui: {
      activePanel: 'materials',
      isSaving: false,
      isARMode: false,
      selectedBeadIndex: null,
    },

    scene: {
      cameraPosition: [0, 0, 5],
      autoRotate: false,
    },

    setMaterial: (materialId) =>
      set((state) => {
        logger.materialChange(state.config.materialId, materialId);
        state.config.materialId = materialId;
        state.config.updatedAt = new Date().toISOString();
        state.config.totalPrice = calculatePrice(state.config);
      }),

    setBeadCount: (count) =>
      set((state) => {
        logger.beadCountChange(state.config.bead.count, count);
        state.config.bead.count = count;
        state.config.updatedAt = new Date().toISOString();
        state.config.totalPrice = calculatePrice(state.config);
      }),

    setBeadDiameter: (diameter) =>
      set((state) => {
        logger.beadDiameterChange(state.config.bead.diameter, diameter);
        state.config.bead.diameter = diameter;
        state.config.updatedAt = new Date().toISOString();
        state.config.totalPrice = calculatePrice(state.config);
      }),

    setWristSize: (size) =>
      set((state) => {
        state.config.wristSize = size;
        state.config.updatedAt = new Date().toISOString();
      }),

    addTassel: (config) =>
      set((state) => {
        logger.accessoryAdded('tassel', config);
        state.config.accessory.tassel = config;
        state.config.updatedAt = new Date().toISOString();
        state.config.totalPrice = calculatePrice(state.config);
      }),

    addPendant: (config) =>
      set((state) => {
        logger.accessoryAdded('pendant', config);
        state.config.accessory.pendant = config;
        state.config.updatedAt = new Date().toISOString();
        state.config.totalPrice = calculatePrice(state.config);
      }),

    addCounter: (config) =>
      set((state) => {
        logger.accessoryAdded('counter', config);
        state.config.accessory.counter = config;
        state.config.updatedAt = new Date().toISOString();
        state.config.totalPrice = calculatePrice(state.config);
      }),

    removeAccessory: (type) =>
      set((state) => {
        logger.accessoryRemoved(type);
        state.config.accessory = {
          ...state.config.accessory,
          [type]: undefined,
        } as AccessoryConfig;
        state.config.updatedAt = new Date().toISOString();
        state.config.totalPrice = calculatePrice(state.config);
      }),

    updatePrice: () =>
      set((state) => {
        state.config.totalPrice = calculatePrice(state.config);
      }),

    resetConfig: () =>
      set((state) => {
        logger.stateReset();
        state.config = getDefaultConfig();
        state.config.totalPrice = calculatePrice(state.config);
      }),

    setActivePanel: (panel) =>
      set((state) => {
        state.ui.activePanel = panel;
      }),

    toggleARMode: () =>
      set((state) => {
        state.ui.isARMode = !state.ui.isARMode;
      }),

    setSelectedBead: (index) =>
      set((state) => {
        state.ui.selectedBeadIndex = index;
      }),

    setMaterialForType: (type, materialId) =>
      set((state) => {
        logger.materialChange(state.config.materialId, materialId);
        if (type === 'main') {
          state.config.singleBeadOverrides = {};
        }
        state.config.materialAssignment[type] = materialId;
        state.config.updatedAt = new Date().toISOString();
        state.config.totalPrice = calculatePrice(state.config);
      }),

    setMaterialForSingleBead: (index, materialId) =>
      set((state) => {
        state.config.singleBeadOverrides[index] = materialId;
        state.config.updatedAt = new Date().toISOString();
        state.config.totalPrice = calculatePrice(state.config);
      }),

    selectBead: (index) =>
      set((state) => {
        state.config.selectedBead = index;
      }),
  }))
);
