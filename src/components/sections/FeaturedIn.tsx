import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "@/components/icons";
import { useLanguage } from "@/i18n/LanguageContext";
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

const EASE = [0.23, 1, 0.32, 1] as const;

export const FeaturedIn = () => {
  const { t, lang } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section id="featured-in" className="py-32 sm:py-40 px-5 sm:px-[5vw]">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-x-6 gap-y-10 items-end">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="col-span-12 md:col-span-5"
        >
          <img
            src={spaceCampImg}
            alt={articles[0].title}
            loading="lazy"
            className="darkroom-img w-full aspect-[4/3] object-cover"
          />
        </motion.div>

        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="col-span-12 md:col-span-6 md:col-start-7"
        >
          <p className="text-sm text-muted-foreground mb-4">{t.featuredIn.title} · {articles[0].publication}</p>
          <p className="font-display text-2xl sm:text-3xl font-medium tracking-tight leading-snug">
            “{articles[0].title}”
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mt-4 max-w-lg">
            {lang === "es" ? articles[0].descriptionEs : articles[0].description}
          </p>
          <a
            href={articles[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-8 decoration-foreground/30 hover:decoration-foreground transition-[text-decoration-color] duration-200"
          >
            {lang === "es" ? "Leer artículo" : "Read article"}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
