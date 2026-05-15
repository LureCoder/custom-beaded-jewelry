// constants.ts: 品牌常量与站点配置 — SITE_CONFIG
export const SITE_CONFIG = {
  brandZh: "空性念珠",
  brandEn: "Kongxing Mala",
  tagline: "一念清净 一串菩提",
  taglineEn: "Every Bead a Meditation",
  description: "空性念珠 (Kongxing Mala) 提供高品质手工定制念佛念珠。天然材质，匠人精制。在线自定义设计你的专属念珠，开启每日静心修行。",
} as const;

export const CUSTOMIZE_STEPS = [
  {
    step: 1,
    title: "选材",
    description: "从天然木材、水晶、玛瑙中挑选",
    icon: "◆",
  },
  {
    step: 2,
    title: "搭配",
    description: "隔珠、计数器、流苏、坠饰自由组合",
    icon: "◇",
  },
  {
    step: 3,
    title: "圆满",
    description: "预览成品，下单即开始手工制作",
    icon: "○",
  },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "首页" },
  { href: "/customize", label: "定制" },
  { href: "/shop", label: "商城" },
  { href: "/encyclopedia", label: "百科" },
  { href: "/about", label: "关于" },
] as const;
