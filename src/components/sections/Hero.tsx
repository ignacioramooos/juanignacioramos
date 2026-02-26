import { motion } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aerodynamic flowing SVG background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice">

        <motion.path
          d="M-100,700 Q200,550 400,400 T800,250 T1300,100"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }} />

        <motion.path
          d="M-50,750 Q250,500 500,350 T900,200 T1350,80"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, ease: "easeInOut", delay: 0.3 }} />

        <motion.path
          d="M0,800 Q300,450 550,350 T1000,200 T1400,120"
          stroke="currentColor"
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, ease: "easeInOut", delay: 0.6 }} />

        {/* Aerodynamic curves */}
        <motion.path
          d="M1200,0 Q900,200 700,350 T300,550 T-100,700"
          stroke="currentColor"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, ease: "easeInOut", delay: 1 }} />

      </svg>

      {/* Floating dots */}
      {[...Array(6)].map((_, i) =>
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-foreground/20"
        style={{
          left: `${15 + i * 15}%`,
          top: `${20 + i % 3 * 25}%`
        }}
        animate={{ y: [0, -15, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{
          duration: 3 + i * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.4
        }} />

      )}

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 mt-8 sm:mt-12">

          Montevideo, Uruguay
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-display font-bold tracking-tight mb-3">

          <span className="block text-6xl sm:text-8xl lg:text-9xl">Juan Ignacio</span>
          <span className="block text-6xl sm:text-8xl lg:text-9xl bg-gradient-to-r from-muted-foreground/70 via-muted-foreground/50 to-muted-foreground/30 bg-clip-text text-center font-bold text-[#8c8c8c]">
            Ramos
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto mb-4 font-medium">
          Building the path to aerospace engineering in Uruguay
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25 }}
          className="flex flex-wrap justify-center gap-2 mb-3">
          {["Aerospace", "Systems Thinking", "Leadership", "Real-world Impact"].map((pill) => (
            <span
              key={pill}
              className="px-3 py-1 text-xs font-medium tracking-wide rounded-full border border-border bg-card text-muted-foreground"
            >
              {pill}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-xs sm:text-sm text-muted-foreground/50 max-w-md mx-auto mb-10">
          Aspiring Aerospace Engineer · Learner · Problem Solver
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">

          <a
            href="#about"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors">

            Explore My Work
            <ChevronDown size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">

            <Mail size={16} />
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}>

        <ChevronDown size={20} className="text-muted-foreground" />
      </motion.div>
    </section>);

};