import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";

interface ServiceRequestFormProps {
  service: string;
  showIndustry?: boolean;
  showFileUpload?: boolean;
  budgetOptions?: string[];
}

export const ServiceRequestForm = ({
  service,
  showIndustry = false,
  showFileUpload = false,
  budgetOptions = ["< $500", "$500 – $1,000", "$1,000 – $3,000", "$3,000+", "Not sure yet"],
}: ServiceRequestFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
    budget_range: "",
    deadline: "",
    industry: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("service_requests" as any).insert({
        service,
        name: form.name.trim(),
        email: form.email.trim(),
        description: form.description.trim(),
        budget_range: form.budget_range || null,
        deadline: form.deadline || null,
        industry: form.industry || null,
      } as any);

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Request sent!",
        description: "Juan will get back to you soon.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-card border border-border text-center space-y-3">
        <p className="text-2xl">✅</p>
        <h3 className="font-display font-semibold text-lg">Request Received!</h3>
        <p className="text-sm text-muted-foreground">
          Thanks for your interest. Juan will review your request and get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-card border border-border space-y-4">
      <h3 className="font-display font-semibold text-lg mb-2">Request this Service</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sr-name">Name *</Label>
          <Input
            id="sr-name"
            required
            maxLength={100}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sr-email">Email *</Label>
          <Input
            id="sr-email"
            type="email"
            required
            maxLength={255}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
          />
        </div>
      </div>

      {showIndustry && (
        <div className="space-y-2">
          <Label htmlFor="sr-industry">Industry / Sector</Label>
          <Input
            id="sr-industry"
            maxLength={100}
            value={form.industry}
            onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
            placeholder="e.g. E-commerce, Real Estate, Education"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="sr-desc">Project Description *</Label>
        <Textarea
          id="sr-desc"
          required
          maxLength={2000}
          rows={4}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="Describe what you need..."
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Budget Range</Label>
          <div className="flex flex-wrap gap-2">
            {budgetOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setForm((f) => ({ ...f, budget_range: f.budget_range === opt ? "" : opt }))}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                  form.budget_range === opt
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/30"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sr-deadline">Desired Deadline</Label>
          <Input
            id="sr-deadline"
            maxLength={100}
            value={form.deadline}
            onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
            placeholder="e.g. 2 weeks, End of March"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        Send Request
      </button>
    </form>
  );
};
