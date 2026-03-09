import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const awards = [
  {
    title: 'BAC "Mention Très Bien"',
    description: "Highest Honors in the French Baccalaureate — top 10–15% of the national cohort.",
    descriptionEs: "Honores Máximos en el Baccalauréat Français — top 10–15% de la cohorte nacional.",
    year: "2025",
  },
  {
    title: "Advanced Space Academy Scholarship",
    titleEs: "Beca Advanced Space Academy",
    description: "Merit-based scholarship to attend Space Camp in Huntsville, Alabama, USA.",
    descriptionEs: "Beca por mérito para asistir al Space Camp en Huntsville, Alabama, EE.UU.",
    year: "2025",
  },
  {
    title: "MUN Best Delegate",
    titleEs: "MUN Mejor Delegado",
    description: "Recognized for exceptional communication, negotiation, and analytical performance.",
    descriptionEs: "Reconocido por comunicación, negociación y desempeño analítico excepcionales.",
    year: "2024",
  },
];

export const Awards = () => {
  const { ref, isInView } = useScrollReveal();
  const { lang, t } = useLanguage();

  return (
    <section className="py-24 px-6 bg-card/50">
      <div className="max-w-4xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">{t.awards.label}</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12">{t.awards.title}</h2>

          <div className="space-y-4">
            {awards.map((award, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 * i, duration: 0.5 }} className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-foreground/20 transition-colors">
                <Star size={18} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-semibold">{lang === "es" && award.titleEs ? award.titleEs : award.title}</h3>
                    <span className="text-xs text-muted-foreground">{award.year}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{lang === "es" ? award.descriptionEs : award.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
