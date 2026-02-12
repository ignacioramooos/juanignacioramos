import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { GraduationCap, Rocket, BookOpen, Loader2 } from "lucide-react";

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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Future education — awaiting card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0, duration: 0.5 }}
              className="group relative p-6 rounded-2xl border-2 border-dashed border-foreground/15 hover:border-foreground/30 transition-all hover:-translate-y-1 bg-gradient-to-b from-card to-transparent overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent opacity-50" />
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="mb-4 w-6 h-6"
                >
                  <Loader2 size={24} className="text-muted-foreground" />
                </motion.div>
                <h3 className="font-display font-semibold text-lg mb-1">Next Chapter</h3>
                <p className="text-sm text-muted-foreground mb-2">U.S. College — Class of 2030</p>
                <p className="text-xs text-muted-foreground/70 mb-4">Awaiting admissions decisions</p>
                <ul className="space-y-2">
                  <li className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                    Applying to top engineering programs
                  </li>
                  <li className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                    The journey never stops loading...
                  </li>
                </ul>
                <div className="mt-4 h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-foreground/30"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: "40%" }}
                  />
                </div>
              </div>
            </motion.div>

            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 * (i + 1), duration: 0.5 }}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all hover:-translate-y-1"
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center text-sm italic text-muted-foreground mt-10"
          >
            "The educational journey is never over."
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
