import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const experiences = [
  {
    year: "2026",
    role: "Founder & Builder", roleEs: "Fundador y Constructor",
    org: "Cor Ad Cor", orgEs: "Cor Ad Cor",
    location: "Active development", locationEs: "En desarrollo activo",
    details: [
      "Building a private, free, human-first space for journaling, reflection, and optional peer support.",
      "Designing the experience around Seekers who need to write or be heard and Listeners trained to be present without trying to fix people.",
      "Developing privacy, safety, Listener formation, emotional prompts, and a clear boundary: Cor Ad Cor is not therapy and does not replace crisis care.",
    ],
    detailsEs: [
      "Construyendo un espacio privado, gratuito y humano para escribir, reflexionar y pedir escucha entre pares si la persona lo quiere.",
      "Diseñando la experiencia alrededor de Seekers que necesitan escribir o ser escuchados y Listeners formados para estar presentes sin intentar arreglar a nadie.",
      "Desarrollando privacidad, seguridad, formación de Listeners, prompts emocionales y un límite claro: Cor Ad Cor no es terapia ni reemplaza atención de crisis.",
    ],
  },
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
    year: "2025",
    role: "Student Event Organizer", roleEs: "Organizador de Eventos Estudiantiles",
    org: "Lycée Français Jules Supervielle", orgEs: "Lycée Français Jules Supervielle",
    location: "Montevideo, Uruguay", locationEs: "Montevideo, Uruguay",
    details: [
      "Organized eight student and community events, including La Nuit 28/02, La Nuit 2, La Nuit 3, La Fet 1, La Fet 2, the French graduation ball, Proyecto LEA, and LFMUN.",
      "Led La Nuit 28/02 as a separate large-scale event: 821 tickets sold and 406,090 UYU in gross revenue.",
      "Led La Nuit 2 as its own larger edition: 1,246 tickets sold, 606,700 UYU projected gross revenue, and 310,500 UYU in costs.",
      "Managed graduation fund budget totaling 1,382,000 UYU (~$35,000 USD).",
      "Developed QR-code digital access control system for events with 1,250+ attendees.",
      "Rebuilt corrupted logistical databases within 24 hours of event launches.",
    ],
    detailsEs: [
      "Organicé ocho eventos estudiantiles y comunitarios, incluyendo La Nuit 28/02, La Nuit 2, La Nuit 3, La Fet 1, La Fet 2, el bal de graduación francés, Proyecto LEA y LFMUN.",
      "Lideré La Nuit 28/02 como evento independiente de gran escala: 821 entradas vendidas y 406.090 UYU de recaudación bruta.",
      "Lideré La Nuit 2 como una edición propia de mayor escala: 1.246 entradas vendidas, 606.700 UYU de recaudación bruta prevista y 310.500 UYU de costos.",
      "Gestioné el presupuesto del fondo de graduación de 1.382.000 UYU (~$35.000 USD).",
      "Desarrollé un sistema de control de acceso digital con código QR para eventos con 1.250+ asistentes.",
      "Reconstruí bases de datos logísticas corruptas en 24 horas antes del lanzamiento de eventos.",
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
  {
    year: "2022",
    role: "Logistics and Operations Intern", roleEs: "Pasante de Logística y Operaciones",
    org: "LKSUR (Infrastructure & Sanitation)", orgEs: "LKSUR (Infraestructura y Saneamiento)",
    location: "Montevideo, Uruguay", locationEs: "Montevideo, Uruguay",
    details: ["Worked with project records and reviewed past infrastructure projects completed by the company during the internship."],
    detailsEs: ["Trabajé con registros de proyectos y revisé proyectos de infraestructura completados por la empresa durante la pasantía."],
  },
];

const EASE = [0.23, 1, 0.32, 1] as const;

// Loose scatter: three alternating placements on a 12-column grid.
const placements = [
  "lg:col-start-1 lg:col-span-6",
  "lg:col-start-8 lg:col-span-5 lg:-mt-20",
  "lg:col-start-3 lg:col-span-7",
];

export const Experience = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { lang, t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="py-32 sm:py-40 px-5 sm:px-[5vw]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-display text-4xl sm:text-5xl font-medium tracking-tight mb-24"
        >
          {t.experience.title}
        </motion.h2>

        <div className="grid grid-cols-12 gap-x-6 gap-y-16 lg:gap-y-24">
          {experiences.map((exp, i) => {
            const open = expanded === i;
            return (
              <motion.article
                key={i}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE }}
                className={`col-span-12 ${placements[i % 3]}`}
              >
                <p className="text-sm text-muted-foreground mb-2">{exp.year} · {lang === "es" ? exp.locationEs : exp.location}</p>
                <button
                  onClick={() => setExpanded(open ? null : i)}
                  className="pressable w-full text-left group"
                  aria-expanded={open}
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-2xl sm:text-3xl font-medium tracking-tight group-hover:text-foreground/80 transition-colors duration-200">
                      {lang === "es" ? exp.roleEs : exp.role}
                    </span>
                    <Plus
                      size={18}
                      className={`shrink-0 text-muted-foreground transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                      style={{ transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}
                    />
                  </span>
                  <span className="block text-base text-muted-foreground mt-1">{lang === "es" ? exp.orgEs : exp.org}</span>
                </button>
                <div
                  className="grid transition-[grid-template-rows,opacity] duration-300"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0, transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}
                >
                  <div className="overflow-hidden">
                    <ul className="pt-5 space-y-2.5 max-w-xl">
                      {(lang === "es" ? exp.detailsEs : exp.details).map((d, j) => (
                        <li key={j} className="text-base text-muted-foreground leading-relaxed flex items-start gap-3">
                          <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2.5 flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
