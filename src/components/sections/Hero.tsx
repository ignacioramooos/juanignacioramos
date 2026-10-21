import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import spaceCamp from "@/assets/space-camp.jpg";
import bde1 from "@/assets/bde/vista-nuit-1.webp";
import bde2 from "@/assets/bde/fuegos-artificiales-nuit.webp";
import bde3 from "@/assets/bde/lfmun-discours.webp";
import bde4 from "@/assets/bde/armado-escenario-nuit.webp";
import bde5 from "@/assets/bde/nuit-salon.webp";
import bde6 from "@/assets/bde/la-fet-1.webp";
import bde7 from "@/assets/bde/generation-nuit.webp";
import bde8 from "@/assets/bde/vista-nuit-2.webp";
import bde9 from "@/assets/bde/la-fet-2.webp";
import bde10 from "@/assets/bde/nuit-salon-vista-2.webp";
import bde11 from "@/assets/bde/ee377.webp";

const frames = [
  { src: spaceCamp, alt: "Advanced Space Academy, Huntsville" },
  { src: bde3, alt: "LFMUN opening speech" },
  { src: bde1, alt: "La Nuit — venue view" },
  { src: bde4, alt: "Building the stage for La Nuit" },
  { src: bde2, alt: "Fireworks over La Nuit" },
  { src: bde5, alt: "La Nuit main hall" },
  { src: bde6, alt: "La Fet 1" },
  { src: bde7, alt: "La Nuit crowd" },
  { src: bde8, alt: "La Nuit 2 — venue view" },
  { src: bde9, alt: "La Fet 2" },
  { src: bde10, alt: "La Nuit hall, second angle" },
  { src: bde11, alt: "Event night" },
];

const EASE = [0.23, 1, 0.32, 1] as const;

export const Hero = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);
  const [centerIdx, setCenterIdx] = useState(0);

  // Track which frame is nearest the viewport centre; it stays at full brightness.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    let raf = 0;
    const update = () => {
      const kids = Array.from(strip.children) as HTMLElement[];
      const mid = strip.getBoundingClientRect().left + strip.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      kids.forEach((k, i) => {
        const r = k.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setCenterIdx(best);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    strip.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      strip.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Start the strip centred on the middle frame.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const middle = strip.children[Math.floor(frames.length / 2)] as HTMLElement | undefined;
    if (middle) {
      strip.scrollLeft = middle.offsetLeft - strip.clientWidth / 2 + middle.clientWidth / 2;
    }
  }, []);

  const enter = (delay: number) =>
    reduceMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay, duration: 0.3 } }
      : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.6, ease: EASE } };

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden">
      {/* Top corners */}
      <div className="relative z-10 flex items-start justify-between px-5 sm:px-[72px] pt-6 sm:pt-[44px]">
        <motion.p {...enter(0.1)} className="text-sm font-medium tracking-tight">
          <span data-easter-egg="header-name">Juan Ignacio Ramos</span>
        </motion.p>
        <motion.a
          {...enter(0.18)}
          href="/resume"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          {t.nav.resume}
        </motion.a>
      </div>

      {/* The lit strip */}
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
        className="relative z-10"
      >
        <div
          ref={stripRef}
          className="filmstrip flex gap-2.5 overflow-x-auto items-center h-[46vh] sm:h-[34vh] px-[8vw]"
        >
          {frames.map((f, i) => (
            <img
              key={i}
              src={f.src}
              alt={f.alt}
              loading={i < 4 ? "eager" : "lazy"}
              className={`filmstrip-frame h-full w-auto flex-shrink-0 select-none ${i === centerIdx ? "is-center" : ""}`}
              draggable={false}
            />
          ))}
        </div>
        <p className="mt-3 px-5 sm:px-[72px] text-sm text-muted-foreground">
          {frames[centerIdx]?.alt} · {t.hero.dragHint}
        </p>
      </motion.div>

      {/* Bottom corners */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-5 sm:px-[72px] pb-8 sm:pb-[44px]">
        <motion.p {...enter(0.45)} className="text-base sm:text-lg text-muted-foreground max-w-[36ch] leading-relaxed">
          {t.hero.sentence}
        </motion.p>
        <motion.a
          {...enter(0.55)}
          href="#about"
          className="pressable inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-8 decoration-foreground/30 hover:decoration-foreground transition-[text-decoration-color] duration-200 w-fit"
        >
          {t.hero.action} ↓
        </motion.a>
      </div>
    </section>
  );
};
