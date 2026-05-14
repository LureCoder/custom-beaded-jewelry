# 交互动效设计

## 设计哲学

动效设计遵循"**静水流深**"的理念——表面平静，内蕴力量。

- **慢**：所有动画持续时间较长（400ms ~ 1200ms），避免急促
- **柔**：使用缓出曲线（ease-out），避免弹性过度的俏皮感
- **轻**：位移较小（10px ~ 30px），不喧宾夺主
- **自然**：模拟自然界的运动规律——烟雾升腾、水面涟漪、烛光摇曳

---

## 动效参数规范

### 持续时间

| 类型 | 时长 | 用途 |
|------|------|------|
| 微交互 | 200ms ~ 300ms | 按钮悬停、点击反馈 |
| 过渡动画 | 400ms ~ 600ms | 页面切换、卡片入场 |
| 展示动画 | 600ms ~ 1200ms | 滚动触发的内容展示 |
| 氛围动画 | 2000ms+ | 粒子漂浮、光晕流动 |

### 缓动函数

```css
/* 默认缓动 — 柔和减速 */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);

/* 出场缓动 — 缓慢消失 */
--ease-out: cubic-bezier(0.0, 0, 0.2, 1);

/* 入场缓动 — 轻微过冲后稳定 */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* 弹性缓动 — 仅用于特殊场合 */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

/* 舒缓缓动 — 用于氛围动画 */
--ease-slow: cubic-bezier(0.25, 0.1, 0.25, 1);
```

---

## 页面级动画

### 1. 首次加载动画

| 元素 | 动画 | 延迟 |
|------|------|------|
| Hero 背景粒子 | 立即淡入，开始运动 | 0ms |
| Logo/Slogan | 从下向上 + 淡入 | 300ms |
| 副标题 | 从下向上 + 淡入 | 600ms |
| CTA 按钮 | 从下向上 + 淡入 | 900ms |
| 滚动提示 | 淡入 | 1200ms |

所有元素在 1.5 秒内完成入场，营造从容而有序的打开体验。

### 2. 滚动触发动画 (Scroll Reveal)

使用 Intersection Observer API，当元素进入视口时触发。

| 区块 | 动画类型 | 方向 |
|------|----------|------|
| 定制流程卡片 | 逐张上移 + 淡入 | 从下 |
| 产品卡片 | 逐张上移 + 淡入，交错延迟 | 从下 |
| 材质展示 | 交替从左/右侧滑入 + 淡入 | 左右交替 |
| 用户寄语 | 居中放大 + 淡入 | 从中心 |

**交错延迟**: 网格中每张卡片依次延迟 80ms ~ 120ms，形成波浪效果。

---

## 组件级交互

### 按钮交互

```
正常态 ──→ 悬停态 ──→ 点击态 ──→ 完成
  │          │          │
 无光晕     金色光晕   缩放 0.97  + 水波扩散
```

- **悬停**：金色光晕 `box-shadow` 渐显 (300ms)
- **点击**：缩放 + 水波涟漪效果从点击点扩散 (400ms)
- **加载**：按钮文字替换为旋转的曼陀罗/法轮图标

### 产品卡片交互

```
正常态 ──→ 悬停态
  │          │
 静态      图片 scale 1.05 (600ms ease-out)
 无光晕    金色边框发光
 纯色背景  背景渐变为暖色微光
            底部信息上移露出更多图片
```

- 悬停时图片缓慢放大，如同在手中把玩念珠
- 信息区域平滑上移，露出产品更多细节
- 金色边框发光从边缘向内渗透

### 导航栏

```
顶部 ──────────→ 向下滚动后
  │                  │
 透明背景            磨砂玻璃背景
 文字白色            文字 ivory-white
```

- 滚动 80px 后触发过渡 (200ms)
- 背景模糊度 `blur(20px)` 平滑增加
- 链接悬停时底部出现金色线条从中心向外展开

---

## 氛围动画

### 1. 粒子背景 (Particle System)

**技术方案**: Canvas 或 CSS 粒子

**行为**:
- 20 ~ 40 个微小光点 (2px ~ 4px)
- 颜色：暖金色，透明度 0.1 ~ 0.3
- 缓慢上下漂浮，速度极慢（完整周期 8s ~ 12s）
- 鼠标移动时粒子有微弱跟随（偏移量 < 10px）
- 粒子之间偶尔闪烁（亮度缓慢变化）

**效果**: 如同阳光下漂浮的尘埃，或香炉中升腾的细烟。

### 2. 滚动进度指示

- 页面右侧边缘的细线，从顶部到底部随滚动填充金色
- 类似经卷展开的视觉隐喻

### 3. 计数器呼吸灯

在产品卡片上，如果产品有"已定制"次数，数字带有缓慢的呼吸动画（透明度 0.6 → 1.0 → 0.6），周期 3s。

### 4. 鼠标追踪光晕 (Optional)

在 Hero 区域，鼠标移动时背景有一个极淡的径向渐变跟随，如同烛光随视线移动。

```css
/* 实现思路：通过 JS 监听鼠标位置，更新 CSS 变量 */
.hero {
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(201, 169, 110, 0.03),
    transparent 40%
  );
}
```

---

## 过渡与路由

### 页面切换

使用 Next.js 的 `useTransition` 或 View Transitions API：

- 进入新页面时内容从下方淡入 (400ms)
- 背景保持不变（深色背景本身就是连续的）
- 导航栏高亮更新

### 图片加载

```
占位 ──→ 加载中 ──→ 完成
  │         │          │
 灰色      模糊预览    清晰图片渐入
 块状       (blur)     (500ms ease-out)
```

- 使用 `next/image` 的 placeholder blur 效果
- 图片加载完成后从模糊到清晰平滑过渡

---

## 微交互清单

| 触发时机 | 反馈 | 时长 |
|----------|------|------|
| 链接悬停 | 底部金线从中心展开 | 300ms |
| 卡片点击 | 涟漪效果 + 轻微缩放 | 200ms |
| 加入购物车 | 图标跳动 + 角标数字更新动画 | 400ms |
| 收藏/点赞 | 心形图标填充动画 | 300ms |
| 表单输入聚焦 | 底部边框金线从左侧滑入 | 300ms |
| 表单提交成功 | 绿色对勾 + 卡片祝福效果 | 600ms |
| 图片加载完成 | 模糊到清晰过渡 | 500ms |
| 数量选择器 | 数值变化时的弹跳效果 | 200ms |
| 滚动到顶部 | 按钮带旋转金圈渐入 | 400ms |
| 页脚展开/收起 | 内容高度平滑展开 | 300ms |

---

## 性能原则

- 所有动画使用 `transform` 和 `opacity`，触发 GPU 合成
- 粒子系统在低性能设备上自动降低粒子数量
- 滚动动画使用 `IntersectionObserver`，不阻塞主线程
- 使用 `will-change` 谨慎且仅在必要时
- 遵循用户 `prefers-reduced-motion` 设置，提供无障碍体验

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Framer Motion 实现参考

由于项目使用 Next.js + React，推荐使用 Framer Motion 实现动画。

### 常用组件封装

```tsx
// 滚动触发出场动画
const ScrollReveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
  >
    {children}
  </motion.div>
);

// 交错网格动画
const StaggerGrid = ({ children }) => (
  <motion.div
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.1 } },
    }}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
);

// 悬停放大卡片
const HoverCard = ({ children }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
  >
    {children}
  </motion.div>
);
```
