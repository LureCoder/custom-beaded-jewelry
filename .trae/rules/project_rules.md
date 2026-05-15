# 项目规则 · Kongxing Mala

> 本规则文件在每次对话中自动生效。详细参考文档见 `.trae/skills/` 下的对应 SKILL.md。
>
> 品牌体系：**空性念珠 (Kongxing Mala)** | 品牌标志：**NIAN·ZHU** | 设计体系：**空性设计 (Kongxing Design)**

---

## AI 行为准则

继承自 [karpathy-guidelines](.trae/skills/karpathy-guidelines/SKILL.md)，每次编码必须遵守。

### A. 先思考再编码

- 陈述你的假设，不确定就问
- 如有多种实现方式，列出取舍，不偷选
- 如存在更简单的方案，主动提出
- 模糊不清时，停下来指明困惑

### B. 简单优先

- 不多写一个没被要求的功能
- 不为单次使用创建抽象层
- 不写不可能发生的错误处理
- 如 200 行能缩到 50 行，重写

### C. 手术刀式修改

- 只动必须动的行，不顺手"改进"旁边没改的代码
- 不改格式、不重构没坏的东西、匹配现有风格
- 改动产生的孤儿 import/变量必须清理
- 不删除已有的死代码（可提及但不删）

### D. 目标驱动执行

- 每个任务需明确可验证的成功标准
- 多步骤任务先列简要计划，每步标注验证方式
- 循环直到验证通过

---

## 通用规则

### 1. Storybook 强制要求

每个 UI 组件必须有对应的 `.stories.tsx` 文件，位置在组件同级目录下：

```
src/components/
├── ui/
│   ├── button.tsx
│   ├── button.stories.tsx    ✅ 必须
│   ├── card.tsx
│   ├── card.stories.tsx      ✅ 必须
│   └── ...
├── layout/
│   ├── navigation.tsx
│   ├── navigation.stories.tsx ✅ 必须
│   └── ...
└── home/
    ├── hero.tsx
    ├── hero.stories.tsx      ✅ 必须
    └── ...
```

### 2. 国际化强制

所有面向用户的 UI 文本必须通过 next-intl 翻译函数获取，禁止硬编码：

```tsx
// ❌ 禁止
<h1>一念清净 一串菩提</h1>

// ✅ 正确（Server Component）
const t = await getTranslations('hero');
<h1>{t('slogan')}</h1>

// ✅ 正确（Client Component）
const t = useTranslations('hero');
<h1>{t('slogan')}</h1>
```

新增文案时，必须同时在 `messages/zh.json` 和 `messages/en.json` 中添加对应 key。

### 3. Tailwind CSS 类顺序

CSS 类按「布局 → 视觉 → 交互」顺序排列：

```
布局:       flex, grid, relative, absolute, w-full, max-w-, mx-auto, gap-, p-, m-
视觉:      bg-, text-, border-, rounded-, shadow-, font-, tracking-, opacity-
交互:      hover:, group-hover:, focus-visible:, transition-, duration-, ease-, cursor-, select-none
```

示例：

```tsx
// ❌ 禁止 — 无顺序
<div className="text-sm border cursor-pointer hover:bg-accent flex p-4 rounded-lg">

// ✅ 正确 — 布局 → 视觉 → 交互
<div className="flex p-4 rounded-lg border text-sm cursor-pointer hover:bg-accent">
```

### 4. 项目配置文件不可修改

```
❌ 禁止修改 tsconfig.json 中的 paths 别名
❌ 禁止修改 next.config.ts 中的基础配置
✅ 允许修改 globals.css 中的 CSS 变量
✅ 允许修改 package.json 添加依赖
```

---

## 代码风格

### 5. 组件导出

使用具名导出，不使用 default export：

```tsx
// ✅ 正确
export { Button };

// ❌ 禁止
export default Button;
```

### 6. TypeScript 优先

- 必须为所有 props 定义接口
- 使用 `forwardRef` 包装需要 ref 的组件
- 避免使用 `any`，优先使用 `unknown` 或泛型

### 7. 注释规范

不写赘余注释，代码本身应具有自描述性：

```tsx
// ❌ 禁止 — 赘余注释
// 设置状态
const [count, setCount] = useState(0);

// ✅ 允许 — 解释为什么（why），不解释是什么（what）或怎么做（how）
// 使用 600ms 以匹配空性设计的慢动画规范
const DURATION_SLOW = 600;
```

---

## 空性设计规则

### 8. 设计原则

遵循六字核心：**静 · 空 · 寂 · 简 · 质 · 慢**

| 维度 | 规则 |
|------|------|
| 静 | 不使用粒子 Canvas、旋转光效、水波纹等动效 |
| 空 | 区块间距 `py-32`，内容最大宽度 `1080px` |
| 寂 | 金色仅用于 Logo 和 CTA hover，其余使用辅助色 |
| 简 | 导航不超过 3 项，Footer 不超过三行 |
| 质 | 使用 CSS 变量引用色值，不硬编码颜色 |
| 慢 | 所有过渡动画使用 `duration-600`，缓动 `ease-out` |

### 9. 区块标题格式

统一使用 `· 字 ·` 格式：

```tsx
// 区块标题使用此格式
<h2 className="font-serif text-2xl tracking-[0.15em] text-[var(--color-text-muted)]">
  · 观 ·
</h2>
```

### 10. CTA 文案规范

| 场景 | 中文 | 英文 |
|------|------|------|
| 首页主按钮 | 启程 | Begin |
| 首页副按钮 | 观览 | Browse |
| 产品详情 | 结缘 | Connect |
| 品牌故事 | 静心之旅 | Journey inward |
| 列表入口 | 观览全部 → | View all → |

---

## 产品规则

### 11. 产品命名

格式：**材质 + 工艺 + 珠数 + "念珠"**

```
凤眼菩提 手工打磨 108 念珠
印度小叶紫檀 精工 108 念珠
```

禁止使用：精品、至尊、极品、限量、爆款、秒杀等营销词汇。

### 12. 产品价格

- 所有价格以 8 结尾
- 不设折扣价/原价对比
- 不设满减/凑单

---

## 构建与提交

### 13. 提交前检查

```bash
npm run lint        # 代码检查
npm run build       # 构建验证（必须通过）
```

### 14. 禁止提交的内容

```
node_modules/
.next/
.env
.env.local
*.swp
storybook-static/
```
