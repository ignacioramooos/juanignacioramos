import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const EASE = [0.23, 1, 0.32, 1] as const;

export const WhatDrivesMe = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section id="what-drives-me" className="py-32 sm:py-40 px-5 sm:px-[5vw]">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-x-6 gap-y-12">
        <motion.h2
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="col-span-12 md:col-span-4 font-display text-4xl sm:text-5xl font-medium tracking-tight md:sticky md:top-32 self-start"
        >
          {t.drives.title}
        </motion.h2>

        <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-14">
          {t.drives.items.map((item, i) => (
            <motion.div
              key={i}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
            >
              <p className="font-display text-xl sm:text-2xl font-medium tracking-tight mb-2">{item.title}</p>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
