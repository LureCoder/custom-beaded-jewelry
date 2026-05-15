// card.tsx: 卡片容器组件 — 4 变体 / 7 子组件
import {
  HTMLAttributes,
  createContext,
  forwardRef,
  useContext,
  useId,
} from "react";

const variants = {
  default:
    "overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)]",
  swatch:
    "overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)]",
  elevated:
    "overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shadow-[0_4px_24px_var(--color-shadow)]",
  outlined:
    "overflow-hidden bg-transparent border border-[var(--color-border)]",
} as const;

const variantRadii: Record<keyof typeof variants, string> = {
  default: "var(--radius-lg)",
  swatch: "var(--radius-lg)",
  elevated: "var(--radius-lg)",
  outlined: "var(--radius-lg)",
};

type CardVariant = keyof typeof variants;

interface CardContextValue {
  variant: CardVariant;
}

const CardContext = createContext<CardContextValue>({ variant: "default" });

function useCardContext() {
  return useContext(CardContext);
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = "default", hoverable = false, className = "", children, ...props },
    ref
  ) => {
    return (
      <CardContext.Provider value={{ variant }}>
        <div
          ref={ref}
          className={`
            transition-all duration-600 ease-out
            ${variants[variant]}
            ${
              hoverable
                ? "cursor-pointer hover:border-[var(--color-border-hover)]"
                : ""
            }
            ${className}
          `}
          style={{ borderRadius: variantRadii[variant] }}
          {...props}
        >
          {children}
        </div>
      </CardContext.Provider>
    );
  }
);

Card.displayName = "Card";

// --- Sub-components ---

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  subtitle?: string;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ subtitle, className = "", children, ...props }, ref) => {
    const headingId = useId();

    return (
      <div
        ref={ref}
        className={`px-5 pt-5 pb-2 ${className}`}
        {...props}
      >
        <h3
          id={headingId}
          className="font-serif text-[var(--title2)] font-semibold text-[var(--color-text-primary)] leading-snug"
        >
          {children}
        </h3>
        {subtitle && (
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

CardHeader.displayName = "Card.Header";

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = "", children, ...props }, ref) => {
    const { variant } = useCardContext();
    const isSwatch = variant === "swatch";

    return (
      <div
        ref={ref}
        className={`${isSwatch ? "px-5 pb-5 pt-3" : "p-5"} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = "Card.Content";

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center justify-between px-5 pb-5 pt-2 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "Card.Footer";

interface CardSwatchProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
}

const CardSwatch = forwardRef<HTMLDivElement, CardSwatchProps>(
  ({ color, className = "", style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          h-32 flex items-end justify-end p-3
          ${!color ? "bg-[var(--color-bg-tertiary)]" : ""}
          ${className}
        `}
        style={{
          ...(color ? { backgroundColor: color } : {}),
          ...style,
        }}
        {...props}
      />
    );
  }
);

CardSwatch.displayName = "Card.Swatch";

interface CardColorLabelProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  color: string;
}

const CardColorLabel = forwardRef<HTMLDivElement, CardColorLabelProps>(
  ({ label, color, className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={`flex items-center gap-2 ${className}`} {...props}>
        <span
          className="w-3 h-3 rounded-[var(--radius-sm)] border border-[var(--color-border)]"
          style={{ backgroundColor: color }}
        />
        <span className="font-[400] text-sm text-[var(--color-text-primary)]">
          {label}
        </span>
      </div>
    );
  }
);

CardColorLabel.displayName = "Card.ColorLabel";

interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  aspectRatio?: string;
}

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ src, alt, aspectRatio = "aspect-square", className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${aspectRatio} relative overflow-hidden ${className}`}
        {...props}
      >
        {src && (
          <img
            src={src}
            alt={alt || ""}
            className="w-full h-full object-cover"
          />
        )}
        {children}
      </div>
    );
  }
);

CardImage.displayName = "Card.Image";

export {
  Card,
  CardSwatch,
  CardHeader,
  CardContent,
  CardFooter,
  CardColorLabel,
  CardImage,
};
export type { CardVariant, CardProps };
