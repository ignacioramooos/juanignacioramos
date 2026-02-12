import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useState, useRef } from "react";
import { Globe, Award, DollarSign, Users } from "lucide-react";

const CountUp = ({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const { ref: inViewRef, isInView } = useScrollReveal();

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={inViewRef}>
      <span ref={ref}>{count.toLocaleString()}</span>{suffix}
    </span>
  );
};

const stats = [
  { icon: Globe, value: 4, suffix: "", label: "Languages Spoken", desc: "ES · FR · EN · PT" },
  { icon: DollarSign, value: 35000, suffix: "+", label: "USD Managed", desc: "Fiduciary responsibility" },
  { icon: Users, value: 4250, suffix: "+", label: "Event Attendees", desc: "Across organized events" },
  { icon: Award, value: 3, suffix: "", label: "Key Honors", desc: "BAC · Space Academy · MUN" },
];

export const About = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">About Me</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-8">
            Mind & Hand
          </h2>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                I'm an aspiring Aerospace Engineer from Montevideo, Uruguay, with a documented record of managing high-stakes logistical projects and developing complex technical simulations. I graduated with the French Baccalaureate "Mention Très Bien" (Highest Honors — top 10-15%) and received the Advanced Space Academy Scholarship in Huntsville, Alabama.
              </p>
              <p>
                My expertise spans fiduciary management of 1,380,000+ UYU (~$35,000 USD), technical modeling with Python and 6-DOF simulations, and international leadership as Model UN Secretary General. I'm fluent in four languages and guided by the "Mens et Manus" principle — applying both mind and hand to solve structural challenges in aerospace and sustainable infrastructure.
              </p>
              <p>
                Currently enrolled in Physical & Mathematical Engineering at Universidad de la República (UdelaR), I'm building a rigorous quantitative foundation for my goal: to promote an aerospace industry in Uruguay and design space vehicles.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="p-4 rounded-xl bg-card border border-border hover:border-foreground/20 transition-colors"
                >
                  <stat.icon size={18} className="text-muted-foreground mb-2" />
                  <p className="font-display text-2xl font-bold">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </p>
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
