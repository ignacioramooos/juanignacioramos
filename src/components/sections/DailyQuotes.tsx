import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { getDailyQuotes } from "@/data/quotes";
import { useState } from "react";

const dailyQuotes = getDailyQuotes();

export const DailyQuotes = () => {
  const { ref, isInView } = useScrollReveal();
  const [quoteIndex, setQuoteIndex] = useState(0);

  return (
    <section id="daily-quotes" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-6">
            In My Own Words — Today's Quote
          </h3>
          <div className="relative flex items-center gap-4">
            <button
              onClick={() => setQuoteIndex((prev) => (prev - 1 + dailyQuotes.length) % dailyQuotes.length)}
              className="p-2 rounded-full border border-border hover:bg-muted transition-colors flex-shrink-0"
              aria-label="Previous quote"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={quoteIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-2xl bg-card border border-border text-center"
                >
                  <Quote size={16} className="text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-base sm:text-lg italic text-foreground/80 leading-relaxed max-w-2xl mx-auto">
                    "{dailyQuotes[quoteIndex].text}"
                  </p>
                  <p className="text-xs text-muted-foreground mt-4">{dailyQuotes[quoteIndex].context}</p>
                </motion.blockquote>
              </AnimatePresence>
            </div>
            <button
              onClick={() => setQuoteIndex((prev) => (prev + 1) % dailyQuotes.length)}
              className="p-2 rounded-full border border-border hover:bg-muted transition-colors flex-shrink-0"
              aria-label="Next quote"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {dailyQuotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setQuoteIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === quoteIndex ? "bg-foreground" : "bg-muted-foreground/30"}`}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
