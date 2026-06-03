import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "minimal";

interface BaseButtonProps {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  href?: string;
  external?: boolean;
}

type ButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  className,
  children,
  href,
  external,
  type = "button",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary:
      "bg-text-primary text-bg-primary hover:bg-zinc-200 shadow-[0_0_20px_0_rgba(255,255,255,0.05)] px-5 py-2.5",
    secondary:
      "glass-panel hover:border-accent/40 text-text-primary hover:text-white px-5 py-2.5",
    minimal:
      "text-text-secondary hover:text-text-primary hover:bg-white/5 px-3 py-1.5",
  };

  const combinedStyles = cn(baseStyles, variants[variant], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={combinedStyles}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedStyles} {...props}>
      {children}
    </button>
  );
}
