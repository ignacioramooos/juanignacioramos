import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Rocket, Heart, Leaf, Shield } from "lucide-react";

const drives = [
  {
    icon: Rocket,
    title: "Building an aerospace future in South America",
    desc: "Pioneering the path where none exists yet.",
  },
  {
    icon: Heart,
    title: "Applying engineering to humanitarian challenges",
    desc: "From drone surveys for housing to infrastructure solutions.",
  },
  {
    icon: Leaf,
    title: "Designing systems that combine sustainability and performance",
    desc: "Waste-to-filament, circular economy, real impact.",
  },
  {
    icon: Shield,
    title: "Leading teams under pressure and uncertainty",
    desc: "MUN delegations, event logistics, competitive sports.",
  },
];

export const WhatDrivesMe = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Purpose
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12">
            What Drives Me
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {drives.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              className="flex gap-4 p-5 rounded-2xl border border-border bg-card hover:border-foreground/20 transition-colors"
            >
              <item.icon
                size={22}
                className="text-muted-foreground shrink-0 mt-0.5"
              />
              <div>
                <p className="font-medium text-sm mb-1">{item.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
