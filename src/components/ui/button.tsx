"use client";

import { useRef, useCallback, useState } from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

interface RippleData {
  id: number
  x: number
  y: number
  size: number
}

const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center overflow-hidden",
    "rounded-lg border text-sm font-medium whitespace-nowrap",
    "transition-all duration-300 ease-out select-none outline-none",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-accent)] text-white",
          "border-transparent",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_4px_var(--color-shadow)]",
          "hover:bg-[var(--color-accent-hover)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_16px_var(--color-glow)]",
          "active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] active:translate-y-px",
        ].join(" "),
        secondary: [
          "bg-[var(--color-accent-muted)] text-[var(--color-accent)]",
          "border-transparent",
          "hover:bg-[var(--color-accent)] hover:text-white",
          "hover:shadow-[0_4px_16px_var(--color-glow)]",
          "active:translate-y-px",
        ].join(" "),
        outline: [
          "bg-transparent text-[var(--color-text-primary)]",
          "border-[var(--color-border)]",
          "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
          "hover:bg-[var(--color-accent-muted)] hover:shadow-[0_0_20px_var(--color-glow)]",
          "active:translate-y-px",
        ].join(" "),
        ghost: [
          "bg-transparent text-[var(--color-text-secondary)]",
          "border-transparent",
          "hover:bg-[var(--color-accent-muted)] hover:text-[var(--color-accent)]",
          "active:translate-y-px",
        ].join(" "),
        gradient: [
          "text-white border-transparent",
          "bg-gradient-to-br from-[var(--color-accent)] to-[#FE9A00]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_8px_var(--color-shadow)]",
          "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_20px_var(--color-glow)]",
          "hover:from-[var(--color-accent-hover)] hover:to-[#FFB700]",
          "active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] active:translate-y-px",
        ].join(" "),
        glass: [
          "text-[var(--color-text-primary)]",
          "border-[var(--color-border)]",
          "bg-[var(--color-bg-glass)] backdrop-blur-xl",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_8px_var(--color-shadow)]",
          "hover:bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent)]",
          "hover:text-[var(--color-accent)] hover:shadow-[0_4px_20px_var(--color-glow)]",
          "active:translate-y-px",
        ].join(" "),
        destructive: [
          "bg-[var(--color-destructive)] text-white",
          "border-transparent",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]",
          "hover:brightness-110 hover:shadow-[0_4px_16px_rgba(220,38,38,0.3)]",
          "active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] active:translate-y-px",
        ].join(" "),
        link: [
          "text-[var(--color-accent)] underline-offset-4",
          "border-transparent bg-transparent",
          "hover:underline",
        ].join(" "),
      },
      size: {
        default: "h-9 gap-1.5 px-4 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-7 gap-1 px-2.5 text-xs rounded-[min(var(--radius-md),10px)]",
        sm: "h-8 gap-1.5 px-3 text-[0.8rem]",
        lg: "h-10 gap-2 px-5 text-sm",
        xl: "h-12 gap-2 px-6 text-base",
        icon: "size-9 p-0",
        "icon-xs": "size-7 p-0 rounded-[min(var(--radius-md),10px)]",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-10 p-0",
        "icon-xl": "size-12 p-0",
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
  const [ripples, setRipples] = useState<RippleData[]>([])
  const idRef = useRef(0)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant === "link") return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const size = Math.max(rect.width, rect.height) * 0.6
      const id = idRef.current++
      setRipples((prev) => [...prev, { id, x: x - size / 2, y: y - size / 2, size }])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, 600)
    },
    [variant]
  )

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-1.5">{children}</span>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/25 animate-[ripple_0.6s_ease-out]"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
      </span>
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
