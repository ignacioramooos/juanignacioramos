import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
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

const EASE = [0.23, 1, 0.32, 1] as const;

export const Awards = () => {
  const { lang, t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [lit, setLit] = useState(0);

  // One name at a time is lit, cycling every two seconds.
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setLit((v) => (v + 1) % awards.length), 2000);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <section className="py-32 sm:py-40 px-5 sm:px-[5vw]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.2] tracking-tight max-w-4xl">
            <span className="text-foreground">{t.awards.title}: </span>
            {awards.map((award, i) => (
              <span key={i}>
                <span
                  className={`name-cycle ${lit === i ? "text-foreground" : "text-muted-foreground/60"}`}
                  title={lang === "es" ? award.descriptionEs : award.description}
                >
                  {lang === "es" && award.titleEs ? award.titleEs : award.title} ({award.year})
                </span>
                {i < awards.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
          <p className="text-base text-muted-foreground mt-8 max-w-xl leading-relaxed">
            {lang === "es" ? awards[lit].descriptionEs : awards[lit].description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
