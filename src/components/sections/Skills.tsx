import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const skillGroups = [
  {
    category: "Languages", categoryEs: "Idiomas",
    skills: [
      { name: "Spanish", nameEs: "Español", level: 100, note: "Native", noteEs: "Nativo" },
      { name: "French", nameEs: "Francés", level: 95, note: "BAC Fluent", noteEs: "Fluido BAC" },
      { name: "English", nameEs: "Inglés", level: 90, note: "TOEFL 103", noteEs: "TOEFL 103" },
      { name: "Portuguese", nameEs: "Portugués", level: 80, note: "Fluent", noteEs: "Fluido" },
    ],
  },
  {
    category: "Technical", categoryEs: "Técnico",
    skills: [
      { name: "Excel Modeling", nameEs: "Modelado Excel", level: 90 },
      { name: "Simulation & Modeling", nameEs: "Simulación y Modelado", level: 85 },
      { name: "AutoCAD", nameEs: "AutoCAD", level: 70 },
      { name: "Blender & 3D Design", nameEs: "Blender y Diseño 3D", level: 65 },
      { name: "3D Printing", nameEs: "Impresión 3D", level: 80 },
      { name: "Drone Piloting", nameEs: "Pilotaje de Drones", level: 75 },
      { name: "Photography", nameEs: "Fotografía", level: 70 },
    ],
  },
  {
    category: "Leadership & Soft Skills", categoryEs: "Liderazgo y Habilidades Blandas",
    skills: [
      { name: "Problem Solving", nameEs: "Resolución de Problemas", level: 95 },
      { name: "Team Leadership", nameEs: "Liderazgo de Equipos", level: 95 },
      { name: "Event Management", nameEs: "Gestión de Eventos", level: 90 },
      { name: "Crisis Management", nameEs: "Gestión de Crisis", level: 85 },
      { name: "Public Speaking", nameEs: "Oratoria", level: 85 },
      { name: "Cross-cultural Communication", nameEs: "Comunicación Intercultural", level: 90 },
      { name: "Perseverance", nameEs: "Perseverancia", level: 100 },
    ],
  },
  {
    category: "Certifications", categoryEs: "Certificaciones",
    skills: [
      { name: "PADI Open Water Diver", nameEs: "PADI Buzo de Aguas Abiertas", level: 100, note: "Certified", noteEs: "Certificado" },
    ],
  },
];

export const Skills = () => {
  const { ref, isInView } = useScrollReveal();
  const { lang, t } = useLanguage();

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">{t.skills.label}</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12">{t.skills.title}</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {skillGroups.map((group, gi) => (
              <motion.div key={group.category} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 * gi, duration: 0.5 }} className="space-y-4">
                <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                  {lang === "es" ? group.categoryEs : group.category}
                </h3>
                <div className="space-y-3">
                  {group.skills.map((skill, si) => (
                    <motion.div key={skill.name} initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 * gi + 0.05 * si }} className="group">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="group-hover:text-foreground transition-colors">
                          {lang === "es" ? skill.nameEs : skill.name}
                          {(lang === "es" ? skill.noteEs : skill.note) && (
                            <span className="text-xs text-muted-foreground ml-2">({lang === "es" ? skill.noteEs : skill.note})</span>
                          )}
                        </span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <motion.div className="h-full bg-foreground/60 rounded-full" initial={{ width: 0 }} animate={isInView ? { width: `${skill.level}%` } : {}} transition={{ delay: 0.1 * gi + 0.05 * si + 0.3, duration: 0.8, ease: "easeOut" }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
