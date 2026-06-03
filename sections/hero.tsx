"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, ArrowRight, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
    label: "GitHub",
    href: "#",
  },
  {
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    label: "LinkedIn",
    href: "#",
  },
  {
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
    label: "X",
    href: "#",
  },
  {
    icon: (props: React.ComponentProps<typeof BookOpen>) => (
      <BookOpen {...props} />
    ),
    label: "Dev.to",
    href: "#",
  },
];

const metrics = [
  { value: "03", label: "Flagship Systems" },
  { value: "01", label: "Client Production Launch" },
  { value: "02", label: "R&D Automation Labs" },
  { value: "100%", label: "Pipeline Ownership" },
];

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-[calc(100vh-6rem)] flex items-center justify-center pt-16 md:pt-20 lg:pt-16 xl:pt-20 overflow-hidden radial-mesh"
    >
      {/* Decorative blurred background grids */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-accent/5 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-blue-500/3 blur-[100px] pointer-events-none -z-10" />

      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center py-8 md:py-12 lg:py-4 xl:py-8 w-full">
        {/* Left Column - Core Pitch */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col space-y-6 text-left"
        >
          {/* Active Status Badge */}
          <motion.div variants={itemVariants} className="flex">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-bg-secondary/60 backdrop-blur-md font-mono text-[10px] text-accent tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              ● Available for full-time roles
            </div>
          </motion.div>

          {/* Headline and Identity */}
          <div className="space-y-4 lg:space-y-4">
            <motion.div variants={itemVariants} className="flex flex-col space-y-1">
              <span className="font-mono text-xs text-text-secondary">
                const engineer = &#123; name: &quot;Kaushik Paykoli&quot; &#125;;
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.05]">
                Building production-ready software from concept to deployment.
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl font-normal"
            >
              I am a <strong className="text-text-primary font-semibold">Full-Stack Software Engineer</strong> focused on designing reliable system architectures, automated workflow pipelines, and practical AI integrations. I take absolute ownership of software—from database optimization to production-grade DNS, CDN media routing, and real-time operational telemetry.
            </motion.p>
          </div>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:items-center"
          >
            <Button
              variant="primary"
              href="#projects"
              className="font-mono text-xs py-3 px-6 flex items-center justify-center gap-2 group"
            >
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="secondary"
              href="/assets/resume/kaushik_paykoli_resume2.pdf"
              external
              className="font-mono text-xs py-3 px-6 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-2 pt-4 border-t border-white/5 max-w-sm"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2.5 rounded-lg border border-white/5 bg-white/0 hover:bg-white/5 hover:border-white/10 hover:text-text-primary text-text-secondary transition-all duration-300"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </motion.div>

          {/* Visual Factual Metrics Bar */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/5"
          >
            {metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col space-y-1">
                <span className="text-xl md:text-2xl font-mono font-bold text-accent">
                  {metric.value}
                </span>
                <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-wider text-text-muted">
                  {metric.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column - Premium Frame Presentation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
            delay: 0.4,
          }}
          className="lg:col-span-5 w-full flex items-center justify-center relative group"
        >
          {/* Framed Glowing Card border effects */}
          <div className="absolute inset-0 bg-accent/5 rounded-2xl blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative glass-panel rounded-2xl overflow-hidden p-2 border border-white/5 lg:max-w-[420px] xl:max-w-[480px] w-full shadow-2xl glass-panel-hover transform hover:rotate-1 hover:scale-[1.02] transition-all duration-500">
            {/* Minimal Mockup Window Controls */}
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 mb-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              <span className="font-mono text-[9px] text-text-muted ml-2">
                kaushik_paykoli_production.log
              </span>
            </div>

            {/* Next.js Optimized Image component */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/5 bg-bg-tertiary">
              <Image
                src="/assets/hero/hero-showcase-image.png"
                alt="Kaushik Paykoli Core Production Showcase"
                fill
                priority
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
export default Hero;
