export interface Quote {
  text: string;
  context: string;
}

export const quotes: Quote[] = [
  // Perseverance & Resilience
  {
    text: "Perseverance — I guarantee you, that's my favorite word in the world.",
    context: "On resilience",
  },
  {
    text: "True growth begins when we stop working for a grade and start reaching for a height we once thought impossible.",
    context: "On ambition",
  },
  {
    text: "Every setback is a setup for a comeback — the rocket that fails teaches more than the one that flies.",
    context: "On failure",
  },
  {
    text: "I learned that the hardest problems are not solved by the smartest person in the room, but by the one who refuses to leave it.",
    context: "On determination",
  },
  {
    text: "The distance between impossible and possible is measured in persistence.",
    context: "On perseverance",
  },
  // Leadership & Community
  {
    text: "Every interaction is an opportunity to learn from and contribute to those around me.",
    context: "On leadership",
  },
  {
    text: "Leadership is not about standing in front — it's about making sure everyone behind you has a reason to follow.",
    context: "On leading others",
  },
  {
    text: "When you organize an event for thousands, you learn that logistics is just empathy at scale.",
    context: "On event management",
  },
  {
    text: "The best teams are not built on talent alone but on trust, communication, and a shared sense of purpose.",
    context: "On teamwork",
  },
  {
    text: "Managing a budget of $35,000 as a teenager taught me that responsibility doesn't wait for age.",
    context: "On responsibility",
  },
  // Aerospace & Engineering
  {
    text: "Space is not just a destination — it's the proof that humanity refuses to accept limits.",
    context: "On space exploration",
  },
  {
    text: "A rocket is a controlled explosion of ambition. Every variable, every calculation, is a promise to physics.",
    context: "On engineering",
  },
  {
    text: "I don't just want to study aerospace — I want to build an industry where none exists.",
    context: "On vision",
  },
  {
    text: "In Uruguay, people told me there is no space industry. I heard an invitation.",
    context: "On pioneering",
  },
  {
    text: "Six degrees of freedom — that's what separates a paper airplane from a spacecraft. Mastering each one is the work of a lifetime.",
    context: "On simulation",
  },
  // Learning & Growth
  {
    text: "Four languages, four ways of seeing the world. Every word learned is a door opened.",
    context: "On multilingualism",
  },
  {
    text: "The Baccalaureate didn't just test what I knew — it tested who I was becoming.",
    context: "On education",
  },
  {
    text: "I study not because I have to, but because the universe is too interesting to ignore.",
    context: "On curiosity",
  },
  {
    text: "When you swim 1,500 meters in open water, you learn that the mind gives up long before the body does.",
    context: "On mental toughness",
  },
  {
    text: "The classroom gave me knowledge. The field gave me wisdom. The failures gave me character.",
    context: "On growth",
  },
  // Mind & Hand Philosophy
  {
    text: "Mens et Manus — the mind imagines, but the hand builds. Neither is complete without the other.",
    context: "On philosophy",
  },
  {
    text: "Theory without practice is a blueprint without a builder. Practice without theory is a builder without a plan.",
    context: "On balance",
  },
  {
    text: "I believe the best engineers are the ones who can explain their work to a child and defend it to a professor.",
    context: "On communication",
  },
  {
    text: "Problem-solving is not a skill you learn — it's a muscle you build, one impossible question at a time.",
    context: "On problem solving",
  },
  {
    text: "The world doesn't need more people who can pass tests. It needs people who can solve problems that don't have answers yet.",
    context: "On innovation",
  },
];

/**
 * Returns 3 quotes for the current day, rotating daily through the library.
 */
export const getDailyQuotes = (): Quote[] => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const startIndex = (dayOfYear * 3) % quotes.length;
  const result: Quote[] = [];
  for (let i = 0; i < 3; i++) {
    result.push(quotes[(startIndex + i) % quotes.length]);
  }
  return result;
};
