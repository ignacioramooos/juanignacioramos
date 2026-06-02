import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { SEOHead } from "@/components/SEOHead";
import { canonicalProfile, personJsonLd, websiteJsonLd } from "@/data/profile";

const evidenceLinks = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/juanignacioramos1/" },
  { label: "GitHub", url: "https://github.com/ignacioramooos" },
  {
    label: "U.S. Space & Rocket Center Foundation feature",
    url: "https://rocketcenterfoundation.org/now-i-know-with-certainty-i-am-going-to-be-an-aerospace-engineer/",
  },
  { label: "Documents", url: "https://juanignacioramos.com/documents" },
];

const ProfilePage = () => {
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd,
      websiteJsonLd,
      {
        "@type": "ProfilePage",
        "@id": "https://juanignacioramos.com/profile#profile-page",
        url: canonicalProfile.profileUrl,
        name: "Juan Ignacio Ramos - Canonical Profile",
        description: canonicalProfile.shortBio,
        mainEntity: { "@id": "https://juanignacioramos.com/#person" },
        hasPart: canonicalProfile.projects.map((project) => ({
          "@type": "CreativeWork",
          name: project.name,
          description: project.description,
          url: project.url,
          creator: { "@id": "https://juanignacioramos.com/#person" },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Juan Ignacio Ramos - Aspiring Aerospace Engineer"
        description={canonicalProfile.shortBio}
        path="/profile"
        keywords="Juan Ignacio Ramos, Ignacio Ramos, aspiring aerospace engineer, Advanced Space Academy Scholar, French BAC Mention Tres Bien, Cor Ad Cor, Foro Agora, aerospace portfolio"
        jsonLd={profileJsonLd}
      />
      <Navbar />
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Canonical Profile
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              {canonicalProfile.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {canonicalProfile.description}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-10">
            <section className="space-y-12">
              <div>
                <h2 className="font-display text-2xl font-semibold mb-5">Profile Snapshot</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {canonicalProfile.highlights.map((item) => (
                    <div key={item} className="p-5 rounded-lg border border-border bg-card">
                      <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold mb-5">Selected Projects</h2>
                <div className="space-y-4">
                  {canonicalProfile.projects.map((project) => (
                    <article key={project.name} className="p-5 rounded-lg border border-border bg-card">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-display font-semibold">{project.name}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground whitespace-nowrap">
                          {project.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <aside className="space-y-8">
              <div className="p-5 rounded-lg border border-border bg-card">
                <h2 className="font-display font-semibold mb-4">Core Identity</h2>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Name</dt>
                    <dd>{canonicalProfile.name}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Focus</dt>
                    <dd>{canonicalProfile.title}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Location</dt>
                    <dd>{canonicalProfile.location}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Languages</dt>
                    <dd>{canonicalProfile.knowsLanguage.join(", ")}</dd>
                  </div>
                </dl>
              </div>

              <div className="p-5 rounded-lg border border-border bg-card">
                <h2 className="font-display font-semibold mb-4">Education</h2>
                <div className="space-y-4">
                  {canonicalProfile.education.map((item) => (
                    <div key={item.name}>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-lg border border-border bg-card">
                <h2 className="font-display font-semibold mb-4">Evidence Links</h2>
                <div className="space-y-3">
                  {evidenceLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                      <ExternalLink size={13} />
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
