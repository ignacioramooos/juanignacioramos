import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { GraduationCap, Rocket, BookOpen } from "lucide-react";

const education = [
  {
    icon: BookOpen,
    title: "Universidad de la República (UdelaR)",
    subtitle: "Facultad de Ingeniería — Ingeniería Físico Matemática",
    period: "Enrolled February 2026",
    highlights: ["Physical & Mathematical Engineering track", "Building advanced quantitative foundation for aerospace applications"],
  },
  {
    icon: GraduationCap,
    title: "Lycée Français Jules Supervielle",
    subtitle: 'Baccalauréat Français — "Mention Très Bien" (Highest Honors)',
    period: "Graduated December 2025",
    highlights: [
      "Top 10–15% of the national cohort",
      "European Section; Mathématiques Expertes (Advanced Mathematics)",
      "Portuguese Language elective",
      "34–40 hours weekly instructional load, ~40% at AP/A-Level standards",
    ],
  },
  {
    icon: Rocket,
    title: "Advanced Space Academy (Space Camp)",
    subtitle: "Merit-Based Scholar",
    period: "May 2025 · Huntsville, Alabama, USA",
    highlights: [
      "Competitive scholarship awarded for aerospace aptitude",
      "Hands-on experience with space mission simulations",
    ],
  },
];

export const Education = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">Foundation</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12">Education</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 * i, duration: 0.5 }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-foreground/20 transition-all hover:-translate-y-1"
              >
                <edu.icon size={24} className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors" />
                <h3 className="font-display font-semibold text-lg mb-1">{edu.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{edu.subtitle}</p>
                <p className="text-xs text-muted-foreground/70 mb-4">{edu.period}</p>
                <ul className="space-y-2">
                  {edu.highlights.map((h, j) => (
                    <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
