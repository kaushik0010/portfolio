"use client";

import { useEffect, useState, useRef } from "react";
import { AlertCircle, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArchitectureDiagramProps {
  definition: string;
  title?: string;
  className?: string;
}

export function ArchitectureDiagram({ definition, title, className }: ArchitectureDiagramProps) {
  const [svg, setSvg] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const renderDiagram = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          themeVariables: {
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "12px",
            background: "#080C14",
            primaryColor: "#3B82F6",
            primaryTextColor: "#F9FAFB",
            lineColor: "#374151",
            secondaryColor: "#0F1622",
            tertiaryColor: "#1F2937",
          },
          flowchart: {
            htmlLabels: true,
            useMaxWidth: true,
          },
        });

        // Unique ID for mermaid parsing
        const uniqueId = `mermaid-${Math.floor(Math.random() * 1000000)}`;
        
        // Render raw string definition to SVG
        const { svg: renderedSvg } = await mermaid.render(uniqueId, definition);
        setSvg(renderedSvg);
        setError(false);
      } catch (err) {
        console.error("Mermaid Render Error:", err);
        setError(true);
      }
    };

    renderDiagram();
  }, [definition, mounted]);

  if (!mounted) {
    return (
      <div className="h-64 flex items-center justify-center border border-white/5 bg-bg-secondary/40 rounded-xl animate-pulse">
        <span className="font-mono text-xs text-text-muted">Loading System Architecture...</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col space-y-4 w-full", className)}>
      {title && (
        <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
          <Terminal className="w-3.5 h-3.5 text-accent" />
          <h3 className="text-xs font-mono text-text-primary tracking-wider uppercase">
            {title}
          </h3>
        </div>
      )}

      <div className="glass-panel border border-white/5 rounded-xl p-6 bg-bg-secondary/35 flex items-center justify-start md:justify-center overflow-x-auto w-full relative min-h-[250px]">
        {error ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center max-w-sm">
            <AlertCircle className="w-8 h-8 text-red-500/80" />
            <h4 className="text-xs font-semibold text-text-primary">Architecture Diagram Rendering Error</h4>
            <p className="text-[11px] text-text-muted leading-relaxed">
              An error occurred during client-side parser initialization. Check your syntax definition inside the projects data layer.
            </p>
          </div>
        ) : svg ? (
          <div
            ref={containerRef}
            className="w-full flex justify-start md:justify-center text-text-primary svg-container"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="flex items-center justify-center animate-pulse py-12">
            <span className="font-mono text-xs text-text-muted">Initializing Parser Layout...</span>
          </div>
        )}
      </div>

      <style jsx global>{`
        .svg-container svg {
          max-width: 100% !important;
          height: auto !important;
          background: transparent !important;
        }
        @media (max-width: 768px) {
          .svg-container svg {
            max-width: none !important;
            min-width: 650px !important;
          }
        }
        .svg-container svg * {
          font-family: var(--font-sans) !important;
        }
        .svg-container .label,
        .svg-container .nodeText,
        .svg-container .labelText {
          font-family: var(--font-sans) !important;
          font-size: 12px !important;
          fill: #f9fafb !important;
          color: #f9fafb !important;
        }
        .svg-container .node rect,
        .svg-container .node circle,
        .svg-container .node polygon,
        .svg-container .node path {
          fill: #080c14 !important;
          stroke: #1f2937 !important;
          stroke-width: 1.5px !important;
        }
        .svg-container .node:hover rect,
        .svg-container .node:hover circle,
        .svg-container .node:hover polygon,
        .svg-container .node:hover path {
          stroke: #3b82f6 !important;
          fill: #0f1622 !important;
        }
        .svg-container .edgePath .path {
          stroke: #374151 !important;
          stroke-width: 1.5px !important;
        }
        .svg-container .edgePath .path:hover {
          stroke: #3b82f6 !important;
        }
        .svg-container .marker {
          fill: #374151 !important;
          stroke: none !important;
        }
        .svg-container .cluster rect {
          fill: #080c14 !important;
          stroke: #1f2937 !important;
          rx: 8px !important;
        }
      `}</style>
    </div>
  );
}
export default ArchitectureDiagram;
