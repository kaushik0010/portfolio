"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, Database, Cpu, Globe, GitBranch, FlaskConical, ExternalLink } from "lucide-react";
import { competencies, CompetencyCategory } from "@/lib/data/competencies";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

// Secure compile-safe icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  Layers: Layers,
  Database: Database,
  Cpu: Cpu,
  Globe: Globe,
  GitBranch: GitBranch,
  FlaskConical: FlaskConical,
};

export function Competencies() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
      },
    },
  } as const;

  return (
    <Section
      id="skills"
      title="02 / Competencies"
      subtitle="Proven engineering capabilities, mapped to actual system deployments."
      className="border-t border-white/5 bg-bg-primary"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
      >
        {competencies.map((category: CompetencyCategory) => {
          const IconComponent = iconMap[category.iconName] || Layers;

          return (
            <motion.div key={category.id} variants={cardVariants} className="h-full flex">
              <Card
                className={`flex flex-col justify-between w-full h-full border border-white/5 transition-all duration-300 ${
                  category.isRD
                    ? "hover:border-yellow-500/20 shadow-[inset_0_1px_0_0_rgba(251,191,36,0.02)]"
                    : "hover:border-accent/20 shadow-[inset_0_1px_0_0_rgba(59,130,246,0.02)]"
                }`}
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg border border-white/5 bg-white/5 text-accent h-fit ${
                          category.isRD ? "text-yellow-500" : "text-accent"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-semibold text-text-primary">
                        {category.title}
                      </h3>
                    </div>

                    {category.isRD && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-yellow-500/10 bg-yellow-500/5 text-[8px] font-mono text-yellow-500 uppercase tracking-wider">
                        <span className="w-1 h-1 rounded-full bg-yellow-500 animate-pulse" />
                        Exploring
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-text-secondary leading-relaxed font-normal">
                    {category.description}
                  </p>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {category.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Section (References & Project Links) */}
                <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-text-muted">
                    {category.isRD ? "Active Experiments" : "Verified In Projects"}
                  </span>
                  
                  {category.isRD && category.examples && category.examples.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {category.examples.map((ex) => (
                        <span
                          key={ex}
                          className="font-mono text-[9px] text-text-muted border border-dashed border-white/10 px-2 py-0.5 rounded"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  ) : (
                    category.references && category.references.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {category.references.map((ref) => {
                          if (ref.slug) {
                            return (
                              <Link
                                key={ref.name}
                                href={`/work/${ref.slug}`}
                                className="inline-flex items-center gap-1 font-mono text-[9px] text-accent hover:text-blue-400 border border-accent/10 hover:border-blue-400/30 px-2 py-0.5 rounded bg-accent-glow hover:bg-blue-500/10 transition-all duration-300"
                              >
                                {ref.name}
                                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                              </Link>
                            );
                          }
                          return (
                            <span
                              key={ref.name}
                              className="font-mono text-[9px] text-text-secondary border border-white/5 px-2 py-0.5 rounded bg-white/5"
                            >
                              {ref.name}
                            </span>
                          );
                        })}
                      </div>
                    )
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
export default Competencies;
