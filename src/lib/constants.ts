export const SITE_CONFIG = {
  name: "念珠工坊",
  tagline: "一念清净 · 一串菩提",
  taglineEn: "One pure thought, one mala bead",
  description: "手工定制念佛念珠，天然材质，匠人精制。在线自定义设计你的专属念珠，开启每日静心修行。",
  url: "https://nianzhugongfang.com",
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
