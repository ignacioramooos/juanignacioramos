import { Navbar } from "@/components/Navbar";
import { motion, useReducedMotion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";

const EASE = [0.23, 1, 0.32, 1] as const;

interface Idea {
  id: string;
  title: string;
  description: string;
  status: string;
  icon: string;
  published: boolean;
  display_order: number;
}

const statusLabels: Record<string, { en: string; es: string }> = {
  idea: { en: "Idea", es: "Idea" },
  research: { en: "Research", es: "Investigación" },
  prototype: { en: "Prototype", es: "Prototipo" },
};

const IdeasPage = () => {
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();

  const { data: ideas = [], isLoading } = useQuery({
    queryKey: ["ideas"],
    queryFn: async () => {
      const { data, error } = await supabase.from("ideas").select("*").eq("published", true).order("display_order");
      if (error) throw error;
      return data as Idea[];
    },
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Ideas — Juan Ignacio Ramos"
        description="Exploring concepts in sustainability, aerospace, prediction markets, and water technology."
      />
      <Navbar />
      <div className="pt-32 pb-24 px-5 sm:px-[5vw]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h1 className="font-display font-light tracking-[-0.03em] leading-[0.95] text-[clamp(2.75rem,7vw,6rem)] mb-6">
              {lang === "es" ? "Ideas" : "Ideas"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-20">
              {lang === "es"
                ? "Un índice vivo de conceptos que estoy explorando — desde tecnología sostenible hasta ambiciones aeroespaciales."
                : "A living index of concepts I'm exploring — from sustainability tech to aerospace ambitions. Some are early sparks, others are actively being researched."}
            </p>
          </motion.div>

          {isLoading ? (
            <p className="text-sm text-muted-foreground">{lang === "es" ? "Cargando..." : "Loading..."}</p>
          ) : (
            <div role="list" aria-label="Ideas">
              {ideas.map((idea, i) => {
                const status = statusLabels[idea.status] || statusLabels.idea;
                return (
                  <motion.div
                    key={idea.id}
                    role="listitem"
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: 0.04 * i, duration: 0.6, ease: EASE }}
                    className="py-10 border-t border-border/60 first:border-t-0"
                    tabIndex={0}
                  >
                    <p className="text-sm text-muted-foreground mb-2">{lang === "es" ? status.es : status.en}</p>
                    <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight mb-3">{idea.title}</h2>
                    <p className="text-muted-foreground leading-relaxed max-w-2xl">{idea.description}</p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default IdeasPage;
