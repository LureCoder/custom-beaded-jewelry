# Designer 页面设计规格

> 参考来源：https://www.myastris.com/designer
> 创建日期：2026-05-16
> 适用项目：空性念珠 (Kongxing Mala) 定制设计器

---

## 1. 页面概述

### 1.1 核心定位

**Designer 页面是一个 3D 念珠定制设计器**，让用户通过可视化界面设计专属念珠，实时预览效果并下单制作。

### 1.2 用户价值

- **可视化定制**：所见即所得，消除购买不确定性
- **个性化表达**：每个细节都可自定义，体现个人风格
- **决策信心**：3D 预览 + AR 试戴，降低退货率
- **沉浸体验**：交互式设计过程，提升品牌好感度

### 1.3 业务指标

| 指标 | 行业基准 | 说明 |
|------|----------|------|
| 转化率提升 | +45% | 相比静态图片页面 |
| 退货率降低 | -60% | 用户决策更明确 |
| 停留时长 | 4-5x | 交互式体验延长停留 |
| 客单价提升 | +25-30% | 可视化促进升级材质 |

---

## 2. 页面结构

### 2.1 布局架构

```
┌─────────────────────────────────────────────────────────┐
│  Header (导航栏)                                         │
├───────────┬─────────────────────────────┬───────────────┤
│           │                             │               │
│  左侧面板  │      中央 3D 预览区          │   右侧面板     │
│  (材质选择) │      (实时渲染)             │   (搭配选项)   │
│           │                             │               │
│  320px    │      flex-grow              │   280px       │
│           │                             │               │
├───────────┴─────────────────────────────┴───────────────┤
│  底部操作栏 (价格 + CTA)                                  │
│  height: 80px                                            │
└─────────────────────────────────────────────────────────┘
```

### 2.2 响应式适配

| 断点 | 布局 | 说明 |
|------|------|------|
| 移动端 `< 640px` | 单列，底部抽屉式面板 | 3D 预览全屏，面板从底部滑出 |
| 平板 `640-1024px` | 双列，左侧面板 + 右侧预览 | 右侧面板合并到底部 |
| 桌面 `> 1024px` | 三列布局 | 完整三栏设计 |

---

## 3. 核心功能模块

### 3.1 左侧面板：材质选择

**功能：** 选择念珠主体材质

**分类结构：**
```
材质库
├── 木质类
│   ├── 紫檀 (Red Sandalwood)
│   ├── 沉香 (Agarwood)
│   ├── 檀香 (Sandalwood)
│   └── 菩提子 (Bodhi Seed)
│       ├── 星月菩提
│       ├── 凤眼菩提
│       └── 金刚菩提
├── 宝石类
│   ├── 水晶 (Crystal)
│   │   ├── 白水晶
│   │   ├── 紫水晶
│   │   └── 粉晶
│   ├── 玛瑙 (Agate)
│   └── 青金石 (Lapis Lazuli)
└── 半宝石类
    ├── 绿松石 (Turquoise)
    ├── 石榴石 (Garnet)
    └── 月光石 (Moonstone)
```

**UI 组件：**
- 分类标签页（木质 / 宝石 / 半宝石）
- 材质卡片网格（图片 + 名称 + 价格区间）
- 选中状态高亮（金色边框 + 勾选图标）
- 材质详情弹窗（产地、特性、保养建议）

**交互：**
- 点击材质 → 3D 模型实时更新
- Hover 材质卡片 → 显示简要说明 tooltip
- 双击材质卡片 → 打开详情弹窗

---

### 3.2 中央区域：3D 实时预览

**功能：** 实时渲染念珠 3D 模型，支持交互操作

**渲染引擎：**
- 推荐方案：**Three.js** + React Three Fiber
- 备选方案：Babylon.js

**3D 模型要求：**
- 格式：GLTF / GLB
- 多边形数量：单颗珠子 < 5000 polygons
- 纹理尺寸：1024x1024 或 2048x2048
- 材质贴图：PBR (Metalness, Roughness, Normal, AO)

**交互功能：**

| 功能 | 操作方式 | 说明 |
|------|----------|------|
| 旋转查看 | 鼠标拖拽 / 触摸滑动 | 360° 自由旋转 |
| 缩放 | 滚轮 / 双指缩放 | 查看细节 |
| 重置视角 | 点击重置按钮 | 回到默认视角 |
| 自动旋转 | 开关控制 | 展示模式 |
| 聚焦珠子 | 点击单颗珠子 | 高亮并显示详情 |

**视觉效果：**
- 环境光照：HDR 环境贴图（工作室灯光）
- 阴影：软阴影，增强立体感
- 后处理：Bloom（宝石类材质发光效果）

**加载状态：**
- 初始加载：进度条 + "Preparing Studio" 文案
- 材质切换：Loading Spinner（< 1 秒）
- 骨架屏：模型加载时显示占位框

---

### 3.3 右侧面板：搭配选项

**功能：** 配置念珠的配饰和参数

**配置项：**

#### A. 珠数选择
- 108 颗（标准念珠）
- 54 颗（半串）
- 27 颗（手持）
- 自定义数量（输入框）

#### B. 隔珠配置
- 隔珠材质（同主珠 / 异材质）
- 隔珠位置（每 27 颗 / 每 36 颗）
- 隔珠样式（圆珠 / 桶珠 / 莲花珠）

#### C. 配饰选择
```
配饰库
├── 流苏 (Tassel)
│   ├── 颜色选择
│   ├── 长度选择
│   └── 材质（丝线 / 麻绳）
├── 坠饰 (Pendant)
│   ├── 佛头 (Buddha Head)
│   ├── 莲花 (Lotus)
│   ├── 葫芦 (Gourd)
│   └── 自定义图案
└── 计数器 (Counter)
    ├── 铜质计数器
    └── 银质计数器
```

#### D. 尺寸配置
- 珠子直径：6mm / 8mm / 10mm / 12mm
- 手围尺寸：输入或测量工具

**UI 组件：**
- 分组折叠面板（Accordion）
- 单选按钮组
- 颜色选择器
- 数量输入框
- 尺寸测量引导（弹窗）

---

### 3.4 底部操作栏

**功能：** 显示价格和下单操作

**布局：**
```
┌─────────────────────────────────────────────────────────┐
│  总价: ¥688    │    保存设计    │    加入购物车    │    立即结缘   │
│  (实时计算)     │    (次要)      │    (次要)        │    (主要 CTA) │
└─────────────────────────────────────────────────────────┘
```

**价格计算逻辑：**
```typescript
总价 = 基础价格(材质 × 珠数) 
     + 隔珠价格 
     + 配饰价格 
     + 工艺费 
     + 包装费
```

**按钮状态：**
- 默认状态：可点击
- 配置不完整：禁用 + 提示文案
- 加载中：Spinner + 禁用

---

## 4. 高级功能

### 4.1 AR 试戴

**功能：** 通过手机摄像头虚拟试戴念珠

**技术方案：**
- WebXR API（Chrome Android）
- Model-viewer 组件（Google）
- 备选：8thWall（第三方 AR 平台）

**交互流程：**
1. 点击 "AR 试戴" 按钮
2. 请求摄像头权限
3. 显示手部识别引导
4. 念珠模型叠加到手腕位置
5. 支持拍照保存分享

**兼容性：**
- Android Chrome：完整支持
- iOS Safari：部分支持（需 WebXR iOS Quick Look）
- 桌面端：隐藏按钮或显示 "请在手机端体验"

---

### 4.2 设计保存与分享

**功能：** 保存设计并生成分享链接

**数据结构：**
```typescript
interface DesignConfig {
  id: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
  
  materials: {
    main: Material;
    spacer?: Material;
  };
  
  beads: {
    count: number;
    diameter: number;
  };
  
  accessories: {
    tassel?: TasselConfig;
    pendant?: PendantConfig;
    counter?: CounterConfig;
  };
  
  wristSize: number;
  totalPrice: number;
}
```

**分享方式：**
- 生成唯一链接：`/design/{id}`
- 社交媒体分享：微信、微博、Pinterest
- 二维码：扫码查看设计
- 截图：自动生成带品牌水印的预览图

---

### 4.3 AI 推荐搭配

**功能：** 根据用户选择推荐最佳搭配

**推荐逻辑：**
- 材质匹配：紫檀 → 金色隔珠 + 红色流苏
- 风格匹配：简约风 → 少配饰；华丽风 → 多配饰
- 价格优化：在预算内推荐最佳组合

**UI：**
- "智能推荐" 按钮
- 推荐结果卡片（3 个方案）
- 一键应用推荐配置

---

### 4.4 尺寸测量工具

**功能：** 帮助用户准确测量手围

**方法 A：参照物对比**
- 显示标准信用卡轮廓
- 用户将卡片贴近手腕
- 通过对比计算手围

**方法 B：输入周长**
- 使用软尺测量
- 输入数值（单位：cm）

**方法 C：常见尺寸参考**
```
女性平均：15-17cm
男性平均：17-19cm
儿童：12-14cm
```

---

## 5. 技术实现

### 5.1 技术栈

| 层级 | 技术选型 | 说明 |
|------|----------|------|
| 3D 渲染 | Three.js + React Three Fiber | React 生态，开发效率高 |
| 状态管理 | Zustand | 轻量，适合复杂配置状态 |
| UI 组件 | Tailwind CSS + Radix UI | 无障碍友好 |
| 数据持久化 | LocalStorage + API | 本地草稿 + 云端保存 |
| 图片优化 | Next.js Image | 自动优化和懒加载 |

### 5.2 性能优化

**3D 模型优化：**
- LOD (Level of Detail)：根据距离切换模型精度
- 实例化渲染：相同珠子使用 InstancedMesh
- 纹理压缩：使用 KTX2 格式
- 懒加载：按需加载材质贴图

**代码分割：**
```typescript
const Designer3D = lazy(() => import('./Designer3D'));
```

**缓存策略：**
- 材质数据：IndexedDB 缓存
- 3D 模型：Service Worker 缓存
- 用户配置：LocalStorage

### 5.3 无障碍支持

- 键盘导航：Tab 键切换选项，Enter 确认
- 屏幕阅读器：ARIA 标签描述当前配置
- 高对比度模式：支持系统设置
- 减少动画：尊重 prefers-reduced-motion

---

## 6. 数据模型

### 6.1 材质数据

```typescript
interface Material {
  id: string;
  name: {
    zh: string;
    en: string;
  };
  category: 'wood' | 'gemstone' | 'semi-precious';
  
  images: {
    hero: string;
    thumb: string;
    texture: string; // 3D 贴图
  };
  
  properties: {
    hardness: number;
    density: number;
    origin: string;
    energy?: string; // 能量属性（如：招财、辟邪）
  };
  
  pricing: {
    basePrice: number; // 单颗价格
    pricePerMm: number; // 每毫米加价
  };
  
  care: string[]; // 保养建议
}
```

### 6.2 配置状态

```typescript
interface DesignerState {
  // 当前配置
  config: DesignConfig;
  
  // UI 状态
  ui: {
    activePanel: 'materials' | 'accessories' | 'size';
    isARMode: boolean;
    isSaving: boolean;
  };
  
  // 3D 状态
  scene: {
    cameraPosition: Vector3;
    selectedBead: number | null;
    autoRotate: boolean;
  };
  
  // 操作
  actions: {
    setMaterial: (material: Material) => void;
    setBeadCount: (count: number) => void;
    addAccessory: (accessory: Accessory) => void;
    removeAccessory: (id: string) => void;
    saveDesign: () => Promise<string>;
    loadDesign: (id: string) => Promise<void>;
    resetConfig: () => void;
  };
}
```

---

## 7. 用户旅程

### 7.1 新用户旅程

```
进入页面
  ↓
加载 3D 引擎 (进度条)
  ↓
显示默认念珠 (紫檀 108 颗)
  ↓
浏览材质库 → 选择心仪材质
  ↓
调整珠数和尺寸
  ↓
添加配饰 (可选)
  ↓
查看 3D 预览 → 满意？
  ↓ 是
保存设计 / 加入购物车 / 立即下单
  ↓
填写收货信息 → 完成订单
```

### 7.2 回访用户旅程

```
进入页面
  ↓
检测 LocalStorage 草稿
  ↓ 有草稿
提示 "继续上次设计？"
  ↓ 是
加载草稿配置
  ↓
继续编辑 → 完成下单
```

---

## 8. 错误处理

### 8.1 加载失败

| 场景 | 处理方式 |
|------|----------|
| 3D 引擎加载失败 | 显示降级版（2D 图片切换） |
| 材质贴图加载失败 | 显示占位图 + 重试按钮 |
| 网络断开 | 显示离线提示 + 本地缓存数据 |

### 8.2 配置错误

| 场景 | 处理方式 |
|------|----------|
| 手围尺寸不匹配 | 提示 "建议选择更小直径珠子" |
| 预算不足 | 显示当前总价 + 推荐平价替代 |
| 配置不完整 | 禁用下单按钮 + 高亮缺失项 |

---

## 9. 分析与埋点

### 9.1 关键事件

```typescript
// 进入设计器
track('designer_enter', { source: 'nav' | 'product_page' });

// 材质选择
track('material_selected', { 
  material_id: string, 
  category: string,
  price_tier: string 
});

// 配置变更
track('config_changed', { 
  field: string, 
  old_value: any, 
  new_value: any 
});

// AR 试戴
track('ar_tryon', { material_id: string });

// 设计保存
track('design_saved', { 
  design_id: string, 
  total_price: number,
  config_duration: number // 秒
});

// 下单转化
track('order_created', { 
  design_id: string, 
  total_price: number,
  has_accessories: boolean 
});
```

### 9.2 漏斗分析

```
进入设计器 → 选择材质 → 调整配置 → 查看预览 → 保存/下单
   100%         70%         50%         40%         15%
```

---

## 10. 未来扩展

### 10.1 短期规划（3 个月）

- [ ] 完成基础 3D 渲染
- [ ] 实现材质选择和配置面板
- [ ] 接入购物车和下单流程
- [ ] 添加设计保存功能

### 10.2 中期规划（6 个月）

- [ ] AR 试戴功能
- [ ] AI 推荐搭配
- [ ] 社交分享
- [ ] 尺寸测量工具

### 10.3 长期规划（12 个月）

- [ ] VR 沉浸式设计体验
- [ ] 实时协作设计（多人）
- [ ] 设计师入驻（UGC 设计）
- [ ] 区块链确权（NFT）

---

## 11. 参考资料

- [Three.js 官方文档](https://threejs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [3D Bracelet Configurator Best Practices](https://hexacoder.com/3d-product-configurator/bracelet)
- [Jewelry 3D Visualization UX](https://visionthree.io/industries/jewelry/)

---

## 12. 附录：空性设计适配

### 12.1 设计原则映射

| 空性原则 | Designer 页面体现 |
|----------|-------------------|
| 静 | 无闪烁动画，过渡平滑 |
| 空 | 界面留白充足，呼吸感 |
| 寂 | 金色仅用于 CTA 和选中态 |
| 简 | 面板分组清晰，不堆砌选项 |
| 质 | 3D 渲染高质量，材质真实 |
| 慢 | 交互过渡 600ms，从容 |

### 12.2 品牌文案

| 场景 | 中文 | 英文 |
|------|------|------|
| 页面标题 | 定制设计 | Custom Design |
| 加载提示 | 准备工作室... | Preparing Studio... |
| 材质选择 | 择材 | Choose Material |
| 配饰搭配 | 搭配 | Accessories |
| 预览确认 | 观览 | Preview |
| 下单 CTA | 结缘 | Connect |

---

**文档版本：** v1.0  
**最后更新：** 2026-05-16  
**维护者：** Kongxing Mala Team
