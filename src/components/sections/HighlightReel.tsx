import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const EASE = [0.23, 1, 0.32, 1] as const;

const CountUp = ({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          if (reduceMotion) { setCount(end); return; }
          let start = 0;
          const step = end / (duration * 60);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 1000 / 60);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated, reduceMotion]);

  return <span ref={containerRef} className="tabular-nums">{count.toLocaleString()}{suffix}</span>;
};

export const HighlightReel = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const stats = [
    { value: 4, suffix: "", label: t.about.stats.languages, detail: t.about.stats.languagesDesc },
    { value: 35000, suffix: "+", label: t.about.stats.usdManaged, detail: t.about.stats.usdManagedDesc, prefix: "$" },
    { value: 4250, suffix: "+", label: t.about.stats.attendeesLed, detail: t.about.stats.attendeesLedDesc },
    { value: 3, suffix: "", label: t.about.stats.keyHonors, detail: t.about.stats.keyHonorsDesc },
  ];

  return (
    <section className="py-20 px-5 sm:px-[5vw] overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
          >
            <p className="font-display text-3xl sm:text-4xl font-medium tracking-tight leading-none">
              {item.prefix ?? ""}<CountUp end={item.value} suffix={item.suffix} />
            </p>
            <p className="text-sm font-medium mt-2">{item.label}</p>
            <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
