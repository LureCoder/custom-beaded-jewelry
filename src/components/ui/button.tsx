// button.tsx: 核心按钮组件 — 5 变体 / 幽灵按钮风格 / duration-600
"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center",
    "rounded-lg border text-sm font-medium whitespace-nowrap",
    "transition-all duration-600 ease-out select-none outline-none",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-transparent text-[var(--color-accent)]",
          "border-[var(--color-accent)]",
          "hover:bg-[var(--color-accent)] hover:text-[var(--color-bg-primary)]",
          "hover:shadow-[0_0_24px_var(--color-glow)]",
        ].join(" "),
        secondary: [
          "bg-transparent text-[var(--color-text-secondary)]",
          "border-[var(--color-border)]",
          "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
        ].join(" "),
        outline: [
          "bg-transparent text-[var(--color-text-primary)]",
          "border-[var(--color-border)]",
          "hover:border-[var(--color-text-muted)]",
        ].join(" "),
        ghost: [
          "bg-transparent text-[var(--color-text-secondary)]",
          "border-transparent",
          "hover:text-[var(--color-accent)]",
        ].join(" "),
        destructive: [
          "bg-transparent text-[var(--color-destructive)]",
          "border-[var(--color-destructive)]",
          "hover:bg-[var(--color-destructive)] hover:text-white",
        ].join(" "),
      },
      size: {
        default: "h-9 gap-1.5 px-4 text-sm",
        sm: "h-8 gap-1.5 px-3 text-[0.8rem]",
        lg: "h-10 gap-2 px-5 text-sm",
        xl: "h-12 gap-2 px-6 text-base",
        icon: "size-9 p-0",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-1.5">{children}</span>
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
