import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className, hoverable = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-xl overflow-hidden p-6 relative border border-white/5",
        hoverable && "glass-panel-hover",
        className
      )}
      {...props}
    >
      {/* Background glow vignette */}
      <div className="absolute inset-0 bg-radial-gradient(at 0% 0%, rgba(255, 255, 255, 0.01) 0px, transparent 50%) pointer-events-none" />
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col space-y-1.5 mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn("text-lg font-semibold tracking-tight text-text-primary", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-sm text-text-muted leading-relaxed", className)}>{children}</p>;
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("text-sm text-text-secondary leading-relaxed", className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex items-center mt-6 pt-4 border-t border-white/5", className)}>{children}</div>;
}
