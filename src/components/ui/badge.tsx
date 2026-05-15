import { HTMLAttributes, forwardRef } from "react";

type BadgeVariant = "default" | "accent" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]",
  accent:
    "bg-[var(--color-accent-muted)] text-[var(--color-accent)]",
  outline:
    "border border-[var(--color-border)] text-[var(--color-text-muted)]",
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", className = "", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center px-2.5 py-0.5
          text-xs font-[300] tracking-[0.05em] uppercase rounded-[var(--radius-sm)]
          transition-colors duration-600
          ${variants[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
export type { BadgeProps, BadgeVariant };
