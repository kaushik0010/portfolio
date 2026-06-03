export interface Experiment {
  slug: string;
  name: string;
  question: string;
  description: string;
  weirdnessScore: number; // Scale out of 10
  weirdnessLabel: string; // Fun context descriptor
  tags: string[];
  keyInsight: string;
}

export const experiments: Experiment[] = [
  {
    slug: "life-os",
    name: "Life OS",
    question: "Can an interface change how we relate to memories?",
    description: "An experiment in storing memories as folders and files inside nostalgic devices.",
    weirdnessScore: 8.5,
    weirdnessLabel: "Delightfully Weird",
    tags: ["Experiments", "Nostalgia", "Human-Computer Interaction", "Creative Software"],
    keyInsight: "The project explored whether interfaces themselves can become emotional artifacts rather than simply containers for content.",
  },
  {
    slug: "thread-shield",
    name: "ThreadShield",
    question: "What if moderation was a workflow problem instead of an automation problem?",
    description: "A Reddit moderation experiment that started as an AI helper and slowly evolved into a workflow obsession.",
    weirdnessScore: 7,
    weirdnessLabel: "Surprisingly Practical",
    tags: ["Reddit", "Moderation", "AI", "UX Experiments", "Devvit"],
    keyInsight: "The most interesting discoveries came from reducing friction rather than increasing automation.",
  },
  {
    slug: "scream-cursor",
    name: "ScreamCursor",
    question: "What if a cursor could panic?",
    description: "An experiment in turning a perfectly normal cursor into a highly stressed digital creature.",
    weirdnessScore: 9,
    weirdnessLabel: "Questionable Decisions Were Made",
    tags: ["Interaction Design", "Creative Coding", "Desktop Software", "Experiments", "Human-Computer Interaction"],
    keyInsight: "The project explored how personality and emotional feedback can emerge from tiny interaction details.",
  },
];
