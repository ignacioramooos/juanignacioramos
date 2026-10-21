import { Navbar } from "@/components/Navbar";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import { ArrowRight } from "@/components/icons";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";

const EASE = [0.23, 1, 0.32, 1] as const;

const ServicesPage = () => {
  const { lang, t } = useLanguage();
  const reduceMotion = useReducedMotion();

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
      <div className="pt-32 pb-24 px-5 sm:px-[5vw]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h1 className="font-display font-light tracking-[-0.03em] leading-[0.95] text-[clamp(2.75rem,7vw,6rem)] mb-6">
              {t.servicesPage.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-20">{t.servicesPage.description}</p>
          </motion.div>

          <div className="space-y-0">
            {services.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.04 * i, duration: 0.6, ease: EASE }}
                {...(service.slug === "investment-research" ? { "data-easter-egg": "investment-card" } : {})}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group grid grid-cols-12 gap-4 items-baseline py-8 border-t border-border/60 first:border-t-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <h2 className="col-span-12 md:col-span-5 font-display text-2xl sm:text-3xl font-medium tracking-tight group-hover:text-foreground/70 transition-colors duration-200">
                    {lang === "es" ? service.titleEs : service.title}
                  </h2>
                  <p className="col-span-12 md:col-span-6 text-muted-foreground leading-relaxed">
                    {lang === "es" ? service.shortDescriptionEs : service.shortDescription}
                  </p>
                  <span className="col-span-12 md:col-span-1 inline-flex md:justify-end items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
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
