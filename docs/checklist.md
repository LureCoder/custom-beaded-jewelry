# 网站开发完整清单

> 项目：**空性念珠 (Kongxing Mala)** — 手工定制念佛念珠独立站
>
> ✅ = 已完成 &ensp; 🔄 = 进行中 &ensp; ⬜ = 待开始 &ensp; ❌ = 已废弃（不符合空性设计）

---

## 阶段〇：项目初始化与环境配置

### 〇.1 项目脚手架

- [✅] Next.js 16 + TypeScript 项目创建
- [✅] Tailwind CSS v4 配置
- [✅] ESLint 配置
- [✅] 目录结构规划

### 〇.2 目录结构

```
src/
├── app/                    # App Router 页面
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页（已开发）
│   ├── customize/          # 定制工具（占位）
│   ├── shop/               # 商城（占位）
│   ├── encyclopedia/       # 百科（占位）
│   └── about/              # 关于（已开发）
├── components/
│   ├── ui/                 # UI 组件 (Button/Card/Badge/SectionTitle/ScrollReveal/Skeleton)
│   ├── layout/             # 导航 + Footer
│   └── home/               # 首页区块 (Hero/Steps/Featured/Materials/BrandStory)
├── lib/
│   ├── utils.ts
│   ├── constants.ts
│   ├── fonts.ts
│   └── theme.ts
├── types/
│   └── index.ts
└── docs/design/            # 设计文档
```

### 〇.3 依赖安装

- [✅] Framer Motion
- [✅] next-themes
- [✅] 字体：Noto Serif SC, Noto Sans SC, Cormorant Garamond, Inter
- [✅] Storybook
- [✅] shadcn/ui 基础
- [⬜] next-intl（国际化 — 待安装）
- [⬜] @heroicons/react（已安装但尚未使用）

**验收标准**：`npm run dev` 正常启动，`npm run build` 通过。

---

## 阶段一：设计系统落地

### 1.1 品牌体系

- [✅] 品牌名确定：空性念珠 (Kongxing Mala)
- [✅] 品牌标志：NIAN·ZHU（导航/Footer）
- [✅] 设计体系命名：空性设计 (Kongxing Design)
- [⬜] Logo SVG 图形（如需）
- [⬜] Favicon

### 1.2 CSS 变量与主题系统

- [✅] 深色主题（般若 · Prajna）CSS 变量
- [✅] 浅色主题（素简 · Shuddha）CSS 变量
- [✅] next-themes 集成（class 策略，跟随系统）
- [⬜] 主题切换效果（手动切换 UI — 当前跟随系统，无切换器）

### 1.3 全局样式

- [✅] 排版层级（Display1/2, Title1/2, Body, Small, Caption）
- [✅] 间距系统（space-1 ~ space-24）
- [✅] 圆角系统（radius-sm ~ radius-full）
- [✅] 缓动曲线（ease-default, ease-out, ease-slow, ease-spring）
- [✅] Tailwind CSS v4 自定义 `@theme` 配置
- [⬜] 全局滚动条样式
- [⬜] 全局 `prefers-reduced-motion` 支持

### 1.4 基础 UI 组件

| 组件 | 状态 | Storybook |
|------|------|-----------|
| **Button** | ✅ 已完成（5 变体：default/secondary/outline/ghost/destructive） | ✅ |
| **Card** | ✅ 已完成（4 变体：default/swatch/elevated/outlined，8 子组件精简为 7 个） | ✅ |
| **Badge** | ✅ 已完成（3 变体：default/accent/outline） | ✅ |
| **SectionTitle** | ✅ 已完成（`· 字 ·` 格式 + 装饰线） | ✅ |
| **ScrollReveal** | ✅ 已完成（800ms 慢动画，12px 微偏移） | ✅ |
| **LoadingSkeleton** | ✅ 已完成（3 变体：text/card/image + SkeletonCard） | ✅ |
| Button Effects | ✅ 已完成（9 种动画效果） | ✅ |
| StaggerGrid | ❌ 已废弃 — 不需要，ScrollReveal 加 delay 即可实现 |

---

## 阶段二：布局框架与导航

### 2.1 根布局 (Root Layout)

- [✅] `<html lang="zh-CN">` + 主题 class
- [✅] 字体变量注入
- [✅] SEO 元数据（title, description, OG）
- [⬜] JSON-LD 结构化数据
- [⬜] 主题内联脚本（防闪烁）

### 2.2 导航栏 (Navigation)

- [✅] 品牌标志：`NIAN·ZHU`
- [✅] 导航链接：商城 · 百科 · 关于（3 项，极简）
- [✅] 滚动效果：透明 → `bg-[var(--color-bg-primary)]`
- [✅] 移动端：汉堡菜单
- [⬜] 语言切换器（中 / EN）
- [⬜] 购物车图标

**已移除**（符合空性设计）：
- ❌ CTA 按钮"开始定制"（Hero 区负责）
- ❌ 主题切换器（跟随系统）
- ❌ 链接悬停下划线动画（仅颜色过渡）
- ❌ 首页链接（Logo 本身可返回）

### 2.3 页脚 (Footer)

- [✅] 品牌名：`NIAN·ZHU`
- [✅] 导航：商城 · 百科 · 关于
- [✅] 版权信息
- [⬜] 语言切换器（如需同步放置）

**已移除**：
- ❌ 多列链接组（支持、关注等）
- ❌ 社交媒体图标
- ❌ Newsletter 订阅
- ❌ 支付方式图标

---

## 阶段三：首页开发

### 3.1 Hero 区域

- [✅] 全屏静态背景（纯色渐变 + 固定径向光晕，无粒子）
- [✅] 品牌名 `NIAN·ZHU`
- [✅] Slogan：一念清净 一串菩提
- [✅] 英文副标：Every Bead a Meditation
- [✅] 双 CTA 幽灵按钮：启程 / 观览
- [✅] 滚动指示器（底部箭头，呼吸动画 3s）
- [✅] 响应式适配

### 3.2 择 · 合 · 成（原"定制流程"）

- [✅] 三列自然排列（无编号、无图标、无连接线）
- [✅] 单字标题：择·合·成
- [✅] 区块标题格式 `· 择 ·`
- [⬜] 滚动触发出场动画（ScrollReveal 包裹）

### 3.3 观（精选念珠）

- [✅] 4 列产品网格
- [✅] 4:5 竖图占位（gradient 色块）
- [✅] 产品名 + 副标题（无价格/无购物车按钮）
- [✅] "观览全部 →" 链接
- [⬜] 替换占位色块为实际产品图片
- [⬜] 滚动入场动画

### 3.4 质（材质与工艺）

- [✅] 左右交错图文布局
- [✅] 2 款材质展示（紫檀 · Red Sandalwood / 白水晶 · Clear Quartz）
- [✅] 材质描述 + 禅意寄语
- [⬜] 替换占位色块为实际材质微距图

### 3.5 寂（品牌寄语）

- [✅] 三段式品牌文案
- [✅] 禅意寄语
- [✅] CTA：静心之旅

### 3.6 响应式

- [✅] 移动端单列布局
- [✅] 平板适配
- [✅] 桌面端完整布局

---

## 阶段四：定制工具页

### 当前状态：⬜ 占位页面

- [⬜] 路由 `/customize`
- [⬜] 分步引导布局（择 · 合 · 成）
- [⬜] Step 1：选材（材质选择网格）
- [⬜] Step 2：搭配（隔珠、流苏、坠饰选择）
- [⬜] Step 3：预览与下单
- [⬜] 3D 预览（react-three-fiber，可选）
- [⬜] 状态管理（Zustand）

---

## 阶段五：商城页

### 当前状态：⬜ 占位页面

- [⬜] 路由 `/shop`
- [⬜] 产品网格（4:5 竖图卡片）
- [⬜] 筛选（材质、价格区间）
- [⬜] 分页/无限滚动
- [⬜] 加载态 Skeleton
- [⬜] 空态/错误态

---

## 阶段六：商品详情页

### 当前状态：⬜ 待开发

- [⬜] 路由 `/shop/[slug]`
- [⬜] 图片画廊
- [⬜] 产品信息（材质、规格、价格）
- [⬜] 结缘按钮（替代"加入购物车"）
- [⬜] 相关推荐

---

## 阶段七：百科页

### 当前状态：⬜ 占位页面

- [⬜] 路由 `/encyclopedia`
- [⬜] 分类导航
- [⬜] 文章卡片
- [⬜] 文章详情 `/encyclopedia/[slug]`

---

## 阶段八：关于页

### 当前状态：✅ 基础内容

- [✅] 路由 `/about`
- [✅] 品牌介绍文案
- [⬜] 扩展品牌故事内容
- [⬜] 工匠/工艺内容

---

## 阶段九：全局功能

### 9.1 国际化 (i18n) — 高优先级

- [⬜] 安装 `next-intl`
- [⬜] 配置 `middleware.ts`（语言检测 + 重定向）
- [⬜] 创建 `messages/zh.json`
- [⬜] 创建 `messages/en.json`
- [⬜] 创建 `src/i18n/routing.ts`
- [⬜] 创建 `src/i18n/request.ts`
- [⬜] 改造 `[locale]/` 路由组
- [⬜] 创建语言切换器组件
- [⬜] 现有文案全部迁移至翻译文件

### 9.2 SEO

- [⬜] hreflang 标签
- [⬜] Sitemap（含双语 URL）
- [⬜] JSON-LD 结构化数据
- [⬜] robots.txt
- [⬜] 各页面独立 `generateMetadata`

### 9.3 状态管理

- [✅] 主题状态（next-themes）
- [⬜] 购物车状态（Zustand）
- [⬜] 定制状态（Zustand）

### 9.4 通用组件

- [⬜] 404 页面
- [⬜] 500 错误页面
- [⬜] 骨架屏加载态（组件已建，待集成）

---

## 阶段十：产品数据

### 10.1 产品体系

- [✅] 产品线规划（菩提/木料/水晶/玛瑙 四大系列）
- [✅] 定价策略
- [✅] 命名规范
- [⬜] 产品 JSON 数据文件
- [⬜] 产品图片收集与处理

### 10.2 图片素材

- [⬜] 产品主图（4:5 竖图，深色背景，至少 4 款）
- [⬜] 材质微距（1:1 方形，至少 2 款）
- [⬜] Logo 图形（如需）
- [⬜] Favicon

---

## 阶段十一：购物车与结算

### 当前状态：⬜ 待开发

- [⬜] 购物车状态管理
- [⬜] 购物车面板/页面
- [⬜] 数量/删除操作
- [⬜] 结算页面
- [⬜] 支付集成（Stripe）

---

## 阶段十二：配置与工具

### 12.1 项目配置

- [✅] `.trae/rules/project_rules.md`（14 条全局规则）
- [✅] `.trae/skills/`（5 个 skill）

| Skill | 状态 | 说明 |
|-------|------|------|
| `kongxing-design` | ✅ | 空性设计体系 |
| `kongxing-mala` | ✅ | 产品品牌体系 |
| `i18n-constraint` | ✅ | 国际化约束 |
| `component-storybook` | ✅ | Storybook 强制要求 |
| `karpathy-guidelines` | ✅ | AI 编码行为准则 |

- [✅] 文档体系

| 文档 | 状态 |
|------|------|
| `docs/design/homepage.md` | ✅ 首页设计 |
| `docs/design/visual-design.md` | ✅ 视觉设计 |
| `docs/design/interaction-design.md` | ✅ 交互动效 |
| `docs/design/page-structure.md` | ✅ 页面结构 |
| `docs/design/image-requirements.md` | ✅ 图片素材需求 |

### 12.2 Storybook

- [✅] Storybook 配置（v10）
- [✅] 6 个组件的 stories（Button/Card/Badge/SectionTitle/ScrollReveal/Skeleton）
- [✅] Button Effects 展示页
- [⬜] 布局组件 stories（Navigation/Footer）
- [⬜] 首页区块 stories（Hero/Steps/Featured/Materials/BrandStory）

---

## 阶段十三：性能与上线

### 当前状态：⬜ 待开发

- [⬜] 图片优化（next/image + WebP）
- [⬜] 组件懒加载
- [⬜] Lighthouse 优化
- [⬜] Vercel 部署
- [⬜] 自定义域名
- [⬜] 分析工具接入
- [⬜] 错误监控

---

## 速查表

### 页面状态总览

| 页面 | 路由 | 状态 | 优先级 |
|------|------|------|--------|
| 首页 | `/` | ✅ 已完成 | ⭐⭐⭐ |
| 定制工具 | `/customize` | ⬜ 占位 | ⭐⭐⭐ |
| 商城 | `/shop` | ⬜ 占位 | ⭐⭐⭐ |
| 商品详情 | `/shop/[slug]` | ⬜ 未开始 | ⭐⭐⭐ |
| 百科 | `/encyclopedia` | ⬜ 占位 | ⭐⭐ |
| 关于 | `/about` | ✅ 基础内容 | ⭐⭐ |
| 购物车 | `/cart` | ⬜ 未开始 | ⭐⭐⭐ |
| 结算 | `/checkout` | ⬜ 未开始 | ⭐⭐⭐ |

### 核心依赖状态

| 依赖 | 状态 |
|------|------|
| next-intl | ⬜ 待安装 |
| Zustand | ✅ 已安装 |
| Stripe | ✅ 已安装 |
| react-three-fiber | ✅ 已安装（定制页备用） |
| @dnd-kit | ✅ 已安装（定制页备用） |
| react-colorful | ✅ 已安装（定制页备用） |
| fabri-pix | ✅ 已安装（定制页备用） |

### 构建命令

```bash
npm run dev           # 开发服务器
npm run build         # 构建验证（必须通过）
npm run storybook     # Storybook
npm run lint          # 代码检查
```
