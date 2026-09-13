// Resume content, transcribed from the owner's official CV (Harvard-style CV adaptation).
// INTENTIONAL: AutoCAD is omitted from the technical skills list per owner preference.
// INTENTIONAL: no forward-looking "study in the USA" language — Space Academy is past experience only.

export interface ResumeEntry {
  title: string;
  org?: string;
  location?: string;
  date?: string;
  bullets: string[];
}

export interface ResumeSection {
  id: string;
  heading: string;
  headingEs: string;
  entries: ResumeEntry[];
}

export const resumeHeader = {
  name: "Juan Ignacio Ramos",
  location: "Montevideo, Uruguay",
  email: "ignacio@juanignacioramos.com",
  site: "juanignacioramos.com",
  linkedin: "https://www.linkedin.com/in/juanignacioramos1/",
  github: "https://github.com/ignacioramooos",
};

export const resumeProfile =
  "Aspiring aerospace engineer and Physical & Mathematical Engineering student with a public portfolio across aerospace simulation, software products, social-impact engineering, financial education, event operations, and international leadership. Advanced Space Academy Scholar, French Baccalauréat Mention Très Bien graduate, Co-Secretary General of LFMUN 2025, and builder of technical projects linking engineering rigor with practical service.";

export const resumeSections: ResumeSection[] = [
  {
    id: "education",
    heading: "Education",
    headingEs: "Educación",
    entries: [
      {
        title: "Physical & Mathematical Engineering",
        org: "Universidad de la República (UdelaR), Facultad de Ingeniería",
        location: "Montevideo, Uruguay",
        date: "Feb. 2026 – Present",
        bullets: [
          "Pursuing a rigorous quantitative foundation for aerospace applications through engineering mathematics, physics, and systems-oriented technical work.",
          "Academic direction centers on aerospace engineering, numerical modeling, and long-term contribution to an aerospace industry in Uruguay.",
        ],
      },
      {
        title: "Baccalauréat Français — Mention Très Bien",
        org: "Lycée Français Jules Supervielle",
        location: "Montevideo, Uruguay",
        date: "Graduated Dec. 2025",
        bullets: [
          "Earned highest honors distinction, corresponding to the top 10–15% of the national cohort.",
          "Completed European Section, Mathématiques Expertes (advanced mathematics), Portuguese elective, and a 34–40 hour weekly instructional load with approximately 40% at AP/A-Level standards.",
        ],
      },
      {
        title: "Advanced Space Academy — Merit-Based Scholar",
        org: "U.S. Space & Rocket Center",
        location: "Huntsville, AL",
        date: "May 2025",
        bullets: [
          "Received competitive scholarship for aerospace aptitude and completed hands-on space mission simulation experience.",
          "Strengthened long-term aerospace focus through team mission procedures, applied science, and direct exposure to the U.S. Space & Rocket Center training environment.",
        ],
      },
    ],
  },
  {
    id: "experience",
    heading: "Experience",
    headingEs: "Experiencia",
    entries: [
      {
        title: "Co-Founder",
        org: "Foro Ágora",
        location: "Montevideo, Uruguay",
        date: "2026 – Present",
        bullets: [
          "Co-founding a youth-focused financial education platform that teaches money, investing, companies, and markets through fundamental analysis.",
          "Building the project as an educational community with learning content, events, resources, and student tools rather than trading tips or buy/sell signals.",
          "Leading product vision, strategy, communications, and community growth alongside the founding team.",
        ],
      },
      {
        title: "SAT Tutor, March Bootcamp",
        org: "Schoolhouse.world (College Board Partner)",
        location: "Remote",
        date: "2026",
        bullets: [
          "Approved for Honorary Certification in the SAT Prep Course Challenge.",
          "Selected as tutor for the March SAT Bootcamp after competitive onboarding, providing peer-to-peer academic coaching in a global digital environment.",
        ],
      },
      {
        title: "Co-Secretary General",
        org: "LFMUN — Lycée Français Model United Nations",
        location: "Montevideo, Uruguay",
        date: "2025",
        bullets: [
          "Managed academic and logistical execution for 150+ participants after a four-year progression from delegate to conference leadership.",
          "Led complex debates on ethics, technology, and the use of drones in international humanitarian law.",
          "Designed and 3D-printed custom awards for participants; recognized as Best Delegate in 2024.",
        ],
      },
      {
        title: "Student Event Lead and Project Founder",
        org: "Lycée Français Jules Supervielle",
        location: "Montevideo, Uruguay",
        date: "2025",
        bullets: [
          "Organized five major school events, coordinating teams of 10+ peers for 1,350+ participants.",
          "Managed graduation fund budget totaling 1,382,000 UYU (approximately $35,000 USD).",
          "Developed QR-code digital access control for events with 1,250+ attendees and rebuilt corrupted logistical databases within 24 hours of launch.",
          "Founded Ecolojules, a school-wide recycling and 3D-printing filament program linking waste classification to circular-economy reuse.",
        ],
      },
      {
        title: "Volunteer and Drone Surveyor",
        org: "TECHO",
        location: "Uruguay",
        date: "2025",
        bullets: [
          "Constructed transitional housing for families in settlements.",
          "Provided aerial land surveys using a personal drone for logistical planning and documented construction progress for the media team.",
        ],
      },
      {
        title: "Event Director",
        org: "Warmup Method (Event Production)",
        location: "Montevideo, Uruguay",
        date: "2025",
        bullets: [
          "Created, organized, designed, and led two large-scale events, combining operations, event design, communication, and on-site execution.",
        ],
      },
      {
        title: "Logistics and Operations Intern",
        org: "LKSUR (Infrastructure & Sanitation)",
        location: "Montevideo, Uruguay",
        date: "2022",
        bullets: [
          "Worked with project records and reviewed completed infrastructure and sanitation projects, gaining early exposure to operational documentation and civil-infrastructure workflows.",
        ],
      },
    ],
  },
  {
    id: "technical-projects",
    heading: "Technical Projects",
    headingEs: "Proyectos Técnicos",
    entries: [
      {
        title: "6-DOF Rocketry Simulation",
        org: "Python · Excel · LSODA · Aerodynamics · SimScale",
        bullets: [
          "Built and documented an interactive model rocketry trajectory simulator for altitude, velocity, range, drag, Mach number, and launch-angle tradeoffs.",
          "Originally developed for the French Baccalauréat Grand Oral; continued refining the simulator after the exam out of independent technical interest.",
        ],
      },
      {
        title: "Cor Ad Cor",
        org: "React · TypeScript · Supabase · Realtime · Safety",
        bullets: [
          "Developing an anonymous, free, human-first peer-support and emotional reflection platform positioned between silence and clinical care.",
          "Design includes journaling, trained Listener sessions, Listener formation, emotional patterns, breathing tools, safety-aware moderation, multilingual support, and a bounded practice listener rather than an AI replacement for people.",
        ],
      },
      {
        title: "Solar Water Distiller",
        org: "Solar Energy · Peltier Cells · Sustainability · Prototyping",
        date: "2020",
        bullets: [
          "Engineered a solar distillation prototype from scrap materials to support drinking-water access in low-income contexts.",
          "Ran two full days of instrumented field testing in Montevideo (ambient 16–22 °C), logging ambient and internal water temperatures and producing roughly 300–350 ml of distilled water per run from 1.5 L of seawater over about six hours of sun.",
          "Optimized later iterations with Peltier cells, voltage regulation, and repurposed PC heatsinks to lower the dew point and improve condensation efficiency.",
        ],
      },
      {
        title: "DHS-C — Hybrid Solar Water Distiller v2.0",
        org: "Thermodynamics · Condenser Design · Thermoelectrics · Prototyping",
        bullets: [
          "Designed and documented a second-generation distiller with a redesigned condenser module combining solar-thermal evaporation and thermoelectric condensation.",
          "Produced full technical documentation and recorded bench tests of the working unit, scaling the 2020 proof of concept toward daily household output.",
        ],
      },
      {
        title: "Ecolojules",
        org: "Circular Economy · 3D Printing · School Operations",
        bullets: [
          "Implemented a school-wide three-bin waste classification system.",
          "Negotiated acquisition of a PET/HDPE-to-3D-printing-filament machine, creating a circular-economy loop within the school.",
        ],
      },
      {
        title: "MUN Technical Integration",
        org: "3D Printing · Blender · Event Design",
        bullets: [
          "Designed and 3D-printed custom awards for Model UN conferences, integrating technical design tools with diplomatic event management.",
        ],
      },
    ],
  },
  {
    id: "leadership",
    heading: "Leadership, Service, and Athletics",
    headingEs: "Liderazgo, Servicio y Deporte",
    entries: [
      {
        title: "Model United Nations",
        org: "Delegate → Chair → Co-Secretary General",
        bullets: [
          "Advanced through a four-year progression from delegate to Co-Secretary General of LFMUN 2025.",
          "Built communication, negotiation, public-speaking, committee design, and cross-cultural leadership skills through repeated conference roles.",
        ],
      },
      {
        title: "Water Polo",
        org: "Biguá Club · National U18 Pre-Selection",
        bullets: [
          "Trained more than 20 hours per week and earned pre-selection for the Uruguayan National U18 team.",
          "Continued competing after being ranked first alternate, using disciplined training and resilience to outperform rostered players.",
        ],
      },
      {
        title: "Open Water Swimming and PADI Scuba Diving",
        org: "Regional races · Certified Open Water Diver",
        bullets: [
          "Earned three podium finishes in regional open-water endurance races of approximately 1,500 meters.",
          "Applied classroom physics to pressure, buoyancy, and safety procedures through PADI Open Water Diver certification.",
        ],
      },
    ],
  },
  {
    id: "awards",
    heading: "Awards and Honors",
    headingEs: "Premios y Honores",
    entries: [
      {
        title: "",
        bullets: [
          "Advanced Space Academy Scholarship — merit-based scholar at the U.S. Space & Rocket Center, Huntsville, Alabama (2025).",
          "French Baccalauréat Mention Très Bien — highest honors distinction; top 10–15% national cohort (2025).",
          "MUN Best Delegate — recognized for communication, negotiation, and analytical performance (2024).",
          "National Water Polo U18 Pre-Selection — competitive athletic recognition in Uruguay.",
        ],
      },
    ],
  },
  {
    id: "skills",
    heading: "Skills",
    headingEs: "Habilidades",
    entries: [
      {
        title: "",
        bullets: [
          "Languages: Spanish (native), French (BAC fluent), English (TOEFL 103), Portuguese (fluent).",
          "Technical: Python, Excel modeling, numerical simulation, LSODA, SimScale, React, TypeScript, Supabase, Blender, 3D design, 3D printing, drone piloting, photography.",
          "Operations and leadership: event management, budget ownership, QR access systems, crisis management, public speaking, cross-cultural communication, team leadership, service project execution.",
          "Professional services: web design, drone videography, video editing, 3D modeling, event planning, technical research collaboration, and AI/automation support for mission-driven work.",
        ],
      },
    ],
  },
];
