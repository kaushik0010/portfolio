"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, HardDrive, ShieldCheck, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const projects = [
  {
    slug: "ownex",
    title: "OwnEx Properties",
    category: "Real Estate SaaS & Production Infrastructure",
    description:
      "A premium, edge-optimized real estate marketplace engineered for automated broker lead capture and heavy media processing. Built for a real-world agency, this system tackles hard physical serverless payload limitations and custom CDN delivery rules.",
    image: "/assets/covers/ownex.png",
    tags: ["Next.js 15", "TypeScript", "MongoDB", "Cloudinary CDN", "Web Workers", "Discord Webhooks"],
    highlights: [
      {
        icon: Cpu,
        title: "Web Worker Compression",
        text: "Intercepts multi-file form submissions in parallel via browser Web Workers, compressing high-res media by 80% to bypass Vercel's strict 4.5MB payload gateway limits.",
      },
      {
        icon: HardDrive,
        title: "SEO Indexing Engine",
        text: "Engineered a self-revalidating dynamic sitemap mapping active MongoDB records to Google Search Console to guarantee immediate search engine crawling.",
      },
      {
        icon: ShieldCheck,
        title: "Event-Driven CRM Webhooks",
        text: "Routes leads to Discord in under 2 seconds the moment a user unlocks a gated brochure, bypasses expensive traditional CRM overheads.",
      },
    ],
  },
  {
    slug: "behavior-insight-engine",
    title: "Behavior Insight Engine",
    category: "AI-Powered Data Pipeline & Observability",
    description:
      "An AI-native transactional intelligence engine converting messy financial text streams into structured behavioral data. Highlights advanced defensive AI design, pipeline rate-limiting, and deep trace observability drawer analytics.",
    image: "/assets/covers/behavior-insight-engine.png",
    tags: ["React 19", "Gemini 2.5 Flash", "Zustand", "Zod Validation", "Recharts", "Print Stylesheets"],
    highlights: [
      {
        icon: Cpu,
        title: "Deterministic Math Separation",
        text: "Strictly isolates LLM text enrichment from mathematical data calculations to guarantee 100% absolute aggregation accuracy in financial summaries.",
      },
      {
        icon: HardDrive,
        title: "Sliding-Window Concurrency",
        text: "Throttles batch CSV processing using a client-side Promise pool (15-row chunks, 3 concurrent) to maximize throughput without hitting API rate limits.",
      },
      {
        icon: ShieldCheck,
        title: "Trace Observability Telemetry",
        text: "Slide-out drawer exposing row-level confidence logs, latency trackers, and raw model output schemas to create a trust-aware environment.",
      },
    ],
  },
  {
    slug: "kosh",
    title: "KOSH Group Ledger",
    category: "High-Integrity Collaborative Finance Protocol",
    description:
      "A high-integrity collaborative savings engine implementing manual susu/chit-fund style contribution scheduling. Architected to enforce complex financial penalty logic, strict transactional state locks, and zero-leak database modeling.",
    image: "/assets/covers/kosh.png",
    tags: ["Next.js 15", "TypeScript", "MongoDB Atlas", "Mongoose ODM", "NextAuth JWT", "Tailwind CSS"],
    highlights: [
      {
        icon: Cpu,
        title: "Contribution Penalty Schedules",
        text: "Automates scheduled contribution windows and calculates late-payment penalties capped strictly at 40% to preserve ledger fairness.",
      },
      {
        icon: HardDrive,
        title: "Transactional Mutation Locks",
        text: "Prevents account self-termination or group deletions before full campaign fund distribution, guaranteeing zero-leak financial liquidation.",
      },
      {
        icon: ShieldCheck,
        title: "Relational Lifecycles",
        text: "Models complex schema states mapping collaborative campaigns from initial draft validation through active state to equal payout execution.",
      },
    ],
  },
];

export function FeaturedProjects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden bg-bg-primary">
      {/* Structural ambient lighting grids */}
      <div className="absolute top-1/3 right-0 w-[45vw] h-[45vw] rounded-full bg-accent/2 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 left-0 w-[45vw] h-[45vw] rounded-full bg-blue-500/2 blur-[130px] pointer-events-none -z-10" />

      <Container>
        {/* Section Header */}
        <div className="mb-20 md:mb-28 flex flex-col items-start max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-wider text-accent mb-3">
            // 01 / Selected Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-6 leading-none">
            Production-grade systems, built and deployed.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal max-w-2xl">
            I avoid basic tutorial exercises. The systems below were engineered to address real-world business constraints, physical infrastructure boundaries, and complex workflows.
          </p>
        </div>

        {/* Alternating Flagship Cards Grid */}
        <div className="space-y-32 md:space-y-40">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
              >
                {/* Column A: Content Panel */}
                <div
                  className={`lg:col-span-6 flex flex-col space-y-6 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {/* Category & Title */}
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-accent">
                      {project.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                      {project.title}
                    </h3>
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
                    {project.description}
                  </p>

                  {/* Operational Highlights */}
                  <div className="space-y-4 pt-2">
                    {project.highlights.map((highlight) => {
                      const Icon = highlight.icon;
                      return (
                        <div key={highlight.title} className="flex gap-3 items-start">
                          <div className="flex-shrink-0 mt-0.5 p-1.5 rounded-lg border border-white/5 bg-white/5 text-accent">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-text-primary">
                              {highlight.title}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-text-muted mt-0.5 leading-relaxed font-normal">
                              {highlight.text}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2.5 py-1 rounded bg-white/5 border border-white/5 text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Case Study CTA */}
                  <div className="pt-4">
                    <Button
                      variant="secondary"
                      href={`/work/${project.slug}`}
                      className="font-mono text-xs py-2.5 px-5 flex items-center gap-2 group border border-white/5 w-fit"
                    >
                      View Case Study
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </div>

                {/* Column B: Premium Image Frame Mockup */}
                <div
                  className={`lg:col-span-6 w-full flex items-center justify-center relative group ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  {/* Glowing vignette borders behind card */}
                  <div className="absolute inset-0 bg-accent/3 rounded-2xl blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative glass-panel rounded-2xl overflow-hidden p-2 border border-white/5 w-full shadow-2xl glass-panel-hover transform group-hover:scale-[1.015] transition-all duration-500">
                    {/* Mockup Top Window Controls */}
                    <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/5 mb-2">
                      <div className="w-2 h-2 rounded-full bg-white/10" />
                      <div className="w-2 h-2 rounded-full bg-white/10" />
                      <div className="w-2 h-2 rounded-full bg-white/10" />
                      <span className="font-mono text-[9px] text-text-muted ml-2">
                        production_environment_showcase_{index + 1}.log
                      </span>
                    </div>

                    {/* Next.js Optimized Image component */}
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/5 bg-bg-tertiary">
                      <Image
                        src={project.image}
                        alt={`${project.title} Showcase Cover`}
                        fill
                        priority={index === 0}
                        className="object-cover object-center group-hover:scale-[1.025] transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 550px"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
export default FeaturedProjects;
