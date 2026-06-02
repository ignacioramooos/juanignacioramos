import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/sections/Projects";
import { SEOHead } from "@/components/SEOHead";

const ProjectsPage = () => (
  <main className="min-h-screen bg-background text-foreground">
    <SEOHead
      title="Projects — Juan Ignacio Ramos"
      description="Aerospace simulations, engineering builds, and software by Juan Ignacio Ramos — including rocketry simulation, Cor Ad Cor, Foro Agora, solar distillation, 3D printing, and civic tech."
      keywords="Juan Ignacio Ramos projects, Cor Ad Cor, Foro Agora, aerospace simulation, 6-DOF rocketry simulation, student engineering portfolio, civic technology, Supabase React project"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Projects — Juan Ignacio Ramos",
        description:
          "Curated portfolio of aerospace simulations, engineering builds, and software by Juan Ignacio Ramos.",
        url: "https://juanignacioramos.com/projects",
        isPartOf: {
          "@type": "WebSite",
          name: "Juan Ignacio Ramos",
          url: "https://juanignacioramos.com",
        },
        about: {
          "@type": "Person",
          name: "Juan Ignacio Ramos",
          url: "https://juanignacioramos.com",
        },
      }}
    />
    <Navbar />
    <div className="pt-16">
      <Projects />
    </div>
  </main>
);

export default ProjectsPage;
