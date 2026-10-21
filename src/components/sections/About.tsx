import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const getAge = () => {
  const birth = new Date(2008, 0, 11);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  if (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate())) age--;
  return age;
};

const EASE = [0.23, 1, 0.32, 1] as const;

export const About = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const honors = [
    { label: t.highlights.spaceAcademy, detail: t.highlights.spaceAcademyDetail },
    { label: t.highlights.bac, detail: t.highlights.bacDetail },
    { label: t.highlights.mun, detail: t.highlights.munDetail },
    { label: t.highlights.waterPolo, detail: t.highlights.waterPoloDetail },
  ];

  const enter = (delay: number) =>
    reduceMotion
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, margin: "-80px" }, transition: { delay, duration: 0.3 } }
      : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { delay, duration: 0.7, ease: EASE } };

  return (
    <section id="about" className="py-32 sm:py-40 px-5 sm:px-[5vw]">
      <div className="max-w-6xl mx-auto">
        {/* Statement — pure typography, no imagery */}
        <motion.div {...enter(0)}>
          <p className="text-sm text-muted-foreground mb-10">{t.about.title} · {t.about.motto} · {getAge()}</p>
          <p className="text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.35] tracking-tight text-foreground max-w-5xl">
            {t.about.p1}
          </p>
          <p className="text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.35] tracking-tight text-muted-foreground mt-8 max-w-5xl">
            {t.about.p2}
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mt-8 max-w-2xl">
            {t.about.p3}
          </p>
        </motion.div>

        {/* Key honors, 2×2 on mobile */}
        <motion.div {...enter(0.15)} className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {honors.map((h) => (
            <div key={h.label}>
              <p className="font-display text-lg font-medium tracking-tight leading-snug">{h.label}</p>
              <p className="text-sm text-muted-foreground mt-1">{h.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
