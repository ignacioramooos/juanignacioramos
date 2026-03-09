import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const milestones = [
  { year: 2008, label: "Born in Montevideo, Uruguay", icon: "🌎" },
  { year: 2018, label: "Started at Lycée Français Jules Supervielle", icon: "🏫" },
  { year: 2020, label: "Began Water Polo competitive training", icon: "🤽" },
  { year: 2022, label: "LKSUR Infrastructure Internship", icon: "🏗️" },
  { year: 2023, label: "MUN Delegate — first international debates", icon: "🌐" },
  { year: 2024, label: "MUN Best Delegate Award", icon: "🏆" },
  { year: 2025, label: "BAC \"Mention Très Bien\" · Space Academy · LFMUN Co-SG · TECHO · Ecolojules", icon: "🚀" },
  { year: 2026, label: "UdelaR Engineering · SAT Tutor · Applying to U.S. colleges", icon: "🎓" },
];

export const InteractiveTimeline = () => {
  const { ref, isInView } = useScrollReveal();
  const [activeIdx, setActiveIdx] = useState(milestones.length - 1);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateFromX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const idx = Math.round(pct * (milestones.length - 1));
    setActiveIdx(idx);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateFromX(e.clientX);
  }, [updateFromX]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updateFromX(e.clientX);
  }, [updateFromX]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Keyboard accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(milestones.length - 1, i + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIdx(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIdx(milestones.length - 1);
    }
  }, []);

  const active = milestones[activeIdx];
  const pct = (activeIdx / (milestones.length - 1)) * 100;

  return (
    <section className="py-24 px-6 bg-card/50" aria-label="Interactive timeline of Juan's journey">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">Journey</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12">The Path So Far</h2>

          {/* Active milestone display */}
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-center mb-10"
          >
            <span className="text-4xl mb-3 block" role="img" aria-hidden="true">{active.icon}</span>
            <p className="font-display text-3xl font-bold mb-2">{active.year}</p>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">{active.label}</p>
          </motion.div>

          {/* Scrubbable track */}
          <div
            ref={trackRef}
            className="relative h-12 cursor-pointer select-none touch-none"
            role="slider"
            aria-label="Timeline scrubber"
            aria-valuemin={milestones[0].year}
            aria-valuemax={milestones[milestones.length - 1].year}
            aria-valuenow={active.year}
            aria-valuetext={`${active.year}: ${active.label}`}
            tabIndex={0}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onKeyDown={handleKeyDown}
          >
            {/* Track line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
            {/* Active fill */}
            <div
              className="absolute top-1/2 left-0 h-px bg-foreground/40 -translate-y-1/2 transition-[width] duration-150"
              style={{ width: `${pct}%` }}
            />

            {/* Milestone dots */}
            {milestones.map((m, i) => {
              const dotPct = (i / (milestones.length - 1)) * 100;
              const isActive = i === activeIdx;
              return (
                <button
                  key={m.year}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive
                      ? "w-4 h-4 bg-foreground shadow-lg"
                      : i <= activeIdx
                      ? "w-2.5 h-2.5 bg-foreground/50 hover:bg-foreground/70"
                      : "w-2 h-2 bg-border hover:bg-muted-foreground/50"
                  }`}
                  style={{ left: `${dotPct}%` }}
                  aria-label={`${m.year}: ${m.label}`}
                  tabIndex={-1}
                />
              );
            })}

            {/* Scrub handle */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-foreground bg-background shadow-md pointer-events-none"
              style={{ left: `${pct}%` }}
              animate={{ scale: isDragging.current ? 1.2 : 1 }}
            />
          </div>

          {/* Year labels */}
          <div className="relative mt-2 h-6">
            {milestones.filter((_, i) => i === 0 || i === milestones.length - 1 || i % 2 === 0).map((m, _, arr) => {
              const i = milestones.indexOf(m);
              const dotPct = (i / (milestones.length - 1)) * 100;
              return (
                <span
                  key={m.year}
                  className="absolute -translate-x-1/2 text-[10px] text-muted-foreground"
                  style={{ left: `${dotPct}%` }}
                >
                  {m.year}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
