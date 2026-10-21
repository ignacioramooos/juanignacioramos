import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const skillGroups = [
  {
    category: "Languages", categoryEs: "Idiomas",
    skills: [
      { name: "Spanish", nameEs: "Español", note: "Native", noteEs: "Nativo" },
      { name: "French", nameEs: "Francés", note: "BAC Fluent", noteEs: "Fluido BAC" },
      { name: "English", nameEs: "Inglés", note: "TOEFL 103", noteEs: "TOEFL 103" },
      { name: "Portuguese", nameEs: "Portugués", note: "Fluent", noteEs: "Fluido" },
    ],
  },
  {
    category: "Technical", categoryEs: "Técnico",
    skills: [
      { name: "Excel Modeling", nameEs: "Modelado Excel" },
      { name: "Simulation & Modeling", nameEs: "Simulación y Modelado" },
      { name: "AutoCAD", nameEs: "AutoCAD" },
      { name: "Blender & 3D Design", nameEs: "Blender y Diseño 3D" },
      { name: "3D Printing", nameEs: "Impresión 3D" },
      { name: "Drone Piloting", nameEs: "Pilotaje de Drones" },
      { name: "Photography", nameEs: "Fotografía" },
    ],
  },
  {
    category: "Leadership & Soft Skills", categoryEs: "Liderazgo y Habilidades Blandas",
    skills: [
      { name: "Problem Solving", nameEs: "Resolución de Problemas" },
      { name: "Team Leadership", nameEs: "Liderazgo de Equipos" },
      { name: "Event Management", nameEs: "Gestión de Eventos" },
      { name: "Crisis Management", nameEs: "Gestión de Crisis" },
      { name: "Public Speaking", nameEs: "Oratoria" },
      { name: "Cross-cultural Communication", nameEs: "Comunicación Intercultural" },
    ],
  },
  {
    category: "Certifications", categoryEs: "Certificaciones",
    skills: [
      { name: "PADI Open Water Diver", nameEs: "PADI Buzo de Aguas Abiertas", note: "Certified", noteEs: "Certificado" },
    ],
  },
];

const EASE = [0.23, 1, 0.32, 1] as const;

export const Skills = () => {
  const { lang, t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section id="skills" className="py-32 sm:py-40 px-5 sm:px-[5vw]">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-display text-4xl sm:text-5xl font-medium tracking-tight mb-12"
        >
          {t.skills.title}
        </motion.h2>

        <div>
          {skillGroups.map((group, gi) => {
            const isActive = active === gi;
            return (
              <motion.div
                key={group.category}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: gi * 0.07, ease: EASE }}
              >
                <button
                  onClick={() => setActive(gi)}
                  onMouseEnter={() => setActive(gi)}
                  className="skill-row pressable w-full text-left py-5 flex items-baseline justify-between gap-4"
                >
                  <span className={`font-display text-xl sm:text-2xl font-medium tracking-tight transition-colors duration-200 ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {lang === "es" ? group.categoryEs : group.category}
                  </span>
                  <span className="text-sm text-muted-foreground tabular-nums">{group.skills.length}</span>
                </button>
                <div
                  className="grid transition-[grid-template-rows,opacity] duration-300"
                  style={{ gridTemplateRows: isActive ? "1fr" : "0fr", opacity: isActive ? 1 : 0, transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}
                >
                  <div className="overflow-hidden">
                    <ul className="pb-6 space-y-2">
                      {group.skills.map((skill) => (
                        <li key={skill.name} className="text-base text-muted-foreground flex items-baseline justify-between gap-4 max-w-md">
                          <span>{lang === "es" ? skill.nameEs : skill.name}</span>
                          {(lang === "es" ? skill.noteEs : skill.note) && (
                            <span className="text-sm text-muted-foreground/70">{lang === "es" ? skill.noteEs : skill.note}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
