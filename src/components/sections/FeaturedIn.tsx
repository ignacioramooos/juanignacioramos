import { motion } from "framer-motion";
import { ExternalLink, Newspaper } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const articles = [
  {
    publication: "U.S. Space & Rocket Center Foundation",
    title: "Now I Know With Certainty I Am Going to Be an Aerospace Engineer",
    description: "A personal essay published on the official Rocket Center Foundation website about my experience at Advanced Space Academy.",
    descriptionEs: "Un ensayo personal publicado en el sitio oficial de la Rocket Center Foundation sobre mi experiencia en el Advanced Space Academy.",
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
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-primary/70 mb-3 block">
            {t.featuredIn.label}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
            {t.featuredIn.title}
          </h2>
        </motion.div>

        <div className="grid gap-10">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="rounded-xl border border-border/50 bg-card/30 overflow-hidden"
            >
              {/* Header with article info */}
              <div className="flex items-start gap-5 p-6">
                <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Newspaper className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
                    {article.publication}
                  </p>
                  <h3 className="text-lg font-semibold text-foreground leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                    {lang === "es" ? article.descriptionEs : article.description}
                  </p>
                </div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 mt-1.5 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Open in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Embedded iframe */}
              <div className="w-full border-t border-border/50" style={{ height: "500px" }}>
                <iframe
                  src={article.url}
                  className="w-full h-full border-0"
                  title={article.title}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
