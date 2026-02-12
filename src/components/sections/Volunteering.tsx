import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Heart, Users, Leaf, BookOpen } from "lucide-react";

const items = [
  {
    icon: Users,
    title: "Model UN Journey",
    subtitle: "Delegate → Chair → Secretary General",
    description: "Four-year progression from Delegate to Co-Secretary General of LFMUN 2025. Led committees on ethics, technology, and drone use in humanitarian law. Best Delegate 2024.",
  },
  {
    icon: Heart,
    title: "TECHO Housing Construction",
    subtitle: "Volunteer & Drone Surveyor",
    description: "Constructed transitional housing for families in settlements. Provided aerial land surveys with personal drone for logistical planning and documented progress for the media team.",
  },
  {
    icon: Leaf,
    title: "Ecolojules",
    subtitle: "Environmental Initiative Co-founder",
    description: "Implemented school-wide three-bin waste classification system. Negotiated acquisition of a PET/HDPE-to-3D-printing-filament machine, creating a circular economy within the school.",
  },
  {
    icon: BookOpen,
    title: "Schoolhouse.world Tutor",
    subtitle: "SAT Prep Bootcamp",
    description: "Selected as peer tutor for SAT March Bootcamp through competitive onboarding. Providing academic coaching and mentorship in a global digital environment.",
  },
];

export const Volunteering = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="py-24 px-6 bg-card/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">Impact</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12">Volunteering & Leadership</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-foreground/20 transition-all hover:-translate-y-1"
              >
                <item.icon size={20} className="text-muted-foreground mb-3 group-hover:text-foreground transition-colors" />
                <h3 className="font-display font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{item.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
