import { Link } from "react-router-dom";
import { Lock, Mail, Globe, Linkedin, Github, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { resumeHeader, resumeProfile, resumeSections } from "@/data/resume";

const ResumePage = () => {
  const { lang } = useLanguage();
  const isEs = lang === "es";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Resume — Juan Ignacio Ramos"
        description="Curriculum vitae of Juan Ignacio Ramos: aerospace-focused engineering student, Advanced Space Academy Scholar, French Baccalauréat Mention Très Bien, LFMUN Co-Secretary General."
        keywords="Juan Ignacio Ramos resume, CV, aerospace engineering student, Advanced Space Academy Scholar, LFMUN Secretary General"
      />
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-24 pb-28">
        {/* Access button */}
        <div className="mb-10 flex justify-center">
          <Link
            to="/resume/private"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Lock size={15} />
            {isEs ? "Acceder a más información" : "Access further info"}
          </Link>
        </div>

        {/* CV header */}
        <header className="border-b border-border pb-6 text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight uppercase">
            {resumeHeader.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} /> {resumeHeader.location}
            </span>
            <a className="inline-flex items-center gap-1.5 hover:text-foreground" href={`mailto:${resumeHeader.email}`}>
              <Mail size={13} /> {resumeHeader.email}
            </a>
            <a className="inline-flex items-center gap-1.5 hover:text-foreground" href={`https://${resumeHeader.site}`}>
              <Globe size={13} /> {resumeHeader.site}
            </a>
            <a className="inline-flex items-center gap-1.5 hover:text-foreground" href={resumeHeader.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={13} /> LinkedIn
            </a>
            <a className="inline-flex items-center gap-1.5 hover:text-foreground" href={resumeHeader.github} target="_blank" rel="noreferrer">
              <Github size={13} /> GitHub
            </a>
          </div>
        </header>

        {/* Profile */}
        <section className="mt-8">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] border-b border-border pb-1 mb-3">
            {isEs ? "Perfil" : "Profile"}
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground">{resumeProfile}</p>
        </section>

        {resumeSections.map((section) => (
          <section key={section.id} className="mt-8">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] border-b border-border pb-1 mb-4">
              {isEs ? section.headingEs : section.heading}
            </h2>

            <div className="space-y-5">
              {section.entries.map((entry, i) => (
                <article key={`${section.id}-${i}`}>
                  {(entry.title || entry.date) && (
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      {entry.title && (
                        <h3 className="text-[15px] font-semibold text-foreground">{entry.title}</h3>
                      )}
                      {entry.date && (
                        <span className="text-xs italic text-muted-foreground whitespace-nowrap">{entry.date}</span>
                      )}
                    </div>
                  )}
                  {(entry.org || entry.location) && (
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm text-muted-foreground">
                      {entry.org && <span>{entry.org}</span>}
                      {entry.location && <span className="text-xs">{entry.location}</span>}
                    </div>
                  )}
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[14.5px] leading-relaxed text-muted-foreground marker:text-muted-foreground/50">
                    {entry.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default ResumePage;
