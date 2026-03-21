import type { ReactNode } from "react";

type BadgeVariant = "default" | "budget" | "standard" | "premium" | "provider";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300",
  budget: "bg-secondary-50 dark:bg-secondary-900/40 text-secondary-700 dark:text-secondary-300",
  standard: "bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300",
  premium: "bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
  provider: "bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-neutral-700 dark:text-neutral-200",
};

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-[var(--radius-sm)] text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
