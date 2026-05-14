import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hoverable = false, className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          rounded-[var(--radius-lg)]
          bg-[var(--color-bg-secondary)]
          border border-[var(--color-border)]
          transition-all duration-500 ease-out
          ${
            hoverable
              ? "hover:border-[var(--color-border-hover)] hover:shadow-[0_0_30px_var(--color-glow)] hover:bg-[var(--color-bg-tertiary)]"
              : ""
          }
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
export type { CardProps };
