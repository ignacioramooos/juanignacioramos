import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Lock, ArrowLeft, Loader2, Presentation, FolderOpen } from "lucide-react";
import { SlideDeck } from "@/components/deck/SlideDeck";
import { eventOrganizationDeck } from "@/data/decks/eventOrganization";
import { bdeStanislasDeck } from "@/data/decks/bdeStanislas";
import { DocumentTree, type DriveFile, type FolderNode } from "@/components/private/DocumentTree";
import { DocumentPreview } from "@/components/private/DocumentPreview";

import { Navbar } from "@/components/Navbar";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";

const decks = [bdeStanislasDeck, eventOrganizationDeck];

const SESSION_KEY = "resume-private-unlocked";
const SESSION_PASS = "resume-private-pass";

type Tab = "decks" | "documents";

const ResumePrivatePage = () => {
  const { lang } = useLanguage();
  const isEs = lang === "es";
  const [params] = useSearchParams();
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeDeck, setActiveDeck] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("decks");

  const [tree, setTree] = useState<FolderNode | null>(null);
  const [docsLoading, setDocsLoading] = useState(false);
  const [docsError, setDocsError] = useState<string | null>(null);
  const [preview, setPreview] = useState<DriveFile | null>(null);

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

  const loadDocuments = useCallback(async () => {
    const pass = sessionStorage.getItem(SESSION_PASS);
    if (!pass) {
      setDocsError(isEs ? "Volvé a ingresar la contraseña." : "Please enter the password again.");
      return;
    }
    setDocsLoading(true);
    setDocsError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("private-documents", {
        body: { password: pass },
      });
      if (fnError || !data?.ok) throw new Error("failed");
      setTree(data.tree as FolderNode);
    } catch {
      setDocsError(
        isEs ? "No se pudieron cargar los documentos." : "Documents could not be loaded."
      );
    } finally {
      setDocsLoading(false);
    }
  }, [isEs]);

  useEffect(() => {
    if (unlocked && tab === "documents" && !tree && !docsLoading && !docsError) {
      void loadDocuments();
    }
  }, [unlocked, tab, tree, docsLoading, docsError, loadDocuments]);

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
      sessionStorage.setItem(SESSION_PASS, password);
      setUnlocked(true);
    } catch {
      setError(isEs ? "Algo salió mal. Intentá de nuevo." : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const tabs: { id: Tab; label: string; icon: typeof Presentation }[] = [
    { id: "decks", label: isEs ? "Presentaciones" : "Presentations", icon: Presentation },
    { id: "documents", label: isEs ? "Documentos" : "Documents", icon: FolderOpen },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Private Access — Juan Ignacio Ramos"
        description="Password-protected area."
      />
      <Navbar />
      <main
        className={`${activeDeck || tab === "documents" ? "max-w-6xl" : "max-w-3xl"} mx-auto px-6 pt-28 pb-28 transition-all`}
      >
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

            <div className="mt-6 flex flex-wrap gap-2">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setTab(id);
                    setActiveDeck(null);
                  }}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    tab === id
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>

            {tab === "decks" ? (
              <>
                <p className="mt-6 text-muted-foreground">
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
                        {deck.subtitle && (
                          <p className="mt-1 text-sm text-muted-foreground">{deck.subtitle}</p>
                        )}
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
              </>
            ) : (
              <>
                <p className="mt-6 text-muted-foreground">
                  {isEs
                    ? "Documentos privados, agrupados por carpeta. Tocá uno para verlo acá mismo."
                    : "Private documents, grouped by folder. Tap one to read it right here."}
                </p>

                {docsLoading && (
                  <p className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 size={15} className="animate-spin" />
                    {isEs ? "Cargando documentos…" : "Loading documents…"}
                  </p>
                )}

                {docsError && (
                  <div className="mt-8 space-y-3">
                    <p className="text-sm text-destructive">{docsError}</p>
                    <button
                      onClick={() => {
                        setDocsError(null);
                        void loadDocuments();
                      }}
                      className="rounded-full border border-border px-4 py-1.5 text-sm transition-colors hover:bg-muted"
                    >
                      {isEs ? "Reintentar" : "Retry"}
                    </button>
                  </div>
                )}

                {tree && !docsLoading && (
                  <div className="mt-8">
                    <DocumentTree node={tree} onSelect={setPreview} isEs={isEs} />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      {preview && (
        <DocumentPreview file={preview} onClose={() => setPreview(null)} isEs={isEs} />
      )}
    </div>
  );
};

export default ResumePrivatePage;
