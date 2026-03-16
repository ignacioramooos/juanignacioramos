import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getDailyQuotes } from "@/data/quotes";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const dailyQuotes = getDailyQuotes();

export const DailyQuotes = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const { t } = useLanguage();

  return (
    <section id="daily-quotes" className="py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">{t.quotes.title}</p>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={quoteIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-display text-xl sm:text-2xl italic text-foreground/80 leading-relaxed">
                  "{dailyQuotes[quoteIndex].text}"
                </p>
                <p className="text-xs text-muted-foreground mt-6">{dailyQuotes[quoteIndex].context}</p>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setQuoteIndex((prev) => (prev - 1 + dailyQuotes.length) % dailyQuotes.length)}
              className="p-2 rounded-full border border-border hover:bg-muted transition-colors"
              aria-label={t.quotes.prev}
            >
              <ChevronLeft size={14} />
            </button>
            <div className="flex gap-1.5">
              {dailyQuotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setQuoteIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === quoteIndex ? "bg-foreground" : "bg-muted-foreground/20"}`}
                  aria-label={`Quote ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setQuoteIndex((prev) => (prev + 1) % dailyQuotes.length)}
              className="p-2 rounded-full border border-border hover:bg-muted transition-colors"
              aria-label={t.quotes.next}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
