import { motion } from "framer-motion";
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

export const Skills = () => {
  const { lang, t } = useLanguage();

  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">{t.skills.title}</h2>
          <p className="text-sm text-muted-foreground mb-16 max-w-lg">{t.skills.label}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: gi * 0.05 }}
            >
              <h3 className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5 pb-2 border-b border-border">
                {lang === "es" ? group.categoryEs : group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-card border border-border hover:border-foreground/20 transition-colors"
                  >
                    {lang === "es" ? skill.nameEs : skill.name}
                    {(lang === "es" ? skill.noteEs : skill.note) && (
                      <span className="text-xs text-muted-foreground">· {lang === "es" ? skill.noteEs : skill.note}</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
