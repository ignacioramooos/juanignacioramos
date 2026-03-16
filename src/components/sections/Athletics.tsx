import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const athletics = [
  {
    title: "Water Polo", titleEs: "Waterpolo",
    stats: "National Pre-selection (U18) · 20+ hrs/week", statsEs: "Pre-selección Nacional (U18) · 20+ hrs/semana",
    description: "Bigua Club player with pre-selection for the Uruguayan National U18 team. Maintained rigorous training schedule, demonstrating resilience after being ranked as first alternate and subsequently outperforming rostered players.",
    descriptionEs: "Jugador del Club Bigua con pre-selección para la Selección Uruguaya U18. Mantuve un riguroso calendario de entrenamiento, demostrando resiliencia tras ser clasificado como primer suplente y posteriormente superar a jugadores titulares.",
  },
  {
    title: "Open Water Swimming", titleEs: "Natación en Aguas Abiertas",
    stats: "3 Podium Finishes · ~1,500m", statsEs: "3 Podios · ~1.500m",
    description: "Multiple podium finishes (1st, 2nd, and 3rd place) in regional endurance races, demonstrating sustained physical performance and mental discipline.",
    descriptionEs: "Múltiples podios (1er, 2do y 3er lugar) en carreras regionales de resistencia, demostrando rendimiento físico sostenido y disciplina mental.",
  },
  {
    title: "PADI Scuba Diving", titleEs: "Buceo PADI",
    stats: "Open Water Diver Certified", statsEs: "Certificado Open Water Diver",
    description: "Applied classroom physics (Boyle's Law, pressure dynamics) to real high-pressure underwater environments. An 'underwater classroom' bridging theory and practice.",
    descriptionEs: "Apliqué física del aula (Ley de Boyle, dinámica de presión) a ambientes subacuáticos reales de alta presión. Un 'aula submarina' que une teoría y práctica.",
  },
];

export const Athletics = () => {
  const { lang, t } = useLanguage();

  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12">{t.athletics.title}</h2>

          <div className="space-y-8">
            {athletics.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                className="group"
              >
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="font-display font-semibold text-lg">{lang === "es" ? item.titleEs : item.title}</h3>
                  <span className="text-xs text-muted-foreground">{lang === "es" ? item.statsEs : item.stats}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{lang === "es" ? item.descriptionEs : item.description}</p>
                {i < athletics.length - 1 && <div className="w-8 h-px bg-border mt-8" />}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
