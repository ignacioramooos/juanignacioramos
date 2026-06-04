export const canonicalProfile = {
  name: "Juan Ignacio Ramos",
  alternateNames: ["Ignacio Ramos", "Juan Ignacio Ramos Gutierrez", "Nacho Ramos"],
  title: "Aspiring Aerospace Engineer",
  location: "Montevideo, Uruguay",
  website: "https://juanignacioramos.com",
  profileUrl: "https://juanignacioramos.com/profile",
  image: "https://juanignacioramos.com/favicon.png",
  email: "contact@juanignacioramos.com",
  description:
    "Juan Ignacio Ramos is an aspiring aerospace engineer from Montevideo, Uruguay, building a public portfolio across aerospace simulations, software products, peer support, financial education, leadership, and service.",
  shortBio:
    "Aspiring aerospace engineer from Montevideo, Uruguay. Advanced Space Academy Scholar, French BAC Mention Tres Bien graduate, MUN Secretary General, and builder of aerospace, peer-support, financial education, and social impact software projects.",
  sameAs: [
    "https://www.linkedin.com/in/juanignacioramos1/",
    "https://github.com/ignacioramooos",
    "https://instagram.com/ignacio.ramooos",
    "https://rocketcenterfoundation.org/now-i-know-with-certainty-i-am-going-to-be-an-aerospace-engineer/",
  ],
  knowsAbout: [
    "Aerospace engineering",
    "Rocket trajectory simulation",
    "Engineering mathematics",
    "Model United Nations",
    "Financial education",
    "Fundamental analysis",
    "Peer support platforms",
    "Emotional reflection tools",
    "Web development",
    "3D printing",
    "Drone surveying",
    "Event operations",
  ],
  knowsLanguage: ["Spanish", "French", "English", "Portuguese"],
  education: [
    {
      name: "Universidad de la Republica (UdelaR)",
      detail: "Physical & Mathematical Engineering, enrolled February 2026",
    },
    {
      name: "Lycee Francais Jules Supervielle",
      detail: "French Baccalaureate, Mention Tres Bien, graduated December 2025",
    },
    {
      name: "Advanced Space Academy",
      detail: "Merit-based Space Camp scholarship, Huntsville, Alabama, May 2025",
    },
  ],
  highlights: [
    "Advanced Space Academy Scholar at the U.S. Space & Rocket Center in Huntsville, Alabama.",
    "Graduated with the French Baccalaureate Mention Tres Bien, the highest honors distinction.",
    "Co-Secretary General of LFMUN 2025 after a four-year Model UN progression from delegate to leadership.",
    "Managed 1,382,000+ UYU in student event operations and logistics.",
    "Built and documented a 6-DOF model rocketry trajectory simulator.",
    "Developing Cor Ad Cor, an anonymous peer-support and emotional reflection platform with journaling, real-time Listener sessions, formation, multilingual support, and crisis-safety workflows.",
  ],
  projects: [
    {
      name: "6-DOF Rocketry Simulation",
      status: "Public portfolio project",
      description:
        "Interactive model rocketry simulator using numerical methods to explore altitude, velocity, range, drag, Mach number, and launch-angle tradeoffs.",
      url: "https://juanignacioramos.com/projects",
    },
    {
      name: "Cor Ad Cor",
      status: "Active development",
      description:
        "Anonymous, free, human-first peer-support and emotional reflection platform between silence and clinical care, with journaling, trained Listener sessions, formation, patterns, breathing tools, and safety-aware moderation.",
      url: "https://coradcor.org",
    },
    {
      name: "Foro Agora",
      status: "Co-founder",
      description:
        "Youth-focused financial education platform in Uruguay that helps students understand money, investing, companies, and markets through fundamental analysis.",
      url: "https://foroagora.org",
    },
    {
      name: "Solar Water Distiller",
      status: "Prototype",
      description:
        "Solar distillation prototype built from scrap materials, later optimized with Peltier cells, voltage regulation, and repurposed PC fans.",
      url: "https://juanignacioramos.com/projects",
    },
    {
      name: "Ecolojules",
      status: "School initiative",
      description:
        "School-wide recycling and 3D-printing filament initiative designed around waste classification and circular-economy reuse.",
      url: "https://juanignacioramos.com/#volunteering",
    },
  ],
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${canonicalProfile.website}/#person`,
  name: canonicalProfile.name,
  alternateName: canonicalProfile.alternateNames,
  jobTitle: canonicalProfile.title,
  description: canonicalProfile.description,
  url: canonicalProfile.website,
  image: canonicalProfile.image,
  email: canonicalProfile.email,
  sameAs: canonicalProfile.sameAs,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Montevideo",
    addressCountry: "UY",
  },
  knowsAbout: canonicalProfile.knowsAbout,
  knowsLanguage: canonicalProfile.knowsLanguage,
  alumniOf: canonicalProfile.education.map((school) => ({
    "@type": "EducationalOrganization",
    name: school.name,
    description: school.detail,
  })),
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${canonicalProfile.website}/#website`,
  name: canonicalProfile.name,
  url: canonicalProfile.website,
  description: canonicalProfile.shortBio,
  author: { "@id": `${canonicalProfile.website}/#person` },
  inLanguage: ["en", "es"],
};
