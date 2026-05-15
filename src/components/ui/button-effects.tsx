import { type ReactNode } from "react"
import { Button, type buttonVariants } from "./button"
import type { VariantProps } from "class-variance-authority"

type ButtonVariant = VariantProps<typeof buttonVariants>

interface EffectBaseProps extends ButtonVariant {
  children: ReactNode
  className?: string
  disabled?: boolean
}

function ShineButton({ children, className = "", ...props }: EffectBaseProps) {
  return (
    <Button
      className={`relative overflow-hidden group ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shine_0.6s_ease-out]" />
    </Button>
  )
}

function LiftButton({ children, className = "", ...props }: EffectBaseProps) {
  return (
    <Button
      className={`transition-all duration-600 hover:-translate-y-1 hover:shadow-[0_8px_30px_var(--color-glow)] active:translate-y-0 ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
}

function FloatButton({ children, className = "", ...props }: EffectBaseProps) {
  return (
    <Button
      className={`animate-[float_3s_ease-in-out_infinite] hover:shadow-[0_12px_40px_var(--color-glow)] ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
}

function BorderPulseButton({ children, className = "", ...props }: EffectBaseProps) {
  return (
    <Button
      variant="outline"
      className={`transition-all duration-600 hover:animate-[border-pulse_2s_ease-in-out_infinite] ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
}

function ShimmerButton({ children, className = "", ...props }: EffectBaseProps) {
  return (
    <Button
      className={`bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-hover)] to-[var(--color-accent)] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] hover:shadow-[0_4px_20px_var(--color-glow)] ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
}

function GlowRingButton({ children, className = "", ...props }: EffectBaseProps) {
  return (
    <Button
      variant="ghost"
      className={`relative group ${className}`}
      {...props}
    >
      <span className="relative z-10 group-hover:text-[var(--color-accent)] transition-colors duration-600">
        {children}
      </span>
      <span className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none">
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent blur-sm animate-[glow-rotate_3s_linear_infinite]" style={{ maskImage: "linear-gradient(to right, transparent 20%, black 50%, transparent 80%)" } as React.CSSProperties} />
      </span>
    </Button>
  )
}

function SlideFillButton({ children, className = "", ...props }: EffectBaseProps) {
  return (
    <Button
      variant="outline"
      className={`relative overflow-hidden group border-[var(--color-border)] hover:border-transparent ${className}`}
      {...props}
    >
      <span className="absolute inset-0 bg-[var(--color-accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-600 ease-out origin-center" />
      <span className="relative z-10 group-hover:text-white transition-colors duration-600">
        {children}
      </span>
    </Button>
  )
}

function RippleBurstButton({ children, className = "", ...props }: EffectBaseProps) {
  return (
    <Button
      variant="default"
      className={`relative overflow-hidden group ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="absolute size-full rounded-full bg-white/12 blur-sm group-hover:animate-[ripple-burst_1.2s_ease-in-out]" />
        <span className="absolute size-full rounded-full bg-white/8 blur-sm group-hover:animate-[ripple-burst_1.2s_ease-in-out_0.2s]" />
        <span className="absolute size-full rounded-full bg-white/5 blur-sm group-hover:animate-[ripple-burst_1.2s_ease-in-out_0.4s]" />
      </span>
    </Button>
  )
}

function BorderFlowButton({ children, className = "", ...props }: EffectBaseProps) {
  return (
    <div className="relative group inline-flex">
      <svg 
        className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <rect
          x="1"
          y="1"
          width="98"
          height="98"
          rx="8"
          ry="8"
          fill="none"
          stroke="url(#border-flow-gradient)"
          strokeWidth="0.8"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-600 animate-[border-flow-svg_3s_linear_infinite]"
          style={{
            strokeDasharray: "20 280",
            strokeDashoffset: "0",
          } as React.CSSProperties}
        />
        <rect
          x="1"
          y="1"
          width="98"
          height="98"
          rx="8"
          ry="8"
          fill="none"
          stroke="url(#border-flow-gradient)"
          strokeWidth="0.8"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-600 animate-[border-flow-svg_3s_linear_infinite]"
          style={{
            strokeDasharray: "20 280",
            strokeDashoffset: "150",
          } as React.CSSProperties}
        />
        <defs>
          <linearGradient id="border-flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="var(--color-accent)" />
            <stop offset="50%" stopColor="var(--color-accent-hover)" />
            <stop offset="70%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
      <Button
        variant="outline"
        className={`relative transition-all duration-600 group-hover:text-[var(--color-accent)] group-hover:border-[var(--color-accent)]/40 ${className}`}
        {...props}
      >
        {children}
      </Button>
    </div>
  )
}

export {
  ShineButton,
  LiftButton,
  FloatButton,
  BorderPulseButton,
  ShimmerButton,
  GlowRingButton,
  SlideFillButton,
  RippleBurstButton,
  BorderFlowButton,
}
