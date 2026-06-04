import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/sections/Projects";
import { SEOHead } from "@/components/SEOHead";

const ProjectsPage = () => (
  <main className="min-h-screen bg-background text-foreground">
    <SEOHead
      title="Projects — Juan Ignacio Ramos"
      description="Aerospace simulations, engineering builds, and software by Juan Ignacio Ramos — including rocketry simulation, Cor Ad Cor peer support, Foro Agora financial education, solar distillation, and 3D printing."
      keywords="Juan Ignacio Ramos projects, Cor Ad Cor, peer support platform, emotional reflection platform, Foro Agora, financial education Uruguay, fundamental analysis education, aerospace simulation, 6-DOF rocketry simulation, student engineering portfolio, Supabase React project"
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
