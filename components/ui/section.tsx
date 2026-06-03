import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

export function Section({
  id,
  title,
  subtitle,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-28 radial-mesh relative overflow-hidden", className)}
    >
      <Container className={containerClassName}>
        {(title || subtitle) && (
          <div className="mb-12 md:mb-16 flex flex-col items-start max-w-3xl">
            {title && (
              <h2 className="text-sm font-mono uppercase tracking-wider text-accent mb-3">
                // {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-2xl md:text-3xl font-semibold tracking-tight text-text-primary leading-tight">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
