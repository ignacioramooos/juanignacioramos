import { Navbar } from "@/components/Navbar";

const DocumentsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <h1 className="font-display text-3xl font-bold mb-2">Documents</h1>
        <p className="text-muted-foreground mb-8">
          Acceptance letters, certificates, and other documents.
        </p>
        <div className="w-full rounded-xl border border-border overflow-hidden bg-background relative z-[1]" style={{ height: "80vh" }}>
          <iframe
            src="https://drive.google.com/embeddedfolderview?id=1RNm8bZ4qnAcvEVkHUpI-YkyGlgkhcwob#grid"
            className="w-full h-full border-0"
            title="Documents folder"
            allowFullScreen
          />
        </div>
      </main>
    </div>
  );
};

export default DocumentsPage;
