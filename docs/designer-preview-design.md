# 念珠预览区设计文档

> 基于原型图 `preview/mala-structure.html` 的线条骨架 + 动态材质分配方案
> 2026-05-16 · v2

---

## 一、概述

### 1.1 目标

将当前 `designer-preview-2d.tsx` 的简单环形预览替换为**完整藏式 108 念珠线条骨架预览**，支持：

1. **线条骨架展示** — 绘制环形串绳、所有珠子点位（主珠/顶珠/腰珠/佛头）及配件（背云/弟子珠/计数器/卡子），无材质时显示灰色轮廓占位符
2. **材质分类分配** — 选材面板中每种材质标记可用珠子类型（主珠/腰珠/顶珠/三通），点击材质后根据当前选中状态分配到对应位置
3. **单颗替换** — 用户在预览区选中某颗珠子位置，再点击选材面板中的材质，替换该位置材质

### 1.2 设计原则

| 原则 | 说明 |
|------|------|
| 骨架优先 | 无论是否选择材质，始终显示完整的线条骨架结构 |
| 所见即所得 | 预览区实时反映每次材质变更，过渡动画 300ms |
| 渐进增强 | 默认显示骨架占位态，选择材质后逐步填充颜色 |
| 全平台一致 | 桌面端和移动端交互行为无差异 |

---

## 二、念珠结构定义

### 2.1 种类与数量

| 种类 | 内部标识 | 数量 | 位置说明 | 尺寸层级 |
|------|----------|------|----------|----------|
| 主珠 | `main` | 108 | 环形均匀排列，4 段 × 27 颗 | 最小（基准） |
| 顶珠 | `crown` | 1 | **12 点钟方向**（array index 56） | > 主珠，< 佛头 |
| 腰珠 | `waist` | 2 | **9 点钟方向**（array index 28）、**3 点钟方向**（array index 84） | ≥ 顶珠 |
| 佛头/三通 | `guru` | 1 | **6 点钟方向**（array index 0），连接首尾 | 最大 |
| 卡子 | `clip` | 1 | 第 7 颗主珠后的线上，可移动 | — |

> 注：**佛头与佛塔为一体**，佛塔不独立渲染，作为佛头组件的视觉延伸。
>
> 背云、弟子珠、计数器为**配饰类**，由配件面板控制开关，不在材质分配范围内，不计入线条骨架核心。

### 2.2 环形参数

```
珠子总数: 112（108 主珠 + 1 顶珠 + 2 腰珠 + 1 三通）
环形中心: (CX, CY)  — 预览区域居中
环形半径: 350px
起始角度: 三通在 6 点钟方向 (π/2)，逆时针排列
每颗珠子步进角度: (Math.PI × 2) / 112

四象限特殊位置（逆时针方向）:
| 钟点方向 | 珠子类型 | array index | 角度 |
|----------|----------|-------------|------|
| 6 点钟   | 三通      | 0           | π/2  |
| 7→9 点   | 主珠 1-27 | 1-27        | 递增  |
| 9 点钟   | 腰珠 1    | 28           | π    |
| 9→12 点  | 主珠 28-54 | 29-55       | 递增  |
| 12 点钟  | 顶珠      | 56           | 3π/2 |
| 12→3 点  | 主珠 55-81 | 57-83       | 递增  |
| 3 点钟   | 腰珠 2    | 84           | 0    |
| 3→6 点   | 主珠 82-108 | 85-111      | 递增  |
```

### 2.3 尺寸层级 (px)

```typescript
const BEAD_SIZES = {
  main:     15,    // 主珠
  waist:    17,    // 腰珠
  crown:    19,    // 顶珠
  guru:     19,    // 佛头（含佛塔一体）
  disciple: 15,    // 弟子珠
  counter:  15,    // 计数器珠
  clip:     15,    // 卡子
};
```

**间距验证**（半径 350px，112 等分）：
- 相邻珠子弧长 ≈ 2π × 350 / 112 ≈ 19.64px
- 主珠-主珠安全距：15px 直径 + 1.4px ≈ 16.4px → 19.64 > 16.4 ✅
- 主珠-腰珠安全距：(15 + 17)/2 + 1.4px ≈ 17.4px → 19.64 > 17.4 ✅
- 主珠-顶珠安全距：(15 + 19)/2 + 1.4px ≈ 18.4px → 19.64 > 18.4 ✅
- 三通-相邻主珠安全距：(19 + 15)/2 + 1.4px ≈ 18.4px → 19.64 > 18.4 ✅

---

## 三、材质分类体系

### 3.1 材质可用类型

选材面板的每种材质必须标记**可用珠子类型**。一种材质可适用于多种类型。

```json
// public/images/materials/wood/wood.json 示例
{
  "materials": {
    "red-sandalwood": {
      "name": { "zh": "紫檀", "en": "Red Sandalwood" },
      "applicableTo": ["main", "crown", "waist"],
      // ... 其他字段
    },
    "sandalwood": {
      "name": { "zh": "檀香", "en": "Sandalwood" },
      "applicableTo": ["main", "crown"],
      // ...
    }
  }
}
```

| 材质 | 可用类型 | 说明 |
|------|----------|------|
| 紫檀 | main, crown, waist | 可作为主珠、顶珠、腰珠 |
| 白水晶 | main, crown, waist | 同上（例） |
| 三通珠 | guru | **仅限三通分类** |
| 某特殊石材 | crown, waist | 仅用于顶珠和腰珠 |
| 某基础材质 | main | 仅用于主珠 |

**关键规则**：
- **主珠、腰珠、顶珠共享同一个材质池**，但每种材质可标记适用于哪些类型
- **三通（佛头）是一个独立的材质分类**，用户必须单独选择，不继承也不可被 main 覆盖
- 如果某种材质未标记 `applicableTo`，默认视为仅适用于 `main`

### 3.2 选材面板展示

在选材面板中，每个材质卡片上标明其可用类型标签：

```
┌─────────────────────┐
│  [材质图片]          │
│  紫檀               │
│  ┌──┐ ┌──┐ ┌──┐    │
│  │主│ │顶│ │腰│    │
│  └──┘ └──┘ └──┘    │
│  8mm                │
└─────────────────────┘
```

三通类材质独立显示为单独的卡片区域，与主珠材质分开展示。

---

## 四、数据模型

### 4.1 MaterialConfig 扩展

```typescript
// src/lib/get-materials.ts 扩展
export interface MaterialConfig {
  // ... 现有字段
  applicableTo: BeadPositionType[];  // 新增：可用珠子类型
}
```

### 4.2 BeadPositionType

```typescript
// 新增类型
export type BeadPositionType = 'main' | 'crown' | 'waist' | 'guru' | 'disciple';
// clip 为线上配件，不使用材质
```

### 4.3 DesignConfig 扩展

```typescript
// 念珠各部分的材质分配
export interface BeadMaterialAssignment {
  main: string;     // 主珠材质 ID
  crown: string;    // 顶珠材质 ID
  waist: string;    // 腰珠材质 ID
  guru: string;     // 佛头材质 ID（独立，不继承 main）
}

export interface DesignConfig {
  // ... 现有字段
  materialAssignment: BeadMaterialAssignment;                 // 新增
  singleBeadOverrides: Record<number, string>;               // 新增：单颗覆盖记录
  selectedBead: number | null;                               // 新增：当前选中珠子索引
}
```

### 4.4 材质解析规则

```typescript
function getMaterialForBead(
  index: number,                  // 珠子索引 (0-107)
  type: 'main' | 'crown' | 'waist' | 'guru',  // 珠子类型
  assignment: BeadMaterialAssignment,
  overrides: Record<number, string>,
): string {
  // 1. 优先检查单颗覆盖
  if (overrides[index] !== undefined) return overrides[index];

  // 2. 按类型返回
  switch (type) {
    case 'guru': return assignment.guru;   // 佛头独立，不降级
    case 'crown': return assignment.crown;  // 顶珠独立，不降级
    case 'waist': return assignment.waist;  // 腰珠独立，不降级
    case 'main': return assignment.main;
  }
}
```

**关键规则**：
- **佛头、顶珠、腰珠不降级继承 main**——即用户必须为每种类型明确选择材质
- 所有四种类型的默认值均为 `'red-sandalwood'`
- **整体更换主珠材质时，`singleBeadOverrides` 被清空**（用户在 Q4 明确选择覆盖）

### 4.5 Store Action 扩展

```typescript
interface DesignerActions {
  // 设置某类位置的全部材质
  // - type = 'main' 时，清空 singleBeadOverrides
  setMaterialForType: (type: BeadPositionType, materialId: string) => void;
  // 设置单颗珠子的材质
  setMaterialForSingleBead: (index: number, materialId: string) => void;
  // 选中/取消选中某颗珠子
  selectBead: (index: number | null) => void;
}
```

---

## 五、组件架构

### 5.1 新组件树

```
designer-viewer.tsx
├── MaterialPanelClient (选材面板 — 已有，需适配)
│   └── 材质分类标签（主珠/顶珠/腰珠共用池 + 三通独立池）
├── MalaPreview (预览区 — 新建，替换 DesignerPreview2D)
│   ├── MalaRing (环形骨架容器)
│   │   ├── BeadNode × 108 (主珠节点，编号 1-108)
│   │   ├── CrownBead × 1 (顶珠节点，index 56，12 点钟方向)
│   │   ├── WaistBead × 2 (腰珠节点，index 28 和 84，9 点/3 点钟方向)
│   │   └── GuruBeadSet × 1 (佛头+佛塔一体，index 0，6 点钟方向)
│   ├── BackCloud (背云 — 配件面板控制)
│   ├── DiscipleBeads (弟子珠 — 配件面板控制)
│   ├── CounterSet (计数器 — 配件面板控制)
│   └── Clip (卡子 — 条件渲染，可拖动位置)
└── ConfigPanel (配置面板 — 已有)
```

### 5.2 组件职责

#### MalaPreview
- 替换当前的 `DesignerPreview2D`
- 定位：占满预览区域（`flex-1 relative`）
- 输入：`materials`, `accessories`, 通过 store 读取 `materialAssignment`, `singleBeadOverrides`, `selectedBead`
- 输出：点击珠子回调 → `selectBead(index)`
- 渲染顺序（从底到顶）：背景 → 串绳 → 珠体 → 配件 → 选中高亮层

#### MalaRing
- 核心骨架容器，使用 `position: relative` + 绝对定位子元素
- 环形框架线半径为 350px，112 个等分位置（含三通位置 index 0）
- 计算 108 颗主珠 + 1 顶珠 + 2 腰珠的 `(x, y)` 坐标（跳过三通 index 0，由 GuruBeadSet 独立渲染）
- 主珠编号从 1 到 108，跳过三通、腰珠、顶珠位置
- 按 y 排序渲染，确保正确视觉遮挡

#### BeadNode
- 渲染单颗圆形珠子
- 查找材质 ID → 从 `materials` 中获取材质图片 → 显示
- 无材质时显示灰色占位圆
- 点击回调通知父组件

#### GuruBeadSet
- 佛头 + 佛塔一体渲染
- 佛头最大尺寸、金色点缀
- 同样响应材质选择

### 5.3 渲染管线

```
1. 背景渐变（同现有）
2. 串绳（环形半透明线）
3. 佛头与首尾连接线（虚线）
4. 主珠列表（按 y 排序渲染，实现遮挡）
5. 腰珠 × 2（含隔片）
6. 顶珠 × 1
7. 佛头 + 佛塔（一体，底部）
8. 背云（配件启用时）
9. 弟子珠（配件启用时）
10. 计数器（配件启用时）
11. 卡子（第 7 颗后）
12. 选中高亮环（覆盖在所有之上）
```

---

## 六、交互设计

### 6.1 两种操作模式

#### 模式 A：批量分配

**触发前提**：预览区**没有**选中的珠子（`selectedBead === null`）

**行为**：
1. 用户在选材面板点击一个材质卡片
2. 检查该材质的 `applicableTo` 列表
3. 如果材质适用于当前正在浏览的类型（由选材面板的选中分类决定），则设置对应类型的 `materialAssignment`
4. 预览区该类型所有珠子立即更新

**视觉反馈**：
- 材质卡片选中态：金色边框
- 预览区对应类型的珠子填充材质图片

#### 模式 B：单颗替换

**触发前提**：用户在预览区点击了某颗珠子（`selectedBead !== null`）

**行为**：
1. 被选中的珠子显示金色高亮外环
2. 在选材面板点击一个材质卡片
3. 检查该材质的 `applicableTo` 列表是否包含被选中珠子的类型
4. 如果兼容，替换该珠子的材质，记录到 `singleBeadOverrides`
5. 如果不兼容，提示"该材质不适用于此位置"

**取消选中**：
- 再次点击已选中的珠子
- 点击预览区空白处

### 6.2 整体更换主珠 → 清除单颗覆盖

当用户通过模式 A 设置 `materialAssignment.main` 时，**自动清空 `singleBeadOverrides`**，所有被单独替换的珠子恢复为主珠材质。

### 6.3 佛头材质选择

佛头材质独立选择，通过选材面板的**三通分类**区域操作：
- 点击三通分类下的材质 → 设置 `materialAssignment.guru`
- 三通材质的 `applicableTo` 数组必须包含 `'guru'`
- 不支持对佛头进行单颗替换

### 6.4 场景示例

```
场景 1：新手用户

1. 选材面板选择「紫檀」(applicableTo: [main, crown, waist])
   → materialAssignment.main = 'red-sandalwood'
   → materialAssignment.crown = 'red-sandalwood'
   → materialAssignment.waist = 'red-sandalwood'
   → 预览区所有主珠、顶珠、腰珠变为紫檀
2. 切换到三通分类，选择「红玛瑙三通」
   → materialAssignment.guru = 'red-agate-guru'
   → 预览区佛头变为红玛瑙
3. 所有珠子都有材质了
```

```
场景 2：个性化替换

1. 先整体用紫檀（同场景1）
2. 点击预览区第 54 位顶珠 → 选中（金色高亮）
3. 选材面板选择「白水晶」(applicableTo: [main, crown, waist])
   → 第 54 位顶珠变为白水晶
   → singleBeadOverrides[54] = 'white-crystal'
4. 预览区只有顶珠是白水晶，其余均为紫檀
```

```
场景 3：整体换色

1. 延续场景2，顶珠为白水晶，其余为紫檀
2. 选材面板点击「檀香」
   → materialAssignment.main = 'sandalwood'
   → 清空 singleBeadOverrides
   → 所有主珠变为檀香，顶珠也变为檀香
3. 此时顶珠不再是白水晶
```

---

## 七、选材面板适配

### 7.1 面板区域划分

```
┌──────────────────────────────┐
│  · 选材 ·                    │
│                              │
│ ──── 材质库 ────              │
│                              │
│ 木质类                       │
│ ┌────┐ ┌────┐ ┌────┐        │
│ │紫檀│ │檀香│ │菩提│        │
│ │主腰顶│ │主顶│ │主  │        │
│ └────┘ └────┘ └────┘        │
│                              │
│ 宝石类                       │
│ ┌────┐ ┌────┐                │
│ │白晶│ │紫晶│                │
│ │主腰顶│ │主顶│               │
│ └────┘ └────┘                │
│                              │
│ ──── 三通 ────               │
│                              │
│ ┌────┐ ┌────┐                │
│ │红玛│ │黑玛│                │
│ │ 瑙 │ │ 瑙 │                │
│ └────┘ └────┘                │
│                              │
│ ──── 配件类 ────              │
│ ┌────┐ ┌────┐ ┌────┐        │
│ │背云│ │弟子│ │计数│        │
│ │    │ │ 珠 │ │ 器 │        │
│ └────┘ └────┘ └────┘        │
└──────────────────────────────┘
```

### 7.2 材质兼容性标签

每个材质卡片右下角显示文字标签，标记可用珠子类型：

| 适用类型 | 标签文字 |
|----------|----------|
| main, crown, waist | `主·顶·腰` |
| main, crown | `主·顶` |
| main, waist | `主·腰` |
| main | `主` |
| guru | `三通` |

---

## 八、实现步骤

### Phase 0：准备工作（当前状态）

以下步骤已部分完成，确认后补充遗漏项：

1. **类型定义** — `src/types/config.ts` 中已有：
   - `BeadPositionType`（含 `disciple`）
   - `BeadMaterialAssignment`
   - `DesignConfig` 中的 `materialAssignment`、`singleBeadOverrides`、`selectedBead`

2. **MaterialConfig 扩展** — `src/lib/get-materials.ts` 中已有 `applicableTo: BeadPositionType[]`

3. **JSON 配置** — `public/images/materials/crystal/crystal.json` 已添加 `applicableTo: ["main", "crown", "disciple"]`，其余材质 JSON 尚未更新

4. **Store 默认值** — `src/lib/designer/store.ts` 中 `getDefaultConfig()` 已返回新字段默认值

**待补充**：
- [ ] 其余 JSON 文件添加 `applicableTo` 字段
- [ ] Store 中新增 `setMaterialForType`、`setMaterialForSingleBead`、`selectBead` actions

---

### Phase 1：Store Actions 实现

#### 1.1 新增 import（store.ts）

```diff
- import type { DesignConfig, AccessoryConfig } from '@/types/config';
+ import type { DesignConfig, AccessoryConfig, BeadPositionType, BeadMaterialAssignment } from '@/types/config';
```

#### 1.2 新增 actions（store.ts，在 `setSelectedBead` 后面）

```typescript
setMaterialForType: (type: BeadPositionType, materialId: string) =>
  set((state) => {
    logger.materialChange(state.config.materialId, materialId);
    // type = 'main' 时清空单颗覆盖
    if (type === 'main') {
      state.config.singleBeadOverrides = {};
    }
    state.config.materialAssignment[type as keyof BeadMaterialAssignment] = materialId;
    state.config.updatedAt = new Date().toISOString();
    state.config.totalPrice = calculatePrice(state.config);
  }),

setMaterialForSingleBead: (index: number, materialId: string) =>
  set((state) => {
    state.config.singleBeadOverrides[index] = materialId;
    state.config.updatedAt = new Date().toISOString();
    state.config.totalPrice = calculatePrice(state.config);
  }),

selectBead: (index: number | null) =>
  set((state) => {
    state.config.selectedBead = index;
  }),
```

#### 1.3 更新 DesignerActions 接口（src/types/designer.ts）

```typescript
// 新增
setMaterialForType: (type: BeadPositionType, materialId: string) => void;
setMaterialForSingleBead: (index: number, materialId: string) => void;
selectBead: (index: number | null) => void;

// 更新 removeAccessory 类型
removeAccessory: (type: 'tassel' | 'pendant' | 'counter') => void;
```

#### 1.4 验证

```bash
cd /Users/lurecode/Documents/trae_projects/custom-beaded-jewelry && npm run build
# 应无类型错误
```

---

### Phase 2：骨架渲染 — 新建 MalaPreview

#### 2.1 新建 `src/components/designer/preview/mala-preview.tsx`

完整组件骨架，包含位置计算、渲染管线。

**步骤 2.1a — 位置计算函数**

参考原型图 JavaScript 逻辑，翻译为 TypeScript：

```typescript
// mala-preview.tsx 顶部常量
const MAIN_BEADS = 108;
const TOTAL_POSITIONS = 112;
const GURU_INDEX = 0;
const CROWN_INDEX = 56;
const WAIST_INDICES = [28, 84];
const BASE_RADIUS = 350;
const CLIP_BEAD_INDEX = 6;

const BEAD_SIZES = {
  main: 15,
  waist: 17,
  crown: 19,
  guru: 19,
  disciple: 15,
  counter: 15,
  clip: 15,
};

// 珠子数据接口
interface BeadData {
  index: number;
  type: 'main' | 'crown' | 'waist';
  x: number;
  y: number;
  size: number;
  mainBeadIndex: number;  // 主珠编号 0-107（显示为 1-108），非主珠为 -1
}

// 位置计算
function getBeadPosition(index: number): { x: number; y: number } {
  const anglePerBead = (2 * Math.PI) / TOTAL_POSITIONS;
  const guruAngle = Math.PI / 2;  // 三通在 6 点钟方向
  const angle = guruAngle + index * anglePerBead;
  return {
    x: Math.round(BASE_RADIUS * Math.cos(angle)),
    y: Math.round(BASE_RADIUS * Math.sin(angle)),
  };
}

function generateBeads(): BeadData[] {
  const beads: BeadData[] = [];
  let mainBeadCount = 0;

  for (let i = 0; i < TOTAL_POSITIONS; i++) {
    if (i === GURU_INDEX) continue;  // 三通由 GuruBeadSet 独立渲染

    const pos = getBeadPosition(i);
    let type: 'main' | 'crown' | 'waist' = 'main';
    let mainBeadIndex = mainBeadCount;

    if (i === CROWN_INDEX) {
      type = 'crown';
      mainBeadIndex = -1;
    } else if (WAIST_INDICES.includes(i)) {
      type = 'waist';
      mainBeadIndex = -1;
    } else {
      mainBeadCount++;
    }

    beads.push({
      index: i,
      type,
      x: pos.x,
      y: pos.y,
      size: type === 'crown' ? BEAD_SIZES.crown : type === 'waist' ? BEAD_SIZES.waist : BEAD_SIZES.main,
      mainBeadIndex,
    });
  }

  return beads;
}
```

**步骤 2.1b — 渲染管线（SVG + div 混合方案）**

使用 SVG 绘制串绳和连接线（避免 Canvas 的缩放问题），使用 div 渲染珠子节点（通过绝对定位 + border-radius: 50%）。

```tsx
// mala-preview.tsx 主体结构
'use client';

import { useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useDesignerStore } from '@/lib/designer/store';
import type { MaterialCategoryConfig } from '@/lib/get-materials';
import Image from 'next/image';

interface MalaPreviewProps {
  materials: MaterialCategoryConfig[];
}

export function MalaPreview({ materials }: MalaPreviewProps) {
  const t = useTranslations('designer');
  const locale = useLocale();
  const materialAssignment = useDesignerStore((s) => s.config.materialAssignment);
  const singleBeadOverrides = useDesignerStore((s) => s.config.singleBeadOverrides);
  const selectedBead = useDesignerStore((s) => s.config.selectedBead);
  const selectBead = useDesignerStore((s) => s.selectBead);

  const beads = useMemo(() => generateBeads(), []);
  const sortedBeads = useMemo(() => [...beads].sort((a, b) => a.y - b.y), [beads]);

  const getMaterialForBead = (bead: BeadData): MaterialConfig | null => {
    // 1. 单颗覆盖
    if (singleBeadOverrides[bead.index] !== undefined) {
      const id = singleBeadOverrides[bead.index];
      return findMaterialById(materials, id);
    }
    // 2. 类型分配
    const id = materialAssignment[bead.type];
    if (id) return findMaterialById(materials, id);
    return null;
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)]">
      <div className="relative" style={{ width: RING_RADIUS * 2, height: RING_RADIUS * 2 }}>
        {/* 串绳 SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${RING_RADIUS * 2} ${RING_RADIUS * 2}`}
        >
          {/* 环形串绳 */}
          <circle
            cx={RING_RADIUS}
            cy={RING_RADIUS}
            r={RING_RADIUS - BEAD_SIZES.main}
            fill="none"
            stroke="rgba(160,144,112,0.35)"
            strokeWidth="1.2"
          />
          {/* 佛头连接线（虚线） */}
          ...
        </svg>

        {/* 珠子节点 */}
        {sortedBeads.map((bead) => (
          <BeadNode
            key={bead.index}
            bead={bead}
            material={getMaterialForBead(bead)}
            isSelected={selectedBead === bead.index}
            onSelect={() => selectBead(selectedBead === bead.index ? null : bead.index)}
          />
        ))}

        {/* 佛头 */}
        <GuruBeadSet
          material={findMaterialById(materials, materialAssignment.guru)}
        />
      </div>
    </div>
  );
}
```

**步骤 2.1c — 查找函数**

```typescript
// mala-preview.tsx 底部
function findMaterialById(materials: MaterialCategoryConfig[], id: string): MaterialConfig | null {
  for (const category of materials) {
    if (category.materials[id]) return category.materials[id];
  }
  return null;
}
```

#### 2.2 新建 `BeadNode` 子组件

在同一文件或独立文件 `src/components/designer/preview/bead-node.tsx`：

```tsx
// bead-node.tsx: 单颗珠子节点 — 占位态/材质态/选中态

interface BeadNodeProps {
  bead: BeadData;
  material: MaterialConfig | null;
  isSelected: boolean;
  onSelect: () => void;
}

export function BeadNode({ bead, material, isSelected, onSelect }: BeadNodeProps) {
  return (
    <button
      onClick={onSelect}
      className="absolute rounded-full transition-all duration-300"
      style={{
        left: `calc(50% + ${bead.x}px)`,
        top: `calc(50% + ${bead.y}px)`,
        width: `${bead.size * 2}px`,
        height: `${bead.size * 2}px`,
        transform: 'translate(-50%, -50%)',
        zIndex: bead.y > 0 ? 100 + Math.round(bead.y) : 1 + Math.round(bead.y),
      }}
    >
      <div
        className={`
          w-full h-full rounded-full overflow-hidden
          border transition-all duration-300
          ${isSelected
            ? 'border-[#FFB900] shadow-[0_0_8px_rgba(255,185,0,0.5)]'
            : material
              ? 'border-transparent'
              : 'border-[var(--color-border)]'
          }
        `}
      >
        {material ? (
          <Image
            src={material.thumbnail}
            alt=""
            fill
            sizes="28px"
            className="object-contain"
          />
        ) : (
          <div className="w-full h-full bg-[var(--color-bg-secondary)] opacity-50" />
        )}
      </div>
    </button>
  );
}
```

#### 2.3 新建 `GuruBeadSet` 子组件

```tsx
// guru-bead-set.tsx: 佛头+佛塔一体组件

export function GuruBeadSet({ material }: { material: MaterialConfig | null }) {
  const guruX = 0;   // 相对于容器中心
  const guruY = RING_RADIUS;

  return (
    <div
      className="absolute"
      style={{
        left: `calc(50% + ${guruX}px)`,
        top: `calc(50% + ${guruY}px)`,
        transform: 'translate(-50%, -50%)',
        zIndex: 200,
      }}
    >
      {/* 佛头主体 */}
      <div
        className={`rounded-full overflow-hidden transition-all duration-300 ${
          material ? 'border border-[#FFB900]/30' : 'border border-[var(--color-border)]'
        }`}
        style={{ width: BEAD_SIZES.guru * 2, height: BEAD_SIZES.guru * 2 }}
      >
        {material ? (
          <Image src={material.thumbnail} alt="" fill sizes="28px" className="object-contain" />
        ) : (
          <div className="w-full h-full bg-[var(--color-bg-secondary)] opacity-30" />
        )}
      </div>
      {/* 佛塔（锥形 SVG） */}
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: '100%' }}
      >
        <rect x="2" y="0" width="12" height="3" fill="#C8A85C" rx="1" />
        <rect x="3.5" y="3" width="9" height="3" fill="#C8A85C" rx="1" />
        <polygon points="5,6 11,6 9,18 7,18" fill="#D4B86C" />
        <circle cx="8" cy="19" r="2" fill="#FFD700" />
      </svg>
    </div>
  );
}
```

#### 2.4 替换 `designer-viewer.tsx` 中的预览组件

```diff
- import { DesignerPreview2D } from './preview/designer-preview-2d';
+ import { MalaPreview } from './preview/mala-preview';
```

```diff
- <DesignerPreview2D materials={materials} />
+ <MalaPreview materials={materials} />
```

#### 2.5 验证

```bash
cd /Users/lurecode/Documents/trae_projects/custom-beaded-jewelry && npm run build
# 应无类型错误
# 浏览器打开 /designer，预览区应显示 108 珠环形骨架 + 佛头 + 串绳
```

---

### Phase 3：材质图片连接

#### 3.1 在 MalaPreview 中接入 store

`mala-preview.tsx` 中已通过 `useDesignerStore` 读取 `materialAssignment` 和 `singleBeadOverrides`，只需确保 `findMaterialById` 能正确扫描 `materials`。

#### 3.2 实现 `getMaterialForBead` 解析函数

```typescript
function getMaterialForBead(
  bead: BeadData,
  assignment: BeadMaterialAssignment,
  overrides: Record<number, string>,
  materials: MaterialCategoryConfig[],
): MaterialConfig | null {
  // 1. 单颗覆盖优先
  if (overrides[bead.index] !== undefined) {
    return findMaterialById(materials, overrides[bead.index]);
  }
  // 2. 类型分配
  const id = bead.type === 'main' ? assignment.main
    : bead.type === 'crown' ? assignment.crown
    : bead.type === 'waist' ? assignment.waist
    : null;

  if (!id) return null;
  return findMaterialById(materials, id);
}
```

#### 3.3 验证

```bash
# 1. 启动 dev server
cd /Users/lurecode/Documents/trae_projects/custom-beaded-jewelry && npm run dev
# 2. 在选材面板点击材质，预览区所有主珠应更新为材质图片
```

---

### Phase 4：交互实现

#### 4.1 珠子选中逻辑

`BeadNode` 的 `onSelect` 已实现：点击 → `selectBead(index)`；再次点击 → `selectBead(null)`。

#### 4.2 选中态视觉

`BeadNode` 的 `isSelected` 样式已包含：
- 金色边框 `border-[#FFB900]`
- 金色发光 `shadow-[0_0_8px_rgba(255,185,0,0.5)]`

#### 4.3 选材面板双模式分派

修改 `material-panel-client.tsx` 中的 `handleSelect`：

```typescript
import { useDesignerStore } from '@/lib/designer/store';

// 在 MaterialPanelClient 组件内
const selectedBead = useDesignerStore((s) => s.config.selectedBead);
const setMaterialForType = useDesignerStore((s) => s.setMaterialForType);
const setMaterialForSingleBead = useDesignerStore((s) => s.setMaterialForSingleBead);

const handleSelect = (materialId: string, size: number) => {
  const material = findMaterialInProps(materials, materialId);
  
  if (selectedBead !== null) {
    // 模式 B：单颗替换
    // 检查兼容性（需要知道该珠子的类型）
    setMaterialForSingleBead(selectedBead, materialId);
    // selectBead(null);  // 可选：替换后取消选中
  } else {
    // 模式 A：批量分配 — 根据材质 applicableTo 设置所有适用类型
    if (material?.applicableTo) {
      for (const type of material.applicableTo) {
        if (type === 'guru') continue; // 三通由独立区域操作
        setMaterialForType(type, materialId);
      }
    }
  }

  // 原有设置主材质 + 直径逻辑
  setMaterial(materialId);
  setBeadDiameter(size as 6 | 8 | 10 | 12);
};
```

#### 4.4 整体换主珠时清空覆盖

在 `setMaterialForType` action 中已实现：

```typescript
if (type === 'main') {
  state.config.singleBeadOverrides = {};
}
```

#### 4.5 兼容性标签显示

在 `MaterialVariantCard` 中添加标签区域，位于尺寸下方：

```tsx
// material-panel-client.tsx 中 MaterialVariantCard 内部
const labelMap: Record<string, string> = {
  main: '主',
  crown: '顶',
  waist: '腰',
  guru: '三通',
  disciple: '弟',
};

// 在尺寸标签旁边
{material.applicableTo && material.applicableTo.length > 0 && (
  <div className="flex gap-0.5 flex-wrap justify-center mt-1">
    {material.applicableTo.map((type) => (
      <span
        key={type}
        className="text-[10px] px-1 rounded bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)]"
      >
        {labelMap[type]}
      </span>
    ))}
  </div>
)}
```

#### 4.6 验证

```bash
# 端到端测试场景
# 场景 1：新手用户
#   选材面板点击紫檀 → 预览区所有主珠变为紫檀
#   三通分类选红玛瑙 → 预览区佛头变为红玛瑙
#
# 场景 2：个性化替换
#   点击预览区第 54 位 → 金色高亮
#   选材面板点击白水晶 → 仅第 54 位变为白水晶
#   点击空白处 → 取消选中
#
# 场景 3：整体换色
#   选材面板点击檀香 → 所有主珠变为檀香 → 第 54 位也变为檀香
```

---

### Phase 5：配件集成

#### 5.1 背云

根据 `accessories` 中 `backcloud` 的启用状态渲染：

```tsx
// mala-preview.tsx 中，在佛头下方
{backCloudEnabled && (
  <div
    className="absolute"
    style={{
      left: '50%',
      top: `calc(50% + ${RING_RADIUS}px + 40px)`,
      transform: 'translate(-50%, -50%)',
      zIndex: 190,
    }}
  >
    <div className="w-14 h-9 rounded-full bg-gradient-to-b from-[#3D7A4E] to-[#1D3A28] border border-[rgba(200,168,92,0.4)]" />
  </div>
)}
```

#### 5.2 弟子珠

背云下方两串小珠：

```tsx
{discipleBeadsEnabled && (
  <div className="absolute flex gap-4"
    style={{
      left: '50%',
      top: `calc(50% + ${RING_RADIUS}px + 70px)`,
      transform: 'translateX(-50%)',
      zIndex: 180,
    }}
  >
    {/* 左侧弟子珠串 */}
    <div className="flex flex-col items-center gap-1.5">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-2 h-2 rounded-full bg-[#4A6FA5]" />
      ))}
      <div className="w-3 h-3 rounded-full bg-[#6B5E48]" />
    </div>
    {/* 右侧弟子珠串 */}
    ...
  </div>
)}
```

#### 5.3 计数器

在环形两侧悬挂两串 10 颗小珠：

- 位置：第 20-21 颗之间（左侧），第 88-89 颗之间（右侧）
- 使用 `getBeadPosition(20)` 等计算挂载点
- 渲染为竖直排列的 10 个 3px 小圆点

#### 5.4 卡子

- 位置：第 7 颗主珠后方（偏移 4px 向外）
- 渲染为一小段金色矩形装饰
- 初始不可交互（后续可支持拖动）

#### 5.5 验证

```bash
# 配件面板切换
# 点击背云 → 预览区佛头下方显示绿色椭圆
# 点击弟子珠 → 背云下方显示两串小珠
# 点击计数器 → 环形两侧显示两串竖直小珠
```

---

### Phase 6：响应式适配

#### 6.1 缩放策略

预览区容器使用百分比宽度，环形半径根据容器宽度动态计算：

```typescript
// mala-preview.tsx 中
function useRingRadius(): number {
  const [radius, setRadius] = useState(260);
  // 监听容器大小变化，使用 ResizeObserver
  // 规则：容器宽度 ≤ 640px → radius = 140
  //       容器宽度 ≤ 1024px → radius = 200
  //       容器宽度 > 1024px → radius = 260
}
```

#### 6.2 触控交互

移动端点击 → 选中高亮，逻辑与桌面端完全一致。
选中后的替换流程也无差异。

#### 6.3 验证

```bash
# 浏览器调试工具检查三个断点
# 375px:  环形完整，可点击选中珠子
# 820px:  环形比例适中
# 1280px: 完整 260px 半径，间距舒适
```

---

## 九、Success Criteria

| Criteria | Verification |
|----------|--------------|
| 骨架始终可见 | 未选材质时显示灰色占位轮廓，结构清晰可辨 |
| 材质分类分配 | 选中主珠材质 → 所有主珠更新；选中三通材质 → 仅佛头更新 |
| 兼容性标签 | 每种材质卡片上显示可用珠子类型（主·顶·腰 / 三通） |
| 单颗替换 | 选中珠子 → 选材质 → 仅该珠子变化，其他不变 |
| 整体换色清空覆盖 | 重新设置主珠材质 → 所有单颗覆盖恢复为主珠材质 |
| 选中高亮 | 选中珠子显示金色高亮环，可取消选中 |
| 全平台一致 | 桌面端和移动端交互行为相同，无差异化分支 |
| 线条完整 | 串绳 + 佛头连接线始终显示 |
| 佛头一体 | 佛头+佛塔渲染为一体，不可拆分 |
| 响应式 | 375px / 820px / 1280px 均完整显示 |
| 构建通过 | `npm run build` 无错误 |
