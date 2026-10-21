import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const EASE = [0.23, 1, 0.32, 1] as const;

export const HighlightReel = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const highlights = [
    { label: t.highlights.spaceAcademy, detail: t.highlights.spaceAcademyDetail },
    { label: t.highlights.bac, detail: t.highlights.bacDetail },
    { label: t.highlights.mun, detail: t.highlights.munDetail },
    { label: t.highlights.waterPolo, detail: t.highlights.waterPoloDetail },
  ];

  return (
    <section className="py-20 px-5 sm:px-[5vw] overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {highlights.map((item, i) => (
          <motion.div
            key={i}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
          >
            <p className="font-display text-lg font-medium tracking-tight leading-snug">{item.label}</p>
            <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
