import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";

const ServicesPage = () => {
  const { lang, t } = useLanguage();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Services by Juan Ignacio Ramos",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.shortDescription,
        url: `https://juanignacioramos.com/services/${s.slug}`,
        provider: { "@type": "Person", name: "Juan Ignacio Ramos" },
      },
    })),
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={lang === "es" ? "Servicios — Juan Ignacio Ramos" : "Services — Juan Ignacio Ramos"}
        description={lang === "es" ? "Servicios profesionales: Diseño Web, Videografía con Drones, Impresión 3D, Automatización con IA y más." : "Professional services: Web Design, Drone Videography, 3D Printing, AI Automation, and more."}
        jsonLd={jsonLd}
      />
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">{t.servicesPage.label}</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">{t.servicesPage.title}</h1>
            <p className="text-muted-foreground max-w-2xl mb-12">{t.servicesPage.description}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div key={service.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i, duration: 0.5 }}
                {...(service.slug === "investment-research" ? { "data-easter-egg": "investment-card" } : {})}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group block p-6 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all hover:-translate-y-1 h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <service.icon size={24} className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors" aria-hidden="true" />
                  <h2 className="font-display font-semibold text-lg mb-2">{lang === "es" ? service.titleEs : service.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{lang === "es" ? service.shortDescriptionEs : service.shortDescription}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {t.servicesPage.learnMore} <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;
