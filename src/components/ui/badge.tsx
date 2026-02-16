import { cn } from "@/lib/utils/cn";
import { type HTMLAttributes } from "react";

type BadgeVariant = "default" | "primary" | "accent" | "success" | "warning" | "muted";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-neutral-200 text-neutral-900",
  primary: "bg-primary-100 text-primary-800",
  accent: "bg-accent-300 text-neutral-950",
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-800",
  muted: "bg-neutral-100 text-neutral-700",
};

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
