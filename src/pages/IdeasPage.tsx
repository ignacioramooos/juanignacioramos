import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Lightbulb, Droplets, BarChart3, Globe2, Rocket, Beaker, type LucideIcon } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";

const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  Droplets,
  BarChart3,
  Globe2,
  Rocket,
  Beaker,
};

interface Idea {
  id: string;
  title: string;
  description: string;
  status: string;
  icon: string;
  published: boolean;
  display_order: number;
}

const statusStyles: Record<string, { bg: string; label: string }> = {
  idea: { bg: "bg-muted text-muted-foreground", label: "💡 Idea" },
  research: { bg: "bg-muted text-foreground/70", label: "🔬 Research" },
  prototype: { bg: "bg-foreground/10 text-foreground", label: "🛠️ Prototype" },
};

const IdeasPage = () => {
  const { lang } = useLanguage();

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
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb size={20} className="text-muted-foreground" aria-hidden="true" />
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
                {lang === "es" ? "Exploración" : "Exploration"}
              </p>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              {lang === "es" ? "Ideas" : "Ideas"}
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-12">
              {lang === "es"
                ? "Un índice vivo de conceptos que estoy explorando — desde tecnología sostenible hasta ambiciones aeroespaciales."
                : "A living index of concepts I'm exploring — from sustainability tech to aerospace ambitions. Some are early sparks, others are actively being researched."}
            </p>
          </motion.div>

          {isLoading ? (
            <p className="text-sm text-muted-foreground">{lang === "es" ? "Cargando..." : "Loading..."}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Ideas">
              {ideas.map((idea, i) => {
                const style = statusStyles[idea.status] || statusStyles.idea;
                const Icon = iconMap[idea.icon] || Lightbulb;
                return (
                  <motion.div
                    key={idea.id}
                    role="listitem"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.5 }}
                    className="group p-6 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all hover:-translate-y-1 focus-within:ring-2 focus-within:ring-ring"
                    tabIndex={0}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Icon size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" aria-hidden="true" />
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${style.bg}`}>
                        {style.label}
                      </span>
                    </div>
                    <h2 className="font-display font-semibold mb-2">{idea.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{idea.description}</p>
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
