import { Navbar } from "@/components/Navbar";
import { motion, useReducedMotion } from "framer-motion";
import { Construction } from "@/components/icons";
import { SEOHead } from "@/components/SEOHead";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";

const EASE = [0.23, 1, 0.32, 1] as const;

interface LabEntry {
  id: string;
  title: string;
  content: string;
  status: string;
  tags: string[];
  published: boolean;
  date: string;
}

const LabPage = () => {
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["lab-entries"],
    queryFn: async () => {
      const { data, error } = await supabase.from("lab_entries").select("*").eq("published", true).order("date", { ascending: false });
      if (error) throw error;
      return data as LabEntry[];
    },
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Lab — Juan Ignacio Ramos"
        description="Digital laboratory: experiments, technical notes, prototypes, and mini-demos by Juan Ignacio Ramos."
      />
      <Navbar />
      <div className="pt-32 pb-24 px-5 sm:px-[5vw]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h1 className="font-display font-light tracking-[-0.03em] leading-[0.95] text-[clamp(2.75rem,7vw,6rem)] mb-6">Lab</h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-20">
              {lang === "es"
                ? "Experimentos, notas técnicas, prototipos y mini-demos. Un cuaderno digital documentando el camino de la ingeniería."
                : "Experiments, technical notes, prototypes, and mini-demos. A digital notebook documenting the engineering journey."}
            </p>
          </motion.div>

          {isLoading ? (
            <p className="text-sm text-muted-foreground">{lang === "es" ? "Cargando..." : "Loading..."}</p>
          ) : entries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <Construction size={48} className="text-muted-foreground/40 mb-4" />
              <h2 className="font-display text-xl font-semibold mb-2 text-foreground/80">
                {lang === "es" ? "Próximamente" : "Coming Soon"}
              </h2>
              <p className="text-sm text-muted-foreground max-w-md">
                {lang === "es"
                  ? "Estoy trabajando en algunos experimentos y prototipos. Volvé pronto para ver qué hay de nuevo en el laboratorio."
                  : "I'm working on some experiments and prototypes. Check back soon to see what's cooking in the lab."}
              </p>
            </motion.div>
          ) : (
            <div role="feed" aria-label="Lab entries">
              {entries.map((entry, i) => (
                <motion.article
                  key={entry.id}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: 0.04 * i, duration: 0.6, ease: EASE }}
                  className="py-10 border-t border-border/60 first:border-t-0"
                  tabIndex={0}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <time className="text-sm text-muted-foreground" dateTime={entry.date}>
                      {entry.date}
                    </time>
                    <span className="text-sm text-muted-foreground">· {entry.status}</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-3">{entry.title}</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line mb-4 max-w-2xl">{entry.content}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1" role="list" aria-label="Tags">
                    {entry.tags.map((tag) => (
                      <span key={tag} role="listitem" className="text-sm text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default LabPage;
