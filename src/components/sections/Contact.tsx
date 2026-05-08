import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, Linkedin, Instagram, Send, MessageCircle, X, Bot } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/i18n/LanguageContext";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type ChatMsg = { role: "user" | "assistant"; content: string };
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

async function streamChat({ messages, onDelta, onDone }: { messages: ChatMsg[]; onDelta: (t: string) => void; onDone: () => void }) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
    body: JSON.stringify({ messages }),
  });
  if (!resp.ok) { const err = await resp.json().catch(() => ({})); throw new Error(err.error || "Error"); }
  if (!resp.body) throw new Error("No stream");
  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let done = false;
  while (!done) {
    const { done: d, value } = await reader.read();
    if (d) break;
    buf += decoder.decode(value, { stream: true });
    let nl: number;
    while ((nl = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, nl);
      buf = buf.slice(nl + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { done = true; break; }
      try { const p = JSON.parse(json); const c = p.choices?.[0]?.delta?.content as string | undefined; if (c) onDelta(c); }
      catch { buf = line + "\n" + buf; break; }
    }
  }
  onDone();
}

export const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => { if (err.path[0]) fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("contact", { body: result.data });
      if (error) throw error;
      toast.success(t.contact.sent);
      setForm({ name: "", email: "", message: "" });
    } catch { toast.error(t.contact.error); }
    finally { setSending(false); }
  };

  const sendChatMessage = async () => {
    const text = chatInput.trim();
    if (!text || chatLoading) return;
    const userMsg: ChatMsg = { role: "user", content: text };
    setChatInput("");
    setChatMessages((prev) => [...prev, userMsg]);
    setChatLoading(true);
    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setChatMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };
    try {
      await streamChat({ messages: [...chatMessages, userMsg], onDelta: upsert, onDone: () => setChatLoading(false) });
    } catch (e) {
      console.error(e);
      setChatLoading(false);
      toast.error(e instanceof Error ? e.message : "Error");
    }
  };

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">{t.contact.title}</h2>
          <p className="text-sm text-muted-foreground mb-10">{t.contact.label}</p>

          <div className="grid md:grid-cols-5 gap-12">
            <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
              <div>
                <Input placeholder={t.contact.namePlaceholder} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-card" />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <Input type="email" placeholder={t.contact.emailPlaceholder} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-card" />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <Textarea placeholder={t.contact.messagePlaceholder} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-card resize-none" />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>
              <button type="submit" disabled={sending} className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50">
                <Send size={14} />
                {sending ? t.contact.sending : t.contact.send}
              </button>
            </form>

            <div className="md:col-span-2 space-y-6">
              <div>
                <p className="text-sm font-medium mb-4">{t.contact.contactInfo}</p>
                <div className="space-y-3">
                  <a href="mailto:ignacioramosgu@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"><Mail size={16} /> ignacioramosgu@gmail.com</a>
                  <a href="tel:+59892667755" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"><Phone size={16} /> +598 92 667 755</a>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-4">{t.contact.social}</p>
                <div className="space-y-3">
                  <a href="https://www.linkedin.com/in/juanignacioramos1/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"><Linkedin size={16} /> LinkedIn</a>
                  <a href="https://instagram.com/ignacio.ramooos" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"><Instagram size={16} /> @ignacio.ramooos</a>
                </div>
              </div>
              <div className="pt-2">
                <button onClick={() => setChatOpen(!chatOpen)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/80 transition-colors">
                  <MessageCircle size={16} />
                  {chatOpen ? t.contact.closeChat : t.contact.askAI}
                </button>
              </div>
            </div>
          </div>

          {chatOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.3 }} className="mt-10 rounded-lg border border-border bg-card overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <div className="flex items-center gap-2"><Bot size={18} className="text-muted-foreground" /><span className="text-sm font-medium">{t.contact.aiTitle}</span></div>
                <button onClick={() => setChatOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors"><X size={16} /></button>
              </div>
              <div className="h-72 overflow-y-auto px-5 py-4 space-y-4">
                {chatMessages.length === 0 && <p className="text-sm text-muted-foreground text-center mt-8">{t.contact.aiWelcome}</p>}
                {chatMessages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-lg px-4 py-2.5 text-sm ${m.role === "user" ? "bg-foreground text-background" : "bg-muted text-foreground"}`}>
                      {m.role === "assistant" ? <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:m-0"><ReactMarkdown>{m.content}</ReactMarkdown></div> : m.content}
                    </div>
                  </div>
                ))}
                {chatLoading && chatMessages[chatMessages.length - 1]?.role !== "assistant" && (
                  <div className="flex justify-start"><div className="bg-muted rounded-lg px-4 py-2.5 text-sm text-muted-foreground">{t.contact.aiThinking}</div></div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div className="border-t border-border px-4 py-3 flex gap-2">
                <Input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendChatMessage()} placeholder={t.contact.aiPlaceholder} className="bg-background" disabled={chatLoading} />
                <button onClick={sendChatMessage} disabled={chatLoading || !chatInput.trim()} className="shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors disabled:opacity-50">
                  <Send size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
