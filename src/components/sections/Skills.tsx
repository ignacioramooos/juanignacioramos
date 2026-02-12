import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { getDailyQuotes } from "@/data/quotes";
import { useState } from "react";

const skillGroups = [
  {
    category: "Languages",
    skills: [
      { name: "Spanish", level: 100, note: "Native" },
      { name: "French", level: 95, note: "BAC Fluent" },
      { name: "English", level: 90, note: "TOEFL 103" },
      { name: "Portuguese", level: 80, note: "Fluent" },
    ],
  },
  {
    category: "Technical",
    skills: [
      { name: "Excel Modeling", level: 90 },
      { name: "Simulation & Modeling", level: 85 },
      { name: "AutoCAD", level: 70 },
      { name: "Blender & 3D Design", level: 65 },
      { name: "3D Printing", level: 80 },
      { name: "Drone Piloting", level: 75 },
      { name: "Photography", level: 70 },
    ],
  },
  {
    category: "Leadership & Soft Skills",
    skills: [
      { name: "Problem Solving", level: 95 },
      { name: "Team Leadership", level: 95 },
      { name: "Event Management", level: 90 },
      { name: "Crisis Management", level: 85 },
      { name: "Public Speaking", level: 85 },
      { name: "Cross-cultural Communication", level: 90 },
      { name: "Perseverance", level: 100 },
    ],
  },
  {
    category: "Certifications",
    skills: [
      { name: "PADI Open Water Diver", level: 100, note: "Certified" },
    ],
  },
];

const dailyQuotes = getDailyQuotes();

export const Skills = () => {
  const { ref, isInView } = useScrollReveal();
  const [quoteIndex, setQuoteIndex] = useState(0);

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">Capabilities</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12">Skills</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {skillGroups.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * gi, duration: 0.5 }}
                className="space-y-4"
              >
                <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                  {group.category}
                </h3>
                <div className="space-y-3">
                  {group.skills.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.1 * gi + 0.05 * si }}
                      className="group"
                    >
                      <div className="flex justify-between text-sm mb-1">
                        <span className="group-hover:text-foreground transition-colors">
                          {skill.name}
                          {skill.note && (
                            <span className="text-xs text-muted-foreground ml-2">({skill.note})</span>
                          )}
                        </span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-foreground/60 rounded-full"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ delay: 0.1 * gi + 0.05 * si + 0.3, duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Daily Quote Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16"
          >
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-6">
              In My Own Words — Today's Quote
            </h3>
            <div className="relative flex items-center gap-4">
              <button
                onClick={() => setQuoteIndex((prev) => (prev - 1 + dailyQuotes.length) % dailyQuotes.length)}
                className="p-2 rounded-full border border-border hover:bg-muted transition-colors flex-shrink-0"
                aria-label="Previous quote"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={quoteIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 rounded-2xl bg-card border border-border text-center"
                  >
                    <Quote size={16} className="text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-base sm:text-lg italic text-foreground/80 leading-relaxed max-w-2xl mx-auto">
                      "{dailyQuotes[quoteIndex].text}"
                    </p>
                    <p className="text-xs text-muted-foreground mt-4">{dailyQuotes[quoteIndex].context}</p>
                  </motion.blockquote>
                </AnimatePresence>
              </div>
              <button
                onClick={() => setQuoteIndex((prev) => (prev + 1) % dailyQuotes.length)}
                className="p-2 rounded-full border border-border hover:bg-muted transition-colors flex-shrink-0"
                aria-label="Next quote"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {dailyQuotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setQuoteIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === quoteIndex ? "bg-foreground" : "bg-muted-foreground/30"}`}
                  aria-label={`Quote ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
