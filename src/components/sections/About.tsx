import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const getAge = () => {
  const birth = new Date(2008, 0, 11);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  if (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate())) age--;
  return age;
};

const CountUp = ({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
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
  }, [end, duration, hasAnimated]);

  return <span ref={containerRef}>{count.toLocaleString()}{suffix}</span>;
};

export const About = () => {
  const { t } = useLanguage();

  const stats = [
    { value: 4, suffix: "", label: t.about.stats.languages, desc: t.about.stats.languagesDesc },
    { value: 35000, suffix: "+", label: t.about.stats.usdManaged, desc: t.about.stats.usdManagedDesc },
    { value: 4250, suffix: "+", label: t.about.stats.attendeesLed, desc: t.about.stats.attendeesLedDesc },
    { value: 3, suffix: "", label: t.about.stats.keyHonors, desc: t.about.stats.keyHonorsDesc },
  ];

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-baseline gap-3 mb-1">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">{t.about.title}</h2>
            <span className="text-sm text-muted-foreground">· {getAge()}</span>
          </div>
          <p className="font-display text-lg italic text-muted-foreground mb-10 tracking-wide">{t.about.motto}</p>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-5 text-muted-foreground leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className="p-4 rounded-lg border border-border"
                >
                  <p className="font-display text-2xl font-bold"><CountUp end={stat.value} suffix={stat.suffix} /></p>
                  <p className="text-xs font-medium mt-1">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
