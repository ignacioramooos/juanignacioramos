import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/sections/Projects";

const ProjectsPage = () => (
  <main className="min-h-screen bg-background text-foreground">
    <Navbar />
    <div className="pt-16">
      <Projects />
    </div>
  </main>
);

export default ProjectsPage;
