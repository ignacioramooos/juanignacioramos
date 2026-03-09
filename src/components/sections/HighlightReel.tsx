import { motion } from "framer-motion";
import { Rocket, GraduationCap, Globe, Waves } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export const HighlightReel = () => {
  const { t } = useLanguage();

  const highlights = [
    { icon: Rocket, label: t.highlights.spaceAcademy, detail: t.highlights.spaceAcademyDetail },
    { icon: GraduationCap, label: t.highlights.bac, detail: t.highlights.bacDetail },
    { icon: Globe, label: t.highlights.mun, detail: t.highlights.munDetail },
    { icon: Waves, label: t.highlights.waterPolo, detail: t.highlights.waterPoloDetail },
  ];

  return (
    <section className="py-12 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-full border border-border bg-card/80 backdrop-blur-sm hover:border-foreground/20 transition-colors"
            >
              <item.icon size={15} className="text-muted-foreground shrink-0" />
              <div className="text-left">
                <p className="text-xs font-medium leading-tight">{item.label}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
