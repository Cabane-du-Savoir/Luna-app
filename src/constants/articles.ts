import { Article } from '../types/data';

export const HEALTH_FREE_CATEGORIES = [
  'TOILETTE',
  'ODEURS',
  'RASAGE',
  'DEMANGEAISONS',
  'DOULEURS',
];

export const LOCKED_BONUS_CATEGORIES = ['RECETTES', 'THEMES'];

export const articlesData: Article[] = [
  // TOILETTE (100% Gratuit)
  {
    id: 'toilette-intime-quotidienne',
    topic: 'TOILETTE',
    title: 'Toilette intime : les bons réflexes au quotidien',
    intro: 'Prendre soin de son anatomie sans perturber la flore protectrice naturelle.',
    language: 'FR',
    free: true,
    isLocked: false,
    image: '/photos/bain.png',
    steps: [
      {
        number: 1,
        title: 'Nettoie uniquement la vulve extérieure',
        body: 'Utilise de l’eau tiède ou un nettoyant doux sans savon au pH physiologique. Le vagin est un organe autonettoyant.',
      },
      {
        number: 2,
        title: 'Toujours de l’avant vers l’arrière',
        body: 'Ce geste simple évite de déplacer les bactéries de la zone anale vers l’urètre et le vagin, prévenant les infections urinaires.',
      },
      {
        number: 3,
        title: 'Séchage doux en tamponnant',
        body: 'Sèche avec une serviette en coton propre et sèche, sans frotter vigoureusement pour éviter toute irritation.',
      },
    ],
    avoid: 'Évite absolument les douches vaginales internes, les savons décapants, les bains moussants trop parfumés et les gants de toilette humides.',
  },

  // ODEURS (100% Gratuit)
  {
    id: 'comprendre-odeurs-intimes',
    topic: 'ODEURS',
    title: 'Odeurs intimes : ce qui est normal et ce qui alerte',
    intro: 'Chaque corps a sa propre signature olfactive naturelle.',
    language: 'FR',
    free: true,
    isLocked: false,
    image: '/photos/odeurs.png',
    steps: [
      {
        number: 1,
        title: 'Reconnaître l’odeur naturelle',
        body: 'Une légère odeur musquée ou acidulée est tout à fait saine et normale. Elle varie avec le cycle, l’alimentation et la transpiration.',
      },
      {
        number: 2,
        title: 'Privilégier le coton respirant',
        body: 'Les sous-vêtements en coton et les vêtements amples laissent respirer la zone intime et limitent la prolifération de germes.',
      },
      {
        number: 3,
        title: 'Repérer les signes anormaux',
        body: 'Une forte odeur de poisson, accompagnée de pertes verdâtres, grisâtres ou de démangeaisons indique souvent une vaginose ou mycose.',
      },
    ],
    avoid: 'N’utilise jamais de déodorants intimes, de parfums ou de lingettes parfumées. Ils masquent les symptômes et causent des réactions allergiques.',
  },

  // RASAGE (100% Gratuit)
  {
    id: 'prevenir-boutons-rasage',
    topic: 'RASAGE',
    title: 'Rasage et épilation : éviter coupures et poils incarnés',
    intro: 'Des étapes claires pour préserver la douceur de la peau sensible du maillot.',
    language: 'FR',
    free: true,
    isLocked: false,
    image: '/photos/rasage.png',
    steps: [
      {
        number: 1,
        title: 'Prépare la peau sous l’eau tiède',
        body: 'La chaleur assouplit les poils et dilate les pores. Réalise un gommage très doux la veille pour libérer les poils incarnés.',
      },
      {
        number: 2,
        title: 'Lame neuve et sens du poil',
        body: 'Utilise un rasoir propre, bien affûté, avec une crème de rasage hydratante. Rase toujours dans le sens de pousse du poil.',
      },
      {
        number: 3,
        title: 'Hydratation post-rasage apaisante',
        body: 'Rince à l’eau fraîche pour calmer la peau, puis applique un gel pur d’aloe vera ou une crème sans alcool ni parfum.',
      },
    ],
    avoid: 'Ne passe pas plusieurs fois sur la même zone sans mousse et ne partage jamais ton rasoir.',
  },

  // DEMANGEAISONS (100% Gratuit)
  {
    id: 'soulager-demangeaisons-intimes',
    topic: 'DEMANGEAISONS',
    title: 'Démangeaisons intimes : causes et premiers gestes',
    intro: 'Calmer les sensations désagréables sans aggraver la situation.',
    language: 'FR',
    free: true,
    isLocked: false,
    image: '/photos/demangeaisons.png',
    steps: [
      {
        number: 1,
        title: 'Identifier les déclencheurs courants',
        body: 'Une lessive trop parfumée, un protège-slip quotidien, un maillot synthétique ou une mycose peuvent provoquer des démangeaisons.',
      },
      {
        number: 2,
        title: 'Soulager avec une compresse fraîche',
        body: 'Applique une compresse d’eau fraîche pour calmer l’inflammation sans gratter, ce qui risquerait de créer des microlésions.',
      },
      {
        number: 3,
        title: 'Consulter si cela dure plus de 48h',
        body: 'Si les démangeaisons s’accompagnent de pertes blanches grumeleuses (comme du lait caillé) ou de brûlures en urinant, consulte un médecin.',
      },
    ],
    avoid: 'Ne gratte pas et n’applique pas de crèmes antifongiques ou de remèdes de grand-mère sans confirmation médicale.',
  },

  // DOULEURS (100% Gratuit)
  {
    id: 'soulager-douleurs-regles',
    topic: 'DOULEURS',
    title: 'Crampes menstruelles : solutions douces et efficaces',
    intro: 'Des méthodes prouvées pour apaiser les contractions utérines douloureuses.',
    language: 'FR',
    free: true,
    isLocked: false,
    image: '/photos/exercices.png',
    steps: [
      {
        number: 1,
        title: 'Applique de la chaleur douce',
        body: 'Une bouillotte posée sur le bas-ventre ou le bas du dos détend les muscles de l’utérus et réduit la douleur aussi vite qu’un antalgique.',
      },
      {
        number: 2,
        title: 'Tisanes anti-inflammatoires',
        body: 'La camomille, le gingembre et la feuille de framboisier possèdent des propriétés relaxantes pour le système reproducteur.',
      },
      {
        number: 3,
        title: 'Étirements doux du bassin',
        body: 'La posture de l’enfant ou des torsions légères soulagent les tensions du bas du dos et du périnée.',
      },
    ],
    avoid: 'Des douleurs intenses qui t’empêchent de marcher, d’étudier ou qui résistent aux antalgiques doivent être explorées (recherche d’endométriose).',
  },

  // RECETTES (Bonus Premium Lock)
  {
    id: 'recettes-tisanes-cycle',
    topic: 'RECETTES',
    title: 'Recettes d’élixirs bien-être pour chaque phase',
    intro: 'Infusions et smoothies riches en magnésium et antioxydants pour équilibrer son énergie.',
    language: 'FR',
    free: false,
    isLocked: true,
    image: '/photos/cycle.png',
    steps: [
      {
        number: 1,
        title: 'L’élixir doré anti-crampes',
        body: 'Lait végétal tiède, curcuma, une pincée de poivre noir et miel bio. À consommer la veille des menstruations.',
      },
      {
        number: 2,
        title: 'Le smoothie riche en fer & vitamine C',
        body: 'Épinards frais, banane mûre, graines de chia et jus d’orange pressé pour stimuler la vitalité.',
      },
    ],
    avoid: 'Ce contenu bonus fait partie du pack de soutien Luna.',
  },

  // THEMES (Bonus Premium Lock)
  {
    id: 'themes-visuels-personnalises',
    topic: 'THEMES',
    title: 'Thèmes & Ambiances : Personnaliser ton expérience',
    intro: 'Débloque les palettes de couleurs pastel, florales et nocturnes pour ton application.',
    language: 'FR',
    free: false,
    isLocked: true,
    image: '/photos/header.png',
    steps: [
      {
        number: 1,
        title: 'Harmonies douces',
        body: 'Choisis parmi 5 ambiances chromatiques apaisantes créées pour le repos des yeux.',
      },
    ],
    avoid: 'Option esthétique réservée aux contributrices Luna.',
  },
];
