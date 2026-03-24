import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export const ProBono = () => {
  const { t } = useLanguage();
  const pb = t.proBono;

  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{pb.label}</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">{pb.title}</h2>

          <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
            <p>{pb.p1}</p>
            <p>{pb.p2}</p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {pb.areas.map((area, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-card"
              >
                <span className="text-xs font-mono text-muted-foreground tabular-nums">0{i + 1}</span>
                <span className="text-sm font-medium text-foreground">{area}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">{pb.cta}</p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {pb.ctaLink} <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
