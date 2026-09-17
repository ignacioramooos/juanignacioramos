import type { Deck } from "./types";

// Deck for the student union (BDE) event-organization application in Cannes.
// Figures come from Juan Ignacio's own event budgets and lists.
// Images, spreadsheets and extra numbers will be added later.
export const eventOrganizationDeck: Deck = {
  slug: "event-organization",
  title: "Event Organization",
  subtitle: "Application — Student Union (BDE), Cannes",
  description:
    "Large-scale nightlife production, staff and security management, access control and formal academic events.",
  slides: [
    {
      id: "cover",
      variant: "title",
      kicker: "Student Union · BDE Application",
      title: "Event Organization",
      subtitle: "Juan Ignacio Ramos — production, budgets, staff and access control",
      footer: "Cannes",
    },
    {
      id: "overview",
      kicker: "Overview",
      title: "What I have actually run",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "8", label: "Events organized in total" },
            { value: "18+", label: "Staff coordinated live on site" },
            { value: "150", label: "Guests at a formal academic event" },
          ],
        },
        {
          type: "bullets",
          items: [
            { title: "La Nuit 28/02", text: "821 tickets sold and 406,090 UYU in gross revenue." },
            { title: "La Nuit 2", text: "1,246 tickets sold, 606,700 UYU projected gross revenue, and 310,500 UYU in costs." },
            { title: "University parties", text: "FING (UdelaR) welcome party, Seven committee, Proyecto LEA." },
            { title: "Institutional launches", text: "Foro Ágora launch at Casa INJU." },
            { title: "Formal events", text: "LFMUN 2026 — Secretary General." },
          ],
        },
      ],
    },
    {
      id: "budgets",
      kicker: "01 · La Nuit 28/02 and La Nuit 2",
      title: "Two separate large-scale productions",
      blocks: [
        { type: "lead", text: "Role: general organization and production for two distinct editions, each with its own budget, ticketing model, suppliers, site constraints, and security plan." },
        {
          type: "table",
          head: ["Line", "Budget (UYU)", "Note"],
          rows: [
            ["Marquee / tent", "125.000", "85.500 base + 40.000 last-minute logistics"],
            ["Venue / land rental", "35.000 – 40.000", "Per event"],
            ["Lights, sound, aluminium trusses", "35.000 – 60.000", "Technical suppliers"],
            ["Fuel generator", "17.000", "Includes 1.200 fuel — blackout contingency"],
            ["Chemical toilets", "8.000", "Sanitary logistics"],
            ["DJ fees", "10.000", "Julián Maldonado & Mati Schein"],
          ],
        },
        { type: "lead", text: "Also handled: government permits and AGADU copyright fees." },
      ],
      footer: "Source: internal event budgets",
    },
    {
      id: "staff",
      kicker: "02 · La Fet 1 & 2",
      title: "Staff, payroll and security",
      blocks: [
        {
          type: "bullets",
          items: [
            { title: "Team leadership", text: "18+ workers coordinated simultaneously during live execution." },
            { title: "Payroll", text: "Full responsibility for paying cleaning staff, cashiers, bartenders, cloakroom and door." },
            { title: "Legal employment", text: "Social contributions (BPS) handled — e.g. 6.237 UYU employer contributions per event." },
          ],
        },
        {
          type: "table",
          head: ["Security setup", "People", "Cost (UYU)"],
          rows: [
            ["Security manager", "1", "2.900"],
            ["Perimeter & interior guards", "4", "11.956"],
            ["Head doorman", "1", "2.000"],
            ["Large-scale events (Las Nuits, team \"Canario\")", "—", "37.500 – 40.000"],
          ],
        },
      ],
    },
    {
      id: "access",
      kicker: "03 · Proyecto LEA (Joda 04.07)",
      title: "Capacity, guest lists and ticketing",
      blocks: [
        {
          type: "bullets",
          items: [
            { title: "Strict capacity control", text: "Final list of 120+ people verified — name, surname, ID number and gender tabulated." },
            { title: "Risk prevention at the door", text: "Tickets tied to ID documents, giving total control over who entered the venue." },
            { title: "Database discipline", text: "Lists cross-checked in real time at the entrance." },
          ],
        },
      ],
    },
    {
      id: "formal",
      kicker: "04 · LFMUN 2026",
      title: "Formal, diplomatic and academic events",
      blocks: [
        { type: "lead", text: "Role: Secretary General — Model UN of Lycée Français Jules Supervielle." },
        {
          type: "stats",
          items: [
            { value: "150", label: "Guests hosted" },
            { value: "13", label: "Schools coordinated" },
            { value: "6", label: "Committees running in parallel" },
          ],
        },
        {
          type: "bullets",
          items: [
            { title: "Room allocation", text: "GA1, SC, HRC, UNW, ECOSOC, GA4 plus Approval Panel and Media Team." },
            { title: "Daytime budget", text: "Catering (coffee breaks, lunch), school fees, placards, badges, tote bags and eco pencils." },
            { title: "Engineering crossover", text: "Designed, costed and 3D-printed the delegation awards." },
          ],
        },
      ],
    },
    {
      id: "institutional",
      kicker: "05 · Foro Ágora & committees",
      title: "Launches, community and finance",
      blocks: [
        {
          type: "bullets",
          items: [
            { title: "Foro Ágora", text: "Co-founder, organizer and community manager of a non-profit educational project." },
            { title: "Casa INJU launch", text: "Coordination, promotion and on-site execution of the launch event and open class." },
            { title: "880+ contacts", text: "Registration lists and databases systematised for email campaigns." },
            { title: "Investment committee", text: "Finance area of the student committee — funding graduation parties and the Seven." },
          ],
        },
      ],
    },
    {
      id: "why",
      variant: "section",
      kicker: "Closing",
      title: "What I bring to the BDE",
      blocks: [
        {
          type: "bullets",
          items: [
            { title: "Budget ownership", text: "I have run six-figure UYU budgets and absorbed last-minute cost shocks." },
            { title: "People on the ground", text: "Hiring, briefing, paying and leading teams during the night itself." },
            { title: "Safety first", text: "Structured security schemes and ID-based access control, not improvisation." },
            { title: "Range", text: "From a 3.000-person-energy party to a 150-guest diplomatic conference." },
          ],
        },
        { type: "quote", text: "Mind and Hand — plan it on paper, then stand at the door until it works." },
      ],
    },
  ],
};
