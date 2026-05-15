# 视觉设计

## 色彩体系

> **品牌**：空性念珠 (Kongxing Mala) | **标志**：NIAN·ZHU | **强调色**：Amber

整体色调以**深色 + 琥珀光**为主轴，两套主题的强调色均取自 **Tailwind Amber 色板**。

---

## 主题总览

```
                   深色 · 般若 (默认)           浅色 · 素简
                   ────────────────           ────────────────
  背景              #0C0C0A  深空              #F5F5F0  石灰白
  卡片              #161612  暖石板             #EBEBE5  浅灰石
  主文字             #F5F0E8  烛光白             #1C1B16  墨灰
  强调色             #FFB900  琥珀光             #E17100  琥珀赤
```

---

## 主题 1：深色 · 般若 · Prajna（默认）

### 意象

**夜空 + 琥珀光**。深色背景取自午夜虚空，强调色取自 Amber 400 的温暖金辉。

### 色值表

| CSS 变量 | 色值 | 意象 | 用途 |
|----------|------|------|------|
| `--color-bg-primary` | `#0C0C0A` | 深空 | 页面主背景 |
| `--color-bg-secondary` | `#161612` | 暖石板 | 卡片/容器背景 |
| `--color-bg-tertiary` | `#1E1E1A` | 微亮暖石 | 悬浮态/次级容器 |
| `--color-bg-glass` | `rgba(12,12,10,0.78)` | 深色玻璃 | 导航栏滚动态 |
| `--color-text-primary` | `#F5F0E8` | 烛光白 | 主内容文字 |
| `--color-text-secondary` | `#A09888` | 暖灰 | 辅助文字 |
| `--color-text-muted` | `#6B6560` | 暗影灰 | 弱化文字/占位符 |
| `--color-accent` | `#FFB900` | 琥珀光 | 强调色 — 按钮/链接/价格 |
| `--color-accent-hover` | `#FFD230` | 琥珀辉 | 强调色悬停态 |
| `--color-accent-muted` | `rgba(255,185,0,0.18)` | 琥珀雾 | 强调色弱化背景 |
| `--color-border` | `rgba(255,255,255,0.06)` | 微光边界 | 边框/分割线 |
| `--color-border-hover` | `rgba(255,185,0,0.25)` | 琥珀边 | 悬浮态边框 |
| `--color-shadow` | `rgba(0,0,0,0.4)` | 深影 | 阴影 |
| `--color-glow` | `rgba(255,185,0,0.1)` | 琥珀辉光 | 发光效果 |

### Hero 渐变

```css
--gradient-hero: linear-gradient(180deg, #0C0C0A 0%, #1A1610 100%);
```

顶部固定一个不可见的径向光晕：

```css
background:
  radial-gradient(circle at 50% 40%, rgba(255,185,0,0.05) 0%, transparent 60%),
  linear-gradient(180deg, #0C0C0A 0%, #1A1610 100%);
```

---

## 主题 2：浅色 · 素简 · Shuddha

### 意象

**石灰岩 + 琥珀光**。灰白素雅、质感内敛，强调色取自 Amber 600。

### 色值表

| CSS 变量 | 色值 | 意象 | 用途 |
|----------|------|------|------|
| `--color-bg-primary` | `#F5F5F0` | 石灰白 | 页面主背景 |
| `--color-bg-secondary` | `#EBEBE5` | 浅灰石 | 卡片/容器背景 |
| `--color-bg-tertiary` | `#E0E0D8` | 暖灰岩 | 悬浮态/次级容器 |
| `--color-bg-glass` | `rgba(245,245,240,0.78)` | 灰透玻璃 | 导航栏滚动态 |
| `--color-text-primary` | `#1C1B16` | 墨灰 | 主内容文字 |
| `--color-text-secondary` | `#6B6B60` | 烟灰 | 辅助文字 |
| `--color-text-muted` | `#9E9E94` | 雾灰 | 弱化文字/占位符 |
| `--color-accent` | `#E17100` | 琥珀赤 | 强调色 — 按钮/链接/价格 |
| `--color-accent-hover` | `#FE9A00` | 琥珀金 | 强调色悬停态 |
| `--color-accent-muted` | `rgba(225,113,0,0.12)` | 琥珀粉 | 强调色弱化背景 |
| `--color-border` | `rgba(28,27,22,0.08)` | 灰线 | 边框/分割线 |
| `--color-border-hover` | `rgba(225,113,0,0.2)` | 琥珀线 | 悬浮态边框 |
| `--color-shadow` | `rgba(28,27,22,0.08)` | 浅影 | 阴影 |
| `--color-glow` | `rgba(225,113,0,0.08)` | 琥珀辉 | 发光效果 |

### Hero 渐变

```css
--gradient-hero: linear-gradient(180deg, #F5F5F0 0%, #EBEBE5 100%);
```

---

## 主题切换策略

| 项目 | 策略 |
|------|------|
| 默认 | 深色 (dark) |
| 切换机制 | `next-themes`，`class` 策略，CSS 变量覆盖 |
| 手动切换 UI | 不提供 — 跟随系统 `prefers-color-scheme` |
| 过渡时间 | `800ms ease-out`（全局 `background-color` 和 `color`） |

> 根据空性设计原则，移除了手动主题切换器。用户如需切换，操作系统层面控制即可。

### CSS 实现

```css
@custom-variant dark (&:is(.dark *));

:root {
  /* 浅色色值 */
  --color-bg-primary: #F5F5F0;
  ...
}

.dark {
  /* 深色色值 */
  --color-bg-primary: #0C0C0A;
  ...
}
```

---

## 金色使用规则

```
✅ 允许使用金色的场景：
  - 品牌标志 NIAN·ZHU
  - CTA 按钮 hover 态
  - 链接 hover 态

❌ 禁止使用金色的场景：
  - 普通文字
  - 图标默认态
  - 边框默认态
  - 装饰元素
  - 多重发光效果
```

---

## 字体系统

### 字体栈

| 角色 | 字体 | 字重 | CSS 变量 |
|------|------|------|----------|
| 中文标题 | Noto Serif SC | 600, 700 | `--font-noto-serif-sc` |
| 中文正文 | Noto Sans SC | 300, 400 | `--font-noto-sans-sc` |
| 英文标题/斜体 | Cormorant Garamond | 600, 700 italic | `--font-cormorant` |
| 英文正文 | Inter | 400 | `--font-inter` |

### 字号层级

```css
--display1: 64px;   /* Hero 主标题 */
--display2: 48px;   /* 章节大标题 */
--title1: 32px;     /* 区块标题 */
--title2: 24px;     /* 产品名称 */
--body: 16px;       /* 正文 */
--small: 14px;      /* 辅助文字 */
--caption: 12px;    /* 标签、脚注 */
```

### 使用规范

- **标题**：`font-serif`（Noto Serif SC / Cormorant Garamond）
- **正文**：`font-[300]` 细字重
- **辅助信息**：`font-[200]` + `--color-text-muted`
- **英文品牌名**：`uppercase tracking-[0.15em]`
- **导航链接**：`uppercase tracking-[0.1em] font-[300]`

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
```

### 区块间距

| 场景 | 桌面 | 平板 | 手机 |
|------|------|------|------|
| 区块间距 | `py-32` (128px) | `py-28` (112px) | `py-20` (80px) |
| 内容 padding | `px-24` | `px-12` | `px-6` |
| 内容最大宽度 | `1080px` | 100% | 100% |
| 设计优先级 | 1 — 先适配 | 2 | 3 |

---

## 圆角系统

```css
--radius-sm: 0.375rem;    /* 6px — 小元素、标签 */
--radius-md: 0.5rem;      /* 8px — 卡片、按钮 */
--radius-lg: 0.625rem;    /* 10px — 大卡片 */
--radius-xl: 0.875rem;    /* 14px — 弹窗 */
--radius-2xl: 1.125rem;   /* 18px */
--radius-3xl: 1.375rem;   /* 22px */
--radius-4xl: 1.625rem;   /* 26px */
```

---

## 缓动曲线

```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-slow: cubic-bezier(0.25, 0.1, 0.25, 1);     /* 空性设计主力 */
```

### 过渡时长

| 场景 | 时长 | 缓动 |
|------|------|------|
| 悬停过渡 | `600ms` | `ease-out` |
| 滚动入场 | `800ms` | `ease-slow` |
| 导航栏背景 | `500ms` | `ease-out` |
| 主题切换 | `800ms` | `ease-out` |

---

## 光影与材质

### 发光效果（克制使用）

```css
/* 品牌光晕 — 仅用于 Logo 和 CTA hover */
box-shadow: 0 0 20px rgba(255, 185, 0, 0.15);

/* 悬浮光晕 — 卡片 hover 时微妙发光 */
box-shadow: 0 8px 32px rgba(201, 169, 110, 0.08);
```

### 材质感

- **磨砂玻璃**：导航栏滚动态使用 `backdrop-blur-[20px]`
- **深色哑光**：深色背景使用 `#0C0C0A` 而非纯黑 `#000`
- **宣纸暖白**：浅色背景使用 `#F5F5F0`，模拟宣纸质感

### 产品图片风格

- 深色或纯黑背景拍摄/渲染
- 侧光照明，突出珠子的质感和光泽
- 45 度俯拍角度，展示整体形态
- 微距特写展示木材/水晶纹理

---

## 主题切换 CSS 实现

### globals.css 中的完整结构

```css
:root {
  /* 浅色主题色值 (默认 :root) */
  --color-bg-primary: #F5F5F0;
  ...
}

.dark {
  /* 深色主题色值 */
  --color-bg-primary: #0C0C0A;
  ...
}
```

### Tailwind CSS v4 dark mode

```css
@custom-variant dark (&:is(.dark *));
```

### ThemeProvider

```tsx
// src/lib/theme.tsx
<NextThemesProvider
  attribute="class"
  defaultTheme="dark"
  enableSystem
  disableTransitionOnChange={false}
>
```

---

## 设计核对表

- [ ] 深色主题和浅色主题都有完整的 CSS 变量定义
- [ ] 组件引用 CSS 变量而非硬编码色值
- [ ] 深色和浅色下文字与背景对比度 ≥ 4.5:1
- [ ] 强调色在两种主题下都可读
- [ ] 图片在两种主题下都可见（图片不依赖主题）
