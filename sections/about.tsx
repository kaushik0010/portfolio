"use client";

import { motion } from "framer-motion";
import { Sparkles, Compass, Shield, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  } as const;

  const principles = [
    {
      title: "Simple systems scale better than clever ones.",
      description: "Avoid premature abstractions. Write readable, predictable code that is easy to understand, maintain, and eventually delete.",
    },
    {
      title: "Measure behavior, not assumptions.",
      description: "Decisions should be driven by telemetry, real user workflows, and production metrics rather than hypothetical design theories.",
    },
    {
      title: "Build first, optimize later.",
      description: "Verify the architecture and validate user impact with a functional prototype before investing time in micro-optimizations.",
    },
  ];

  const focusAreas = [
    "Full Stack Engineering",
    "Production Systems",
    "Go Systems Programming",
    "Developer Tooling",
    "AI Workflows & Telemetry",
  ];

  return (
    <Section
      id="about"
      title="04 / Core Tenets"
      subtitle="A review of personal software engineering principles and operational methodologies."
      className="border-t border-white/5 bg-bg-primary"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full"
      >
        {/* Left Column: Personal Narrative */}
        <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
          <div className="space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
            <p>
              I build software because I enjoy understanding how complex systems behave, why users interact the way they do, and what happens when you push an idea far enough to make it real. For me, programming isn&apos;t a passive activity—it is a continuous cycle of building, shipping, and learning.
            </p>
            <p>
              Sometimes, the systems I build address strict commercial requirements and scale in production—like engineering multi-threaded client-side image compression to bypass Vercel payload constraints, or implementing transactional locks on group ledgers. Other times, they are playful investigations into human-computer interaction, like giving a desktop cursor an emotional state. 
            </p>
            <p>
              Both paths are equally important; production systems demand absolute rigor and operational compliance, while side experiments build the deep, native curiosity that makes a better software engineer.
            </p>
          </div>

          {/* Sub-narratives: How I Learn & How I Approach Engineering */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-text-primary">
                <Compass className="w-4 h-4 text-accent" />
                <h4 className="text-xs font-semibold uppercase tracking-wider font-mono">How I Learn</h4>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed font-normal">
                My learning loops are entirely project-driven. I don&apos;t read documentations in a vacuum; I write prototypes. If I want to understand concurrency boundaries, I write promises. If I want to learn Go, I build local developer tooling. Experimentation is the fastest way to turn abstract computer science theories into practical knowledge.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-text-primary">
                <Shield className="w-4 h-4 text-accent" />
                <h4 className="text-xs font-semibold uppercase tracking-wider font-mono">My Approach</h4>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed font-normal">
                I view engineering through the lens of absolute ownership. Clean code is useless if the deployment pipeline fails, or if the CDN costs spiral. Effective software design is about managing tradeoffs: balancing client CPU overhead against server budgets, keeping bundle sizes light, and setting up strict observability.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Principles Stack & Focus */}
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6 w-full">
          {/* Engineering Principles Card */}
          <Card className="border border-white/5 bg-bg-secondary/30 p-5 md:p-6 space-y-5">
            <div className="flex items-center gap-2 text-text-primary">
              <Sparkles className="w-4 h-4 text-accent" />
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono">Operating Principles</h4>
            </div>

            <div className="space-y-4">
              {principles.map((principle, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                    <h5 className="text-xs font-semibold text-text-primary leading-tight">
                      {principle.title}
                    </h5>
                  </div>
                  <p className="text-[11px] text-text-secondary pl-5.5 leading-relaxed font-normal">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Current Focus Area Card */}
          <Card className="border border-white/5 bg-bg-secondary/30 p-5 md:p-6 space-y-4">
            <div className="flex items-center gap-2 text-text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono">Current Focus</h4>
            </div>
            
            <p className="text-[11px] text-text-muted leading-relaxed font-normal">
              Active engineering domains and platforms I focus on developing, building, and refining:
            </p>

            <div className="flex flex-wrap gap-1.5">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="font-mono text-[9px] px-2.5 py-1 rounded bg-white/5 border border-white/5 text-text-secondary"
                >
                  {area}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  );
}

export default About;
