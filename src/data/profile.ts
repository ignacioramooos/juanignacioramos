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
    "Juan Ignacio Ramos is an aspiring aerospace engineer from Montevideo, Uruguay, building a public portfolio across aerospace simulations, software products, civic technology, leadership, and service.",
  shortBio:
    "Aspiring aerospace engineer from Montevideo, Uruguay. Advanced Space Academy Scholar, French BAC Mention Tres Bien graduate, MUN Secretary General, and builder of aerospace, civic technology, and social impact software projects.",
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
    "Civic technology",
    "Peer support platforms",
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
    "Developing Cor Ad Cor, a peer-to-peer emotional wellness platform with journaling, real-time chat, listener training, multilingual support, and crisis-safety workflows.",
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
        "Peer-to-peer emotional wellness platform with journaling modes, real-time listening sessions, listener formation, dashboard widgets, multilingual UI, and crisis detection.",
      url: "https://github.com/ignacioramooos/cor-ad-cor-v2",
    },
    {
      name: "Foro Agora",
      status: "Co-founder",
      description:
        "AI-assisted civic discussion platform focused on structured debate, public reasoning, AI personas, moderated argument maps, and video-enabled conversation.",
      url: "https://juanignacioramos.com/projects",
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
