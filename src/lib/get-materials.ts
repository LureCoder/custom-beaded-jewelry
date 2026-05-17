// get-materials.ts: 动态加载材质配置 — 从文件系统读取 JSON
import { promises as fs } from 'fs';
import path from 'path';
import type { BeadPositionType } from '@/types/config';

const MATERIALS_DIR = path.join(process.cwd(), 'public', 'images', 'materials');

export interface MaterialPhoto {
  path: string;
  description: {
    zh: string;
    en: string;
  };
}

export interface MaterialProperties {
  origin: string;
  energy: string;
}

export interface MaterialPricing {
  basePrice: number;
  pricePerMm: number;
  currency: string;
}

export interface MaterialConfig {
  name: {
    zh: string;
    en: string;
  };
  sizes: number[];
  sizeUnit: string;
  thumbnail: string;
  texture: string;
  applicableTo: BeadPositionType[];
  photos: MaterialPhoto[];
  properties: MaterialProperties;
  pricing: MaterialPricing;
  care: string[];
}

export interface MaterialCategoryConfig {
  category: string;
  label: {
    zh: string;
    en: string;
  };
  materials: Record<string, MaterialConfig>;
}

export async function getMaterials(): Promise<MaterialCategoryConfig[]> {
  try {
    const categories = await fs.readdir(MATERIALS_DIR);
    const materialGroups: MaterialCategoryConfig[] = [];

    for (const category of categories) {
      const categoryPath = path.join(MATERIALS_DIR, category);
      const stat = await fs.stat(categoryPath);
      
      if (!stat.isDirectory()) continue;

      const jsonPath = path.join(categoryPath, `${category}.json`);
      
      try {
        const jsonContent = await fs.readFile(jsonPath, 'utf-8');
        const categoryConfig: MaterialCategoryConfig = JSON.parse(jsonContent);
        
        const processedMaterials: Record<string, MaterialConfig> = {};
        
        for (const [materialId, material] of Object.entries(categoryConfig.materials)) {
          processedMaterials[materialId] = {
            ...material,
            thumbnail: `/images/materials/${category}/${material.thumbnail}`,
            texture: `/textures/${material.texture}`,
            photos: material.photos.map(photo => ({
              ...photo,
              path: `/images/materials/${category}/${photo.path}`,
            })),
          };
        }
        
        materialGroups.push({
          ...categoryConfig,
          materials: processedMaterials,
        });
      } catch {
        console.warn(`No valid JSON config found for category: ${category}`);
      }
    }

    return materialGroups;
  } catch (error) {
    console.error('Error loading materials:', error);
    return [];
  }
}
