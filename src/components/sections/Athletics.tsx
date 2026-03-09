import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Waves, Trophy, Anchor } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const athletics = [
  {
    icon: Waves,
    title: "Water Polo", titleEs: "Waterpolo",
    stats: "National Pre-selection (U18) · 20+ hrs/week", statsEs: "Pre-selección Nacional (U18) · 20+ hrs/semana",
    description: "Bigua Club player with pre-selection for the Uruguayan National U18 team. Maintained rigorous training schedule, demonstrating resilience after being ranked as first alternate and subsequently outperforming rostered players.",
    descriptionEs: "Jugador del Club Bigua con pre-selección para la Selección Uruguaya U18. Mantuve un riguroso calendario de entrenamiento, demostrando resiliencia tras ser clasificado como primer suplente y posteriormente superar a jugadores titulares.",
  },
  {
    icon: Trophy,
    title: "Open Water Swimming", titleEs: "Natación en Aguas Abiertas",
    stats: "3 Podium Finishes · ~1,500m", statsEs: "3 Podios · ~1.500m",
    description: "Multiple podium finishes (1st, 2nd, and 3rd place) in regional endurance races, demonstrating sustained physical performance and mental discipline.",
    descriptionEs: "Múltiples podios (1er, 2do y 3er lugar) en carreras regionales de resistencia, demostrando rendimiento físico sostenido y disciplina mental.",
  },
  {
    icon: Anchor,
    title: "PADI Scuba Diving", titleEs: "Buceo PADI",
    stats: "Open Water Diver Certified", statsEs: "Certificado Open Water Diver",
    description: "Applied classroom physics (Boyle's Law, pressure dynamics) to real high-pressure underwater environments. An 'underwater classroom' bridging theory and practice.",
    descriptionEs: "Apliqué física del aula (Ley de Boyle, dinámica de presión) a ambientes subacuáticos reales de alta presión. Un 'aula submarina' que une teoría y práctica.",
  },
];

export const Athletics = () => {
  const { ref, isInView } = useScrollReveal();
  const { lang, t } = useLanguage();

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">{t.athletics.label}</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12">{t.athletics.title}</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {athletics.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 * i, duration: 0.5 }} className="group p-6 rounded-xl bg-card border border-border hover:border-foreground/20 transition-all hover:-translate-y-1">
                <item.icon size={24} className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors" />
                <h3 className="font-display font-semibold mb-1">{lang === "es" ? item.titleEs : item.title}</h3>
                <p className="text-xs font-medium text-muted-foreground mb-3">{lang === "es" ? item.statsEs : item.stats}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{lang === "es" ? item.descriptionEs : item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
