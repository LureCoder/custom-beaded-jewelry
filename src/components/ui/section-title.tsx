import { HTMLAttributes, forwardRef } from "react";

interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionTitle = forwardRef<HTMLDivElement, SectionTitleProps>(
  (
    {
      title,
      subtitle,
      align = "center",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`
          ${align === "center" ? "text-center" : "text-left"}
          ${className}
        `}
        {...props}
      >
        <div className={`w-8 h-px bg-[var(--color-border)] ${align === "center" ? "mx-auto" : ""} mb-4`} />
        <h2 className="font-serif text-2xl tracking-[0.15em] text-[var(--color-text-muted)]">
          · {title} ·
        </h2>
        <div className={`w-8 h-px bg-[var(--color-border)] ${align === "center" ? "mx-auto" : ""} mt-4`} />
        {subtitle && (
          <p className="mt-4 font-[300] text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionTitle.displayName = "SectionTitle";

export { SectionTitle };
