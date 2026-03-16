import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const education = [
  {
    title: "Universidad de la República (UdelaR)",
    subtitle: "Facultad de Ingeniería — Ingeniería Físico Matemática",
    subtitleEs: "Facultad de Ingeniería — Ingeniería Físico Matemática",
    period: "Enrolled February 2026", periodEs: "Inscripto Febrero 2026",
    highlights: ["Physical & Mathematical Engineering track", "Building advanced quantitative foundation for aerospace applications"],
    highlightsEs: ["Carrera de Ingeniería Físico Matemática", "Construyendo base cuantitativa avanzada para aplicaciones aeroespaciales"],
  },
  {
    title: "Lycée Français Jules Supervielle",
    subtitle: 'Baccalauréat Français — "Mention Très Bien" (Highest Honors)',
    subtitleEs: 'Baccalauréat Français — "Mention Très Bien" (Honores Máximos)',
    period: "Graduated December 2025", periodEs: "Graduado Diciembre 2025",
    highlights: [
      "Top 10–15% of the national cohort",
      "European Section; Mathématiques Expertes (Advanced Mathematics)",
      "Portuguese Language elective",
      "34–40 hours weekly instructional load, ~40% at AP/A-Level standards",
    ],
    highlightsEs: [
      "Top 10–15% de la cohorte nacional",
      "Sección Europea; Mathématiques Expertes (Matemáticas Avanzadas)",
      "Electiva de Lengua Portuguesa",
      "34–40 horas semanales de instrucción, ~40% a nivel AP/A-Level",
    ],
  },
  {
    title: "Advanced Space Academy (Space Camp)",
    subtitle: "Merit-Based Scholar", subtitleEs: "Becario por Mérito",
    period: "May 2025 · Huntsville, Alabama, USA", periodEs: "Mayo 2025 · Huntsville, Alabama, EE.UU.",
    highlights: ["Competitive scholarship awarded for aerospace aptitude", "Hands-on experience with space mission simulations"],
    highlightsEs: ["Beca competitiva otorgada por aptitud aeroespacial", "Experiencia práctica con simulaciones de misiones espaciales"],
  },
];

export const Education = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  return (
    <section id="education" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12">{t.education.title}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative p-6 rounded-lg border-2 border-dashed border-foreground/15 hover:border-foreground/30 transition-all bg-gradient-to-b from-card to-transparent overflow-hidden cursor-pointer"
              onClick={() => navigate("/colleges")}
            >
              <div className="relative">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="mb-4 w-6 h-6">
                  <Loader2 size={24} className="text-muted-foreground" />
                </motion.div>
                <h3 className="font-display font-semibold text-lg mb-1">{t.education.nextChapter}</h3>
                <p className="text-sm text-muted-foreground mb-2">{t.education.nextChapterSub}</p>
                <p className="text-xs text-muted-foreground/70 mb-4">{t.education.nextChapterNote}</p>
                <ul className="space-y-2">
                  {t.education.nextChapterBullets.map((b, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div className="h-full rounded-full bg-foreground/30" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} style={{ width: "40%" }} />
                </div>
              </div>
            </motion.div>

            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * (i + 1), duration: 0.5 }}
                className="p-6 rounded-lg bg-card border border-border"
              >
                <h3 className="font-display font-semibold text-lg mb-1">{edu.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{lang === "es" ? edu.subtitleEs : edu.subtitle}</p>
                <p className="text-xs text-muted-foreground/70 mb-4">{lang === "es" ? edu.periodEs : edu.period}</p>
                <ul className="space-y-2">
                  {(lang === "es" ? edu.highlightsEs : edu.highlights).map((h, j) => (
                    <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm italic text-muted-foreground mt-10">
            {t.education.quote}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
