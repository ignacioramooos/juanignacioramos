import { motion } from "framer-motion";
import { ExternalLink, Newspaper } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import spaceCampImg from "@/assets/space-camp.jpg";

const articles = [
  {
    publication: "U.S. Space & Rocket Center Foundation",
    title: "Now I Know With Certainty I Am Going to Be an Aerospace Engineer",
    description: "A thank-you letter to scholarship donors that moved the Rocket Center staff enough to feature it on their official website.",
    descriptionEs: "Una carta de agradecimiento a los donantes de becas que conmovió al equipo del Rocket Center y fue publicada en su sitio oficial.",
    url: "https://rocketcenterfoundation.org/now-i-know-with-certainty-i-am-going-to-be-an-aerospace-engineer/",
  },
];

export const FeaturedIn = () => {
  const { t, lang } = useLanguage();
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="featured-in" className="py-28 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
            {t.featuredIn.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-sm mx-auto md:max-w-none">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="rounded-xl border border-border/50 bg-card/30 overflow-hidden flex flex-col"
            >
              {/* Embedded iframe */}
              <div className="w-full" style={{ height: "220px" }}>
                <img
                  src={spaceCampImg}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Article info */}
              <div className="p-4 flex-1 flex flex-col gap-2 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4 shrink-0 text-primary" />
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground truncate">
                    {article.publication}
                  </p>
                </div>
                <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {lang === "es" ? article.descriptionEs : article.description}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors pt-1"
                >
                  {lang === "es" ? "Leer artículo" : "Read article"}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
