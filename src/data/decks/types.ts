export type Stat = { value: string; label: string; note?: string };

export type SlideBlock =
  | { type: "lead"; text: string }
  | { type: "bullets"; items: { title?: string; text: string }[] }
  | { type: "stats"; items: Stat[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "quote"; text: string; source?: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type Slide = {
  id: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  variant?: "title" | "section" | "content";
  blocks?: SlideBlock[];
  footer?: string;
};

export type Deck = {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  slides: Slide[];
};
