import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import portrait from "@/assets/space-camp.jpg";

const getAge = () => {
  const birth = new Date(2008, 0, 11);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  if (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate())) age--;
  return age;
};

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

export const About = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const stats = [
    { value: 4, suffix: "", label: t.about.stats.languages, desc: t.about.stats.languagesDesc },
    { value: 35000, suffix: "+", label: t.about.stats.usdManaged, desc: t.about.stats.usdManagedDesc },
    { value: 4250, suffix: "+", label: t.about.stats.attendeesLed, desc: t.about.stats.attendeesLedDesc },
    { value: 3, suffix: "", label: t.about.stats.keyHonors, desc: t.about.stats.keyHonorsDesc },
  ];

  const enter = (delay: number) =>
    reduceMotion
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, margin: "-80px" }, transition: { delay, duration: 0.3 } }
      : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { delay, duration: 0.7, ease: EASE } };

  return (
    <section id="about" className="py-32 sm:py-40 px-5 sm:px-[5vw]">
      <div className="max-w-6xl mx-auto">
        {/* Statement with portrait as drop cap */}
        <motion.div {...enter(0)}>
          <p className="text-sm text-muted-foreground mb-10">{t.about.title} · {t.about.motto} · {getAge()}</p>
          <div className="grid grid-cols-12 gap-6">
            <div className="hidden lg:flex col-span-2 flex-col gap-6 pt-2">
              {stats.slice(0, 2).map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-medium"><CountUp end={s.value} suffix={s.suffix} /></p>
                  <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="col-span-12 lg:col-span-10">
              <p className="text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.35] tracking-tight text-foreground">
                <img
                  src={portrait}
                  alt="Juan Ignacio at the U.S. Space & Rocket Center"
                  className="darkroom-img float-left w-[3.6em] h-[3.6em] object-cover mr-[0.5em] mb-[0.1em]"
                />
                {t.about.p1}
              </p>
              <p className="text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.35] tracking-tight text-muted-foreground mt-8">
                {t.about.p2}
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mt-8 max-w-2xl">
                {t.about.p3}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats as printed data row (mobile + remaining) */}
        <motion.div {...enter(0.15)} className="mt-16 flex flex-wrap gap-x-12 gap-y-8 lg:justify-end">
          {(typeof window !== "undefined" ? stats : stats).map((stat) => (
            <div key={stat.label} className="lg:hidden xl:block">
              <p className="font-display text-2xl font-medium"><CountUp end={stat.value} suffix={stat.suffix} /></p>
              <p className="text-sm mt-1">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
