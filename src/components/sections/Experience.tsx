import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { Briefcase, ChevronDown } from "lucide-react";

const experiences = [
  {
    year: "2026",
    role: "SAT Tutor (March Bootcamp)",
    org: "Schoolhouse.world (College Board Partner)",
    location: "Remote",
    details: [
      "Approved for Honorary Certification in SAT Prep Course Challenge.",
      "Selected as tutor for the March SAT Bootcamp following a competitive onboarding process.",
      "Providing peer-to-peer mentorship and academic coaching in a global digital environment.",
    ],
  },
  {
    year: "2025",
    role: "Co-Secretary General",
    org: "LFMUN — Lycée Français Model United Nations",
    location: "Montevideo, Uruguay",
    details: [
      "Managed academic and logistical execution for 150+ participants.",
      "Led complex debates on ethics, technology, and the use of drones in international humanitarian law.",
      "Designed and 3D-printed custom awards for MUN participants.",
      "Recipient of 'Best Delegate' award in 2024.",
    ],
  },
  {
    year: "2022",
    role: "Logistics and Operations Intern",
    org: "LKSUR (Infrastructure & Sanitation)",
    location: "Montevideo, Uruguay",
    details: [
      "Worked on architecture, urban planning, and infrastructure projects.",
      "Applied AutoCAD and Revit for architectural drafting.",
      "Managed fiduciary responsibilities alongside technical design tasks.",
    ],
  },
  {
    year: "2025",
    role: "Student Event Lead & Project Founder",
    org: "Lycée Français Jules Supervielle",
    location: "Montevideo, Uruguay",
    details: [
      "Organized five major school events, coordinating teams of 10+ peers for 1,350+ participants.",
      "Managed graduation fund budget totaling 1,382,000 UYU (~$35,000 USD).",
      "Developed QR-code digital access control system for events with 1,250+ attendees.",
      "Rebuilt corrupted logistical databases within 24 hours of event launches.",
      'Founded "Ecolojules" — school-wide recycling and 3D-printing filament program.',
    ],
  },
  {
    year: "2024",
    role: "Event Director",
    org: "Warmup Method (Event Production)",
    location: "Montevideo, Uruguay",
    details: [
      "Created, organized, designed, and led two large-scale events.",
    ],
  },
  {
    year: "2023–2025",
    role: "Volunteer & Drone Surveyor",
    org: "TECHO",
    location: "Uruguay",
    details: [
      "Constructed transitional housing for families in settlements.",
      "Provided aerial land surveys using personal drone for logistical planning.",
      "Documented construction progress for the organization's media team.",
    ],
  },
];

export const Experience = () => {
  const { ref, isInView } = useScrollReveal();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="experience" className="py-24 px-6 bg-card/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">Career Path</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12">Experience</h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

            <div className="space-y-2">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="w-full text-left group"
                  >
                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                      <div className="mt-1 w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground/30 transition-colors">
                        <Briefcase size={16} className="text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="font-display font-semibold">{exp.role}</p>
                            <p className="text-sm text-muted-foreground">{exp.org}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-muted-foreground">{exp.year}</span>
                            <ChevronDown
                              size={14}
                              className={`text-muted-foreground transition-transform ${
                                expanded === i ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{exp.location}</p>
                      </div>
                    </div>
                  </button>

                  {expanded === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-14 pl-4 pb-4"
                    >
                      <ul className="space-y-2">
                        {exp.details.map((d, j) => (
                          <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
