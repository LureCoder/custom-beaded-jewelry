---
name: "kongxing-design"
description: "空性设计 — 禅意东方审美网页设计体系。以静·空·寂·简·质·慢为核心理念，融入慢动画诠释空性。Invoke when designing new pages, reviewing UI, or creating components for zen/contemplative brands."
---

# 空性设计 · Kongxing Design

空性设计是一套以**禅意东方审美**为核心的网页设计体系，服务于 **空性念珠 (Kongxing Mala)** 品牌及同类 contemplative 品牌。

## 核心六字

```
静 · 空 · 寂 · 简 · 质 · 慢
```

| 维度 | 标准 | 落地方式 |
|------|------|----------|
| **静** | 没有不必要的动效 | 无粒子背景、无旋转光效、无水波纹，能用静态就不用动效 |
| **空** | 留白足够 | 区块间距 `py-32`，内容最大宽度 `1080px`，区块标题使用单字 |
| **寂** | 色彩极度克制 | 强调色仅用于 Logo 和 CTA hover，其余均为低对比辅助色 |
| **简** | 元素能减尽减 | 导航栏不超过 3 项，无冗余 CTA，无主题切换器 |
| **质** | 真实材质感 | 深色背景使用微噪声叠加，浅色背景模拟宣纸暖白 |
| **慢** | 交互节奏从容 | 过渡动画统一 `800ms ease-out`，用慢动画诠释空性 |

---

## 慢动画体系 · 空性的诠释

慢是空性设计的灵魂。常规 UI 动画追求快速反馈（`150-300ms`），空性设计反其道而行——**用慢让用户感受到时间的存在**。

### 原则

1. **可察觉的缓慢**：所有过渡 `600-1200ms`，让用户意识到变化正在发生
2. **自然的缓动**：统一使用 `cubic-bezier(0.25, 0.1, 0.25, 1)`，模拟物理世界中的缓慢运动
3. **克制触发**：动画只在进入视口时触发一次，不循环、不重复
4. **呼吸感**：透明度呼吸动画周期 `3-6s`，模拟深呼吸节奏

### 缓动曲线

```css
/* 预设可用 */
--ease-slow: cubic-bezier(0.25, 0.1, 0.25, 1);   /* 慢入慢出 — 主力 */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* 弹性 — 仅用于装饰 */
```

### 典型动画场景

| 场景 | 时长 | 缓动 | 说明 |
|------|------|------|------|
| 页面加载入场 | `1000ms` | `ease-slow` | 内容从 `opacity: 0 → 1`，`translateY(12px) → 0` |
| 滚动入场 | `800ms` | `ease-slow` | ScrollReveal 效果，错开 `150ms` |
| 悬停过渡 | `600ms` | `ease-slow` | 颜色、边框变化 |
| 导航栏背景 | `800ms` | `ease-slow` | 透明 → 磨砂玻璃 |
| 主题切换 | `800ms` | `ease-slow` | 整体过渡 |
| 呼吸动画 | `4s` | `ease-in-out` | 透明度 `0.3 ↔ 0.7` |
| 烟雾/飘浮 | `12-20s` | `linear` | 如使用，周期要极长 |

### 空性动画示例

```css
/* 禅意入场 — 物体从上方缓缓沉降 */
@keyframes descend {
  0% {
    opacity: 0;
    transform: translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 呼吸 — 模拟冥想节奏 */
@keyframes breathe {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

/* 烟缕 — 极慢上升，几乎不可察觉 */
@keyframes smoke {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  10% { opacity: 0.06; }
  90% { opacity: 0.04; }
  100% {
    transform: translateY(-60px) scale(1.5);
    opacity: 0;
  }
}
```

---

## 色彩体系

### 深色主题 · 般若 · Prajna（默认）

```css
--color-bg-primary: #0C0C0A;
--color-bg-secondary: #161612;
--color-bg-tertiary: #1E1E1A;
--color-bg-glass: rgba(12, 12, 10, 0.78);
--color-text-primary: #F5F0E8;
--color-text-secondary: #A09888;
--color-text-muted: #6B6560;
--color-accent: #FFB900;           /* Amber 400 — 琥珀光 */
--color-accent-hover: #FFD230;     /* Amber 300 */
--color-accent-muted: rgba(255, 185, 0, 0.18);
--color-border: rgba(255, 255, 255, 0.06);
--color-border-hover: rgba(255, 185, 0, 0.25);
--color-shadow: rgba(0, 0, 0, 0.4);
--color-glow: rgba(255, 185, 0, 0.1);
--gradient-hero: linear-gradient(180deg, #0C0C0A 0%, #1A1610 100%);
```

### 浅色主题 · 素简 · Shuddha

```css
--color-bg-primary: #F5F5F0;
--color-bg-secondary: #EBEBE5;
--color-bg-tertiary: #E0E0D8;
--color-bg-glass: rgba(245, 245, 240, 0.78);
--color-text-primary: #1C1B16;
--color-text-secondary: #6B6B60;
--color-text-muted: #9E9E94;
--color-accent: #E17100;           /* Amber 600 */
--color-accent-hover: #FE9A00;     /* Amber 500 */
--color-accent-muted: rgba(225, 113, 0, 0.12);
--color-border: rgba(28, 27, 22, 0.08);
--color-border-hover: rgba(225, 113, 0, 0.2);
--color-shadow: rgba(28, 27, 22, 0.08);
--color-glow: rgba(225, 113, 0, 0.08);
--gradient-hero: linear-gradient(180deg, #F5F5F0 0%, #EBEBE5 100%);
```

### 金色使用规则

```
✅ 允许使用金色的场景：
  - 品牌 Logo / 品牌名
  - CTA 按钮 hover 态
  - 悬停时的装饰性光晕

❌ 禁止使用金色的场景：
  - 普通文字
  - 图标默认态
  - 边框默认态
  - 装饰元素
  - 多重发光
```

**禅意的高级感来自于对强调色的极度克制。** 如果所有地方都在发光，那就没有光了。

---

## 字体系统

```css
/* 中文字体 */
--font-display: Noto Serif SC;    /* 700 — 大标题、品牌名 */
--font-title: Noto Serif SC;      /* 600 — 章节标题 */
--font-body: Noto Sans SC;        /* 300/400 — 正文 */

/* 西文字体 */
--font-english-display: Cormorant Garamond;  /* 700 italic — 品牌标语 */
--font-english-body: Inter;                  /* 400 — 英文正文 */

/* 字号层级 */
--display1: 64px / 4rem;    /* Hero 主标题 */
--display2: 48px / 3rem;    /* 章节大标题 */
--title1: 32px / 2rem;      /* 区块标题 */
--title2: 24px / 1.5rem;    /* 产品名称 */
--body: 16px / 1rem;        /* 正文 */
--small: 14px / 0.875rem;   /* 辅助文字 */
--caption: 12px / 0.75rem;  /* 标签、脚注 */
```

### 使用规范

- **中英文混排**：中文字体后跟英文/数字时，加空格
- **标题**：使用 `font-serif`（Noto Serif SC / Cormorant Garamond）
- **正文**：使用 `font-[300]` 细字重
- **辅助信息**：`font-[200]` + `--color-text-muted`
- **英文字母间距**：`tracking-[0.1em]` 到 `tracking-[0.2em]`，营造呼吸感
- **英文大写**：用于导航、按钮、Footer 等辅助元素

---

## 间距系统

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;    /* 区块间主力间距 */
```

### 区块间距

| 场景 | 桌面端 | 移动端 |
|------|--------|--------|
| 区块间距 | `py-32` | `py-20` |
| 区块内间距 | `gap-16` | `gap-10` |
| 内容 padding | `px-24` | `px-6` |
| 内容最大宽度 | `1080px` | 100% |

**空性的留白原则**：当不确定该用多少间距时，加倍。额外的空白本身就是设计。

---

## 圆角

```css
--radius-sm: 4px;   /* 小元素、标签 */
--radius-md: 8px;   /* 卡片、按钮、输入框 */
--radius-lg: 16px;  /* 大卡片、弹窗 */
--radius-xl: 24px;  /* 特殊容器 */
--radius-full: 9999px;
```

---

## 光影与氛围

### 发光效果

克制而有层次的发光：

```css
/* 品牌光晕 — 仅用于重要元素 */
box-shadow: 0 0 20px rgba(255, 185, 0, 0.15);

/* 悬浮光晕 — 卡片 hover 时微妙发光 */
box-shadow: 0 8px 32px rgba(201, 169, 110, 0.08);

/* Hero 背景光晕 — 一个静态的径向渐变，不动画 */
background: radial-gradient(circle at 50% 40%, rgba(255,185,0,0.05) 0%, transparent 60%);
```

### Hero 背景

```css
/* 标准 Hero 背景 — 深色渐变 + 一个静态径向光晕，无粒子 */
background:
  radial-gradient(circle at 50% 40%, rgba(255,185,0,0.05) 0%, transparent 60%),
  linear-gradient(180deg, #0C0C0A 0%, #1A1610 100%);
```

**禁止**：粒子 Canvas、旋转光效、动态渐变等任何动画背景。

---

## 区块标题规范

所有区块标题使用统一格式：

```
· 单字 ·
```

```html
<div class="text-center">
  <div class="w-8 h-px bg-[var(--color-border)] mx-auto mb-4" />
  <h2 class="font-serif text-2xl tracking-[0.15em] text-[var(--color-text-muted)]">
    · 字 ·
  </h2>
  <div class="w-8 h-px bg-[var(--color-border)] mx-auto mt-4" />
</div>
```

### 常用区块字

| 区块 | 字 | 含义 |
|------|-----|------|
| 定制流程 | 择 | 择物、选择 |
| 精选商品 | 观 | 观看、欣赏 |
| 材质工艺 | 质 | 质地、品质 |
| 品牌故事 | 寂 | 寂静、禅寂 |

---

## CTA 按钮规范

```html
<!-- 幽灵按钮风格 — 无填充，hover 时填充 -->
<a
  href="/path"
  class="inline-flex items-center justify-center px-8 py-3 text-sm tracking-[0.1em] uppercase rounded-[var(--radius-md)] border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg-primary)] transition-all duration-600"
>
  启程
</a>
```

### 文案对照

| 常规电商文案 | 空性设计替代 |
|-------------|-------------|
| 开始定制 | 启程 / 静心之旅 |
| 浏览成品 | 观览 / 赏物 |
| 加入购物车 | 不设 — 详情页再展示 |
| 立即购买 | 不设 — 用"结缘"替代 |
| 查看更多 | 观览全部 |

---

## 页面区块构成（标准首页）

```
Navigation (极简：品牌名 | 商城 · 百科 · 关于)
Hero (100vh 纯静态)
  ├─ 品牌英文名 (NIAN·ZHU)
  ├─ Slogan (一念清净 一串菩提)
  ├─ 英文副标 (Every Bead a Meditation)
  └─ 双 CTA (启程 | 观览)

· 择 · (py-32)
  三列自然排列：择 · 合 · 成 — 无编号/无图标/无连接线

· 观 · (py-32)
  4 列产品网格 — 无价格/无购物车按钮

· 质 · (py-32)
  左右交错图文 — 材质描述 + 禅意寄语

· 寂 · (py-24)
  品牌三段式寄语 + 静心之旅 CTA

Footer (极简三行)
  品牌名 | 导航 · 版权
```

---

## 设计原则检查清单

使用空性设计时，逐项核查：

### 必须移除
- [ ] 无粒子背景或 Canvas 动画
- [ ] 无金色泛滥（仅 Logo 和 CTA hover 使用）
- [ ] 无步骤编号（01/02/03）
- [ ] 无图标容器（圆形 icon 区域）
- [ ] 无价格标签在产品卡片上
- [ ] 无购物车按钮在产品卡片上
- [ ] 无水波纹点击反馈
- [ ] 无缩放反馈（scale 变化）
- [ ] 无滚动进度条
- [ ] 无滚动捕捉（scroll-snap）
- [ ] 无主题切换器（跟随系统）
- [ ] 无社交媒体图标在 Footer
- [ ] 无创始人照片或团队照

### 必须执行
- [ ] 区块统一使用 `· 字 ·` 标题格式
- [ ] 区块间距 `py-32`（桌面端）
- [ ] 内容最大宽度 `1080px`
- [ ] 过渡动画统一 `600-800ms ease-out`
- [ ] CTA 使用幽灵按钮风格
- [ ] 导航栏不超过 3 个链接
- [ ] Footer 不超过三行
- [ ] 中英文混排时加空格
- [ ] 辅助文字使用 `font-[300]` + `--color-text-muted`
- [ ] 慢动画周期不低于 `600ms`

---

## 典型组件风格

### 极简导航

```
品牌名 (左)                           导航链接 (右)
NIAN·ZHU                         商城 · 百科 · 关于
```

- 无 CTA 按钮
- 无主题切换器
- 无购物车图标
- 无下划线悬停动画
- 高度 `h-14`（56px）

### ScrollReveal

```tsx
function ScrollReveal({ children, delay = 0 }) {
  return (
    <div
      className="opacity-0 translate-y-3 transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
      style={{
        transitionDelay: `${delay}ms`,
        // 通过 IntersectionObserver 添加 .visible 类
      }}
    >
      {children}
    </div>
  );
}
```

### 区块标题

```html
<div class="text-center">
  <div class="w-8 h-px bg-[var(--color-border)] mx-auto mb-4" />
  <h2 class="font-serif text-2xl tracking-[0.15em] text-[var(--color-text-muted)]">
    · 观 ·
  </h2>
  <div class="w-8 h-px bg-[var(--color-border)] mx-auto mt-4" />
</div>
```

---

## 主题实现

使用 `next-themes` + CSS 自定义属性，`class` 策略。

```css
@custom-variant dark (&:is(.dark *));
```

- 默认跟随系统 `prefers-color-scheme`
- 不提供手动切换 UI
- 可通过 `localStorage` 覆写（开发者工具调试用）
- 全局过渡：`transition: background-color 800ms ease-out, color 800ms ease-out`
