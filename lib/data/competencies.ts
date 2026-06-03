export interface ReferenceProject {
  name: string;
  slug?: string;
}

export interface CompetencyCategory {
  id: string;
  title: string;
  description: string;
  iconName: string; // Dynamic Lucide icon key name
  technologies: string[];
  references: ReferenceProject[];
  isRD?: boolean;
  examples?: string[];
}

export const competencies: CompetencyCategory[] = [
  {
    id: "full-stack",
    title: "Full Stack Development",
    description: "Building end-to-end web applications from UI to backend services.",
    iconName: "Layers",
    technologies: ["Next.js", "React", "TypeScript", "JavaScript", "Node.js", "Tailwind CSS", "REST APIs"],
    references: [
      { name: "OwnEx", slug: "ownex" },
      { name: "KOSH", slug: "kosh" },
      { name: "Behavior Insight Engine", slug: "behavior-insight-engine" },
    ],
  },
  {
    id: "backend-data",
    title: "Backend & Data Systems",
    description: "Designing scalable data models, workflows, validation layers, and persistence strategies.",
    iconName: "Database",
    technologies: [
      "MongoDB",
      "Mongoose",
      "SQL",
      "Database Modeling",
      "Schema Design",
      "Data Validation",
      "Authentication",
      "Business Logic Enforcement",
    ],
    references: [
      { name: "OwnEx", slug: "ownex" },
      { name: "KOSH", slug: "kosh" },
    ],
  },
  {
    id: "ai-product",
    title: "AI Product Engineering",
    description: "Building deterministic AI workflows rather than simple chat interfaces.",
    iconName: "Cpu",
    technologies: [
      "Gemini",
      "Structured Outputs",
      "Zod Validation",
      "AI Pipelines",
      "Workflow Orchestration",
      "Concurrent Processing",
      "Observability",
      "Prompt Engineering",
    ],
    references: [
      { name: "Behavior Insight Engine", slug: "behavior-insight-engine" },
      { name: "CodeAutopsy" },
    ],
  },
  {
    id: "production-infra",
    title: "Production & Infrastructure",
    description: "Deploying, maintaining, and operating production-ready systems.",
    iconName: "Globe",
    technologies: [
      "Vercel",
      "Cloudinary",
      "SEO",
      "Dynamic Sitemaps",
      "Google Search Console",
      "CDN Workflows",
      "Media Optimization",
      "Deployment Workflows",
    ],
    references: [
      { name: "OwnEx", slug: "ownex" },
    ],
  },
  {
    id: "developer-workflow",
    title: "Developer Workflow & Collaboration",
    description: "Managing codebases, project ownership, deployment workflows, and professional handovers.",
    iconName: "GitBranch",
    technologies: [
      "Git",
      "GitHub",
      "Version Control",
      "Branching Strategy",
      "Documentation",
      "Repository Management",
      "Project Handover",
      "Debugging",
    ],
    references: [
      { name: "OwnEx", slug: "ownex" },
      { name: "Portfolio" },
      { name: "Open Source Work" },
    ],
  },
  {
    id: "rd-explore",
    title: "R&D Technologies",
    description: "Technologies and domains I actively explore through experiments, prototypes, and side projects.",
    iconName: "FlaskConical",
    technologies: ["Go", "Browser Extensions", "Developer Tooling", "AI Experiments"],
    references: [],
    isRD: true,
    examples: ["ScreamCursor", "Chrome Extensions", "Internal Tooling Experiments", "YouTube Playables Experiments"],
  },
];
