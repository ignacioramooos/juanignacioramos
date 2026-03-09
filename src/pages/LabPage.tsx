import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { FlaskConical, Calendar, Tag, Construction } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";

interface LabEntry {
  id: string;
  title: string;
  content: string;
  status: string;
  tags: string[];
  published: boolean;
  date: string;
}

const statusColors: Record<string, string> = {
  idea: "border-muted-foreground/30 text-muted-foreground",
  research: "border-foreground/30 text-foreground/70",
  prototype: "border-foreground/50 text-foreground",
};

const LabPage = () => {
  const { lang } = useLanguage();

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
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <FlaskConical size={20} className="text-muted-foreground" aria-hidden="true" />
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
                {lang === "es" ? "Laboratorio Digital" : "Digital Laboratory"}
              </p>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Lab</h1>
            <p className="text-muted-foreground max-w-2xl mb-12">
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
            <div className="space-y-4" role="feed" aria-label="Lab entries">
              {entries.map((entry, i) => (
                <motion.article
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-colors focus-within:ring-2 focus-within:ring-ring"
                  tabIndex={0}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <time className="flex items-center gap-1.5 text-xs text-muted-foreground" dateTime={entry.date}>
                        <Calendar size={12} aria-hidden="true" />
                        {entry.date}
                      </time>
                      <span className={`px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border ${statusColors[entry.status] || ""}`}>
                        {entry.status}
                      </span>
                    </div>
                  </div>
                  <h2 className="font-display font-semibold text-lg mb-2">{entry.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed font-mono whitespace-pre-line mb-4">{entry.content}</p>
                  <div className="flex flex-wrap gap-1.5" role="list" aria-label="Tags">
                    {entry.tags.map((tag) => (
                      <span key={tag} role="listitem" className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        <Tag size={8} aria-hidden="true" />
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
