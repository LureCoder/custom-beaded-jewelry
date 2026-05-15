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
  product:
    "overflow-hidden",
  profile:
    "overflow-hidden relative bg-[var(--color-bg-secondary)]",
  hero:
    "overflow-hidden relative bg-[var(--color-bg-secondary)]",
  gradient:
    "overflow-hidden",
  overlay:
    "overflow-hidden relative bg-[var(--color-bg-secondary)]",
} as const;

const variantRadii: Record<keyof typeof variants, string> = {
  default: "var(--radius-lg)",
  swatch: "var(--radius-lg)",
  elevated: "var(--radius-lg)",
  outlined: "var(--radius-lg)",
  product: "var(--radius-3xl)",
  profile: "var(--radius-3xl)",
  hero: "var(--radius-3xl)",
  gradient: "var(--radius-3xl)",
  overlay: "var(--radius-3xl)",
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
            transition-all duration-300 ease-out
            ${variants[variant]}
            ${
              hoverable
                ? "cursor-pointer hover:border-[var(--color-border-hover)] hover:shadow-[0_0_30px_var(--color-glow)]"
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

interface CardGradientProps extends HTMLAttributes<HTMLDivElement> {
  from?: string;
  to?: string;
  direction?: string;
}

const CardGradient = forwardRef<HTMLDivElement, CardGradientProps>(
  ({ from, to, direction = "to-b", className = "", children, ...props }, ref) => {
    const dirMap: Record<string, string> = {
      "to-b": "to bottom",
      "to-t": "to top",
      "to-r": "to right",
      "to-l": "to left",
    };
    const gradientStyle = to
      ? { background: `linear-gradient(${dirMap[direction] || "to bottom"}, ${from}, ${to})` }
      : { backgroundColor: from };

    return (
      <div
        ref={ref}
        className={className}
        style={gradientStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardGradient.displayName = "Card.Gradient";

interface CardOverlayProps extends HTMLAttributes<HTMLDivElement> {
  position?: "bottom" | "top" | "center";
}

const CardOverlay = forwardRef<HTMLDivElement, CardOverlayProps>(
  ({ position = "bottom", className = "", children, ...props }, ref) => {
    const positionClasses = {
      bottom: "absolute bottom-0 left-0 right-0",
      top: "absolute top-0 left-0 right-0",
      center: "absolute inset-0 flex items-center justify-center",
    };

    return (
      <div
        ref={ref}
        className={`${positionClasses[position]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardOverlay.displayName = "Card.Overlay";

interface CardOverlayContentProps extends HTMLAttributes<HTMLDivElement> {
  blur?: boolean;
}

const CardOverlayContent = forwardRef<HTMLDivElement, CardOverlayContentProps>(
  ({ blur = false, className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          p-6
          ${blur ? "backdrop-blur-md bg-black/10 dark:bg-white/10" : ""}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardOverlayContent.displayName = "Card.OverlayContent";

interface CardProductImageProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}

const CardProductImage = forwardRef<HTMLDivElement, CardProductImageProps>(
  ({ src, alt, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`aspect-square flex items-center justify-center p-8 ${className}`}
        {...props}
      >
        {src && (
          <img
            src={src}
            alt={alt || ""}
            className="max-w-full max-h-full object-contain"
          />
        )}
      </div>
    );
  }
);

CardProductImage.displayName = "Card.ProductImage";

interface CardProductInfoProps extends HTMLAttributes<HTMLDivElement> {}

const CardProductInfo = forwardRef<HTMLDivElement, CardProductInfoProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`px-6 pb-6 text-center ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardProductInfo.displayName = "Card.ProductInfo";

interface CardProductTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const CardProductTitle = forwardRef<HTMLHeadingElement, CardProductTitleProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={`text-2xl font-semibold text-black mb-4 ${className}`}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

CardProductTitle.displayName = "Card.ProductTitle";

interface CardProfileInfoProps extends HTMLAttributes<HTMLDivElement> {
  gradientFrom?: string;
  gradientVia?: string;
}

const CardProfileInfo = forwardRef<HTMLDivElement, CardProfileInfoProps>(
  ({ gradientFrom = "rgba(0,0,0,0.6)", gradientVia, className = "", children, ...props }, ref) => {
    const gradientStyle = gradientVia
      ? { background: `linear-gradient(to top, ${gradientFrom}, ${gradientVia}, transparent)` }
      : { background: `linear-gradient(to top, ${gradientFrom}, transparent)` };

    return (
      <div
        ref={ref}
        className={`absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between ${className}`}
        style={gradientStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardProfileInfo.displayName = "Card.ProfileInfo";

interface CardProfileNameProps extends HTMLAttributes<HTMLHeadingElement> {}

const CardProfileName = forwardRef<HTMLHeadingElement, CardProfileNameProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={`text-3xl font-semibold text-white mb-2 ${className}`}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

CardProfileName.displayName = "Card.ProfileName";

interface CardHeroContentProps extends HTMLAttributes<HTMLDivElement> {
  gradientFrom?: string;
  gradientTo?: string;
}

const CardHeroContent = forwardRef<HTMLDivElement, CardHeroContentProps>(
  ({ gradientFrom = "rgba(0,0,0,0.6)", gradientTo = "transparent", className = "", children, ...props }, ref) => {
    const gradientStyle = {
      background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
    };

    return (
      <div
        ref={ref}
        className={`absolute inset-0 flex items-end p-6 ${className}`}
        style={gradientStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeroContent.displayName = "Card.HeroContent";

interface CardHeroTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const CardHeroTitle = forwardRef<HTMLHeadingElement, CardHeroTitleProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={`text-3xl font-bold text-white leading-tight ${className}`}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

CardHeroTitle.displayName = "Card.HeroTitle";

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
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
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
  ({ className = "", ...props }, ref) => {
    const { variant } = useCardContext();
    const isSwatch = variant === "swatch";

    return (
      <div
        ref={ref}
        className={`${isSwatch ? "px-4 pb-4 pt-3" : "px-5 pb-5" } ${className}`}
        {...props}
      />
    );
  }
);

CardContent.displayName = "Card.Content";

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`px-5 pb-5 pt-2 flex items-center gap-2 ${className}`}
        {...props}
      />
    );
  }
);

CardFooter.displayName = "Card.Footer";

interface CardColorLabelProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  color?: string;
}

const CardColorLabel = forwardRef<HTMLDivElement, CardColorLabelProps>(
  ({ label, color, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center gap-2 ${className}`}
        {...props}
      >
        {color && (
          <span
            className="inline-block w-3 h-3 rounded-[var(--radius-sm)] shrink-0"
            style={{ backgroundColor: color }}
          />
        )}
        <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
          {label}
        </span>
      </div>
    );
  }
);

CardColorLabel.displayName = "Card.ColorLabel";

export {
  Card,
  CardImage,
  CardGradient,
  CardOverlay,
  CardOverlayContent,
  CardProductImage,
  CardProductInfo,
  CardProductTitle,
  CardProfileInfo,
  CardProfileName,
  CardHeroContent,
  CardHeroTitle,
  CardSwatch,
  CardHeader,
  CardContent,
  CardFooter,
  CardColorLabel,
};
export type {
  CardProps,
  CardImageProps,
  CardGradientProps,
  CardOverlayProps,
  CardOverlayContentProps,
  CardProductImageProps,
  CardProductInfoProps,
  CardProductTitleProps,
  CardProfileInfoProps,
  CardProfileNameProps,
  CardHeroContentProps,
  CardHeroTitleProps,
  CardSwatchProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
  CardColorLabelProps,
  CardVariant,
};
