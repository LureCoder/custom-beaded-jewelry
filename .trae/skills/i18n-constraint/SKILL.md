---
name: "i18n-constraint"
description: "网站中英文国际化约束体系。Next.js App Router + next-intl 实现，涵盖路由、翻译文件管理、组件开发规范、SEO 多语言。Invoke when creating new pages, adding text content, or reviewing components for i18n compliance."
---

> **核心要求已纳入 `.trae/rules/project_rules.md` 的规则 #2，每次对话自动生效。**
> 本文档为详细实施方案，包含完整配置步骤和代码示例。

# i18n 国际化约束 · Kongxing Mala

> **强制约束**：网站所有面向用户的文本内容必须支持中文和英文两种语言。
> 缺少翻译 = 功能未完成。

---

## 1. 技术选型

### 使用 next-intl

**next-intl** 是 Next.js App Router 生态中最成熟的国际化库，支持 Server Components 和 Client Components，提供类型安全的翻译。

```bash
npm install next-intl
```

### 路由策略

使用 **子路径路由 (Sub-path Routing)**：

```
/zh/...   → 中文
/en/...   → 英文
/         → 重定向到浏览器首选语言
```

根路径 `/` 根据 `Accept-Language` 头自动重定向，无语言匹配时默认中文。

---

## 2. 目录结构

```
src/
├── app/
│   ├── [locale]/                  # 本地化路由组
│   │   ├── layout.tsx             # 本地化根布局
│   │   ├── page.tsx               # 首页
│   │   ├── customize/
│   │   ├── shop/
│   │   ├── encyclopedia/
│   │   └── about/
│   ├── layout.tsx                 # 全局根布局（仅注入语言检测）
│   └── page.tsx                   # 重定向到 /zh 或 /en
│
├── i18n/
│   ├── request.ts                 # next-intl 请求配置
│   └── routing.ts                 # 路由定义 (locales, defaultLocale)
│
├── messages/
│   ├── zh.json                    # 中文翻译
│   └── en.json                    # 英文翻译
│
├── components/
│   └── shared/
│       └── locale-switcher.tsx    # 语言切换组件
│
└── middleware.ts                  # Next.js 中间件（语言检测 + 重定向）
```

### 文件职责

| 文件 | 职责 |
|------|------|
| `middleware.ts` | 读取 `Accept-Language`，重写 URL 添加 locale 前缀 |
| `src/i18n/routing.ts` | 定义 `locales: ['zh', 'en']`、`defaultLocale: 'zh'` |
| `src/i18n/request.ts` | 加载对应 locale 的 JSON 翻译文件 |
| `src/app/[locale]/layout.tsx` | 设置 `<html lang="zh/en">`，注入 `NextIntlClientProvider` |
| `src/messages/*.json` | 扁平 key 结构的翻译内容 |

---

## 3. 翻译文件规范

### 格式

使用扁平 JSON 结构，按功能模块分顶级 key。

```json
// messages/zh.json
{
  "nav": {
    "shop": "商城",
    "encyclopedia": "百科",
    "about": "关于"
  },
  "hero": {
    "brand": "NIAN·ZHU",
    "slogan": "一念清净 一串菩提",
    "subtitle": "Every Bead a Meditation",
    "cta_primary": "启程",
    "cta_secondary": "观览"
  },
  "home": {
    "steps_title": "择",
    "featured_title": "观",
    "materials_title": "质",
    "story_title": "寂",
    "story_line1": "每一条念珠，都是一次修行的见证。",
    "story_line2": "我们用手工打磨每一颗珠的过程，本身就是一种修习。",
    "story_line3": "从选材到穿配，从打磨到加持，每一步都带着觉知与敬意。",
    "story_verse": "不为物役，不以物喜",
    "story_cta": "静心之旅",
    "view_all": "观览全部 →"
  },
  "product": {
    "add_to_cart": "结缘",
    "price": "¥{price}",
    "material": "材质",
    "spec": "规格",
    "care": "保养",
    "blessing": "寄语"
  },
  "common": {
    "loading": "加载中...",
    "error": "出错了",
    "retry": "重试",
    "back_to_home": "返回首页"
  }
}
```

```json
// messages/en.json — 必须与 zh.json 完全同步的 key 结构
{
  "nav": {
    "shop": "Shop",
    "encyclopedia": "Encyclopedia",
    "about": "About"
  },
  "hero": {
    "brand": "NIAN·ZHU",
    "slogan": "One Pure Thought, One Mala Bead",
    "subtitle": "Every Bead a Meditation",
    "cta_primary": "Begin",
    "cta_secondary": "Browse"
  },
  "home": {
    "steps_title": "Choose",
    "featured_title": "View",
    "materials_title": "Quality",
    "story_title": "Stillness",
    "story_line1": "Every mala is a testament to practice.",
    "story_line2": "The very act of hand-polishing each bead is a form of cultivation.",
    "story_line3": "From selection to stringing, from polishing to blessing — every step is taken with awareness and reverence.",
    "story_verse": "Master things, not be mastered by them",
    "story_cta": "Journey inward",
    "view_all": "View all →"
  },
  "product": {
    "add_to_cart": "Connect",
    "price": "¥{price}",
    "material": "Material",
    "spec": "Specifications",
    "care": "Care",
    "blessing": "Blessing"
  },
  "common": {
    "loading": "Loading...",
    "error": "Something went wrong",
    "retry": "Retry",
    "back_to_home": "Back to Home"
  }
}
```

### 约束规则

| 规则 | 说明 |
|------|------|
| **Key 必须同步** | zh.json 和 en.json 的 key 路径必须完全一致。新增 key 必须同时添加两种语言 |
| **扁平优先** | 不超过 3 层嵌套，避免深层结构难以维护 |
| **中文优先** | 默认语言为中文，zh.json 是源文件，en.json 从 zh.json 翻译 |
| **带参使用 ICU** | 动态值使用 `{param}` 格式，如 `"welcome": "欢迎 {name}"` |
| **复数处理** | 英文复数使用 ICU 格式 `"{count} item{s}"` |
| **文案冻结** | UI 文案不允许硬编码在组件中，必须通过 `useTranslations()` 或 `t()` 获取 |

### 禁用行为

```
❌ 组件中直接写中文/英文字符串
   <h1>一念清净 一串菩提</h1>

✅ 通过翻译函数获取
   <h1>{t('hero.slogan')}</h1>
```

---

## 4. 组件开发规范

### Server Components

```tsx
import { getTranslations } from 'next-intl/server';

async function HomeHero() {
  const t = await getTranslations('hero');

  return (
    <section>
      <p>{t('brand')}</p>
      <h1>{t('slogan')}</h1>
      <p>{t('subtitle')}</p>
      <a href="/customize">{t('cta_primary')}</a>
    </section>
  );
}
```

### Client Components

```tsx
'use client';

import { useTranslations } from 'next-intl';

function LocaleSwitcher() {
  const t = useTranslations('nav');
  return <nav>{t('shop')}</nav>;
}
```

### 动态参数

```tsx
// messages/zh.json: { "product": { "price": "¥{price}" } }
// messages/en.json: { "product": { "price": "¥{price}" } }

t('product.price', { price: '398' }); // → "¥398"
```

### Metadata / SEO

```tsx
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('hero');
  return {
    title: `${t('slogan')} — Kongxing Mala`,
    description: t('subtitle'),
  };
}
```

---

## 5. 语言切换

### UI 组件：LocaleSwitcher

```tsx
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';

function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (next: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className="flex items-center gap-2 text-xs tracking-[0.1em] uppercase font-[300] text-[var(--color-text-muted)]">
      <button
        onClick={() => switchLocale('zh')}
        className={locale === 'zh' ? 'text-[var(--color-accent)]' : ''}
      >
        中
      </button>
      <span>/</span>
      <button
        onClick={() => switchLocale('en')}
        className={locale === 'en' ? 'text-[var(--color-accent)]' : ''}
      >
        EN
      </button>
    </div>
  );
}
```

### 位置

语言切换器放置在导航栏最右侧，与「商城 · 百科 · 关于」同层：

```
NIAN·ZHU             商城 · 百科 · 关于    中 / EN
```

### 行为

| 操作 | 行为 |
|------|------|
| 点击「中」 | URL 从 `/en/...` → `/zh/...`，页面不刷新（Client-side transition） |
| 点击「EN」 | URL 从 `/zh/...` → `/en/...` |
| 首次访问 | 中间件检测 `Accept-Language`，自动重定向 |
| 切换后 | locale 存 `cookie`（`next-intl` 自动处理） |
| 无 cookie | 下次访问再次检测浏览器语言 |

---

## 6. 字体处理

### 中英文混排策略

英文环境下加载中文 GBK 字体会浪费带宽。但空性设计的品牌名 `NIAN·ZHU` 本身就是英文——即使用户在中文页面也会看到英文品牌名。

所以**无论语言环境，中文字体始终会渲染少量英文**。这是可接受的。

### 字体加载

```ts
// src/lib/fonts.ts
// 中文字体始终加载（因为品牌名和部分设计元素保持中文）
// 不需要根据 locale 条件加载
```

### 英文环境下中文内容的降级

英文用户访问 `/en` 时：
- 导航、CTA、产品描述等全部显示英文
- 品牌名 `NIAN·ZHU` 保持不变（本身是英文）
- 区块标题 `· 择 ·` → `· Choose ·`（单字 + 英文翻译）

---

## 7. SEO 约束

### hreflang 标签

```tsx
// 在 [locale]/layout.tsx 中自动生成
<link rel="alternate" href="https://example.com/zh" hreflang="zh" />
<link rel="alternate" href="https://example.com/en" hreflang="en" />
<link rel="alternate" href="https://example.com/" hreflang="x-default" />
```

### Sitemap

```ts
// src/app/sitemap.ts
import { routing } from '@/i18n/routing';

export default async function sitemap() {
  const locales = routing.locales;
  const baseUrl = 'https://example.com';

  const pages = ['', '/shop', '/about', '/customize', '/encyclopedia'];

  const entries = pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${page}`])
        ),
      },
    }))
  );

  return entries;
}
```

### Open Graph

```tsx
// meta data 根据当前 locale 返回对应语言的 OG 标题/描述
export async function generateMetadata() {
  const t = await getTranslations('hero');
  return {
    title: `${t('slogan')} — Kongxing Mala`,
    openGraph: {
      title: `${t('slogan')} — Kongxing Mala`,
      description: t('subtitle'),
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
    },
  };
}
```

---

## 8. 多语言数据管理

### 产品数据

产品数据（名称、描述）需要支持双语：

```ts
interface Product {
  id: string;
  name: { zh: string; en: string };
  description: { zh: string; en: string };
  material: { zh: string; en: string };
  price: number;
  // ...
}
```

### URL Slug

产品详情页的 slug 双语独立：

```
/zh/shop/fengyan-puti-108     → 中文
/en/shop/bodhi-seed-108       → 英文
```

```ts
interface Product {
  slug: { zh: string; en: string };
  // ...
}
```

---

## 9. 测试检查清单

每个页面/组件完成后，手动验证以下内容：

### 功能检查
- [ ] 中文页面 `/zh/...` 所有文字显示中文
- [ ] 英文页面 `/en/...` 所有文字显示英文
- [ ] 语言切换后 URL 正确变化
- [ ] 语言切换后页面内容刷新
- [ ] 首次访问自动重定向到浏览器首选语言
- [ ] 无翻译缺失导致的 ICU 错误或 key 显示

### 视觉检查
- [ ] 英文页面字体适配（英文不需要 Noto Serif SC）
- [ ] 英文文案长度是否撑破布局（英文通常比中文长 30-50%）
- [ ] `tracking` 属性在英文页面是否合适
- [ ] 导航栏语言切换器样式正常

### SEO 检查
- [ ] `<html lang="zh">` 或 `<html lang="en">` 正确
- [ ] hreflang 标签存在
- [ ] OG locale 正确
- [ ] Sitemap 包含双语 URL

---

## 10. 注意事项

### 英文文案长度

英文通常比中文长 30-50%，容易撑破布局。常见解决方案：

```tsx
// 英文"开始定制" = "Begin Your Journey"（长度翻倍）
// 解决方案：英文使用更短的词
"cta_primary": "启程"        // zh
"cta_primary": "Begin"       // en ✔ 而不是 "Embark on Your Journey"
```

空性设计本身追求简洁，英文文案也应当克制。

### 保留英文的元素

以下内容无论中英文环境都保持英文：

| 元素 | 原因 |
|------|------|
| 品牌名 `NIAN·ZHU` | 品牌名本身是英文 |
| `Kongxing Mala` | 品牌官方英文名 |
| `Every Bead a Meditation` | 英文版和中文版 Hero 都使用的固定标语 |

这些不需要放入翻译文件。

### 不需要翻译的内容

- 产品图片（使用通用视觉语言）
- CSS 类名和样式代码
- 技术文档和代码注释

---

## 11. 快速初始化步骤

当开始一个新项目或模块时，按此步骤确保 i18n 完整性：

```
Step 1: 在 messages/zh.json 中添加中文 key-value
Step 2: 在 messages/en.json 中添加对应英文 key-value
Step 3: 组件中通过 useTranslations() / getTranslations() 引用
Step 4: 验证 /zh 页面和 /en 页面均正常显示
```

这是不可逾越的开发流程。
