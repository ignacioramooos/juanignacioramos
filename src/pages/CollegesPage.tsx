import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, DollarSign, GraduationCap } from "lucide-react";

interface College {
  id: string;
  name: string;
  location: string;
  status: string;
  cost_of_attendance: number | null;
  financial_aid: number | null;
  notes: string | null;
  display_order: number;
}

const statusColors: Record<string, string> = {
  accepted: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  waitlisted: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  rejected: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

const CollegesPage = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("colleges")
      .select("*")
      .order("display_order")
      .then(({ data }) => {
        setColleges((data as College[]) || []);
        setLoading(false);
      });
  }, []);

  const formatCurrency = (n: number | null) =>
    n != null ? `$${n.toLocaleString()}` : "—";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">Admissions</p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">College Acceptances</h1>
            <p className="text-muted-foreground max-w-2xl mb-12">
              A transparent look at my college admissions journey — including financial aid offers and cost of attendance.
            </p>
          </motion.div>

          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : colleges.length === 0 ? (
            <p className="text-muted-foreground">No colleges added yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {colleges.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display font-semibold">{c.name}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border capitalize ${statusColors[c.status] || "border-border text-muted-foreground"}`}>
                      {c.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                    <MapPin size={14} /> {c.location}
                  </div>

                  {(c.cost_of_attendance != null || c.financial_aid != null) && (
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1"><DollarSign size={12} /> COA</span>
                        <span className="font-medium">{formatCurrency(c.cost_of_attendance)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1"><GraduationCap size={12} /> Aid</span>
                        <span className="font-medium">{formatCurrency(c.financial_aid)}</span>
                      </div>
                      {c.cost_of_attendance != null && c.financial_aid != null && (
                        <>
                          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full bg-foreground/60 rounded-full transition-all"
                              style={{ width: `${Math.min(100, (c.financial_aid / c.cost_of_attendance) * 100)}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground text-right">
                            {Math.round((c.financial_aid / c.cost_of_attendance) * 100)}% covered
                          </p>
                        </>
                      )}
                    </div>
                  )}

                  {c.notes && <p className="text-xs text-muted-foreground leading-relaxed">{c.notes}</p>}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CollegesPage;
