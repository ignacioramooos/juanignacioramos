import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { FlaskConical, Calendar, Tag } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const labEntries: { date: string; title: string; status: string; tags: string[]; content: string }[] = [];

const statusColors: Record<string, string> = {
  idea: "border-muted-foreground/30 text-muted-foreground",
  research: "border-foreground/30 text-foreground/70",
  prototype: "border-foreground/50 text-foreground",
};

const LabPage = () => {
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
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">Digital Laboratory</p>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Lab</h1>
            <p className="text-muted-foreground max-w-2xl mb-12">
              Experiments, technical notes, prototypes, and mini-demos. A digital notebook documenting the engineering journey.
            </p>
          </motion.div>

          <div className="space-y-4" role="feed" aria-label="Lab entries">
            {labEntries.map((entry, i) => (
              <motion.article
                key={entry.title}
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
                    <span className={`px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border ${statusColors[entry.status]}`}>
                      {entry.status}
                    </span>
                  </div>
                </div>

                <h2 className="font-display font-semibold text-lg mb-2">{entry.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed font-mono whitespace-pre-line mb-4">
                  {entry.content}
                </p>

                <div className="flex flex-wrap gap-1.5" role="list" aria-label="Tags">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      role="listitem"
                      className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                    >
                      <Tag size={8} aria-hidden="true" />
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LabPage;
