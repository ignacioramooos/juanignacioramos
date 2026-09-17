import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const items = [
  {
    title: "Model UN Journey", titleEs: "Trayectoria Model UN",
    subtitle: "Delegate → Chair → Secretary General", subtitleEs: "Delegado → Chair → Secretario General",
    description: "Four-year progression from Delegate to Co-Secretary General of LFMUN 2025. Led committees on ethics, technology, and drone use in humanitarian law. Best Delegate 2024.",
    descriptionEs: "Progresión de cuatro años desde Delegado hasta Co-Secretario General de LFMUN 2025. Lideré comités sobre ética, tecnología y uso de drones en derecho humanitario. Mejor Delegado 2024.",
  },
  {
    title: "TECHO Housing Construction", titleEs: "Construcción de Viviendas TECHO",
    subtitle: "Volunteer & Drone Surveyor", subtitleEs: "Voluntario y Relevador con Drones",
    description: "Constructed transitional housing for families in settlements. Provided aerial land surveys with personal drone for logistical planning and documented progress for the media team.",
    descriptionEs: "Construí viviendas de transición para familias en asentamientos. Realicé relevamientos aéreos con drone personal para planificación logística y documenté el avance para el equipo de medios.",
  },
  {
    title: "Cor Ad Cor", titleEs: "Cor Ad Cor",
    subtitle: "Human-first peer support project", subtitleEs: "Proyecto humano de escucha entre pares",
    description: "Developing an anonymous, free space for private journaling, reflection, and optional human listening, with safety boundaries and Listener formation built into the product.",
    descriptionEs: "Desarrollando un espacio anónimo y gratuito para escritura privada, reflexión y escucha humana opcional, con límites de seguridad y formación de Listeners integrados al producto.",
  },
  {
    title: "Schoolhouse.world Tutor", titleEs: "Tutor en Schoolhouse.world",
    subtitle: "SAT Prep Bootcamp", subtitleEs: "Bootcamp de Preparación SAT",
    description: "Selected as peer tutor for SAT March Bootcamp through competitive onboarding. Providing academic coaching and mentorship in a global digital environment.",
    descriptionEs: "Seleccionado como tutor de pares para el Bootcamp SAT de Marzo a través de un proceso competitivo. Brindando coaching académico y mentoría en un entorno digital global.",
  },
];

export const Volunteering = () => {
  const { lang, t } = useLanguage();

  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">{t.volunteering.title}</h2>
          <p className="text-sm text-muted-foreground mb-12">{t.volunteering.label}</p>

          <div className="space-y-6">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="grid sm:grid-cols-[200px_1fr] gap-2 sm:gap-8 py-4 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-display font-semibold">{lang === "es" ? item.titleEs : item.title}</p>
                  <p className="text-xs text-muted-foreground">{lang === "es" ? item.subtitleEs : item.subtitle}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{lang === "es" ? item.descriptionEs : item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
