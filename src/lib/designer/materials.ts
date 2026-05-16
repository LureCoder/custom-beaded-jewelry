// materials.ts: 材质数据 — 念珠材质库
import type { Material, MaterialGroup } from '@/types/material';

export const MATERIAL_GROUPS: MaterialGroup[] = [
  {
    category: 'wood',
    label: { zh: '木质类', en: 'Wood' },
    materials: [
      {
        id: 'red-sandalwood',
        name: { zh: '紫檀', en: 'Red Sandalwood' },
        category: 'wood',
        images: {
          hero: '/images/materials/red-sandalwood/hero.jpeg',
          thumb: '/images/materials/red-sandalwood/details.jpeg',
          texture: '/textures/red-sandalwood.jpg',
        },
        sizes: [8, 10, 12, 14],
        actualPhotos: [],
        properties: {
          hardness: 4.0,
          density: 1.05,
          origin: '东南亚',
          energy: '招财',
        },
        pricing: {
          basePrice: 8,
          pricePerMm: 0.5,
        },
        care: [
          '避免长时间浸泡',
          '定期用软布擦拭',
          '远离高温和明火',
        ],
      },
      {
        id: 'sandalwood',
        name: { zh: '檀香', en: 'Sandalwood' },
        category: 'wood',
        images: {
          hero: '/images/materials/sandalwood/hero.jpeg',
          thumb: '/images/materials/sandalwood/details.jpeg',
          texture: '/textures/sandalwood.jpg',
        },
        sizes: [8, 10, 12, 14],
        actualPhotos: [],
        properties: {
          hardness: 3.5,
          density: 0.9,
          origin: '印度',
          energy: '安神',
        },
        pricing: {
          basePrice: 6,
          pricePerMm: 0.4,
        },
        care: [
          '避免暴晒',
          '保持干燥',
          '定期盘玩',
        ],
      },
      {
        id: 'bodhi-seed',
        name: { zh: '星月菩提', en: 'Bodhi Seed' },
        category: 'wood',
        images: {
          hero: '/images/materials/bodhi-seed/hero.jpeg',
          thumb: '/images/materials/bodhi-seed/details.jpeg',
          texture: '/textures/bodhi.jpg',
        },
        sizes: [8, 10, 12, 14],
        actualPhotos: [],
        properties: {
          hardness: 3.0,
          density: 0.8,
          origin: '尼泊尔',
          energy: '智慧',
        },
        pricing: {
          basePrice: 5,
          pricePerMm: 0.3,
        },
        care: [
          '避免沾水',
          '定期上油',
          '防止开裂',
        ],
      },
    ],
  },
  {
    category: 'gemstone',
    label: { zh: '宝石类', en: 'Gemstone' },
    materials: [
      {
        id: 'clear-quartz',
        name: { zh: '白水晶', en: 'Clear Quartz' },
        category: 'gemstone',
        images: {
          hero: '/images/materials/clear-quartz/hero.jpeg',
          thumb: '/images/materials/clear-quartz/details.jpeg',
          texture: '/textures/quartz.jpg',
        },
        sizes: [8, 10, 12, 14],
        actualPhotos: [],
        properties: {
          hardness: 7.0,
          density: 2.65,
          origin: '巴西',
          energy: '净化',
        },
        pricing: {
          basePrice: 12,
          pricePerMm: 0.8,
        },
        care: [
          '避免碰撞',
          '定期消磁',
          '远离化学品',
        ],
      },
      {
        id: 'amethyst',
        name: { zh: '紫水晶', en: 'Amethyst' },
        category: 'gemstone',
        images: {
          hero: '/images/materials/amethyst/hero.jpeg',
          thumb: '/images/materials/amethyst/details.jpeg',
          texture: '/textures/amethyst.jpg',
        },
        sizes: [8, 10, 12, 14],
        actualPhotos: [],
        properties: {
          hardness: 7.0,
          density: 2.65,
          origin: '乌拉圭',
          energy: '灵性',
        },
        pricing: {
          basePrice: 15,
          pricePerMm: 1.0,
        },
        care: [
          '避免暴晒褪色',
          '定期消磁',
          '轻拿轻放',
        ],
      },
    ],
  },
  {
    category: 'semi-precious',
    label: { zh: '半宝石类', en: 'Semi-Precious' },
    materials: [
      {
        id: 'turquoise',
        name: { zh: '绿松石', en: 'Turquoise' },
        category: 'semi-precious',
        images: {
          hero: '/images/materials/turquoise/hero.jpeg',
          thumb: '/images/materials/turquoise/details.jpeg',
          texture: '/textures/turquoise.jpg',
        },
        sizes: [8, 10, 12, 14],
        actualPhotos: [],
        properties: {
          hardness: 6.0,
          density: 2.7,
          origin: '湖北',
          energy: '护身',
        },
        pricing: {
          basePrice: 10,
          pricePerMm: 0.6,
        },
        care: [
          '避免接触油污',
          '防止变色',
          '定期清水冲洗',
        ],
      },
      {
        id: 'lapis-lazuli',
        name: { zh: '青金石', en: 'Lapis Lazuli' },
        category: 'semi-precious',
        images: {
          hero: '/images/materials/lapis-lazuli/hero.jpeg',
          thumb: '/images/materials/lapis-lazuli/details.jpeg',
          texture: '/textures/lapis.jpg',
        },
        sizes: [8, 10, 12, 14],
        actualPhotos: [],
        properties: {
          hardness: 5.5,
          density: 2.75,
          origin: '阿富汗',
          energy: '安眠',
        },
        pricing: {
          basePrice: 9,
          pricePerMm: 0.5,
        },
        care: [
          '避免高温',
          '远离酸碱',
          '软布擦拭',
        ],
      },
    ],
  },
  {
    category: 'crystal',
    label: { zh: '水晶类', en: 'Crystal' },
    materials: [
      {
        id: 'white-crystal',
        name: { zh: '白水晶', en: 'White Crystal' },
        category: 'crystal',
        images: {
          hero: '/images/materials/crystal/white-crystal.png',
          thumb: '/images/materials/crystal/white-crystal.png',
          texture: '/textures/crystal.jpg',
        },
        sizes: [8, 10, 12, 14],
        actualPhotos: [
          {
            imagePath: '/images/materials/crystal/white-crystal-1.jpg',
            description: { zh: '白水晶念珠实物图', en: 'White Crystal Mala' },
          },
          {
            imagePath: '/images/materials/crystal/white-crystal-2.jpg',
            description: { zh: '白水晶念珠细节', en: 'White Crystal Detail' },
          },
        ],
        properties: {
          hardness: 7.0,
          density: 2.65,
          origin: '巴西',
          energy: '净化',
        },
        pricing: {
          basePrice: 12,
          pricePerMm: 0.8,
        },
        care: [
          '避免碰撞',
          '定期消磁',
          '远离化学品',
        ],
      },
    ],
  },
];

export function getMaterialById(id: string): Material | undefined {
  return MATERIAL_GROUPS.flatMap((group) => group.materials).find((material) => material.id === id);
}

export function getAllMaterials(): Material[] {
  return MATERIAL_GROUPS.flatMap((group) => group.materials);
}
