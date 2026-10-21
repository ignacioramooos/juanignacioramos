import { Navbar } from "@/components/Navbar";

const DocumentsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-6xl mx-auto px-5 sm:px-[5vw] pt-32 pb-16">
        <h1 className="font-display font-light tracking-[-0.03em] leading-[0.95] text-[clamp(2.75rem,7vw,6rem)] mb-6">Documents</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-12">
          Acceptance letters, certificates, and other documents.
        </p>
        <div className="w-full rounded-xl border border-border overflow-hidden bg-background relative z-[1]" style={{ height: "80vh" }}>
          <iframe
            src="https://drive.google.com/embeddedfolderview?id=1RNm8bZ4qnAcvEVkHUpI-YkyGlgkhcwob#grid"
            className="w-full h-full border-0"
            title="Documents folder"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            loading="lazy"
          />
        </div>
      </main>
    </div>
  );
};

export default DocumentsPage;
