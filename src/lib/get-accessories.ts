// get-accessories.ts: 动态加载配件配置 — 从文件系统读取 JSON
import { promises as fs } from 'fs';
import path from 'path';
import type { MaterialCategoryConfig } from './get-materials';

const ACCESSORY_DIR = path.join(process.cwd(), 'public', 'images', 'accessory');

export async function getAccessories(): Promise<MaterialCategoryConfig[]> {
  try {
    const categories = await fs.readdir(ACCESSORY_DIR);
    const accessoryGroups: MaterialCategoryConfig[] = [];

    for (const category of categories) {
      const categoryPath = path.join(ACCESSORY_DIR, category);
      const stat = await fs.stat(categoryPath);

      if (!stat.isDirectory()) continue;

      const jsonPath = path.join(categoryPath, `${category}.json`);

      try {
        const jsonContent = await fs.readFile(jsonPath, 'utf-8');
        const categoryConfig: MaterialCategoryConfig = JSON.parse(jsonContent);

        const processedAccessories: Record<string, typeof categoryConfig.materials[string]> = {};

        for (const [accessoryId, accessory] of Object.entries(categoryConfig.materials)) {
          processedAccessories[accessoryId] = {
            ...accessory,
            thumbnail: `/images/accessory/${category}/${accessory.thumbnail}`,
            photos: accessory.photos.map((photo) => ({
              ...photo,
              path: `/images/accessory/${category}/${photo.path}`,
            })),
          };
        }

        accessoryGroups.push({
          ...categoryConfig,
          materials: processedAccessories,
        });
      } catch {
        console.warn(`No valid JSON config found for accessory category: ${category}`);
      }
    }

    return accessoryGroups;
  } catch (error) {
    console.error('Error loading accessories:', error);
    return [];
  }
}
