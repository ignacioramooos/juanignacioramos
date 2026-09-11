import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Lock, ArrowLeft, Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";

const SESSION_KEY = "resume-private-unlocked";

const ResumePrivatePage = () => {
  const { lang } = useLanguage();
  const isEs = lang === "es";
  const [params] = useSearchParams();
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setUnlocked(true);
    const prefill = params.get("k");
    if (prefill) setPassword(prefill);
  }, [params]);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("resume-access", {
        body: { password },
      });
      if (fnError || !data?.ok) {
        setError(isEs ? "Contraseña incorrecta." : "Incorrect password.");
        return;
      }
      sessionStorage.setItem(SESSION_KEY, "1");
      setUnlocked(true);
    } catch {
      setError(isEs ? "Algo salió mal. Intentá de nuevo." : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Private Access — Juan Ignacio Ramos"
        description="Password-protected area."
      />
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-28">
        <Link
          to="/resume"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={15} />
          {isEs ? "Volver al currículum" : "Back to resume"}
        </Link>

        {!unlocked ? (
          <div className="mx-auto mt-16 max-w-md rounded-2xl border border-border bg-card p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Lock size={18} />
              </span>
              <div>
                <h1 className="font-display text-lg font-bold">
                  {isEs ? "Espacio protegido" : "Protected space"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {isEs ? "Ingresá la contraseña para continuar." : "Enter the password to continue."}
                </p>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                aria-label={isEs ? "Contraseña" : "Password"}
                placeholder={isEs ? "Contraseña" : "Password"}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {loading && <Loader2 size={15} className="animate-spin" />}
                {isEs ? "Entrar" : "Enter"}
              </button>
            </form>
          </div>
        ) : (
          <div className="mt-12">
            <h1 className="font-display text-3xl font-bold tracking-tight">
              {isEs ? "Material adicional" : "Further Information"}
            </h1>
            <p className="mt-3 text-muted-foreground">
              {isEs
                ? "Presentaciones. Elegí una y usá «Present» para pantalla completa (flechas para navegar)."
                : "Presentations. Pick one and hit Present for fullscreen (arrow keys to navigate)."}
            </p>

            {!activeDeck ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {decks.map((deck) => (
                  <button
                    key={deck.slug}
                    onClick={() => setActiveDeck(deck.slug)}
                    className="group rounded-2xl border border-border bg-card p-6 text-left transition-colors hover:border-primary"
                  >
                    <span className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      <Presentation size={14} />
                      {deck.slides.length} {isEs ? "diapositivas" : "slides"}
                    </span>
                    <h2 className="mt-3 font-display text-xl font-bold">{deck.title}</h2>
                    {deck.subtitle && <p className="mt-1 text-sm text-muted-foreground">{deck.subtitle}</p>}
                    {deck.description && (
                      <p className="mt-3 text-sm text-muted-foreground">{deck.description}</p>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-8">
                <button
                  onClick={() => setActiveDeck(null)}
                  className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft size={15} />
                  {isEs ? "Todas las presentaciones" : "All presentations"}
                </button>
                <SlideDeck
                  deck={decks.find((d) => d.slug === activeDeck)!}
                  onExit={() => setActiveDeck(null)}
                />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ResumePrivatePage;
