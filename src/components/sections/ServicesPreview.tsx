import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export const ServicesPreview = () => {
  const { lang, t } = useLanguage();

  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">{t.servicesPreview.title}</h2>
              <p className="text-sm text-muted-foreground mt-2">{t.servicesPreview.label}</p>
            </div>
            <Link to="/services" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.servicesPreview.viewAll} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.slice(0, 4).map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
              >
                <Link to={`/services/${service.slug}`} className="group block p-5 rounded-lg bg-card border border-border hover:border-foreground/20 transition-colors h-full">
                  <h3 className="font-display font-semibold text-sm mb-1">{lang === "es" ? service.titleEs : service.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{lang === "es" ? service.shortDescriptionEs : service.shortDescription}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <Link to="/services" className="sm:hidden inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mt-6">
            {t.servicesPreview.viewAllServices} <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
