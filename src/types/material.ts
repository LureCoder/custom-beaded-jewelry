// material.ts: 材质类型定义 — 用于 Designer 3D 定制设计器

export type MaterialCategory = 'wood' | 'gemstone' | 'semi-precious' | 'crystal';

export interface ActualProductPhoto {
  imagePath: string;
  description: {
    zh: string;
    en: string;
  };
}

export interface Material {
  id: string;
  name: {
    zh: string;
    en: string;
  };
  category: MaterialCategory;
  
  images: {
    hero: string;
    thumb: string;
    texture: string;
  };
  
  sizes: number[];
  
  actualPhotos: ActualProductPhoto[];
  
  properties: {
    hardness: number;
    density: number;
    origin: string;
    energy?: string;
  };
  
  pricing: {
    basePrice: number;
    pricePerMm: number;
  };
  
  care: string[];
}

export interface MaterialGroup {
  category: MaterialCategory;
  label: {
    zh: string;
    en: string;
  };
  materials: Material[];
}
