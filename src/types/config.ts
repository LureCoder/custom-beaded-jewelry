// config.ts: 配置类型定义 — Designer 配置状态

export interface BeadConfig {
  count: number;
  diameter: 6 | 8 | 10 | 12;
}

export interface TasselConfig {
  color: string;
  length: number;
  material: 'silk' | 'hemp';
}

export interface PendantConfig {
  type: string;
  material: string;
}

export interface CounterConfig {
  material: 'copper' | 'silver';
}

export interface AccessoryConfig {
  tassel?: TasselConfig;
  pendant?: PendantConfig;
  counter?: CounterConfig;
}

export interface DesignConfig {
  id: string;
  materialId: string;
  bead: BeadConfig;
  accessory: AccessoryConfig;
  wristSize: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}
