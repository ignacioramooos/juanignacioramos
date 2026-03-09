import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Lightbulb, Beaker, Rocket, Droplets, BarChart3, Globe2 } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const ideas = [
  {
    icon: Droplets,
    title: "Solar Desalination at Scale",
    status: "research",
    description: "Exploring passive solar desalination systems optimized for coastal communities in South America. Combining Peltier-assisted evaporation with low-cost materials for affordable clean water production.",
  },
  {
    icon: BarChart3,
    title: "Prediction Markets for Policy",
    status: "idea",
    description: "Investigating how prediction markets could improve public policy decisions in developing countries. Could decentralized forecasting improve infrastructure investment allocation?",
  },
  {
    icon: Droplets,
    title: "Water Tech for Rural Uruguay",
    status: "idea",
    description: "Mapping water infrastructure gaps in rural Uruguay and designing low-cost filtration and distribution systems powered by renewable energy.",
  },
  {
    icon: Rocket,
    title: "South American Sounding Rockets",
    status: "research",
    description: "Feasibility study for a student-led sounding rocket program in Uruguay. Exploring regulatory frameworks, propulsion options, and partnerships with local universities.",
  },
  {
    icon: Globe2,
    title: "Aerospace Industry in Uruguay",
    status: "idea",
    description: "Long-term vision: what would it take to bootstrap an aerospace sector in a country with no existing space industry? Identifying first steps, potential niches, and required policy changes.",
  },
  {
    icon: Beaker,
    title: "Recycled Filament Quality Standards",
    status: "prototype",
    description: "Developing testing protocols and quality benchmarks for 3D printing filament made from recycled PET/HDPE. Can recycled filament meet engineering-grade requirements?",
  },
];

const statusStyles: Record<string, { bg: string; label: string }> = {
  idea: { bg: "bg-muted text-muted-foreground", label: "💡 Idea" },
  research: { bg: "bg-muted text-foreground/70", label: "🔬 Research" },
  prototype: { bg: "bg-foreground/10 text-foreground", label: "🛠️ Prototype" },
};

const IdeasPage = () => {
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
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">Exploration</p>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Ideas</h1>
            <p className="text-muted-foreground max-w-2xl mb-12">
              A living index of concepts I'm exploring — from sustainability tech to aerospace ambitions. Some are early sparks, others are actively being researched.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Ideas">
            {ideas.map((idea, i) => {
              const style = statusStyles[idea.status];
              return (
                <motion.div
                  key={idea.title}
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all hover:-translate-y-1 focus-within:ring-2 focus-within:ring-ring"
                  tabIndex={0}
                >
                  <div className="flex items-center justify-between mb-4">
                    <idea.icon size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" aria-hidden="true" />
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
        </div>
      </div>
    </main>
  );
};

export default IdeasPage;
