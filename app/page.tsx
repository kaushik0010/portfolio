import { Hero } from "@/sections/hero";
import { FeaturedProjects } from "@/sections/projects";
import { Competencies } from "@/sections/competencies";
import { RDLab } from "@/sections/rd-lab";
import { About } from "@/sections/about";
import { Contact } from "@/sections/contact";
import { Section } from "@/components/ui/section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Featured Projects Section */}
      <FeaturedProjects />

      {/* Skills / Engineering Competencies Section */}
      <Competencies />

      {/* R&D Lab / Experiments Section */}
      <RDLab />

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
