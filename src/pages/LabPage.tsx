import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { FlaskConical, Calendar, Tag } from "lucide-react";

const labEntries = [
  {
    date: "2026-03-01",
    title: "6-DOF Trajectory Simulator v2",
    status: "prototype",
    tags: ["Python", "Aerodynamics", "Simulation"],
    content: "Refactored the original Excel-based rocketry simulation into a Python module using LSODA numerical solver. Added wind shear modeling and multi-stage separation logic. Next: integrate with a web-based 3D visualizer.",
  },
  {
    date: "2026-02-15",
    title: "Solar Distiller Efficiency Testing",
    status: "research",
    tags: ["Solar", "Peltier", "Sustainability"],
    content: "Conducted systematic tests on the solar water distiller prototype comparing passive vs. Peltier-assisted configurations. Peltier cells improved output by ~35% with repurposed PC fans. Documenting optimal voltage regulator settings.",
  },
  {
    date: "2026-01-20",
    title: "PET-to-Filament Pipeline",
    status: "prototype",
    tags: ["3D Printing", "Recycling", "Ecolojules"],
    content: "Testing the school's PET/HDPE shredder-to-filament machine. Calibrating extrusion temperatures and measuring tensile strength of recycled filament vs. commercial PLA. Early results show 80% comparable strength.",
  },
  {
    date: "2025-12-10",
    title: "Drone Survey Workflow Automation",
    status: "idea",
    tags: ["Drone", "Automation", "GIS"],
    content: "Exploring automated stitching of drone survey images into georeferenced maps using open-source tools (OpenDroneMap). Goal: create a streamlined pipeline for TECHO-style land surveys.",
  },
];

const statusColors: Record<string, string> = {
  idea: "border-muted-foreground/30 text-muted-foreground",
  research: "border-foreground/30 text-foreground/70",
  prototype: "border-foreground/50 text-foreground",
};

const LabPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <FlaskConical size={20} className="text-muted-foreground" />
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">Digital Laboratory</p>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Lab</h1>
            <p className="text-muted-foreground max-w-2xl mb-12">
              Experiments, technical notes, prototypes, and mini-demos. A digital notebook documenting the engineering journey.
            </p>
          </motion.div>

          <div className="space-y-4">
            {labEntries.map((entry, i) => (
              <motion.article
                key={entry.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.5 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar size={12} />
                      {entry.date}
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border ${statusColors[entry.status]}`}>
                      {entry.status}
                    </span>
                  </div>
                </div>

                <h2 className="font-display font-semibold text-lg mb-2">{entry.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed font-mono whitespace-pre-line mb-4">
                  {entry.content}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                    >
                      <Tag size={8} />
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
