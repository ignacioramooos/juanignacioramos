import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Heart, Users, Leaf, BookOpen } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const items = [
  {
    icon: Users,
    title: "Model UN Journey", titleEs: "Trayectoria Model UN",
    subtitle: "Delegate → Chair → Secretary General", subtitleEs: "Delegado → Chair → Secretario General",
    description: "Four-year progression from Delegate to Co-Secretary General of LFMUN 2025. Led committees on ethics, technology, and drone use in humanitarian law. Best Delegate 2024.",
    descriptionEs: "Progresión de cuatro años desde Delegado hasta Co-Secretario General de LFMUN 2025. Lideré comités sobre ética, tecnología y uso de drones en derecho humanitario. Mejor Delegado 2024.",
  },
  {
    icon: Heart,
    title: "TECHO Housing Construction", titleEs: "Construcción de Viviendas TECHO",
    subtitle: "Volunteer & Drone Surveyor", subtitleEs: "Voluntario y Relevador con Drones",
    description: "Constructed transitional housing for families in settlements. Provided aerial land surveys with personal drone for logistical planning and documented progress for the media team.",
    descriptionEs: "Construí viviendas de transición para familias en asentamientos. Realicé relevamientos aéreos con drone personal para planificación logística y documenté el avance para el equipo de medios.",
  },
  {
    icon: Leaf,
    title: "Ecolojules", titleEs: "Ecolojules",
    subtitle: "Environmental Initiative Co-founder", subtitleEs: "Co-fundador de Iniciativa Ambiental",
    description: "Implemented school-wide three-bin waste classification system. Negotiated acquisition of a PET/HDPE-to-3D-printing-filament machine, creating a circular economy within the school.",
    descriptionEs: "Implementé un sistema de clasificación de residuos de tres contenedores a nivel escolar. Negocié la adquisición de una máquina de PET/HDPE a filamento de impresión 3D, creando una economía circular dentro de la escuela.",
  },
  {
    icon: BookOpen,
    title: "Schoolhouse.world Tutor", titleEs: "Tutor en Schoolhouse.world",
    subtitle: "SAT Prep Bootcamp", subtitleEs: "Bootcamp de Preparación SAT",
    description: "Selected as peer tutor for SAT March Bootcamp through competitive onboarding. Providing academic coaching and mentorship in a global digital environment.",
    descriptionEs: "Seleccionado como tutor de pares para el Bootcamp SAT de Marzo a través de un proceso competitivo. Brindando coaching académico y mentoría en un entorno digital global.",
  },
];

export const Volunteering = () => {
  const { ref, isInView } = useScrollReveal();
  const { lang, t } = useLanguage();

  return (
    <section className="py-24 px-6 bg-card/50">
      <div className="max-w-5xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">{t.volunteering.label}</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12">{t.volunteering.title}</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {items.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 * i, duration: 0.5 }} className="group p-6 rounded-xl bg-card border border-border hover:border-foreground/20 transition-all hover:-translate-y-1">
                <item.icon size={20} className="text-muted-foreground mb-3 group-hover:text-foreground transition-colors" />
                <h3 className="font-display font-semibold mb-1">{lang === "es" ? item.titleEs : item.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{lang === "es" ? item.subtitleEs : item.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{lang === "es" ? item.descriptionEs : item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
