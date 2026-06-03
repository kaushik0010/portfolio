"use client";

import { motion } from "framer-motion";
import { FlaskConical, AlertCircle, RefreshCw } from "lucide-react";
import { experiments, Experiment } from "@/lib/data/experiments";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

export function RDLab() {
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
      id="rd"
      title="03 / R&D Lab"
      subtitle="Experiments born from curiosity, research questions, and occasional side quests."
      className="border-t border-white/5 bg-bg-secondary"
    >
      {/* 3-Column Experiments Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
      >
        {experiments.map((exp: Experiment, index: number) => {
          return (
            <motion.div key={exp.slug} variants={cardVariants} className="h-full flex">
              <Card
                className="flex flex-col justify-between w-full h-full border border-white/5 bg-bg-primary/20 hover:border-accent/15 hover:shadow-[0_15px_30px_-10px_rgba(59,130,246,0.03)] transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Lab Tag Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <span className="font-mono text-[9px] text-text-muted uppercase tracking-wider">
                      Experiment 0{index + 1}
                    </span>
                    <FlaskConical className="w-3 h-3 text-accent opacity-60 animate-pulse" />
                  </div>

                  {/* Title & Core Question */}
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-text-primary tracking-tight">
                      {exp.name}
                    </h3>
                    <p className="italic text-xs text-text-secondary border-l-2 border-accent/25 pl-3 py-0.5 leading-relaxed font-normal">
                      &ldquo;{exp.question}&rdquo;
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-text-muted leading-relaxed font-normal">
                    {exp.description}
                  </p>

                  {/* Technical Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-text-secondary"
                      >
                        {techNameMap(tag)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Weirdness & Insights Block */}
                <div className="mt-6 space-y-4">
                  {/* Weirdness Score Meter */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[9px] font-mono">
                      <span className="text-text-muted">WEIRDNESS_INDEX:</span>
                      <span className="text-text-secondary font-medium">
                        {exp.weirdnessScore}/10 &bull; {exp.weirdnessLabel}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-700"
                        style={{ width: `${exp.weirdnessScore * 10}%` }}
                      />
                    </div>
                  </div>

                  {/* Key Insight Drawer Panel */}
                  <div className="p-3 rounded-lg border border-white/5 bg-white/5">
                    <span className="block text-[9px] font-mono uppercase tracking-wider text-accent mb-1">
                      Key Insight
                    </span>
                    <p className="text-[11px] text-text-secondary leading-relaxed font-normal">
                      {exp.keyInsight}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Currently Exploring Subsection */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-16 glass-panel rounded-xl border border-white/5 p-5 md:p-6 bg-bg-secondary/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 max-w-4xl mx-auto shadow-lg"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h3 className="text-sm font-semibold text-text-primary">Currently Exploring</h3>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-accent/15 bg-accent-glow text-[9px] font-mono text-accent uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Active Exploration
            </span>
          </div>
          <p className="text-xs text-text-muted max-w-md">
            Developer tools, programming languages, and interfaces I am currently researching and prototyping.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Go", "Browser Extensions", "Developer Tooling", "AI Experiments"].map((item) => (
            <span
              key={item}
              className="font-mono text-xs px-3 py-1 rounded bg-white/5 border border-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10 transition-all duration-300"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

// Clean helper mapping to make sure common long tags render neatly on small viewports
function techNameMap(name: string): string {
  if (name === "Human-Computer Interaction") return "HCI";
  return name;
}

export default RDLab;
