import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export const WhatDrivesMe = () => {
  const { t } = useLanguage();

  return (
    <section id="what-drives-me" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="md:sticky md:top-32"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight">{t.drives.title}</h2>
            <div className="w-12 h-0.5 bg-foreground/20 mt-4" />
          </motion.div>

          <div className="space-y-8">
            {t.drives.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-display font-semibold text-lg mb-1">{item.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
