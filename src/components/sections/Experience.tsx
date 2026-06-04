import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const experiences = [
  {
    year: "2026",
    role: "Co-founder", roleEs: "Co-fundador",
    org: "Foro Agora", orgEs: "Foro Agora",
    location: "Montevideo, Uruguay", locationEs: "Montevideo, Uruguay",
    details: [
      "Co-founding a youth-focused financial education platform in Uruguay that helps students understand money, investing, companies, and markets through fundamental analysis.",
      "Shaping Foro Agora as an educational community rather than a trading tips product, with learning content, events, resources, and student tools.",
      "Leading product vision, strategy, communications, and community growth alongside the founding team.",
    ],
    detailsEs: [
      "Co-fundando una plataforma de educacion financiera para jovenes en Uruguay, enfocada en dinero, inversion, empresas y mercados mediante analisis fundamental.",
      "Construyendo Foro Agora como una comunidad educativa, no como un producto de consejos de trading, con contenidos, eventos, recursos y herramientas para estudiantes.",
      "Liderando vision de producto, estrategia, comunicacion y crecimiento de comunidad junto al equipo fundador.",
    ],
  },
  {
    year: "2026",
    role: "SAT Tutor (March Bootcamp)", roleEs: "Tutor SAT (Bootcamp de Marzo)",
    org: "Schoolhouse.world (College Board Partner)", orgEs: "Schoolhouse.world (Socio de College Board)",
    location: "Remote", locationEs: "Remoto",
    details: [
      "Approved for Honorary Certification in SAT Prep Course Challenge.",
      "Selected as tutor for the March SAT Bootcamp following a competitive onboarding process.",
      "Providing peer-to-peer mentorship and academic coaching in a global digital environment.",
    ],
    detailsEs: [
      "Aprobado para Certificación Honoraria en el Desafío de Preparación SAT.",
      "Seleccionado como tutor para el Bootcamp SAT de Marzo tras un proceso de selección competitivo.",
      "Brindando mentoría y coaching académico entre pares en un entorno digital global.",
    ],
  },
  {
    year: "2025",
    role: "Co-Secretary General", roleEs: "Co-Secretario General",
    org: "LFMUN — Lycée Français Model United Nations", orgEs: "LFMUN — Model United Nations del Lycée Français",
    location: "Montevideo, Uruguay", locationEs: "Montevideo, Uruguay",
    details: [
      "Managed academic and logistical execution for 150+ participants.",
      "Led complex debates on ethics, technology, and the use of drones in international humanitarian law.",
      "Designed and 3D-printed custom awards for MUN participants.",
      "Recipient of 'Best Delegate' award in 2024.",
    ],
    detailsEs: [
      "Gestioné la ejecución académica y logística para más de 150 participantes.",
      "Lideré debates complejos sobre ética, tecnología y uso de drones en derecho internacional humanitario.",
      "Diseñé e imprimí en 3D premios personalizados para participantes del MUN.",
      "Ganador del premio 'Mejor Delegado' en 2024.",
    ],
  },
  {
    year: "2022",
    role: "Logistics and Operations Intern", roleEs: "Pasante de Logística y Operaciones",
    org: "LKSUR (Infrastructure & Sanitation)", orgEs: "LKSUR (Infraestructura y Saneamiento)",
    location: "Montevideo, Uruguay", locationEs: "Montevideo, Uruguay",
    details: ["Worked with project records and reviewed past infrastructure projects completed by the company during the internship."],
    detailsEs: ["Trabajé con registros de proyectos y revisé proyectos de infraestructura completados por la empresa durante la pasantía."],
  },
  {
    year: "2025",
    role: "Student Event Lead & Project Founder", roleEs: "Líder de Eventos Estudiantiles y Fundador de Proyectos",
    org: "Lycée Français Jules Supervielle", orgEs: "Lycée Français Jules Supervielle",
    location: "Montevideo, Uruguay", locationEs: "Montevideo, Uruguay",
    details: [
      "Organized five major school events, coordinating teams of 10+ peers for 1,350+ participants.",
      "Managed graduation fund budget totaling 1,382,000 UYU (~$35,000 USD).",
      "Developed QR-code digital access control system for events with 1,250+ attendees.",
      "Rebuilt corrupted logistical databases within 24 hours of event launches.",
      'Founded "Ecolojules" — school-wide recycling and 3D-printing filament program.',
    ],
    detailsEs: [
      "Organicé cinco eventos escolares importantes, coordinando equipos de 10+ compañeros para 1.350+ participantes.",
      "Gestioné el presupuesto del fondo de graduación de 1.382.000 UYU (~$35.000 USD).",
      "Desarrollé un sistema de control de acceso digital con código QR para eventos con 1.250+ asistentes.",
      "Reconstruí bases de datos logísticas corruptas en 24 horas antes del lanzamiento de eventos.",
      'Fundé "Ecolojules" — programa de reciclaje y filamento de impresión 3D a nivel escolar.',
    ],
  },
  {
    year: "2025",
    role: "Event Director", roleEs: "Director de Eventos",
    org: "Warmup Method (Event Production)", orgEs: "Warmup Method (Producción de Eventos)",
    location: "Montevideo, Uruguay", locationEs: "Montevideo, Uruguay",
    details: ["Created, organized, designed, and led two large-scale events."],
    detailsEs: ["Creé, organicé, diseñé y lideré dos eventos a gran escala."],
  },
  {
    year: "2025",
    role: "Volunteer & Drone Surveyor", roleEs: "Voluntario y Relevador con Drones",
    org: "TECHO", orgEs: "TECHO",
    location: "Uruguay", locationEs: "Uruguay",
    details: [
      "Constructed transitional housing for families in settlements.",
      "Provided aerial land surveys using personal drone for logistical planning.",
      "Documented construction progress for the organization's media team.",
    ],
    detailsEs: [
      "Construí viviendas de transición para familias en asentamientos.",
      "Realicé relevamientos aéreos con drone personal para planificación logística.",
      "Documenté el avance de construcción para el equipo de medios de la organización.",
    ],
  },
];

export const Experience = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { lang, t } = useLanguage();

  return (
    <section id="experience" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-baseline gap-4 mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">{t.experience.title}</h2>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">{t.experience.label}</span>
          </div>

          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />
            <div className="space-y-2">
              {experiences.map((exp, i) => (
                <div key={i}>
                  <button onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left group">
                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                      <div className="mt-1 w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground/30 transition-colors">
                        <span className="text-xs font-medium text-muted-foreground">{exp.year.slice(-2)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="font-display font-semibold">{lang === "es" ? exp.roleEs : exp.role}</p>
                            <p className="text-sm text-muted-foreground">{lang === "es" ? exp.orgEs : exp.org}</p>
                          </div>
                          <ChevronDown size={14} className={`text-muted-foreground transition-transform flex-shrink-0 ${expanded === i ? "rotate-180" : ""}`} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{lang === "es" ? exp.locationEs : exp.location}</p>
                      </div>
                    </div>
                  </button>
                  {expanded === i && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="ml-14 pl-4 pb-4">
                      <ul className="space-y-2">
                        {(lang === "es" ? exp.detailsEs : exp.details).map((d, j) => (
                          <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
