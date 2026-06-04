import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Slider } from "@/components/ui/slider";
import { ExternalLink, Play, RotateCcw } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area, ResponsiveContainer, ComposedChart, Bar, Legend } from
"recharts";

/* ─── Simulation Engine (from uploaded reference) ─── */

interface SimulationParams {
  initialVelocity: number;
  mass: number;
  dragCoefficient: number;
  launchAngle: number;
}

interface TrajectoryPoint {
  time: number;
  altitude: number;
  velocity: number;
  horizontalDistance: number;
  acceleration: number;
  machNumber: number;
  angle: number;
}

function runSimulation(p: SimulationParams): TrajectoryPoint[] {
  const G = 9.81;
  const dt = 0.01;
  const SOUND_SPEED = 343;
  const AIR_DENSITY = 1.225;
  const CROSS_SECTION = 0.008;

  let t = 0;
  let altitude = 0;
  let vx = p.initialVelocity * Math.cos(p.launchAngle * Math.PI / 180);
  let vy = p.initialVelocity * Math.sin(p.launchAngle * Math.PI / 180);
  let x = 0;
  const data: TrajectoryPoint[] = [];

  while (altitude >= 0 || t < 1) {
    const v = Math.sqrt(vx * vx + vy * vy);
    const angleOfAttack = Math.atan2(vy, vx) * (180 / Math.PI);
    const mach = v / SOUND_SPEED;

    const machFactor = mach > 0.8 ? 1 + (mach - 0.8) * 0.5 : 1;
    const dragForce = 0.5 * AIR_DENSITY * v * v * (p.dragCoefficient * machFactor) * CROSS_SECTION;
    const dragAx = -dragForce / p.mass * (vx / (v || 1));
    const dragAy = -dragForce / p.mass * (vy / (v || 1));

    const ax = dragAx;
    const ay = -G + dragAy;

    vx += ax * dt;
    vy += ay * dt;
    x += vx * dt;
    altitude += vy * dt;

    const totalAccel = Math.sqrt(ax * ax + ay * ay);

    data.push({
      time: parseFloat(t.toFixed(2)),
      altitude: Math.max(0, altitude),
      velocity: v,
      horizontalDistance: x,
      acceleration: totalAccel,
      machNumber: mach,
      angle: angleOfAttack
    });

    t += dt;
    if (altitude < 0 && t > 1) break;
  }

  return data;
}

/* ─── Rocket Simulator Component ─── */

const PRESETS = [
{ name: "Conservative", params: { initialVelocity: 120, mass: 8, dragCoefficient: 0.35, launchAngle: 45 } },
{ name: "Optimal Range", params: { initialVelocity: 180, mass: 6.5, dragCoefficient: 0.25, launchAngle: 45 } },
{ name: "Max Altitude", params: { initialVelocity: 200, mass: 5, dragCoefficient: 0.2, launchAngle: 75 } },
{ name: "Supersonic", params: { initialVelocity: 350, mass: 4, dragCoefficient: 0.3, launchAngle: 50 } }];


export const RocketSimulator = () => {
  const [params, setParams] = useState<SimulationParams>({
    initialVelocity: 180,
    mass: 6.5,
    dragCoefficient: 0.25,
    launchAngle: 48
  });
  const [running, setRunning] = useState(false);

  const results = useMemo(() => running ? runSimulation(params) : [], [running, params]);

  const stats = useMemo(() => {
    if (results.length === 0) return null;
    const maxAlt = Math.max(...results.map((p) => p.altitude));
    const maxVel = Math.max(...results.map((p) => p.velocity));
    const maxG = Math.max(...results.map((p) => p.acceleration / 9.81));
    const apogeeTime = results.find((p) => p.altitude === maxAlt)?.time || 0;
    const range = results[results.length - 1]?.horizontalDistance || 0;
    const flightTime = results[results.length - 1]?.time || 0;
    return { maxAlt, maxVel, maxG, apogeeTime, range, flightTime };
  }, [results]);

  const reset = () => {
    setParams({ initialVelocity: 180, mass: 6.5, dragCoefficient: 0.25, launchAngle: 48 });
    setRunning(false);
  };

  // Downsample for charts
  const chartData = useMemo(() => results.filter((_, i) => i % 5 === 0 || i === results.length - 1), [results]);

  return (
    <div className="p-6 rounded-2xl bg-card border border-border space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h4 className="font-display font-semibold text-sm">Interactive 6-DOF Trajectory Simulator (for model rockets)</h4>
          <p className="text-xs text-muted-foreground">Adjust parameters · Real-time physics engine</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setRunning(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors">

            <Play size={12} /> Launch
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border rounded-full hover:bg-muted transition-colors">

            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) =>
        <button
          key={preset.name}
          onClick={() => {setParams(preset.params);setRunning(false);}}
          className="px-3 py-1 text-[11px] rounded-full border border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-colors">

            {preset.name}
          </button>
        )}
      </div>

      {/* Parameter sliders */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
        { key: "initialVelocity" as const, label: "Initial Velocity", unit: "m/s", min: 50, max: 500, step: 10 },
        { key: "mass" as const, label: "Mass", unit: "kg", min: 1, max: 20, step: 0.5 },
        { key: "dragCoefficient" as const, label: "Drag Coeff.", unit: "Cd", min: 0.1, max: 1, step: 0.05 },
        { key: "launchAngle" as const, label: "Launch Angle", unit: "°", min: 15, max: 89, step: 1 }].
        map(({ key, label, unit, min, max, step }) =>
        <div key={key} className="space-y-2">
            <label className="text-xs text-muted-foreground flex justify-between">
              {label} <span className="font-mono">{params[key].toFixed(key === "dragCoefficient" ? 2 : 0)}{unit}</span>
            </label>
            <Slider
            value={[params[key] * (1 / step)]}
            onValueChange={([v]) => {setParams((p) => ({ ...p, [key]: v * step }));setRunning(false);}}
            min={min / step}
            max={max / step}
            step={1} />

          </div>
        )}
      </div>

      {running && stats &&
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Key stats */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
          { label: "Max Altitude", value: `${stats.maxAlt.toFixed(1)}m` },
          { label: "Apogee Time", value: `${stats.apogeeTime.toFixed(2)}s` },
          { label: "Range", value: `${stats.range.toFixed(1)}m` },
          { label: "Max Velocity", value: `${stats.maxVel.toFixed(1)}m/s` },
          { label: "Flight Time", value: `${stats.flightTime.toFixed(1)}s` },
          { label: "Peak G-Force", value: `${stats.maxG.toFixed(2)}g` }].
          map(({ label, value }) =>
          <div key={label} className="p-3 rounded-xl bg-muted/50 text-center">
                <p className="text-base sm:text-lg font-display font-bold">{value}</p>
                <p className="text-[10px] text-muted-foreground">{label}</p>
              </div>
          )}
          </div>

          {/* Eiffel Tower Easter Egg */}
          {stats.maxAlt > 330 &&
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          className="p-4 rounded-2xl bg-card border border-foreground/20 text-center space-y-2">

              <p className="text-3xl">🗼</p>
              <p className="font-display font-semibold text-sm">
                Your rocket just surpassed the Eiffel Tower!
              </p>
              <p className="text-xs text-muted-foreground">
                At {stats.maxAlt.toFixed(1)}m, this rocket exceeded the 330m height of the Eiffel Tower — the very question from the Grand Oral.
              </p>
            </motion.div>
        }

          {/* Charts */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-muted/30 p-4 border border-border">
              <p className="text-xs text-muted-foreground mb-3">Altitude Profile</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="altGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142, 50%, 50%)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(142, 50%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
                  <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                  <Area type="monotone" dataKey="altitude" stroke="hsl(142, 50%, 50%)" fill="url(#altGrad)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-xl bg-muted/30 p-4 border border-border">
              <p className="text-xs text-muted-foreground mb-3">Trajectory Path</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="horizontalDistance" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
                  <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                  <Line type="monotone" dataKey="altitude" stroke="hsl(210, 50%, 60%)" dot={false} strokeWidth={2} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-xl bg-muted/30 p-4 border border-border">
              <p className="text-xs text-muted-foreground mb-3">Velocity Over Time</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
                  <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                  <Line type="monotone" dataKey="velocity" stroke="hsl(30, 70%, 55%)" dot={false} strokeWidth={2} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-xl bg-muted/30 p-4 border border-border">
              <p className="text-xs text-muted-foreground mb-3">Mach Number</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
                  <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                  <Line type="monotone" dataKey="machNumber" stroke="hsl(0, 60%, 55%)" dot={false} strokeWidth={2} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      }
    </div>);

};

/* ─── Projects Section ─── */

const projects = [
{
  title: "6-DOF Rocketry Simulation",
  description: "Excel-based 6-Degrees-of-Freedom trajectory simulation using numerical solvers to model aerodynamic complexities. Originally developed for the French Baccalaureate 'Grand Oral' — though the jury selected the other topic, I continued developing and refining the simulator after the exam out of genuine passion.",
  tags: ["Python", "Excel", "LSODA", "Aerodynamics", "SimScale"],
  featured: true,
  category: "engineering"
},
{
  title: "Cor Ad Cor",
  description: "Active-development anonymous peer-support and emotional reflection platform. Cor ad Cor is a free, human-first space between silence and clinical care, with journaling, trained Listener sessions, formation, emotional patterns, breathing tools, safety-aware moderation, and Aura as a bounded practice listener rather than a replacement for people.",
  tags: ["React", "TypeScript", "Supabase", "Realtime", "Safety"],
  status: "Active development",
  url: "https://coradcor.org",
  category: "software"
},
{
  title: "Foro Agora",
  description: "Co-founded a youth-focused financial education platform in Uruguay that teaches money, investing, companies, and markets through fundamental analysis. Built around serious learning, local context, and community rather than trading tips or buy/sell signals.",
  tags: ["Financial Education", "React", "Supabase", "Fundamental Analysis"],
  status: "Co-founder",
  url: "https://foroagora.org",
  category: "software"
},
{
  title: "Solar Water Distiller",
  description: "Engineered a solar distillation prototype from scrap materials to provide drinking water to low-income areas. Later optimized with Peltier cells, voltage regulators, and repurposed PC fans for increased efficiency.",
  tags: ["Engineering", "Solar Energy", "Peltier Cells", "Sustainability"],
  category: "engineering"
},
{
  title: "MUN Technical Integration",
  description: "Designed and 3D-printed custom awards for Model UN conferences. Integrated technical design tools with diplomatic event management.",
  tags: ["3D Printing", "Blender", "Design"],
  category: "design"
}];


interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  category: string;
  featured?: boolean;
  status?: string;
  url?: string;
  image_url?: string;
}

export const Projects = () => {
  const { ref, isInView } = useScrollReveal();
  const [filter, setFilter] = useState("all");
  const [dbProjects, setDbProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        if (data) {
          setDbProjects(
            data.map((p) => ({
              title: p.title,
              description: p.description,
              tags: p.tags || [],
              category: p.category || "other",
              ...(p.featured ? { featured: true } : {}),
              ...(p.status ? { status: p.status } : {}),
              ...(p.image_url ? { image_url: p.image_url } : {}),
            }))
          );
        }
      });
  }, []);

  const allProjects = [...projects, ...dbProjects];
  const filtered = filter === "all" ? allProjects : allProjects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>

          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">Portfolio</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-8">Technical Projects</h2>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {["all", "engineering", "software", "design"].map((cat) =>
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 text-xs rounded-full border transition-colors capitalize ${
              filter === cat ?
              "bg-foreground text-background border-foreground" :
              "border-border hover:border-foreground/30 text-muted-foreground"}`
              }>

                {cat}
              </button>
            )}
          </div>

          {/* Featured simulator */}
          {(filter === "all" || filter === "engineering") &&
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-8">

              <RocketSimulator />
            </motion.div>
          }

          {/* Project cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((project, i) =>
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all hover:-translate-y-1">

                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-semibold">{project.title}</h3>
                  {"status" in project &&
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                      {project.status}
                    </span>
                }
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) =>
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {tag}
                    </span>
                )}
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-foreground/70 transition-colors"
                    aria-label={`Visit ${project.title}`}
                  >
                    Visit project
                    <ExternalLink size={12} />
                  </a>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>);

};
