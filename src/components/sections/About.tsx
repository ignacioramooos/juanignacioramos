import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useState, useRef } from "react";
import { Globe, Award, DollarSign, Users } from "lucide-react";
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
  const { ref, isInView } = useScrollReveal();
  const { t } = useLanguage();

  const stats = [
    { icon: Globe, value: 4, suffix: "", label: t.about.stats.languages, desc: t.about.stats.languagesDesc },
    { icon: DollarSign, value: 35000, suffix: "+", label: t.about.stats.usdManaged, desc: t.about.stats.usdManagedDesc },
    { icon: Users, value: 4250, suffix: "+", label: t.about.stats.attendeesLed, desc: t.about.stats.attendeesLedDesc },
    { icon: Award, value: 3, suffix: "", label: t.about.stats.keyHonors, desc: t.about.stats.keyHonorsDesc },
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">{t.about.label} · {getAge()} years old</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-1">{t.about.title}</h2>
          <p className="font-display text-lg sm:text-xl italic text-muted-foreground mb-8 tracking-wide">{t.about.motto}</p>

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
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="p-4 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-colors"
                >
                  <stat.icon size={18} className="text-muted-foreground mb-2" />
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
