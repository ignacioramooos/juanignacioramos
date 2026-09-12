import type { Deck } from "./types";
import { bdePhotos } from "./bdePhotos";

// Dossier de candidature au BDE Stanislas (Cannes) — pôle Événementiel.
// Tous les chiffres proviennent des tableurs réels de Juan Ignacio Ramos
// (LA_FET.xlsx, Lista_LA_NUIT_28_02.xlsx, Lista_LA_NUIT_2.xlsx,
// Gradu_Elias.xlsx, PROYECTO_LEA_LISTA_FINAL_2.xlsx). Montants en pesos
// uruguayens (UYU) — 1 EUR ≈ 45 UYU à titre indicatif.
export const bdeStanislasDeck: Deck = {
  slug: "bde-stanislas",
  title: "BDE Stanislas — Événementiel",
  subtitle: "Candidature — pôle Événementiel",
  description:
    "Dossier en français : le comité, les six événements dirigés, les budgets réels, la sécurité et les valeurs.",
  slides: [
    {
      id: "cover",
      variant: "title",
      kicker: "BDE Stanislas · Candidature",
      title: "Organisation d'événements",
      subtitle: "Juan Ignacio Ramos — pôle Événementiel (et présidence, si le jury le juge pertinent)",
      footer: "Cannes — 2026",
    },
    {
      id: "start",
      kicker: "01 · Le point de départ",
      title: "Avant, les élèves payaient de leur poche",
      blocks: [
        {
          type: "bullets",
          items: [
            { text: "Le financement du bal de promo reposait sur de petites actions peu rentables." },
            { text: "Le déficit finissait toujours à la charge des familles." },
            { text: "Personne ne voulait s'occuper de la logistique : trop lourd, trop risqué." },
          ],
        },
        { type: "image", src: bdePhotos.img0217, alt: "Public réuni sous le chapiteau pendant une soirée", position: "top" },
      ],
    },
    {
      id: "proposal",
      kicker: "02 · La proposition",
      title: "Une idée présentée en assemblée générale",
      blocks: [
        {
          type: "lead",
          text: "J'ai proposé d'organiser de vraies soirées, gérées comme une petite entreprise : budget, fournisseurs, billetterie, sécurité.",
        },
        {
          type: "bullets",
          items: [
            { title: "Résultat du vote", text: "création du « comité jodas » (comité soirées)." },
            { title: "Mon rôle", text: "président du comité, responsable du budget et de la production." },
          ],
        },
        { type: "image", src: bdePhotos.img0948, alt: "La piste et la structure lumineuse d'une soirée", position: "top" },
      ],
    },
    {
      id: "team",
      kicker: "03 · L'équipe",
      title: "De dix personnes à quatre",
      blocks: [
        {
          type: "bullets",
          items: [
            { title: "Au départ", text: "dix membres, beaucoup d'idées, peu de méthode." },
            { title: "À l'arrivée", text: "quatre personnes qui ont tout porté, côte à côte." },
            { title: "Ma leçon", text: "une équipe se juge la nuit même, pas en réunion." },
          ],
        },
        { type: "image", src: bdePhotos.adminsNuit, alt: "Les quatre membres de l'équipe organisatrice de La Nuit", caption: "Les quatre qui ont porté le projet jusqu'au bout", position: "top" },
      ],
      footer: "Déléguer, répartir les rôles, tenir jusqu'au démontage",
    },
    {
      id: "zero",
      kicker: "04 · Tout partir de zéro",
      title: "Aucune structure existante",
      blocks: [
        {
          type: "bullets",
          items: [
            { title: "Terrain", text: "recherche, négociation et location du lieu." },
            { title: "Énergie", text: "groupe électrogène et rallonges, carburant compris." },
            { title: "Sanitaire", text: "toilettes chimiques, nettoyage avant et après." },
            { title: "Technique", text: "son, lumières, structures aluminium, DJ." },
            { title: "Sécurité", text: "agents, chef de sécurité, portiers." },
            { title: "Légal", text: "autorisations municipales, droits d'auteur (AGADU), comptable." },
          ],
        },
        { type: "image", src: bdePhotos.img1258, alt: "Structure technique, son et éclairage d'une soirée", position: "top" },
      ],
    },
    {
      id: "stage",
      kicker: "05 · Fait maison",
      title: "Nous avons construit notre propre scène",
      blocks: [
        {
          type: "lead",
          text: "Pour les deux premières éditions, la scène a été conçue et montée par le comité lui-même — moins de coûts, plus de contrôle.",
        },
        {
          type: "bullets",
          items: [
            { text: "Montage et démontage assurés par l'équipe." },
            { text: "Chapiteau, barrières et vestiaire intégrés au même plan de salle." },
          ],
        },
        { type: "image", src: bdePhotos.armadoEscenarioNuit, alt: "Construction artisanale de la scène par l'équipe", caption: "Montage de la scène par le comité", fit: "contain" },
      ],
    },
    {
      id: "bac",
      kicker: "06 · En parallèle",
      title: "Tout cela pendant la préparation du bac",
      blocks: [
        {
          type: "bullets",
          items: [
            { title: "Priorisation", text: "planning des tâches réparti pour ne jamais bloquer les révisions." },
            { title: "Imprévus", text: "décisions difficiles prises en quelques heures, la veille de l'événement." },
            { title: "Sang-froid", text: "chercher une alternative plutôt que subir le problème." },
          ],
        },
        { type: "image", src: bdePhotos.img1053, alt: "L'équipe réunie pendant une soirée", position: "top" },
      ],
    },
    {
      id: "overview",
      kicker: "07 · Vue d'ensemble",
      title: "Six événements dirigés",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "2 067", label: "billets vendus sur les deux Nuit" },
            { value: "1 382 000", label: "UYU de budget géré (bal de promo)" },
            { value: "18", label: "personnes salariées sur une seule soirée" },
          ],
        },
        { type: "image", src: bdePhotos.img1605, alt: "Vue de la scène et du public pendant un événement", position: "top" },
      ],
      footer: "Chiffres issus de mes propres tableurs",
    },
    {
      id: "timeline",
      kicker: "08 · Chronologie",
      title: "Ce que j'ai dirigé",
      blocks: [
        {
          type: "table",
          head: ["Événement", "Rôle", "Échelle"],
          rows: [
            ["La Nuit 28/02", "Président du comité", "821 billets"],
            ["La Nuit 2", "Président du comité", "1 246 billets"],
            ["La Nuit 3 (salle du centre)", "Production", "format salle"],
            ["La Fet 1 & 2", "Production et paie", "18 salariés"],
            ["Bal de promo français", "Organisation générale", "1 013 billets"],
            ["Projet LEA (04.07)", "Contrôle d'accès", "157 confirmés"],
            ["LFMUN", "Secrétaire général", "150 invités"],
          ],
        },
        { type: "image", src: bdePhotos.img1636, alt: "Public devant la scène pendant une soirée", position: "top" },
      ],
    },
    {
      id: "nuit1-bet",
      kicker: "09 · La Nuit 28/02",
      title: "Le pari : 750 billets",
      blocks: [
        {
          type: "lead",
          text: "Objectif fixé avant l'ouverture de la billetterie, avec une grille tarifaire en cinq paliers (350 → 800 UYU).",
        },
        { type: "image", src: bdePhotos.vistaNuit1, alt: "Vue d'ensemble du public de La Nuit", caption: "La Nuit — vue du public", position: "center" },
      ],
    },
    {
      id: "nuit1-result",
      kicker: "09 · La Nuit 28/02",
      title: "Le résultat",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "821", label: "billets vendus", note: "objectif : 750" },
            { value: "873", label: "personnes en liste" },
            { value: "406 090", label: "UYU de recette brute" },
          ],
        },
        { type: "image", src: bdePhotos.fuegosArtificialesNuit, alt: "Feu d'artifice pendant La Nuit", caption: "La Nuit, au moment du feu d'artifice", position: "top" },
      ],
      footer: "Répartition du public : 55,6 % filles / 44,4 % garçons",
    },
    {
      id: "nuit1-budget",
      kicker: "09 · La Nuit 28/02",
      title: "Le budget, ligne par ligne",
      blocks: [
        {
          type: "sheet",
          file: "Lista_LA_NUIT_28_02.xlsx",
          tab: "Presupuesto",
          columns: ["Poste", "Prix (UYU)", "Détail"],
          rows: [
            ["Chapiteau", "60 000", "acompte 30 000"],
            ["Terrain", "40 000", ""],
            ["Sécurité", "40 000", "équipe « Canario »"],
            ["Lumières, son, structures", "35 000", "payé"],
            ["Groupe électrogène", "17 000", "dont 1 200 de carburant"],
            ["DJ", "10 000", "J. Maldonado & M. Schein"],
            ["Toilettes", "8 000", ""],
            ["Total des dépenses", "216 900", ""],
          ],
          highlightRows: [7],
        },
      ],
    },
    {
      id: "nuit2-scale",
      kicker: "10 · La Nuit 2",
      title: "Changer d'échelle",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "1 246", label: "billets vendus", note: "objectif : 1 110" },
            { value: "7", label: "paliers tarifaires", note: "350 → 1 000 UYU" },
            { value: "606 700", label: "UYU de recette brute prévue" },
          ],
        },
        { type: "image", src: bdePhotos.vistaNuit2, alt: "Vue de la scène pendant La Nuit 2", caption: "La Nuit 2", position: "top" },
      ],
    },
    {
      id: "nuit2-budget",
      kicker: "10 · La Nuit 2",
      title: "310 500 UYU de coûts",
      blocks: [
        {
          type: "sheet",
          file: "Lista_LA_NUIT_2.xlsx",
          tab: "Presupuesto",
          columns: ["Poste", "Prix (UYU)", "Détail"],
          rows: [
            ["Chapiteau", "125 000", "85 500 + 40 000 de dernière minute"],
            ["Lumières, son, structures", "60 000", "payé"],
            ["Sécurité", "37 500", "équipe « Canario »"],
            ["Terrain", "35 000", ""],
            ["Groupe électrogène", "17 000", ""],
            ["Alcool + eau", "18 000", "boissons incluses"],
            ["DJ", "10 000", ""],
            ["Total des dépenses", "310 500", ""],
          ],
          highlightRows: [7],
        },
      ],
    },
    {
      id: "nuit2-crisis",
      kicker: "10 · La Nuit 2",
      title: "L'imprévu à 40 000",
      blocks: [
        {
          type: "lead",
          text: "Le chapiteau a dû être déplacé à la dernière minute : 40 000 UYU de surcoût sur une base de 85 500.",
        },
        {
          type: "bullets",
          items: [
            { title: "Décision", text: "absorber le coût plutôt que dégrader la sécurité du site." },
            { title: "Compensation", text: "palier tarifaire supplémentaire et arbitrage sur d'autres postes." },
          ],
        },
        { type: "image", src: bdePhotos.img2882, alt: "Trois membres de l'équipe pendant une soirée", position: "top" },
      ],
    },
    {
      id: "nuit3",
      kicker: "11 · La Nuit 3",
      title: "Même cadre, format salle",
      blocks: [
        {
          type: "bullets",
          items: [
            { text: "Édition organisée dans une salle du centre-ville, avec sa propre structure de coûts." },
            { text: "Moins de production technique, plus de contraintes de jauge et de voisinage." },
            { text: "Preuve que le modèle fonctionne en plein air comme en intérieur." },
          ],
        },
        { type: "image", src: bdePhotos.nuitSalon, alt: "Publication vidéo montrant le public de La Nuit en salle", caption: "La Nuit 3 — format salle", fit: "contain" },
      ],
    },
    {
      id: "nuit3-vista",
      kicker: "11 · La Nuit 3",
      title: "Une salle pleine, une autre dynamique",
      blocks: [
        { type: "lead", text: "Le passage en intérieur change le rythme, la circulation et la proximité avec le public." },
        { type: "image", src: bdePhotos.nuitSalonVista2, alt: "Vue du public de La Nuit 3 en salle", caption: "La Nuit 3 — vue de la salle", position: "top" },
      ],
    },
    {
      id: "nuit3-production",
      kicker: "11 · La Nuit 3",
      title: "Observer la salle en temps réel",
      blocks: [
        { type: "lead", text: "En salle, chaque décision se lit immédiatement dans les flux, la jauge et l'ambiance." },
        { type: "image", src: bdePhotos.nuitSalon3, alt: "Vue latérale de la production et du public de La Nuit 3", caption: "La Nuit 3 — côté production", position: "top" },
      ],
    },
    {
      id: "fet-pl",
      kicker: "12 · La Fet",
      title: "Du chiffre d'affaires au résultat net",
      blocks: [
        {
          type: "sheet",
          file: "LA_FET.xlsx",
          tab: "Planilla Global — 22/08/2025",
          columns: ["Ligne", "Montant (UYU)"],
          rows: [
            ["Billetterie", "276 400"],
            ["Vestiaire", "11 400"],
            ["Bar et tables", "5 300"],
            ["Total des dépenses", "−127 546"],
            ["TVA billetterie et bar", "−30 987"],
            ["Résultat net", "134 567"],
          ],
          highlightRows: [5],
        },
        { type: "image", src: bdePhotos.laFet1, alt: "Vue du public de La Fet", caption: "La Fet — vue de la salle", position: "top" },
      ],
    },
    {
      id: "fet-staff",
      kicker: "13 · La Fet",
      title: "18 personnes payées, dans les règles",
      blocks: [
        {
          type: "sheet",
          file: "LA_FET.xlsx",
          tab: "Personal, costos fij y variable",
          columns: ["Poste", "Nombre", "Sous-total (UYU)"],
          rows: [
            ["Sécurité", "4", "11 956"],
            ["Nettoyage (soir + lendemain)", "5", "7 020"],
            ["Bartenders et caissiers", "4", "7 220"],
            ["Responsable de salle", "1", "2 900"],
            ["Cotisations sociales (BPS)", "—", "6 237"],
            ["Total personnel", "18", "51 021"],
          ],
          highlightRows: [5],
          caption: "S'ajoutent les droits d'auteur AGADU (14 462 UYU) et les frais de comptable.",
        },
        { type: "image", src: bdePhotos.laFet2, alt: "Public et éclairage de La Fet", caption: "La Fet — une production portée par 18 salariés", position: "top" },
      ],
    },
    {
      id: "security",
      kicker: "14 · Sécurité",
      title: "Un dispositif, pas de l'improvisation",
      blocks: [
        {
          type: "bullets",
          items: [
            { title: "Chef de sécurité", text: "un responsable identifié, joignable toute la nuit." },
            { title: "Agents", text: "périmètre et intérieur, plus deux gardes assermentés." },
            { title: "Porte", text: "un portier en chef, contrôle des entrées et des sorties." },
            { title: "Budget dédié", text: "37 500 à 40 000 UYU sur les grandes éditions." },
          ],
        },
        { type: "image", src: bdePhotos.laFet3, alt: "Vue de la piste de La Fet", caption: "La Fet — vue depuis la production", position: "top" },
      ],
    },
    {
      id: "gradu",
      kicker: "15 · Bal de promo",
      title: "1 013 billets, 1 382 000 UYU de budget",
      blocks: [
        {
          type: "sheet",
          file: "Gradu_Elias.xlsx",
          tab: "Precio de entradas",
          columns: ["Palier", "Prix (UYU)", "Billets"],
          rows: [
            ["Liste commune", "850", "123"],
            ["1er palier", "850", "116"],
            ["2e palier", "1 000", "174"],
            ["3e palier", "1 200", "170"],
            ["4e / 5e palier", "1 400 – 1 450", "250"],
            ["Dernier palier et jour J", "1 500 – 2 000", "80"],
            ["Total", "coût/pers. 1 300", "1 013"],
          ],
          highlightRows: [6],
          caption: "Échéancier fournisseur en quatre versements, dont 1 252 000 UYU à 72 heures de l'événement.",
        },
        { type: "image", src: bdePhotos.img3156, alt: "Public réuni devant une grande scène", position: "top" },
      ],
    },
    {
      id: "lea",
      kicker: "16 · Projet LEA",
      title: "Contrôle d'accès par pièce d'identité",
      blocks: [
        {
          type: "bullets",
          items: [
            { title: "Liste nominative", text: "nom, prénom, numéro de pièce d'identité et genre." },
            { title: "157 confirmés", text: "107 filles et 50 garçons, vérifiés à l'entrée." },
            { title: "Jauge", text: "objectif 150 personnes, capacité maximale sûre 180." },
          ],
        },
        { type: "image", src: bdePhotos.img8619, alt: "Équipe de production au contrôle d'un événement", caption: "Le contrôle opérationnel pendant l'événement", position: "top" },
      ],
    },
    {
      id: "lea-model",
      kicker: "16 · Projet LEA",
      title: "Un modèle de présence, pas une intuition",
      blocks: [
        {
          type: "sheet",
          file: "PROYECTO_LEA_LISTA_FINAL_2.xlsx",
          tab: "Dashboard",
          columns: ["Indicateur", "Valeur"],
          rows: [
            ["Objectif de présents", "150"],
            ["Confirmés en liste", "157"],
            ["Présence attendue (modèle)", "124,9"],
            ["Écart-type estimé", "5,0"],
            ["Intervalle 80 %", "118 – 131"],
            ["Capacité maximale sûre", "180"],
          ],
          highlightRows: [2, 4],
          caption: "Taux de présence par profil, ajustés selon les relances et la proximité de l'événement.",
        },
      ],
    },
    {
      id: "lfmun",
      kicker: "17 · LFMUN",
      title: "Un événement formel, pas une soirée",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "150", label: "invités accueillis" },
            { value: "13", label: "établissements coordonnés" },
            { value: "6", label: "commissions en parallèle" },
          ],
        },
        {
          type: "bullets",
          items: [
            { title: "Secrétaire général", text: "protocole, restauration, badges, salles et récompenses." },
          ],
        },
        { type: "image", src: bdePhotos.ee377, alt: "Public face à la scène lors d'un événement", position: "top" },
      ],
    },
    {
      id: "values",
      kicker: "18 · Valeurs",
      title: "Ce qui compte autant que les chiffres",
      blocks: [
        {
          type: "bullets",
          items: [
            { title: "Bénévolat", text: "Foro Ágora, projet éducatif à but non lucratif, cofondé et animé." },
            { title: "Ingénierie utile", text: "« Engineering for Impact » : travaux pro bono pour des associations." },
            { title: "Sport", text: "l'exigence collective apprise en équipe se retrouve à la production." },
            { title: "Ce qui reste", text: "des contacts, des amitiés et une équipe qui recommencerait demain." },
          ],
        },
        { type: "image", src: bdePhotos.generationNuit, alt: "Photo de groupe de toute la génération", caption: "Au-delà des chiffres : les liens et les amitiés", fit: "contain" },
      ],
    },
    {
      id: "method",
      kicker: "19 · Méthode",
      title: "Ce que je ferais au BDE",
      blocks: [
        {
          type: "bullets",
          items: [
            { title: "Un budget écrit", text: "avant tout engagement, avec marge pour les imprévus." },
            { title: "Des rôles clairs", text: "chacun sait ce qu'il tient, la nuit même." },
            { title: "La sécurité d'abord", text: "jauge respectée, dispositif dimensionné, jamais négociée." },
            { title: "Un bilan après", text: "chiffres réels partagés à l'équipe, pour faire mieux la fois suivante." },
          ],
        },
      ],
    },
    {
      id: "close",
      variant: "section",
      kicker: "Candidature",
      title: "Pôle Événementiel — et présidence si besoin",
      blocks: [
        {
          type: "lead",
          text: "Je ne prétends pas tout savoir : j'ai surtout appris en me trompant, tard le soir, avec une équipe patiente. Ce que je peux promettre, c'est le travail et la rigueur.",
        },
        { type: "quote", text: "Mind and Hand — le planifier sur le papier, puis rester à la porte jusqu'à ce que ça marche." },
      ],
      footer: "Merci — Juan Ignacio Ramos",
    },
  ],
};
