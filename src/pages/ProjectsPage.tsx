import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/sections/Projects";
import { SEOHead } from "@/components/SEOHead";

const ProjectsPage = () => (
  <main className="min-h-screen bg-background text-foreground">
    <SEOHead
      title="Projects — Juan Ignacio Ramos"
      description="Aerospace simulations, engineering builds, and software by Juan Ignacio Ramos — a curated set of projects spanning rocketry, 3D printing, and web."
    />
    <Navbar />
    <div className="pt-16">
      <Projects />
    </div>
  </main>
);

export default ProjectsPage;
