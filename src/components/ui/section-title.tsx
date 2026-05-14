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
          mb-12
          ${align === "center" ? "text-center" : "text-left"}
          ${className}
        `}
        {...props}
      >
        <h2 className="text-[var(--title1)] md:text-[var(--display2)] font-serif font-semibold text-[var(--color-text-primary)]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-[var(--color-text-secondary)] text-base max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionTitle.displayName = "SectionTitle";

export { SectionTitle };
export type { SectionTitleProps };
