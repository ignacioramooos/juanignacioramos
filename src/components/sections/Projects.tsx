import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ExternalLink, Play, RotateCcw } from "lucide-react";

// Real data from Estes E12 engine
const thrustCurve = [
  { t: 0, thrust: 0, mass: 35.9 },
  { t: 0.052, thrust: 5.045, mass: 35.7265 },
  { t: 0.096, thrust: 9.91, mass: 35.2912 },
  { t: 0.196, thrust: 24.144, mass: 33.0386 },
  { t: 0.251, thrust: 31.351, mass: 31.0196 },
  { t: 0.287, thrust: 32.973, mass: 29.4878 },
  { t: 0.3, thrust: 29.91, mass: 28.947 },
  { t: 0.344, thrust: 17.117, mass: 27.5783 },
  { t: 0.37, thrust: 14.414, mass: 27.036 },
  { t: 0.4, thrust: 12.973, mass: 26.4925 },
  { t: 0.5, thrust: 11.712, mass: 24.8597 },
  { t: 0.6, thrust: 11.171, mass: 23.346 },
  { t: 0.7, thrust: 10.631, mass: 21.9038 },
  { t: 0.8, thrust: 10.09, mass: 20.5332 },
  { t: 0.9, thrust: 9.73, mass: 19.2221 },
  { t: 1.0, thrust: 9.55, mass: 17.9467 },
  { t: 1.101, thrust: 9.91, mass: 16.6466 },
  { t: 1.2, thrust: 9.55, mass: 15.3722 },
  { t: 1.3, thrust: 9.73, mass: 14.0969 },
  { t: 1.4, thrust: 9.73, mass: 12.8097 },
  { t: 1.5, thrust: 9.73, mass: 11.5224 },
  { t: 1.6, thrust: 9.73, mass: 10.2352 },
  { t: 1.7, thrust: 9.55, mass: 8.95981 },
  { t: 1.8, thrust: 9.73, mass: 7.68447 },
  { t: 1.9, thrust: 9.73, mass: 6.39722 },
  { t: 2.0, thrust: 9.55, mass: 5.12188 },
  { t: 2.1, thrust: 9.55, mass: 3.85844 },
  { t: 2.2, thrust: 9.73, mass: 2.5831 },
  { t: 2.3, thrust: 9.19, mass: 1.33157 },
  { t: 2.375, thrust: 9.37, mass: 0.410782 },
  { t: 2.4, thrust: 5.95, mass: 0.157433 },
  { t: 2.44, thrust: 0, mass: 0 },
];

// Rocket parameters from spreadsheet
const DEFAULTS = {
  rocketMass: 50, // g (without engine)
  length: 0.4, // m
  diameter: 0.027, // m
  cd: 0.195,
  engineMass: 61.2, // g
  burnTime: 2.4, // s
};

const AIR_DENSITY = 1.225;
const G = 9.81;

function interpolateThrust(t: number): { thrust: number; propMass: number } {
  if (t >= 2.44) return { thrust: 0, propMass: 0 };
  if (t <= 0) return { thrust: 0, propMass: 35.9 };
  for (let i = 0; i < thrustCurve.length - 1; i++) {
    const a = thrustCurve[i], b = thrustCurve[i + 1];
    if (t >= a.t && t <= b.t) {
      const frac = (t - a.t) / (b.t - a.t);
      return {
        thrust: a.thrust + frac * (b.thrust - a.thrust),
        propMass: a.mass + frac * (b.mass - a.mass),
      };
    }
  }
  return { thrust: 0, propMass: 0 };
}

function simulate(params: {
  rocketMass: number; cd: number; diameter: number;
}) {
  const dt = 0.01;
  const area = Math.PI * (params.diameter / 2) ** 2;
  const dryEngineMass = DEFAULTS.engineMass / 1000 - 36 / 1000; // ~0.0252 kg
  const rocketMassKg = params.rocketMass / 1000;

  const results: { t: number; alt: number; vel: number; accel: number; thrust: number; mach: number }[] = [];
  let v = 0, alt = 0, t = 0;

  while (t < 40 && alt >= 0 && results.length < 4000) {
    const { thrust, propMass } = interpolateThrust(t);
    const totalMass = rocketMassKg + dryEngineMass + propMass / 1000;
    const drag = 0.5 * AIR_DENSITY * v * Math.abs(v) * params.cd * area;
    const accel = (thrust - drag - totalMass * G) / totalMass;

    results.push({
      t: Math.round(t * 100) / 100,
      alt: Math.max(0, Math.round(alt * 100) / 100),
      vel: Math.round(v * 100) / 100,
      accel: Math.round(accel * 100) / 100,
      thrust: Math.round(thrust * 100) / 100,
      mach: Math.round((v / 343) * 1000) / 1000,
    });

    v += accel * dt;
    alt += v * dt;
    t += dt;

    if (alt < 0 && t > 1) break;
  }

  return results;
}

const MiniChart = ({
  data,
  xKey,
  yKey,
  label,
  color,
  width = 300,
  height = 150,
}: {
  data: any[];
  xKey: string;
  yKey: string;
  label: string;
  color: string;
  width?: number;
  height?: number;
}) => {
  if (data.length === 0) return null;
  const maxY = Math.max(...data.map((d) => d[yKey]));
  const minY = Math.min(...data.map((d) => d[yKey]));
  const maxX = data[data.length - 1][xKey];
  const range = maxY - minY || 1;
  const padding = 10;

  const points = data
    .filter((_, i) => i % 3 === 0 || i === data.length - 1)
    .map((d) => {
      const x = padding + ((d[xKey] / maxX) * (width - padding * 2));
      const y = height - padding - (((d[yKey] - minY) / range) * (height - padding * 2));
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span>Peak: {maxY.toFixed(1)}</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ maxHeight: height }}>
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          points={points}
        />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      </svg>
    </div>
  );
};

export const RocketSimulator = () => {
  const [mass, setMass] = useState(DEFAULTS.rocketMass);
  const [cd, setCd] = useState(DEFAULTS.cd);
  const [diameter, setDiameter] = useState(DEFAULTS.diameter * 1000);
  const [running, setRunning] = useState(false);

  const results = useMemo(
    () => (running ? simulate({ rocketMass: mass, cd, diameter: diameter / 1000 }) : []),
    [running, mass, cd, diameter]
  );

  const maxAlt = results.length > 0 ? Math.max(...results.map((r) => r.alt)) : 0;
  const maxVel = results.length > 0 ? Math.max(...results.map((r) => r.vel)) : 0;
  const flightTime = results.length > 0 ? results[results.length - 1].t : 0;

  const reset = () => {
    setMass(DEFAULTS.rocketMass);
    setCd(DEFAULTS.cd);
    setDiameter(DEFAULTS.diameter * 1000);
    setRunning(false);
  };

  return (
    <div className="p-6 rounded-xl bg-card border border-border space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-display font-semibold text-sm">Interactive 6-DOF Trajectory Simulator</h4>
          <p className="text-xs text-muted-foreground">Estes E12 Engine · Real thrust curve data</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setRunning(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors"
          >
            <Play size={12} /> Launch
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border rounded-full hover:bg-muted transition-colors"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      {/* Parameter sliders */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground flex justify-between">
            Rocket Mass <span>{mass}g</span>
          </label>
          <Slider value={[mass]} onValueChange={([v]) => { setMass(v); setRunning(false); }} min={20} max={200} step={5} />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground flex justify-between">
            Drag Coefficient <span>{cd.toFixed(3)}</span>
          </label>
          <Slider value={[cd * 1000]} onValueChange={([v]) => { setCd(v / 1000); setRunning(false); }} min={50} max={500} step={5} />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground flex justify-between">
            Diameter <span>{diameter.toFixed(1)}mm</span>
          </label>
          <Slider value={[diameter]} onValueChange={([v]) => { setDiameter(v); setRunning(false); }} min={15} max={60} step={1} />
        </div>
      </div>

      {running && results.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Key stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <p className="text-lg font-display font-bold">{maxAlt.toFixed(1)}m</p>
              <p className="text-xs text-muted-foreground">Max Altitude</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <p className="text-lg font-display font-bold">{maxVel.toFixed(1)}m/s</p>
              <p className="text-xs text-muted-foreground">Max Velocity</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <p className="text-lg font-display font-bold">{flightTime.toFixed(1)}s</p>
              <p className="text-xs text-muted-foreground">Flight Time</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid sm:grid-cols-2 gap-4">
            <MiniChart data={results} xKey="t" yKey="alt" label="Altitude (m)" color="hsl(142, 50%, 50%)" />
            <MiniChart data={results} xKey="t" yKey="vel" label="Velocity (m/s)" color="hsl(210, 50%, 60%)" />
            <MiniChart data={results} xKey="t" yKey="thrust" label="Thrust (N)" color="hsl(30, 70%, 55%)" />
            <MiniChart data={results} xKey="t" yKey="accel" label="Acceleration (m/s²)" color="hsl(0, 60%, 55%)" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

const projects = [
  {
    title: "6-DOF Rocketry Simulation",
    description: "Excel & Python-based 6-Degrees-of-Freedom trajectory simulation using LSODA numerical solvers to model aerodynamic complexities. Originally developed for the French Baccalaureate 'Grand Oral' — modeling whether a 3D-printed rocket could exceed the height of the Eiffel Tower.",
    tags: ["Python", "Excel", "LSODA", "Aerodynamics", "SimScale"],
    featured: true,
    category: "engineering",
  },
  {
    title: "Agora AI Platform",
    description: "React-based platform presenting multi-perspective discourse on controversial topics using AI-generated personas: a proponent, an opponent, and a moderator. Full-stack integration with Vonage Video SDK.",
    tags: ["React", "Vonage SDK", "AI", "Full-Stack"],
    status: "In Development",
    category: "software",
  },
  {
    title: "Solar Water Distiller",
    description: "Engineered a solar distillation prototype from scrap materials to provide drinking water to low-income areas. Later optimized with Peltier cells, voltage regulators, and repurposed PC fans for increased efficiency.",
    tags: ["Engineering", "Solar Energy", "Peltier Cells", "Sustainability"],
    category: "engineering",
  },
  {
    title: "MUN Technical Integration",
    description: "Designed and 3D-printed custom awards for Model UN conferences. Integrated technical design tools with diplomatic event management.",
    tags: ["3D Printing", "Blender", "Design"],
    category: "design",
  },
];

export const Projects = () => {
  const { ref, isInView } = useScrollReveal();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 bg-card/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">Portfolio</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-8">Technical Projects</h2>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {["all", "engineering", "software", "design"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 text-xs rounded-full border transition-colors capitalize ${
                  filter === cat
                    ? "bg-foreground text-background border-foreground"
                    : "border-border hover:border-foreground/30 text-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured simulator */}
          {(filter === "all" || filter === "engineering") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <RocketSimulator />
            </motion.div>
          )}

          {/* Project cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-foreground/20 transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-semibold">{project.title}</h3>
                  {"status" in project && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                      {project.status}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
