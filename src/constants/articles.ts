import { Article } from '../types/data';

export const HEALTH_FREE_CATEGORIES = [
  'TOILETTE',
  'ODEURS',
  'RASAGE',
  'DEMANGEAISONS',
  'DOULEURS',
  'CYCLE',
];

export const LOCKED_BONUS_CATEGORIES = ['RECETTES', 'THEMES'];

export const articlesData: Article[] = [
  // ==========================================
  // LES 8 ASTUCES & GUIDES BASIQUES GRATUITS (SANS CADENAS)
  // ==========================================

  // 1. TOILETTE (Basique Gratuit 1/8)
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

  // 2. ODEURS (Basique Gratuit 2/8)
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

  // 3. RASAGE (Basique Gratuit 3/8)
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

  // 4. DEMANGEAISONS (Basique Gratuit 4/8)
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

  // 5. DOULEURS (Basique Gratuit 5/8)
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

  // 6. FONDAMENTAUX DU CYCLE (Basique Gratuit 6/8)
  {
    id: 'ce-que-beaucoup-ignorent-menstruations',
    topic: 'CYCLE',
    title: 'Les 4 secrets des menstruations que beaucoup ignorent',
    intro: 'Phases, couleurs, textures et douleurs : tout ce qu’il faut savoir pour comprendre son corps sans fausses croyances.',
    language: 'FR',
    free: true,
    isLocked: false,
    image: '/photos/cycle.png',
    steps: [
      {
        number: 1,
        title: 'Le cycle ne se résume pas aux règles',
        body: 'Le cycle compte 4 phases distinctes (menstruelle, folliculaire, ovulatoire et lutéale). Chacune modifie l’énergie, l’humeur et les besoins métaboliques.',
      },
      {
        number: 2,
        title: 'Couleur et texture varient naturellement',
        body: 'Du rouge vif au marron foncé (vieux sang oxydé), toute cette palette est normale. De petits caillots occasionnels sont fréquents et liés aux fluctuations hormonales.',
      },
      {
        number: 3,
        title: 'Les douleurs invalidantes ne sont pas normales',
        body: 'Avoir de légers tiraillements est fréquent, mais des douleurs qui empêchent de vivre normalement signalent souvent une dysménorrhée ou une affection (comme l’endométriose) à consulter.',
      },
      {
        number: 4,
        title: 'Lien direct avec alimentation et hydratation',
        body: 'Ce que l’on mange influence directement l’intensité des crampes. Le manque d’eau accentue paradoxalement la rétention d’eau et les ballonnements.',
      },
    ],
    avoid: 'Ne t’impose pas un rythme effréné lorsque ton corps demande du repos, et ne normalise jamais des crampes qui te clouent au lit sans avis soignant.',
  },

  // 7. ASTUCES MAISON FACILES (Basique Gratuit 7/8)
  {
    id: 'astuces-maison-regles-faciles',
    topic: 'DOULEURS',
    title: 'Astuces simples, maison et applicables facilement',
    intro: 'Bouillotte chaude, gingembre frais, magnésium et hygiène douce pour soulager les inconforts du quotidien.',
    language: 'FR',
    free: true,
    isLocked: false,
    image: '/photos/protections.png',
    steps: [
      {
        number: 1,
        title: 'La bouillotte chaude sur le bas-ventre',
        body: 'Appliquer une source de chaleur (bouillotte tiède ou linge chaud) sur le bas-ventre ou le bas du dos détend les muscles utérins et bloque les signaux de douleur vers le cerveau.',
      },
      {
        number: 2,
        title: 'L’infusion de gingembre frais',
        body: 'Couper quelques rondelles de gingembre frais, infuser 10 minutes dans de l’eau chaude et boire. Ses puissants principes anti-inflammatoires calment la sévérité des spasmes.',
      },
      {
        number: 3,
        title: 'Eau à température ambiante & magnésium',
        body: 'Boire abondamment de l’eau tempérée aide à évacuer l’excès d’eau stocké. Consommer du magnésium et du potassium (chocolat noir, bananes) détend les fibres nerveuses.',
      },
      {
        number: 4,
        title: 'Hygiène douce à l’eau claire et coton',
        body: 'Toilette externe uniquement à l’eau claire, sans savons agressifs. Porter des sous-vêtements en coton aérés pour laisser respirer la peau la nuit.',
      },
    ],
    avoid: 'Évite les poches de glace sur le ventre durant les crampes, les boissons gazeuses très froides et les vêtements compressifs.',
  },

  // 8. MICROBIOTE VAGINAL (Basique Gratuit 8/8)
  {
    id: 'microbiote-vaginal-protecteur',
    topic: 'TOILETTE',
    title: 'Le rôle protecteur et fragile du microbiote vaginal',
    intro: 'Comprendre la flore protectrice naturelle (lactobacilles) et apprendre à la préserver sans perturber son équilibre.',
    language: 'FR',
    free: true,
    isLocked: false,
    image: '/photos/premieres.png',
    steps: [
      {
        number: 1,
        title: 'Un bouclier vivant naturel',
        body: 'La zone intime possède sa propre flore composée en majorité de lactobacilles. Ce film protecteur maintient un pH acide hostile aux mauvaises bactéries et champignons.',
      },
      {
        number: 2,
        title: 'Astuce maison : lavage externe à l’eau tiède',
        body: 'Bannis les gels douches parfumés et lingettes chimiques. Lave l’extérieur uniquement à l’eau tiède ou avec un savon surgras neutre sans parfum si nécessaire.',
      },
      {
        number: 3,
        title: 'Laisser respirer la peau',
        body: 'Privilégie les sous-vêtements 100% coton. Évite de garder des maillots de bain mouillés ou des protège-slips en permanence qui favorisent la macération.',
      },
    ],
    avoid: 'Ne réalise jamais de douches vaginales internes : l’intérieur du vagin s’auto-nettoie seul et la douche détruit instantanément les lactobacilles.',
  },

  // ==========================================
  // LES 13 GUIDES APPROFONDIS & BONUS (AVEC CADENAS PREMIUM)
  // ==========================================

  // 9. PHASE LUTÉALE (Locked)
  {
    id: 'phase-luteale-fluctuations-energie',
    topic: 'CYCLE',
    title: 'Comprendre la phase lutéale et ses fluctuations d’énergie',
    intro: 'Souvent appelée phase prémenstruelle, cette période entre ovulation et règles demande d’apprendre à ralentir.',
    language: 'FR',
    free: false,
    isLocked: true,
    image: '/photos/phase_luteale.jpg',
    steps: [
      {
        number: 1,
        title: 'Le ralentissement biologique du corps',
        body: 'La progestérone augmente puis chute. Cette variation entraîne une baisse naturelle d’énergie et une sensibilité émotionnelle accrue. Ce n’est pas de la paresse, c’est physiologique.',
      },
      {
        number: 2,
        title: 'Astuce maison : le ralentissement intentionnel',
        body: 'Allège ton agenda de 20% durant ces quelques jours. Privilégie des marches douces et accorde-toi des pauses de calme sans culpabiliser.',
      },
    ],
    avoid: 'Ne planifie pas des épreuves physiques intenses ou des journées surchargées lorsque ta phase lutéale arrive à son terme.',
  },

  // 10. FRINGALES & CYCLE (Locked)
  {
    id: 'gerer-fringales-seconde-moitie-cycle',
    topic: 'ALIMENTATION',
    title: 'Gérer les fringales de la seconde moitié du cycle',
    intro: 'Pourquoi le besoin de sucre explose avant les règles et comment y répondre intelligemment.',
    language: 'FR',
    free: false,
    isLocked: true,
    image: '/photos/fringales.jpg',
    steps: [
      {
        number: 1,
        title: 'La chute de sérotonine et le métabolisme',
        body: 'Juste avant les règles, le métabolisme de base s’accélère légèrement et la sérotonine diminue, déclenchant des envies de glucides pour compenser.',
      },
      {
        number: 2,
        title: 'Astuce maison : les alternatives intelligentes',
        body: 'Un carré de chocolat noir riche en magnésium avec une poignée d’amandes ou de fruits secs stabilise la glycémie et apaise la fringale sans pic d’insuline.',
      },
    ],
    avoid: 'Ne saute pas de repas pour compenser, cela aggrave les fringales compulsives en fin de journée.',
  },

  // 11. SOMMEIL ET CYCLE (Locked)
  {
    id: 'sommeil-et-cycle-menstruel',
    topic: 'BIEN-ÊTRE',
    title: 'Sommeil et cycle menstruel : pourquoi est-il perturbé ?',
    intro: 'Comprendre l’impact thermique de la progestérone sur les nuits prémenstruelles.',
    language: 'FR',
    free: false,
    isLocked: true,
    image: '/photos/sommeil.jpg',
    steps: [
      {
        number: 1,
        title: 'La température corporelle qui s’élève',
        body: 'La baisse de progestérone combinée à une température corporelle basale légèrement plus haute gêne l’endormissement et altère les cycles de sommeil profond.',
      },
      {
        number: 2,
        title: 'Astuce maison : la bulle de fraîcheur',
        body: 'Aère ta chambre 10 minutes avant de dormir, privilégie une couverture respirante et bois une infusion tiède à la camomille ou à la mélisse.',
      },
    ],
    avoid: 'Évite les écrans bleus 1h avant le coucher et ne prends pas de caféine après 14h.',
  },

  // 12. GLAIRE CERVICALE (Locked)
  {
    id: 'vrai-visage-glaire-cervicale',
    topic: 'CYCLE',
    title: 'Le vrai visage de la glaire cervicale',
    intro: 'Observer ses sécrétions naturelles : le meilleur baromètre de la santé hormonale.',
    language: 'FR',
    free: false,
    isLocked: true,
    image: '/photos/glaire.jpg',
    steps: [
      {
        number: 1,
        title: 'Un indicateur de fertilité et de vitalité',
        body: 'La glaire cervicale évolue tout au long du cycle : sèche après les règles, crémeuse puis filante et transparente comme du blanc d’œuf à l’approche de l’ovulation.',
      },
      {
        number: 2,
        title: 'Astuce maison : observation sans tabou',
        body: 'Observe sur le papier toilette la texture et l’élasticité de tes pertes. Noter ces repères dans ton Journal Luna t’aide à anticiper tes dates clés.',
      },
    ],
    avoid: 'Ne confonds pas des pertes physiologiques translucides saines avec une infection nécessitant un traitement.',
  },

  // 13. STRESS CHRONIQUE & CYCLE (Locked)
  {
    id: 'impact-stress-chronique-cycle',
    topic: 'BIEN-ÊTRE',
    title: 'L’impact du stress chronique sur la régularité du cycle',
    intro: 'Comment le cortisol interfère avec la progestérone et peut retarder les règles.',
    language: 'FR',
    free: false,
    isLocked: true,
    image: '/photos/stress.jpg',
    steps: [
      {
        number: 1,
        title: 'La compétition biologique cortisol/progestérone',
        body: 'Le cortisol (hormone de stress) et la progestérone partagent la même molécule souche. En stress continu, le corps privilégie la survie et met l’ovulation en pause.',
      },
      {
        number: 2,
        title: 'Astuce maison : la cohérence cardiaque 5/5',
        body: 'Inspire 5 secondes par le nez, expire 5 secondes par la bouche pendant 5 minutes, 2 fois par jour. Cela abaisse immédiatement la tension nerveuse.',
      },
    ],
    avoid: 'Ne t’inquiète pas immédiatement en cas de retard de règles de quelques jours après une période d’examens ou de choc émotionnel intense.',
  },

  // 14. SENSIBILITÉ DES SEINS (Locked)
  {
    id: 'soulager-sensibilite-seins-avant-regles',
    topic: 'DOULEURS',
    title: 'Soulager la sensibilité des seins avant les règles',
    intro: 'Comprendre la tension mammaire due à la rétention d’eau et la désamorcer.',
    language: 'FR',
    free: false,
    isLocked: true,
    image: '/photos/sensibilite_seins.jpg',
    steps: [
      {
        number: 1,
        title: 'Rétention d’eau et œdème des tissus',
        body: 'Sous l’effet des œstrogènes et de la baisse de progestérone, les canaux galactophores gonflent légèrement et accumulent du liquide, créant une tension douloureuse.',
      },
      {
        number: 2,
        title: 'Astuce maison : réduire sel et caféine',
        body: 'Diminue le sel et le café 10 jours avant les règles pour limiter la rétention. Applique des compresses fraîches et porte un soutien-gorge souple sans armatures.',
      },
    ],
    avoid: 'Évite les soutiens-gorge trop serrés ou avec armatures rigides qui compriment la circulation lymphatique.',
  },

  // 15. SOIN DE LA PEAU (Locked)
  {
    id: 'soin-peau-selon-phases-cycle',
    topic: 'BEAUTÉ',
    title: 'Prendre soin de sa peau de l’intérieur selon ses phases',
    intro: 'Adapter ses soins et son hydratation aux fluctuations du sébum.',
    language: 'FR',
    free: false,
    isLocked: true,
    image: '/photos/soin_peau.jpg',
    steps: [
      {
        number: 1,
        title: 'Pores, sébum et récepteurs hormonaux',
        body: 'Durant la phase lutéale, la chute des œstrogènes laisse les androgènes stimuler les glandes sébacées, favorisant petits boutons et excès de sébum sur la zone T.',
      },
      {
        number: 2,
        title: 'Astuce maison : eau citronnée tiède au réveil',
        body: 'Boire un verre d’eau tiède avec un filet de citron le matin à jeun soutient le foie dans l’élimination des métabolites hormonaux usagés.',
      },
    ],
    avoid: 'Ne triture pas les boutons hormonaux du menton, cela favorise les cicatrices pigmentaires tenaces.',
  },

  // 16. ANÉMIE & RÈGLES ABONDANTES (Locked)
  {
    id: 'anemie-cachee-fatigue-regles-abondantes',
    topic: 'SANTÉ',
    title: 'L’anémie cachée : repérer la fatigue liée aux règles abondantes',
    intro: 'Distinguer la simple fatigue du déficit en fer causé par des flux importants.',
    language: 'FR',
    free: false,
    isLocked: true,
    image: '/photos/anemie.jpg',
    steps: [
      {
        number: 1,
        title: 'Pertes de fer et signaux d’alerte',
        body: 'Un flux très abondant (changer de protection toutes les heures, caillots de plus de 2 cm) peut vider les réserves de ferritine, provoquant vertiges et pâleur.',
      },
      {
        number: 2,
        title: 'Astuce maison : fer végétal + vitamine C',
        body: 'Associe systématiquement tes aliments riches en fer (lentilles, haricots, épinards) à de la vitamine C (jus de citron pressé, orange) pour tripler l’absorption.',
      },
    ],
    avoid: 'Ne bois pas de thé noir ou café pendant les repas car les tanins bloquent l’absorption du fer.',
  },

  // 17. POSTURE & LOMBAIRES (Locked)
  {
    id: 'posture-douleurs-lombaires-regles',
    topic: 'DOULEURS',
    title: 'L’importance de la posture pour atténuer les douleurs lombaires',
    intro: 'Déverrouiller le bas du dos quand les contractions utérines irradient vers l’arrière.',
    language: 'FR',
    free: false,
    isLocked: true,
    image: '/photos/posture_dos.jpg',
    steps: [
      {
        number: 1,
        title: 'Irradiation nerveuse vers le sacrum',
        body: 'Les ligaments utéro-sacrés tirent directement sur le bas du dos lors des contractions. Rester assis sans bouger accentue cette compression lombaire.',
      },
      {
        number: 2,
        title: 'Astuce maison : la posture de l’enfant (Balasana)',
        body: 'À genoux, écarte légèrement les cuisses, assieds-toi sur les talons et allonge les bras loin devant sur le sol en respirant profondément 2 minutes dans le bas du dos.',
      },
    ],
    avoid: 'Évite de rester voûtée en avant sur une chaise toute la journée sans pause de mouvement.',
  },

  // 18. VENTRE GONFLÉ & BALLONNEMENTS (Locked)
  {
    id: 'ventre-gonfle-ballonnements-hormonaux',
    topic: 'BIEN-ÊTRE',
    title: 'Ventre gonflé : distinguer prise de poids et ballonnements hormonaux',
    intro: 'Pourquoi le ventre double de volume avant les règles et comment le dégonfler.',
    language: 'FR',
    free: false,
    isLocked: true,
    image: '/photos/massage_ventre.jpg',
    steps: [
      {
        number: 1,
        title: 'Le transit ralenti par la progestérone',
        body: 'La progestérone détend tous les muscles lisses, y compris les intestins. La digestion ralentit, stockant de l’eau et des gaz temporaires qui disparaissent aux règles.',
      },
      {
        number: 2,
        title: 'Astuce maison : massage doux circulaire',
        body: 'Masse ton ventre dans le sens des aiguilles d’une montre avec une huile végétale neutre le soir pour relancer le péristaltisme et chasser les gaz intestinaux.',
      },
    ],
    avoid: 'Ne te pèse pas juste avant tes règles : la balance affichera 1 à 2 kg d’eau temporaires sans aucun rapport avec la masse grasse.',
  },

  // 19. HIVER HORMONAL (Locked)
  {
    id: 'vitalite-hiver-hormonal-regles',
    topic: 'CYCLE',
    title: 'Préserver sa vitalité pendant l’hiver hormonal (les règles)',
    intro: 'Accueillir les premiers jours de règles comme une phase de régénération naturelle.',
    language: 'FR',
    free: false,
    isLocked: true,
    image: '/photos/hiver_vitalite.jpg',
    steps: [
      {
        number: 1,
        title: 'L’énergie au niveau de repos biologique',
        body: 'Les hormones sont à leur niveau le plus bas du mois. Forcer le même rendement que lors de l’ovulation épuise les réserves surrénales.',
      },
      {
        number: 2,
        title: 'Astuce maison : la pause minérale chaude',
        body: 'Offre-toi un bouillon de légumes chaud (carottes, céleri, oignons) pour réchauffer le ventre, reminéraliser le corps et compenser les pertes liquidiennes.',
      },
    ],
    avoid: 'Ne culpabilise pas de faire des siestes ou d’avoir besoin de 9h de sommeil au premier jour des règles.',
  },

  // 20. RECETTES (Bonus Premium Lock)
  {
    id: 'recettes-tisanes-cycle',
    topic: 'RECETTES',
    title: 'Recettes d’élixirs bien-être pour chaque phase',
    intro: 'Infusions et smoothies riches en magnésium et antioxydants pour équilibrer son énergie.',
    language: 'FR',
    free: false,
    isLocked: true,
    image: '/photos/elixir.jpg',
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

  // 21. THEMES (Bonus Premium Lock)
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
