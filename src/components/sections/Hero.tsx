import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const EASE = [0.23, 1, 0.32, 1] as const;

export const Hero = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const enter = (delay: number) =>
    reduceMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay, duration: 0.3 } }
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.8, ease: EASE } };

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden">
      {/* Top corners */}
      <div className="relative z-10 flex items-start justify-between px-5 sm:px-[72px] pt-24 sm:pt-[44px]">
        <motion.p {...enter(0.1)} className="text-sm text-muted-foreground">
          {t.hero.location}
        </motion.p>
        <motion.a
          {...enter(0.18)}
          href="/resume"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          {t.nav.resume}
        </motion.a>
      </div>

      {/* The name, full width, along the bottom edge — the starfield is the room */}
      <div className="relative z-10 px-5 sm:px-[72px] pb-32 sm:pb-[44px]">
        <motion.p {...enter(0.35)} className="text-base sm:text-lg text-muted-foreground max-w-[36ch] leading-relaxed mb-6">
          {t.hero.sentence}
        </motion.p>
        <motion.h1
          {...enter(0.45)}
          className="font-display font-light tracking-[-0.04em] leading-[0.95] text-[clamp(3rem,11vw,10rem)]"
        >
          <span data-easter-egg="header-name" className="block">Juan Ignacio</span>
          <span className="block text-muted-foreground">Ramos</span>
        </motion.h1>
        <motion.div {...enter(0.6)} className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{t.hero.subtitle}</p>
          <a
            href="#about"
            className="pressable inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-8 decoration-foreground/30 hover:decoration-foreground transition-[text-decoration-color] duration-200 shrink-0"
          >
            {t.hero.action} ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
};
