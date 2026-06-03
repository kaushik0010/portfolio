import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Cpu, HardDrive, ShieldCheck, ExternalLink, Play, Sparkles } from "lucide-react";
import { projects } from "@/lib/data/projects";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScreenshotGallery } from "@/components/ui/screenshot-gallery";
import { ArchitectureDiagram } from "@/components/ui/architecture-diagram";
import { getYouTubeId } from "@/lib/utils";

// Declare page parameters interface for Next.js 16 (params is a Promise)
interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static routes for all flagship projects at compile-time (SSG)
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Dynamically generate SEO metadata based on the active case study
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return {};

  return {
    title: `${project.title} | Software Engineering Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Engineering Case Study`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const videoId = getYouTubeId(project.youtubeUrl);

  return (
    <div className="flex-1 bg-bg-primary text-text-primary">
      {/* 1. PROJECT HERO */}
      <Section className="pb-12 pt-6">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-accent transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to projects
          </Link>
        </div>

        {/* Hero Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <span className="font-mono text-xs text-accent uppercase tracking-wider">
              // Case Study / {project.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary leading-none">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
              {project.summary}
            </p>
          </div>

          {/* Core Info Specs Panel */}
          <div className="lg:col-span-4 glass-panel rounded-xl p-5 border border-white/5 bg-bg-secondary/40 w-full space-y-4">
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-2">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex gap-3">
              {project.links.map((link) => (
                <Button
                  key={link.label}
                  variant={link.label.includes("Live") ? "primary" : "secondary"}
                  href={link.href}
                  external={link.external}
                  className="flex-1 font-mono text-[10px] py-2 px-3 flex items-center justify-center gap-1.5 border border-white/5"
                >
                  <ExternalLink className="w-3 h-3" />
                  {link.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Premium Project Showcase Cover Frame */}
        <div className="relative w-full group mt-4">
          {/* Glowing vignette borders behind card */}
          <div className="absolute -inset-1.5 bg-accent/5 rounded-3xl blur-3xl pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-700" />
          
          <div className="relative glass-panel rounded-2xl overflow-hidden p-2.5 sm:p-3 border border-white/10 w-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-500">
            {/* Mockup Top Window Controls */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <span className="font-mono text-[9px] text-text-muted ml-2 hidden sm:inline">
                  production_environment_showcase_{project.slug}.log
                </span>
              </div>
              <span className="font-mono text-[9px] text-accent tracking-wider uppercase">
                STATUS: DEPLOYED // CDN_OPTIMIZED
              </span>
            </div>

            {/* Next.js Optimized Image component with a better aspect ratio (16:10 or 16:9) to prevent aggressive zoom and cropping */}
            <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-xl overflow-hidden border border-white/5 bg-bg-tertiary">
              <Image
                src={project.cover}
                alt={`${project.title} Showcase Banner`}
                fill
                priority
                className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* 2. THE PROBLEM */}
      <Section className="bg-bg-secondary border-y border-white/5 py-16 md:py-20" containerClassName="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 flex flex-col">
          <span className="font-mono text-xs uppercase tracking-wider text-accent mb-2">
            // 01 / The Friction
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
            The Problem & Target Constraints
          </h2>
        </div>
        <div className="lg:col-span-8 space-y-6 text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
          <p>{project.problem.description}</p>
          <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/5 text-red-400 text-xs sm:text-sm flex gap-3">
            <span className="text-red-500 font-bold font-mono">[!]</span>
            <p>
              <strong className="font-semibold text-text-primary">Real-World Impact:</strong>{" "}
              {project.problem.impact}
            </p>
          </div>
        </div>
      </Section>

      {/* 3. SYSTEM DESIGN & ARCHITECTURE SOLUTION (MERMAID RENDERING) */}
      {project.architectureDiagrams && project.architectureDiagrams.length > 0 && (
        <Section className="border-b border-white/5">
          <div className="mb-12 md:mb-16 flex flex-col items-start max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-wider text-accent mb-3">
              // 02 / System Design
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-text-primary mb-4 leading-none">
              System Architecture & Flows
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
              Direct client-side visual model mapping of data transactions, lifecycle schemas, and event hooks.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 w-full">
            {project.architectureDiagrams.map((diagram) => (
              <ArchitectureDiagram
                key={diagram.title}
                definition={diagram.definition}
                title={diagram.title}
                className="w-full"
              />
            ))}
          </div>
        </Section>
      )}

      {/* 4. ENGINEERING CHALLENGES (POST-MORTEM) */}
      <Section>
        <div className="mb-12 md:mb-16 flex flex-col items-start max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-wider text-accent mb-3">
            // 03 / The Post-Mortem
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-text-primary mb-4 leading-none">
            Deep-Dive Engineering Challenges
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
            Below is a structured breakdown of the difficult constraints and tradeoffs resolved during the design phase.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {project.challenges.map((challenge, index) => (
            <Card key={challenge.title} hoverable={false} className="border border-white/5">
              <div className="flex flex-col space-y-4">
                {/* Challenge Number Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="text-sm font-mono font-bold text-accent">
                    Challenge 0{index + 1}: {challenge.title}
                  </h3>
                  <span className="text-[10px] font-mono text-text-muted">
                    SYSTEM_STABILITY: ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm leading-relaxed">
                  {/* Left block - Constraints */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-text-primary mb-1">// The Problem</h4>
                      <p className="text-text-secondary">{challenge.problem}</p>
                    </div>
                    <div className="pt-2">
                      <h4 className="font-semibold text-text-primary mb-1">// Why It Was Difficult</h4>
                      <p className="text-text-secondary">{challenge.difficulty}</p>
                    </div>
                  </div>

                  {/* Right block - Resolution */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-accent mb-1">// The Solution</h4>
                      <p className="text-text-secondary">{challenge.solution}</p>
                    </div>
                    <div className="pt-2 p-3 rounded-lg border border-white/5 bg-white/5">
                      <h4 className="font-semibold text-text-primary mb-1">// Pragmatic Tradeoffs</h4>
                      <p className="text-text-secondary">{challenge.tradeoffs}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 5. SYSTEM PIPELINE SUMMARY */}
      <Section className="bg-bg-secondary border-t border-white/5 py-16 md:py-20" containerClassName="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 flex flex-col">
          <span className="font-mono text-xs uppercase tracking-wider text-accent mb-2">
            // 04 / Core Logic
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
            Architecture & Execution Decisions
          </h2>
        </div>
        <div className="lg:col-span-8 space-y-6 text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-2">// Core Pipeline Design</h3>
            <p className="text-text-secondary">{project.solution.architecture}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-2">// Interface Orchestration</h3>
            <p className="text-text-secondary">{project.solution.design}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-2">// Media & Memory Bounds</h3>
            <p className="text-text-secondary">{project.solution.details}</p>
          </div>
        </div>
      </Section>

      {/* 6. SCREENSHOTS GALLERY (INTERACTIVE SCREENSHOT COMPONENT) */}
      <Section className="border-t border-white/5">
        <div className="mb-12 md:mb-16 flex flex-col items-start max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-wider text-accent mb-3">
            // 05 / Visual Telemetry
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-text-primary mb-4 leading-none">
            Production Screenshots & Gallery
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
            Select and maximize thumbnails below to audit raw workspace interfaces and active dashboards.
          </p>
        </div>

        {/* Dynamic interactive screenshots gallery */}
        <ScreenshotGallery gallery={project.gallery} />
      </Section>

      {/* 7. TECHNICAL HIGHLIGHTS */}
      <Section className="bg-bg-secondary border-y border-white/5 py-16 md:py-20">
        <div className="mb-12 md:mb-16 flex flex-col items-start max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-wider text-accent mb-3">
            // 06 / Features Matrix
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-text-primary mb-4 leading-none">
            Detailed Technical Highlights
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {project.highlights.map((highlight) => (
            <Card key={highlight.title} hoverable={true} className="border border-white/5 bg-bg-primary/20">
              <div className="flex gap-3 mb-3">
                <div className="p-2 rounded-lg border border-white/5 bg-white/5 text-accent h-fit">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-text-primary mt-1">
                  {highlight.title}
                </h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {highlight.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 8. LESSONS LEARNED & POST-MORTEM */}
      <Section>
        <div className="mb-12 md:mb-16 flex flex-col items-start max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-wider text-accent mb-3">
            // 07 / Post-Mortem Lessons
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-text-primary mb-4 leading-none">
            Lessons & Engineering Retrospectives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hoverable={false} className="border border-white/5 bg-bg-secondary/40">
            <div className="flex flex-col space-y-2">
              <span className="text-[10px] font-mono text-green-500">// 01 / WHAT WENT WELL</span>
              <h3 className="text-sm font-semibold text-text-primary">System Successes</h3>
              <p className="text-xs text-text-secondary leading-relaxed pt-2">
                {project.lessons.well}
              </p>
            </div>
          </Card>
          <Card hoverable={false} className="border border-white/5 bg-bg-secondary/40">
            <div className="flex flex-col space-y-2">
              <span className="text-[10px] font-mono text-yellow-500">// 02 / IMPROVEMENT BOUNDS</span>
              <h3 className="text-sm font-semibold text-text-primary">Areas to Optimize</h3>
              <p className="text-xs text-text-secondary leading-relaxed pt-2">
                {project.lessons.improve}
              </p>
            </div>
          </Card>
          <Card hoverable={false} className="border border-white/5 bg-bg-secondary/40">
            <div className="flex flex-col space-y-2">
              <span className="text-[10px] font-mono text-accent">// 03 / SYSTEM MINDSET</span>
              <h3 className="text-sm font-semibold text-text-primary">Operational Learnings</h3>
              <p className="text-xs text-text-secondary leading-relaxed pt-2">
                {project.lessons.learned}
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* 9. REUSABLE DEMO SECTION (EMBED YOUTUBE IF CORRESPONDING URL EXISTS) */}
      {project.youtubeUrl && videoId && (
        <Section className="bg-bg-secondary border-t border-white/5 py-16 md:py-20">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-8">
            <div className="p-3 rounded-full border border-white/5 bg-white/5 text-accent w-fit">
              <Play className="w-5 h-5 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary leading-none">
                Interactive Video Walkthrough
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary max-w-lg leading-relaxed font-normal mx-auto">
                Watch a complete structural screen-cast demonstration detailing the pipeline routing, interface mechanics, and active ledger locks.
              </p>
            </div>

            {/* Aspect Ratio Responsive Iframe Container */}
            <div className="w-full relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-bg-tertiary shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`${project.title} Demo Walkthrough`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}
