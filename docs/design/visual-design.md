# 视觉设计

## 色彩体系

整体色调以**深色 + 琥珀**为主轴，两套主题的强调色均取自 **Tailwind Amber 色板**，营造温暖、内敛、富有质感的视觉氛围。

- 深色主题强调色：Amber 400 (`#FFB900`) — 在暗色背景上温暖发光
- 浅色主题强调色：Amber 600 (`#E17100`) — 在浅色背景上温润有力

### 主色

| 色名 | 色值 | 用途 |
|------|------|------|
| Ink Black | `#0A0A0B` | 页面主背景 |
| Deep Charcoal | `#121316` | 卡片/容器背景 |
| Warm Gold | `#C9A96E` | 品牌主色、强调色、关键交互元素 |
| Soft Gold | `#E8D5A3` | 悬停态、次要强调、微光效果 |
| Ivory White | `#F5F0E8` | 正文文字、主要内容 |

### 辅助色

| 色名 | 色值 | 用途 |
|------|------|------|
| Mist Silver | `#8B8580` | 辅助文字、次级信息 |
| Deep Burgundy | `#6B2D3E` | 特定氛围点缀、限量标签 |
| Temple Red | `#C0392B` | 佛教传统红色，用于绳结/流苏等文化元素 |
| Forest Shadow | `#2D3A32` | 自然感点缀、材质背景 |
| Lotus Pink | `#D4A5A5` | 柔和点缀色，用于女性化设计或特殊品类 |

### 渐变

- **Hero 渐变**: `#0A0A0B` → `#1A1520` (微妙的紫调深色渐变)
- **光晕渐变**: `#C9A96E` → `transparent` (径向渐变，用于光效)
- **卡片悬浮渐变**: `#121316` → `#1A1814` (极细微暖调)

### 色彩使用原则

```
背景层 (Ink Black / Deep Charcoal)
  └─ 卡片层 (Deep Charcoal / 半透明)
      ├─ 内容文字 (Ivory White)
      ├─ 辅助信息 (Mist Silver)
      └─ 强调元素 (Warm Gold)
```

---

## 主题系统

网站支持多主题切换，用户可根据个人偏好选择主题。主题切换通过 CSS 自定义属性（Custom Properties）实现，所有主题共享相同的语义化 Token 名称，仅色值不同。

### Theme Token 映射

所有主题统一使用以下语义化 Token，组件代码引用 Token 而非具体色值：

| CSS 变量 | 用途 |
|----------|------|
| `--color-bg-primary` | 页面主背景 |
| `--color-bg-secondary` | 卡片/容器背景 |
| `--color-bg-tertiary` | 悬浮态/次级容器背景 |
| `--color-bg-glass` | 磨砂玻璃背景（含 alpha） |
| `--color-text-primary` | 主内容文字 |
| `--color-text-secondary` | 辅助文字 |
| `--color-text-muted` | 弱化文字/占位符 |
| `--color-accent` | 品牌强调色 |
| `--color-accent-hover` | 强调色悬停态 |
| `--color-accent-muted` | 强调色弱化版本 |
| `--color-border` | 边框/分割线 |
| `--color-border-hover` | 悬浮态边框 |
| `--color-shadow` | 阴影色（含 alpha） |
| `--color-glow` | 发光色（含 alpha） |

---

### 主题 1：深色主题 · 般若 · Prajna

默认主题，以"**夜空 + 琥珀光**"为意象，背景取自 Amber 色板深端，强调色取自 Amber 400，营造温暖而深邃的修行氛围。

| Token | 色值 | 意象 | 色板来源 |
|-------|------|------|----------|
| `--color-bg-primary` | `#0C0C0A` | 深空 | — |
| `--color-bg-secondary` | `#161612` | 暖石板 | — |
| `--color-bg-tertiary` | `#1E1E1A` | 微亮暖石 | — |
| `--color-bg-glass` | `rgba(12, 12, 10, 0.78)` | 深色玻璃 | — |
| `--color-text-primary` | `#F5F0E8` | 烛光白 | — |
| `--color-text-secondary` | `#A09888` | 暖灰 | — |
| `--color-text-muted` | `#6B6560` | 暗影灰 | — |
| `--color-accent` | `#FFB900` | 琥珀光 | Amber 400 |
| `--color-accent-hover` | `#FFD230` | 琥珀辉 | Amber 300 |
| `--color-accent-muted` | `rgba(255, 185, 0, 0.18)` | 琥珀雾 | Amber 400 |
| `--color-border` | `rgba(255, 255, 255, 0.06)` | 微光边界 | — |
| `--color-border-hover` | `rgba(255, 185, 0, 0.25)` | 琥珀边 | Amber 400 |
| `--color-shadow` | `rgba(0, 0, 0, 0.4)` | 深影 | — |
| `--color-glow` | `rgba(255, 185, 0, 0.1)` | 琥珀辉光 | Amber 400 |

**渐变**: `--gradient-hero: linear-gradient(180deg, #0C0C0A 0%, #1A1610 100%)`

---

### 主题 2：浅色主题 · 素简 · Shuddha

以"**石灰岩 + 琥珀光**"为意象，灰白素雅、质感内敛，强调色取自 Amber 600，温润而有力。

| Token | 色值 | 意象 | 色板来源 |
|-------|------|------|----------|
| `--color-bg-primary` | `#F5F5F0` | 石灰白 | — |
| `--color-bg-secondary` | `#EBEBE5` | 浅灰石 | — |
| `--color-bg-tertiary` | `#E0E0D8` | 暖灰岩 | — |
| `--color-bg-glass` | `rgba(245, 245, 240, 0.78)` | 灰透玻璃 | — |
| `--color-text-primary` | `#1C1B16` | 墨灰 | — |
| `--color-text-secondary` | `#6B6B60` | 烟灰 | — |
| `--color-text-muted` | `#9E9E94` | 雾灰 | — |
| `--color-accent` | `#E17100` | 琥珀赤 | Amber 600 |
| `--color-accent-hover` | `#FE9A00` | 琥珀金 | Amber 500 |
| `--color-accent-muted` | `rgba(225, 113, 0, 0.12)` | 琥珀粉 | Amber 600 |
| `--color-border` | `rgba(28, 27, 22, 0.08)` | 灰线 | — |
| `--color-border-hover` | `rgba(225, 113, 0, 0.2)` | 琥珀线 | Amber 600 |
| `--color-shadow` | `rgba(28, 27, 22, 0.08)` | 浅影 | — |
| `--color-glow` | `rgba(225, 113, 0, 0.08)` | 琥珀辉 | Amber 600 |

**渐变**: `--gradient-hero: linear-gradient(180deg, #F5F5F0 0%, #EBEBE5 100%)`

#### 浅色主题的阴影与发光调整

浅色背景下，琥珀色发光的视觉权重需要降低，使用更淡更透的阴影：

```css
.light-theme {
  --shadow-gold: 0 4px 20px rgba(225, 113, 0, 0.1);
  --shadow-card: 0 2px 12px rgba(28, 27, 22, 0.06);
  --shadow-card-hover: 0 8px 24px rgba(28, 27, 22, 0.1);
}
```

---

### 主题切换交互

#### 切换入口

位于导航栏右侧，以**半透明圆形按钮**呈现：

```
  [🔆]  浅色
  [🌙]  深色 (默认)
```

- 点击展开下拉选择器，两个选项带对应图标
- 当前主题图标常驻显示

#### 切换动画

主题切换时使用平滑过渡，所有颜色变化在 **500ms ease-out** 内完成：

```css
:root {
  transition: background-color 500ms ease-out,
              color 500ms ease-out,
              border-color 500ms ease-out,
              box-shadow 500ms ease-out;
}
```

为防止页面闪烁，主题偏好存储在 `localStorage` 中，并在 `<head>` 中的内联脚本中同步读取。

#### 默认策略

- 首次访问：跟随系统 `prefers-color-scheme`（浅/深）
- 手动选择后：`localStorage` 覆盖系统设置

```html
<script>
  (function() {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark-theme');
    } else if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    }
  })();
</script>
```

---

## 字体系统

### 中文字体

| 层级 | 字体 | 字重 | 用途 |
|------|------|------|------|
| Display | Noto Serif SC | 700 | 大标题、品牌名 |
| Title | Noto Serif SC | 600 | 章节标题、产品名 |
| Body | Noto Sans SC | 400 | 正文、描述文字 |
| Auxiliary | Noto Sans SC | 300 | 辅助信息、标签 |

### 西文字体

| 层级 | 字体 | 字重 | 用途 |
|------|------|------|------|
| Display | Cormorant Garamond | 700 italic | 英文品牌标语 |
| Title | Cormorant Garamond | 600 | 英文标题 |
| Body | Inter | 400 | 英文正文、价格 |
| Number | Playfair Display | 400 | 数字、价格强调 |

### 字号层级

```
Display 1: 64px / 4rem    — Hero 主标题
Display 2: 48px / 3rem    — 章节大标题
Title 1:   32px / 2rem    — 区块标题
Title 2:   24px / 1.5rem  — 产品名称
Body:      16px / 1rem    — 正文
Small:     14px / 0.875rem — 辅助文字
Caption:   12px / 0.75rem  — 标签、脚注
```

---

## 间距系统

基于 4px 基准的间距体系：

| Token | 值 | 典型用途 |
|-------|-----|----------|
| space-1 | 4px | 微间距 |
| space-2 | 8px | 图标与文字间距 |
| space-3 | 12px | 内边距紧凑 |
| space-4 | 16px | 默认内边距 |
| space-6 | 24px | 组件间距 |
| space-8 | 32px | 区块间距 |
| space-12 | 48px | 章节间距 |
| space-16 | 64px | 大区块间距 |
| space-20 | 80px | 页面章节间距 |
| space-24 | 96px | Hero 区域间距 |

---

## 圆角

| Token | 值 | 用途 |
|-------|-----|------|
| radius-sm | 4px | 小元素、标签 |
| radius-md | 8px | 卡片、按钮、输入框 |
| radius-lg | 16px | 大卡片、弹窗 |
| radius-xl | 24px | 特殊容器 |
| radius-full | 9999px | 圆形头像、胶囊按钮 |

---

## 光影与氛围

### 发光效果

营造神秘感的关键——克制而有层次的发光。

- **金色微光**: 用于品牌 Logo、CTA 按钮、选中状态
  - `box-shadow: 0 0 20px rgba(201, 169, 110, 0.15)`
- **悬浮光晕**: 卡片/产品 hover 时微妙的外发光
  - `box-shadow: 0 8px 32px rgba(201, 169, 110, 0.08)`
- **背景光晕**: 页面背景中隐约的暖色光斑（由装饰元素实现）

### 材质感

- **磨砂玻璃**: 导航栏、浮动面板使用 `backdrop-filter: blur(20px)`
- **哑光质感**: 深色背景避免纯黑，使用微纹理或噪声叠加
- **暖纸感**: 浅色区域使用极暖白 `#F5F0E8`，模拟宣纸质感

---

## 图标与图形语言

### 图标风格
- 使用 **细线轮廓图标**（1.5px stroke）
- 圆形端点与连接
- 悬停态支持微光效
- 推荐图标集：Lucide Icons 或自定义 SVG

### 装饰图形
- **曼陀罗风格**的几何装饰线条（用于分割线、背景点缀）
- **飘浮粒子**：极淡的微光粒子（Canvas/SVG 实现）
- **水波纹**：点击反馈的水波扩散效果
- **光影流动**：渐变光晕在深色背景上缓慢位移

---

## 产品图片风格

- 深色或纯黑背景拍摄/渲染
- 侧光照明，突出珠子的质感和光泽
- 45度俯拍角度，展示整体形态
- 部分场景使用**微距特写**展示木材/水晶纹理
- 可选环境氛围图（如置于经文、莲花、木质佛台上拍摄）

---

## Theme Token 实现 (Tailwind CSS v4 + CSS 自定义属性)

### 基础 Token（共享于所有主题）

```css
@theme {
  /* Typography */
  --font-serif: "Noto Serif SC", "Cormorant Garamond", serif;
  --font-sans: "Noto Sans SC", "Inter", sans-serif;

  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-20: 80px;
  --spacing-24: 96px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}
```

### 深色主题 (默认)

```css
.dark-theme {
  /* Backgrounds */
  --color-bg-primary: #0C0C0A;
  --color-bg-secondary: #161612;
  --color-bg-tertiary: #1E1E1A;
  --color-bg-glass: rgba(12, 12, 10, 0.78);

  /* Text */
  --color-text-primary: #F5F0E8;
  --color-text-secondary: #A09888;
  --color-text-muted: #6B6560;

  /* Accent */
  --color-accent: #FFB900;
  --color-accent-hover: #FFD230;
  --color-accent-muted: rgba(255, 185, 0, 0.18);

  /* Borders */
  --color-border: rgba(255, 255, 255, 0.06);
  --color-border-hover: rgba(255, 185, 0, 0.25);

  /* Shadows & Glow */
  --color-shadow: rgba(0, 0, 0, 0.4);
  --color-glow: rgba(255, 185, 0, 0.1);
  --shadow-gold: 0 0 20px rgba(255, 185, 0, 0.15);
  --shadow-gold-hover: 0 8px 32px rgba(255, 185, 0, 0.08);

  /* Gradients */
  --gradient-hero: linear-gradient(180deg, #0C0C0A 0%, #1A1610 100%);
}
```

### 浅色主题

```css
.light-theme {
  /* Backgrounds */
  --color-bg-primary: #F5F5F0;
  --color-bg-secondary: #EBEBE5;
  --color-bg-tertiary: #E0E0D8;
  --color-bg-glass: rgba(245, 245, 240, 0.78);

  /* Text */
  --color-text-primary: #1C1B16;
  --color-text-secondary: #6B6B60;
  --color-text-muted: #9E9E94;

  /* Accent */
  --color-accent: #E17100;
  --color-accent-hover: #FE9A00;
  --color-accent-muted: rgba(225, 113, 0, 0.12);

  /* Borders */
  --color-border: rgba(28, 27, 22, 0.08);
  --color-border-hover: rgba(225, 113, 0, 0.2);

  /* Shadows & Glow */
  --color-shadow: rgba(28, 27, 22, 0.08);
  --color-glow: rgba(225, 113, 0, 0.08);
  --shadow-gold: 0 4px 20px rgba(225, 113, 0, 0.1);
  --shadow-gold-hover: 0 8px 24px rgba(28, 27, 22, 0.1);

  /* Gradients */
  --gradient-hero: linear-gradient(180deg, #F5F5F0 0%, #EBEBE5 100%);
}
```

### Tailwind CSS v4 Dark Mode 配置

使用 `class` 策略控制深色模式，与主题系统协同工作：

```css
/* globals.css */
@import "tailwindcss";

@custom-variant dark (&:is(.dark-theme *));
```
