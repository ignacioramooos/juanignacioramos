import { motion } from "framer-motion";
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
  const { lang, t } = useLanguage();

  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12">{t.awards.title}</h2>

          <div className="grid sm:grid-cols-3 gap-8">
            {awards.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <p className="font-display text-4xl font-bold text-foreground/10 mb-2">{award.year}</p>
                <h3 className="font-display font-semibold mb-2">{lang === "es" && award.titleEs ? award.titleEs : award.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{lang === "es" ? award.descriptionEs : award.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
