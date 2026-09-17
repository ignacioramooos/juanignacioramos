import type { Deck } from "./types";
import { bdePhotos } from "./bdePhotos";

// Candidature à CPCStan — association humanitaire étudiante de Stanislas Cannes.
// Le deck reste volontairement bref : les expériences citées sont celles du
// portfolio et les chiffres événementiels proviennent des tableurs vérifiés.
export const cpcStanislasDeck: Deck = {
  slug: "cpc-stanislas",
  title: "CPCStan — Engagement solidaire",
  subtitle: "Candidature pour rejoindre l’équipe",
  description:
    "Une candidature brève autour du bénévolat, de la transmission et de l’organisation au service de la collecte.",
  slides: [
    {
      id: "cover",
      variant: "title",
      kicker: "CPCStan · Candidature",
      title: "Mettre mes compétences au service d’une cause",
      subtitle: "Juan Ignacio Ramos — candidature pour rejoindre l’équipe",
      footer: "Stanislas Cannes · 2026",
    },
    {
      id: "profile",
      kicker: "01 · En quelques mots",
      title: "Qui je suis",
      blocks: [
        {
          type: "lead",
          text: "Je suis Uruguayen, avec une orientation vers l’ingénierie aérospatiale et l’envie de construire des projets utiles et concrets.",
        },
        {
          type: "bullets",
          items: [
            { title: "Quatre langues", text: "espagnol, français, anglais et portugais." },
            { title: "Une façon de travailler", text: "écouter, préparer, puis agir avec l’équipe." },
          ],
        },
      ],
    },
    {
      id: "motivation",
      kicker: "02 · Ma motivation",
      title: "Être utile, simplement",
      blocks: [
        {
          type: "lead",
          text: "Pour moi, une compétence n’a de valeur que lorsqu’elle peut aussi améliorer quelque chose pour les autres.",
        },
        {
          type: "bullets",
          items: [
            { title: "Dignité", text: "placer les personnes avant le projet." },
            { title: "Transmission", text: "rendre un savoir ou une opportunité accessible." },
            { title: "Action collective", text: "faire sa part avec constance, même lorsqu’elle est discrète." },
          ],
        },
      ],
    },
    {
      id: "techo",
      kicker: "03 · Sur le terrain",
      title: "Apprendre en servant",
      blocks: [
        {
          type: "lead",
          text: "Avec TECHO Uruguay, j’ai participé à la construction de logements de transition pour des familles vivant en situation de précarité.",
        },
        {
          type: "bullets",
          items: [
            { title: "Construire", text: "travailler sur le terrain, avec l’équipe et les familles." },
            { title: "Planifier", text: "réaliser des relevés aériens avec mon drone pour préparer la logistique." },
            { title: "Documenter", text: "suivre l’avancement pour l’équipe de communication." },
          ],
        },
      ],
    },
    {
      id: "transmit",
      kicker: "04 · Transmettre",
      title: "Rendre l’apprentissage accessible",
      blocks: [
        {
          type: "bullets",
          items: [
            {
              title: "Foro Ágora",
              text: "cofondateur d’un projet à but non lucratif proposant une éducation financière gratuite aux jeunes.",
            },
            {
              title: "Tutorat entre pairs",
              text: "accompagner des élèves dans un cadre international avec Schoolhouse.world.",
            },
            {
              title: "Cor Ad Cor",
              text: "développer un espace gratuit et humain pour écrire, réfléchir et demander une écoute réelle.",
            },
          ],
        },
      ],
    },
    {
      id: "fundraising",
      kicker: "05 · Organiser pour collecter",
      title: "Une expérience utile à la collecte de fonds",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "8", label: "événements organisés au total" },
            { value: "2 067", label: "billets vendus sur La Nuit 28/02 et La Nuit 2" },
          ],
        },
        {
          type: "lead",
          text: "La Nuit 28/02 et La Nuit 2 ont été deux productions distinctes. Budgets, fournisseurs, billetterie, sécurité et bilan : une méthode que je pourrais adapter à une tombola ou à un événement solidaire.",
        },
        { type: "image", src: bdePhotos.vistaNuit2, alt: "Événement organisé avec le comité étudiant" },
      ],
      footer: "Ces chiffres décrivent mon expérience d’organisation ; ils ne correspondent pas à des dons.",
    },
    {
      id: "contribution",
      kicker: "06 · Dans l’équipe",
      title: "Ce que je peux apporter",
      blocks: [
        {
          type: "bullets",
          items: [
            { title: "Événements", text: "aider à préparer une tombola ou une action solidaire réaliste." },
            { title: "Partenaires", text: "contacter des commerces et entretenir une relation claire." },
            { title: "Suivi", text: "tenir un budget simple et rendre compte de chaque étape." },
            { title: "Sensibilisation", text: "présenter la cause avec respect, sans parler à la place de ceux qu’elle concerne." },
          ],
        },
        { type: "image", src: bdePhotos.adminsNuit, alt: "Équipe organisatrice travaillant ensemble" },
      ],
    },
    {
      id: "close",
      variant: "section",
      kicker: "Pour commencer",
      title: "D’abord écouter, puis agir",
      blocks: [
        {
          type: "lead",
          text: "Je souhaite comprendre la manière de travailler de CPCStan, apprendre de l’équipe et prendre en charge les tâches qui seront réellement utiles.",
        },
        {
          type: "quote",
          text: "Je ne viens pas avec toutes les réponses, mais avec du temps, de la rigueur et l’envie de faire ma part.",
        },
      ],
      footer: "Merci — Juan Ignacio Ramos",
    },
  ],
};