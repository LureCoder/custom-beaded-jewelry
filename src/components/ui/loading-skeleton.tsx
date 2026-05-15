// loading-skeleton.tsx: 骨架屏组件 — 3 变体 Text/Card/Image
import { HTMLAttributes, forwardRef } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "card" | "image";
}

const variantClasses: Record<string, string> = {
  text: "h-4 w-full rounded-[var(--radius-sm)]",
  card: "h-64 w-full rounded-[var(--radius-lg)]",
  image: "aspect-square rounded-[var(--radius-md)]",
};

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = "text", className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          animate-pulse bg-[var(--color-bg-tertiary)]
          ${variantClasses[variant]}
          ${className}
        `}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

interface SkeletonCardProps {
  count?: number;
}

function SkeletonCard({ count = 1 }: SkeletonCardProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-[var(--radius-lg)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 space-y-4"
        >
          <Skeleton variant="image" />
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-1/4" />
        </div>
      ))}
    </>
  );
}

export { Skeleton, SkeletonCard };
