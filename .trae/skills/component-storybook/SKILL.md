---
name: "component-storybook"
description: "Mandates that every UI component must have a corresponding Storybook story file (.stories.tsx). Invoke when creating new components, reviewing component PRs, or asked about component documentation/testing."
---

> **核心要求已纳入 `.trae/rules/project_rules.md` 的规则 #1，每次对话自动生效。**
> 本文档为详细参考，包含模板和示例。

# Component Storybook Rule

Every UI component in `src/components/` **must** have a corresponding Storybook story file.

## Rule

```
src/components/
├── ui/
│   ├── button.tsx
│   ├── button.stories.tsx    ✅ Required
│   ├── card.tsx
│   ├── card.stories.tsx      ✅ Required
│   ├── badge.tsx
│   ├── badge.stories.tsx     ✅ Required
│   └── ...
├── layout/
│   ├── navigation.tsx
│   ├── navigation.stories.tsx ✅ Required
│   └── ...
└── home/
    ├── hero-section.tsx
    ├── hero-section.stories.tsx ✅ Required
    └── ...
```

## When to Invoke

- Creating a **new component** — create `.stories.tsx` alongside it
- **Reviewing code** — check every component has a story
- Setting up **component documentation**
- Running **visual regression tests**

## Story File Template

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./component-name";

const meta = {
  title: "Category/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // Document props here
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default props
  },
};

export const Variant: Story = {
  args: {
    // Variant props
  },
};
```

## Requirements per Component

| Requirement | Description |
|---|---|
| ⚡ **Default story** | Render with default props |
| 🎨 **Variant stories** | One story per visual variant (primary, secondary, ghost, etc.) |
| 📝 **State stories** | Loading, disabled, error, empty states |
| ♿ **Accessibility** | Run a11y addon checks |
| 📱 **Responsive** | Test at mobile/tablet/desktop breakpoints |

## Organization

Stories are organized in Storybook sidebar using the `title` prefix:

```
Atoms        → "ui/Button", "ui/Card", "ui/Badge"
Molecules    → "ui/ScrollReveal", "ui/SectionTitle"
Organisms    → "layout/Navigation", "layout/Footer"
Pages        → "pages/Home", "pages/Customize"
```

## Commands

```bash
npm run storybook    # Start Storybook dev server (localhost:6006)
npm run build-storybook  # Build static Storybook for deployment
```
