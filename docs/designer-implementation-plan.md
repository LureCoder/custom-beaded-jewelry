# Designer 页面实现方案

> 项目：空性念珠 (Kongxing Mala) 3D 定制设计器
> 创建日期：2026-05-16
> 预计周期：15 周（MVP 8 周 + 增强 4 周 + 高级 3 周）

---

## 一、项目阶段规划

### 阶段概览

```
Phase 1: 基础设施 (第 1-2 周)
    ↓
Phase 2: 3D 渲染核心 (第 3-6 周)
    ↓
Phase 3: 配置界面 (第 7-8 周)
    ↓
Phase 4: 集成测试 (第 9-10 周)
    ↓
Phase 5: 增强功能 (第 11-12 周)
    ↓
Phase 6: 高级功能 (第 13-15 周)
    ↓
上线发布
```

---

## 二、Phase 1: 基础设施（第 1-2 周）

### 2.1 任务清单

#### Week 1: 技术选型与项目搭建

**Day 1-2: 依赖安装与配置**

```bash
# 安装 3D 相关依赖
npm install three @react-three/fiber @react-three/drei

# 安装状态管理
npm install zustand

# 安装 UI 组件库
npm install @radix-ui/react-accordion @radix-ui/react-tabs
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu

# 安装工具库
npm install immer nanoid
```

**交付物：**
- [ ] `package.json` 更新完成
- [ ] TypeScript 配置更新（Three.js 类型支持）
- [ ] ESLint 配置更新（React Three Fiber 规则）

**验收标准：**
- `npm run build` 通过
- 无 TypeScript 类型错误

---

**Day 3-4: 目录结构搭建**

```
src/
├── app/[locale]/customize/
│   ├── page.tsx                    # Designer 页面入口
│   └── layout.tsx                  # Designer 布局
│
├── components/designer/
│   ├── DesignerCanvas.tsx          # 3D 画布容器
│   ├── MaterialPanel.tsx           # 左侧材质面板
│   ├── ConfigPanel.tsx             # 右侧配置面板
│   ├── ActionBar.tsx               # 底部操作栏
│   └── ui/
│       ├── MaterialCard.tsx        # 材质卡片
│       ├── BeadCountSelector.tsx   # 珠数选择器
│       ├── SizeSelector.tsx        # 尺寸选择器
│       └── PriceDisplay.tsx        # 价格显示
│
├── components/3d/
│   ├── MalaModel.tsx               # 念珠 3D 模型
│   ├── Bead.tsx                    # 单颗珠子
│   ├── Spacer.tsx                  # 隔珠
│   ├── Tassel.tsx                  # 流苏
│   └── Pendant.tsx                 # 坠饰
│
├── lib/designer/
│   ├── store.ts                    # Zustand 状态管理
│   ├── materials.ts                # 材质数据
│   ├── pricing.ts                  # 价格计算
│   └── utils.ts                    # 工具函数
│
├── hooks/
│   ├── useDesigner.ts              # Designer 状态 hook
│   ├── useMaterial.ts              # 材质操作 hook
│   └── usePricing.ts               # 价格计算 hook
│
└── types/
    ├── designer.ts                 # Designer 类型定义
    ├── material.ts                 # 材质类型定义
    └── config.ts                   # 配置类型定义
```

**交付物：**
- [ ] 目录结构创建完成
- [ ] 所有文件占位符创建
- [ ] 文件级注释添加（符合规则 #9）

---

**Day 5: 类型定义**

```typescript
// types/material.ts

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

export type MaterialCategory = 'wood' | 'gemstone' | 'semi-precious';

export interface MaterialGroup {
  category: MaterialCategory;
  label: {
    zh: string;
    en: string;
  };
  materials: Material[];
}
```

```typescript
// types/config.ts

export interface BeadConfig {
  count: 108 | 54 | 27 | number;
  diameter: 6 | 8 | 10 | 12;
}

export interface AccessoryConfig {
  tassel?: {
    color: string;
    length: number;
    material: 'silk' | 'hemp';
  };
  pendant?: {
    type: string;
    material: string;
  };
  counter?: {
    material: 'copper' | 'silver';
  };
}

export interface DesignConfig {
  id: string;
  material: Material;
  bead: BeadConfig;
  accessory: AccessoryConfig;
  wristSize: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}
```

**交付物：**
- [ ] `types/material.ts` 完成
- [ ] `types/config.ts` 完成
- [ ] `types/designer.ts` 完成

---

#### Week 2: 状态管理与数据准备

**Day 1-2: Zustand Store 搭建**

```typescript
// lib/designer/store.ts

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { DesignConfig, Material } from '@/types';

interface DesignerState {
  config: DesignConfig;
  ui: {
    activePanel: 'materials' | 'config' | 'size';
    isSaving: boolean;
    isARMode: boolean;
  };
  
  actions: {
    setMaterial: (material: Material) => void;
    setBeadCount: (count: number) => void;
    setBeadDiameter: (diameter: number) => void;
    setWristSize: (size: number) => void;
    addAccessory: (type: string, config: any) => void;
    removeAccessory: (type: string) => void;
    updatePrice: () => void;
    resetConfig: () => void;
    saveDesign: () => Promise<string>;
    loadDesign: (id: string) => Promise<void>;
  };
}

export const useDesignerStore = create<DesignerState>()(
  immer((set, get) => ({
    config: getDefaultConfig(),
    ui: {
      activePanel: 'materials',
      isSaving: false,
      isARMode: false,
    },
    
    actions: {
      setMaterial: (material) => set((state) => {
        state.config.material = material;
        state.actions.updatePrice();
      }),
      
      setBeadCount: (count) => set((state) => {
        state.config.bead.count = count;
        state.actions.updatePrice();
      }),
      
      // ... 其他 actions
    },
  }))
);
```

**交付物：**
- [ ] Zustand store 创建完成
- [ ] 所有 actions 实现完成
- [ ] 单元测试覆盖核心 actions

---

**Day 3-4: 材质数据准备**

```typescript
// lib/designer/materials.ts

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
          hero: '/images/materials/sandalwood/hero.jpeg',
          thumb: '/images/materials/sandalwood/details.jpeg',
          texture: '/textures/sandalwood.jpg',
        },
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
      // ... 更多材质
    ],
  },
  // ... 宝石类、半宝石类
];

export function getMaterialById(id: string): Material | undefined {
  return MATERIAL_GROUPS
    .flatMap((group) => group.materials)
    .find((material) => material.id === id);
}
```

**交付物：**
- [ ] 10 种基础材质数据录入
- [ ] 材质图片准备（hero + thumb）
- [ ] 材质贴图准备（用于 3D 渲染）

---

**Day 5: 价格计算逻辑**

```typescript
// lib/designer/pricing.ts

import type { DesignConfig } from '@/types/config';

export function calculatePrice(config: DesignConfig): number {
  const { material, bead, accessory } = config;
  
  // 基础价格 = 单颗价格 × 珠数
  const basePrice = material.pricing.basePrice * bead.count;
  
  // 直径加价
  const diameterPrice = material.pricing.pricePerMm * bead.diameter * bead.count;
  
  // 配饰价格
  let accessoryPrice = 0;
  if (accessory.tassel) {
    accessoryPrice += 28; // 流苏基础价格
  }
  if (accessory.pendant) {
    accessoryPrice += 48; // 坠饰基础价格
  }
  if (accessory.counter) {
    accessoryPrice += 38; // 计数器基础价格
  }
  
  // 工艺费
  const craftsmanshipFee = bead.count > 54 ? 68 : 48;
  
  // 总价（以 8 结尾）
  const total = basePrice + diameterPrice + accessoryPrice + craftsmanshipFee;
  return roundToEight(total);
}

function roundToEight(price: number): number {
  return Math.ceil(price / 10) * 10 - 2;
}
```

**交付物：**
- [ ] 价格计算函数实现
- [ ] 单元测试覆盖各种场景
- [ ] 价格验证（确保以 8 结尾）

---

### 2.2 Phase 1 验收标准

- [ ] 项目结构完整，所有文件创建
- [ ] TypeScript 编译通过，无类型错误
- [ ] Zustand store 可正常使用
- [ ] 材质数据可正常读取
- [ ] 价格计算准确
- [ ] 单元测试覆盖率 > 80%

---

## 三、Phase 2: 3D 渲染核心（第 3-6 周）

### 3.1 任务清单

#### Week 3: Three.js 基础集成

**Day 1-2: React Three Fiber 搭建**

```typescript
// components/designer/DesignerCanvas.tsx

'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import { MalaModel } from '@/components/3d/MalaModel';
import { useDesignerStore } from '@/lib/designer/store';

export function DesignerCanvas() {
  const config = useDesignerStore((state) => state.config);
  
  return (
    <div className="w-full h-full bg-[var(--color-bg-secondary)]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          <MalaModel config={config} />
          
          <Environment preset="studio" />
          <ContactShadows position={[0, -1, 0]} opacity={0.4} />
          
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

**交付物：**
- [ ] Canvas 容器创建
- [ ] 基础光照配置
- [ ] 相机控制配置
- [ ] 环境贴图加载

---

**Day 3-5: 单颗珠子模型**

```typescript
// components/3d/Bead.tsx

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Material } from '@/types/material';

interface BeadProps {
  material: Material;
  diameter: number;
  position: [number, number, number];
  index: number;
}

export function Bead({ material, diameter, position, index }: BeadProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // 加载材质贴图
  const texture = useTexture(material.images.texture);
  
  // 创建几何体（实例化）
  const geometry = useMemo(() => {
    const radius = diameter / 20; // mm to scene units
    return new THREE.SphereGeometry(radius, 32, 32);
  }, [diameter]);
  
  // 创建材质
  const meshMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: texture,
      metalness: material.category === 'gemstone' ? 0.1 : 0,
      roughness: material.category === 'gemstone' ? 0.2 : 0.8,
    });
  }, [texture, material]);
  
  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={meshMaterial}
      position={position}
      castShadow
      receiveShadow
    />
  );
}
```

**交付物：**
- [ ] 单颗珠子组件创建
- [ ] 材质贴图加载
- [ ] 几何体优化（多边形数量控制）
- [ ] 阴影支持

---

#### Week 4: 念珠串模型

**Day 1-3: 念珠排列算法**

```typescript
// lib/designer/utils.ts

import type { BeadConfig } from '@/types/config';

interface BeadPosition {
  position: [number, number, number];
  isSpacer: boolean;
  index: number;
}

export function calculateBeadPositions(config: BeadConfig): BeadPosition[] {
  const { count, diameter } = config;
  const positions: BeadPosition[] = [];
  
  // 计算念珠半径（场景单位）
  const radius = diameter / 20;
  
  // 计算圆周排列
  const totalAngle = Math.PI * 2;
  const angleStep = totalAngle / count;
  
  // 计算圆环半径（确保珠子不相交）
  const circleRadius = (radius * 2.2) / (2 * Math.sin(angleStep / 2));
  
  for (let i = 0; i < count; i++) {
    const angle = i * angleStep;
    const x = Math.cos(angle) * circleRadius;
    const z = Math.sin(angle) * circleRadius;
    const y = 0;
    
    // 判断是否为隔珠（每 27 颗）
    const isSpacer = i > 0 && i % 27 === 0;
    
    positions.push({
      position: [x, y, z],
      isSpacer,
      index: i,
    });
  }
  
  return positions;
}
```

**交付物：**
- [ ] 珠子排列算法实现
- [ ] 隔珠位置计算
- [ ] 单元测试覆盖各种珠数

---

**Day 4-5: 念珠串组件**

```typescript
// components/3d/MalaModel.tsx

import { useMemo } from 'react';
import { Bead } from './Bead';
import { Spacer } from './Spacer';
import { calculateBeadPositions } from '@/lib/designer/utils';
import type { DesignConfig } from '@/types/config';

interface MalaModelProps {
  config: DesignConfig;
}

export function MalaModel({ config }: MalaModelProps) {
  const positions = useMemo(
    () => calculateBeadPositions(config.bead),
    [config.bead]
  );
  
  return (
    <group>
      {positions.map((pos, i) => {
        if (pos.isSpacer) {
          return (
            <Spacer
              key={`spacer-${i}`}
              position={pos.position}
              diameter={config.bead.diameter * 1.2}
            />
          );
        }
        
        return (
          <Bead
            key={`bead-${i}`}
            material={config.material}
            diameter={config.bead.diameter}
            position={pos.position}
            index={i}
          />
        );
      })}
    </group>
  );
}
```

**交付物：**
- [ ] 念珠串组件创建
- [ ] 珠子 + 隔珠渲染
- [ ] 性能优化（React.memo）

---

#### Week 5: 性能优化

**Day 1-3: InstancedMesh 优化**

```typescript
// components/3d/InstancedBeads.tsx

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { BeadPosition } from '@/lib/designer/utils';

interface InstancedBeadsProps {
  positions: BeadPosition[];
  diameter: number;
  material: Material;
}

export function InstancedBeads({ positions, diameter, material }: InstancedBeadsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // 创建几何体（共享）
  const geometry = useMemo(() => {
    const radius = diameter / 20;
    return new THREE.SphereGeometry(radius, 16, 16); // 降低精度
  }, [diameter]);
  
  // 创建材质（共享）
  const meshMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(material.color),
      metalness: 0,
      roughness: 0.8,
    });
  }, [material]);
  
  // 设置实例矩阵
  useEffect(() => {
    if (!meshRef.current) return;
    
    const matrix = new THREE.Matrix4();
    positions.forEach((pos, i) => {
      matrix.setPosition(pos.position[0], pos.position[1], pos.position[2]);
      meshRef.current!.setMatrixAt(i, matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions]);
  
  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, meshMaterial, positions.length]}
      castShadow
      receiveShadow
    />
  );
}
```

**交付物：**
- [ ] InstancedMesh 实现完成
- [ ] 性能对比测试（FPS 提升 > 50%）
- [ ] 内存占用降低

---

**Day 4-5: LOD（细节层次）**

```typescript
// components/3d/LODBead.tsx

import { useRef } from 'react';
import * as THREE from 'three';

export function LODBead({ position, diameter }) {
  const lodRef = useRef<THREE.LOD>(null);
  
  // 高精度模型（近距离）
  const highDetail = new THREE.SphereGeometry(diameter / 20, 32, 32);
  
  // 中精度模型（中距离）
  const midDetail = new THREE.SphereGeometry(diameter / 20, 16, 16);
  
  // 低精度模型（远距离）
  const lowDetail = new THREE.SphereGeometry(diameter / 20, 8, 8);
  
  return (
    <lOD ref={lodRef} position={position}>
      <mesh geometry={highDetail} />
      <mesh geometry={midDetail} />
      <mesh geometry={lowDetail} />
    </lOD>
  );
}
```

**交付物：**
- [ ] LOD 实现完成
- [ ] 距离阈值配置
- [ ] 性能测试通过

---

#### Week 6: 材质切换与动画

**Day 1-3: 材质切换动画**

```typescript
// hooks/useMaterialTransition.ts

import { useState, useEffect } from 'react';
import { useSpring } from '@react-spring/three';
import type { Material } from '@/types/material';

export function useMaterialTransition(fromMaterial: Material, toMaterial: Material) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const { color, metalness, roughness } = useSpring({
    color: toMaterial.color,
    metalness: toMaterial.category === 'gemstone' ? 0.1 : 0,
    roughness: toMaterial.category === 'gemstone' ? 0.2 : 0.8,
    config: { duration: 600 }, // 空性设计慢动画
    onStart: () => setIsTransitioning(true),
    onRest: () => setIsTransitioning(false),
  });
  
  return {
    color,
    metalness,
    roughness,
    isTransitioning,
  };
}
```

**交付物：**
- [ ] 材质切换动画实现
- [ ] 过渡时间 600ms（符合空性设计）
- [ ] 无闪烁

---

**Day 4-5: 相机动画**

```typescript
// components/3d/CameraController.tsx

import { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CameraController() {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 5));
  
  const focusOnBead = (beadPosition: [number, number, number]) => {
    targetPosition.current = new THREE.Vector3(
      beadPosition[0] * 1.5,
      beadPosition[1] * 1.5,
      beadPosition[2] * 1.5 + 2
    );
  };
  
  useFrame(() => {
    camera.position.lerp(targetPosition.current, 0.05);
  });
  
  return null;
}
```

**交付物：**
- [ ] 相机动画实现
- [ ] 聚焦单颗珠子功能
- [ ] 平滑过渡

---

### 3.2 Phase 2 验收标准

- [ ] 3D 场景可正常渲染
- [ ] 108 颗珠子渲染 FPS > 30（中端设备）
- [ ] 材质切换流畅，无卡顿
- [ ] 相机控制正常（旋转、缩放）
- [ ] 阴影正确显示
- [ ] 移动端可正常交互

---

## 四、Phase 3: 配置界面（第 7-8 周）

### 4.1 任务清单

#### Week 7: 左侧材质面板

**Day 1-2: 材质分类标签**

```typescript
// components/designer/MaterialPanel.tsx

'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { MaterialCard } from './ui/MaterialCard';
import { MATERIAL_GROUPS } from '@/lib/designer/materials';
import { useDesignerStore } from '@/lib/designer/store';

export function MaterialPanel() {
  const setMaterial = useDesignerStore((state) => state.actions.setMaterial);
  const currentMaterial = useDesignerStore((state) => state.config.material);
  
  return (
    <div className="w-80 h-full bg-[var(--color-bg-primary)] border-r border-[var(--color-border)]">
      <div className="p-6">
        <h2 className="font-serif text-xl tracking-[0.1em] text-[var(--color-text-muted)] mb-6">
          · 择材 ·
        </h2>
        
        <Tabs defaultValue="wood">
          <TabsList className="flex gap-2 mb-6">
            {MATERIAL_GROUPS.map((group) => (
              <TabsTrigger
                key={group.category}
                value={group.category}
                className="px-4 py-2 text-sm rounded-[var(--radius-sm)] transition-colors duration-600"
              >
                {group.label.zh}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {MATERIAL_GROUPS.map((group) => (
            <TabsContent key={group.category} value={group.category}>
              <div className="grid grid-cols-2 gap-4">
                {group.materials.map((material) => (
                  <MaterialCard
                    key={material.id}
                    material={material}
                    isSelected={currentMaterial.id === material.id}
                    onClick={() => setMaterial(material)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
```

**交付物：**
- [ ] 材质面板组件创建
- [ ] 分类标签切换
- [ ] 材质卡片网格布局

---

**Day 3-5: 材质卡片**

```typescript
// components/designer/ui/MaterialCard.tsx

import Image from 'next/image';
import type { Material } from '@/types/material';

interface MaterialCardProps {
  material: Material;
  isSelected: boolean;
  onClick: () => void;
}

export function MaterialCard({ material, isSelected, onClick }: MaterialCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative aspect-square rounded-[var(--radius-md)] overflow-hidden
        border transition-all duration-600 cursor-pointer
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
        ${isSelected
          ? 'border-[var(--color-accent)] shadow-[0_0_0_2px_var(--color-accent)]'
          : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
        }
      `}
    >
      <Image
        src={material.images.thumb}
        alt={material.name.zh}
        fill
        sizes="160px"
        className="object-cover"
      />
      
      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
        <p className="text-xs text-white font-medium">{material.name.zh}</p>
        <p className="text-xs text-white/70">¥{material.pricing.basePrice}/颗</p>
      </div>
      
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      )}
    </button>
  );
}
```

**交付物：**
- [ ] 材质卡片组件创建
- [ ] 选中状态样式
- [ ] Hover 效果
- [ ] 无障碍支持

---

#### Week 8: 右侧配置面板 + 底部操作栏

**Day 1-2: 珠数选择器**

```typescript
// components/designer/ui/BeadCountSelector.tsx

const BEAD_COUNT_OPTIONS = [
  { value: 108, label: '108 颗', sub: '标准念珠' },
  { value: 54, label: '54 颗', sub: '半串' },
  { value: 27, label: '27 颗', sub: '手持' },
];

export function BeadCountSelector() {
  const { count, setBeadCount } = useDesigner();
  
  return (
    <div className="space-y-3">
      <label className="text-sm text-[var(--color-text-muted)]">珠数</label>
      
      <div className="grid grid-cols-3 gap-2">
        {BEAD_COUNT_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setBeadCount(option.value)}
            className={`
              p-3 rounded-[var(--radius-sm)] border text-center
              transition-all duration-600 cursor-pointer
              ${count === option.value
                ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10'
                : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
              }
            `}
          >
            <p className="text-sm font-medium">{option.label}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{option.sub}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
```

**交付物：**
- [ ] 珠数选择器组件
- [ ] 尺寸选择器组件
- [ ] 配饰选择器组件

---

**Day 3-4: 底部操作栏**

```typescript
// components/designer/ActionBar.tsx

import { useDesignerStore } from '@/lib/designer/store';

export function ActionBar() {
  const config = useDesignerStore((state) => state.config);
  const saveDesign = useDesignerStore((state) => state.actions.saveDesign);
  
  return (
    <div className="fixed bottom-0 inset-x-0 h-20 bg-[var(--color-bg-primary)] border-t border-[var(--color-border)] flex items-center justify-between px-6 md:px-12">
      <div>
        <p className="text-xs text-[var(--color-text-muted)]">总价</p>
        <p className="text-2xl font-serif text-[var(--color-text-primary)]">
          ¥{config.totalPrice}
        </p>
      </div>
      
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => saveDesign()}
          className="px-6 py-3 border border-[var(--color-border)] rounded-[var(--radius-sm)] text-sm transition-colors duration-600 hover:border-[var(--color-text-muted)]"
        >
          保存设计
        </button>
        
        <button
          type="button"
          className="px-8 py-3 bg-[var(--color-accent)] text-[var(--color-bg-primary)] rounded-[var(--radius-sm)] text-sm font-medium transition-all duration-600 hover:opacity-90"
        >
          立即结缘
        </button>
      </div>
    </div>
  );
}
```

**交付物：**
- [ ] 操作栏组件创建
- [ ] 价格实时显示
- [ ] CTA 按钮样式

---

**Day 5: 页面集成**

```typescript
// app/[locale]/customize/page.tsx

import { DesignerCanvas } from '@/components/designer/DesignerCanvas';
import { MaterialPanel } from '@/components/designer/MaterialPanel';
import { ConfigPanel } from '@/components/designer/ConfigPanel';
import { ActionBar } from '@/components/designer/ActionBar';

export default function CustomizePage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <MaterialPanel />
        <DesignerCanvas />
        <ConfigPanel />
      </div>
      <ActionBar />
    </div>
  );
}
```

**交付物：**
- [ ] 页面布局完成
- [ ] 所有组件集成
- [ ] 响应式适配

---

### 4.2 Phase 3 验收标准

- [ ] 材质选择功能正常
- [ ] 配置修改实时反映到 3D 预览
- [ ] 价格实时计算准确
- [ ] 响应式布局正确（移动端、平板、桌面）
- [ ] 无障碍测试通过

---

## 五、Phase 4: 集成测试（第 9-10 周）

### 5.1 测试清单

#### Week 9: 功能测试

**Day 1-2: 单元测试补充**

```typescript
// __tests__/lib/designer/pricing.test.ts

import { calculatePrice } from '@/lib/designer/pricing';
import { mockConfig } from '@/__mocks__/design-config';

describe('calculatePrice', () => {
  it('should calculate correct price for 108 beads', () => {
    const config = { ...mockConfig, bead: { count: 108, diameter: 8 } };
    const price = calculatePrice(config);
    expect(price).toBeGreaterThan(0);
    expect(price % 10).toBe(8); // 以 8 结尾
  });
  
  it('should include accessory price', () => {
    const configWithAccessory = {
      ...mockConfig,
      accessory: { tassel: { color: 'red', length: 10, material: 'silk' } },
    };
    const priceWithAccessory = calculatePrice(configWithAccessory);
    const priceWithoutAccessory = calculatePrice(mockConfig);
    expect(priceWithAccessory).toBeGreaterThan(priceWithoutAccessory);
  });
});
```

**交付物：**
- [ ] 价格计算单元测试
- [ ] 配置验证单元测试
- [ ] 工具函数单元测试

---

**Day 3-5: 集成测试**

```typescript
// __tests__/integration/designer-flow.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CustomizePage from '@/app/[locale]/customize/page';

describe('Designer Flow', () => {
  it('should update 3D preview when material is selected', async () => {
    render(<CustomizePage />);
    
    // 选择材质
    const materialCard = screen.getByRole('button', { name: /紫檀/i });
    fireEvent.click(materialCard);
    
    // 等待 3D 更新
    await waitFor(() => {
      // 验证状态更新
    });
  });
  
  it('should calculate price correctly', async () => {
    render(<CustomizePage />);
    
    // 修改珠数
    const beadCountButton = screen.getByRole('button', { name: /54 颗/i });
    fireEvent.click(beadCountButton);
    
    // 验证价格更新
    await waitFor(() => {
      const price = screen.getByText(/¥\d+/);
      expect(price).toBeInTheDocument();
    });
  });
});
```

**交付物：**
- [ ] 材质选择集成测试
- [ ] 配置修改集成测试
- [ ] 价格计算集成测试

---

#### Week 10: 性能与兼容性测试

**Day 1-2: 性能测试**

```typescript
// __tests__/performance/3d-rendering.test.ts

import { benchmark } from '@/__tests__/utils/benchmark';

describe('3D Rendering Performance', () => {
  it('should maintain 30 FPS with 108 beads', async () => {
    const fps = await benchmark(() => {
      // 渲染 108 颗珠子
    });
    expect(fps).toBeGreaterThan(30);
  });
  
  it('should load initial scene within 3 seconds', async () => {
    const loadTime = await benchmark(() => {
      // 加载初始场景
    });
    expect(loadTime).toBeLessThan(3000);
  });
});
```

**交付物：**
- [ ] FPS 测试通过
- [ ] 加载时间测试通过
- [ ] 内存占用测试通过

---

**Day 3-5: 兼容性测试**

| 浏览器 | 测试项 | 预期结果 |
|--------|--------|----------|
| Chrome Desktop | 3D 渲染 | ✅ 正常 |
| Safari Desktop | 3D 渲染 | ✅ 正常 |
| Chrome Android | 3D + AR | ✅ 正常 |
| Safari iOS | 3D 渲染 | ✅ 正常 |
| 微信内置浏览器 | 降级方案 | ✅ 2D 图片 |

**交付物：**
- [ ] 浏览器兼容性测试报告
- [ ] 降级方案验证
- [ ] 移动端触摸交互测试

---

### 5.2 Phase 4 验收标准

- [ ] 所有单元测试通过
- [ ] 所有集成测试通过
- [ ] 性能测试通过
- [ ] 兼容性测试通过
- [ ] 无障碍测试通过

---

## 六、Phase 5: 增强功能（第 11-12 周）

### 6.1 任务清单

#### Week 11: 设计保存与加载

**Day 1-3: LocalStorage 持久化**

```typescript
// lib/designer/persistence.ts

import type { DesignConfig } from '@/types/config';

const STORAGE_KEY = 'kongxing_mala_designs';

export function saveDesignToStorage(config: DesignConfig): void {
  const designs = loadDesignsFromStorage();
  designs.push(config);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
}

export function loadDesignsFromStorage(): DesignConfig[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function deleteDesignFromStorage(id: string): void {
  const designs = loadDesignsFromStorage();
  const filtered = designs.filter((d) => d.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
```

**交付物：**
- [ ] LocalStorage 保存/加载
- [ ] 草稿自动保存
- [ ] 历史设计列表

---

**Day 4-5: 云端保存（API）**

```typescript
// app/api/designs/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { saveDesign, loadDesign } from '@/lib/db/designs';

export async function POST(request: NextRequest) {
  const config = await request.json();
  const id = await saveDesign(config);
  return NextResponse.json({ id });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const design = await loadDesign(id);
  return NextResponse.json(design);
}
```

**交付物：**
- [ ] API 路由创建
- [ ] 数据库表设计
- [ ] 云端保存/加载

---

#### Week 12: 社交分享

**Day 1-3: 分享链接生成**

```typescript
// lib/designer/share.ts

import { nanoid } from 'nanoid';

export function generateShareLink(configId: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return `${baseUrl}/design/${configId}`;
}

export function generateShareImage(config: DesignConfig): Promise<Blob> {
  // 使用 html2canvas 或 canvas 截图
  // 生成带品牌水印的预览图
}
```

**交付物：**
- [ ] 分享链接生成
- [ ] 预览图生成
- [ ] 社交媒体分享按钮

---

**Day 4-5: 分享页面**

```typescript
// app/design/[id]/page.tsx

export default async function SharedDesignPage({ params }: { params: { id: string } }) {
  const design = await loadDesign(params.id);
  
  return (
    <div>
      <DesignerCanvas config={design} />
      <div className="text-center mt-8">
        <p className="text-sm text-[var(--color-text-muted)]">
          这是 {design.material.name.zh} 念珠的设计方案
        </p>
        <button className="mt-4 px-6 py-3 bg-[var(--color-accent)] ...">
          我也要定制
        </button>
      </div>
    </div>
  );
}
```

**交付物：**
- [ ] 分享页面创建
- [ ] Open Graph 元数据
- [ ] 转化引导

---

### 6.2 Phase 5 验收标准

- [ ] 设计保存功能正常
- [ ] 草稿自动保存
- [ ] 分享链接可访问
- [ ] 社交媒体分享正常

---

## 七、Phase 6: 高级功能（第 13-15 周）

### 7.1 任务清单

#### Week 13-14: AR 试戴

**Day 1-3: WebXR 集成**

```typescript
// components/designer/ARViewer.tsx

import { ARButton, XR, XROrigin } from '@react-three/xr';

export function ARViewer() {
  return (
    <XR>
      <ARButton
        sessionInit={{
          requiredFeatures: ['hit-test'],
          optionalFeatures: ['dom-overlay'],
        }}
      />
      
      <XROrigin>
        <MalaModel />
      </XROrigin>
    </XR>
  );
}
```

**交付物：**
- [ ] WebXR 集成
- [ ] AR 模式切换
- [ ] 手部识别

---

**Day 4-5: AR 降级方案**

```typescript
// hooks/useARSupport.ts

export function useARSupport() {
  const [isSupported, setIsSupported] = useState(false);
  
  useEffect(() => {
    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-ar').then(setIsSupported);
    }
  }, []);
  
  return isSupported;
}
```

**交付物：**
- [ ] AR 支持检测
- [ ] 降级提示
- [ ] iOS Quick Look 支持

---

#### Week 15: AI 推荐

**Day 1-3: 推荐算法**

```typescript
// lib/designer/recommendations.ts

export function getRecommendations(config: Partial<DesignConfig>): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  // 基于材质推荐配饰
  if (config.material?.category === 'wood') {
    recommendations.push({
      type: 'accessory',
      item: { tassel: { color: 'gold', material: 'silk' } },
      reason: '木质念珠搭配金色流苏更显典雅',
    });
  }
  
  // 基于价格推荐替代
  if (config.bead?.count === 108) {
    recommendations.push({
      type: 'alternative',
      item: { count: 54 },
      reason: '54 颗更轻便，价格更亲民',
    });
  }
  
  return recommendations;
}
```

**交付物：**
- [ ] 推荐算法实现
- [ ] 推荐卡片 UI
- [ ] 一键应用推荐

---

**Day 4-5: 最终集成与上线准备**

- [ ] 所有功能集成测试
- [ ] 性能优化最终调整
- [ ] 文档完善
- [ ] 上线部署

---

### 7.2 Phase 6 验收标准

- [ ] AR 试戴功能正常（支持的设备）
- [ ] AI 推荐准确
- [ ] 所有功能集成测试通过
- [ ] 生产环境部署成功

---

## 八、人员分工

| 角色 | 人数 | 职责 |
|------|------|------|
| 前端开发 | 2 | React 组件、状态管理、UI 实现 |
| 3D 开发 | 1 | Three.js、3D 模型、性能优化 |
| 3D 艺术家（外包） | 1 | 3D 模型制作、材质贴图 |
| 后端开发 | 1 | API、数据库、云存储 |
| 测试工程师 | 1 | 单元测试、集成测试、性能测试 |
| UI 设计师 | 1 | 界面设计、交互设计、视觉规范 |

---

## 九、风险管理

| 风险 | 等级 | 缓解措施 | 负责人 |
|------|------|----------|--------|
| 3D 性能不达标 | 🔴 高 | InstancedMesh + LOD 优化 | 3D 开发 |
| 浏览器兼容性问题 | 🔴 高 | 降级方案 + Polyfill | 前端开发 |
| 3D 模型延期 | 🟡 中 | 提前启动，并行开发 | 3D 艺术家 |
| AR 功能不稳定 | 🟡 中 | 充分测试，降级方案 | 3D 开发 |
| 成本超预算 | 🟡 中 | MVP 优先，功能裁剪 | PM |

---

## 十、里程碑

| 里程碑 | 时间 | 交付物 |
|--------|------|--------|
| M1: 基础设施完成 | 第 2 周末 | 项目结构、状态管理、数据准备 |
| M2: 3D 渲染完成 | 第 6 周末 | 3D 场景、念珠模型、性能优化 |
| M3: 配置界面完成 | 第 8 周末 | 材质面板、配置面板、操作栏 |
| M4: 集成测试完成 | 第 10 周末 | 测试通过、性能达标 |
| M5: MVP 上线 | 第 12 周末 | 核心功能可用、可下单 |
| M6: 完整版上线 | 第 15 周末 | 所有功能完成、AR 可用 |

---

**文档版本：** v1.0  
**最后更新：** 2026-05-16  
**维护者：** Kongxing Mala Team
