import { Article } from '../types/data';

export const articlesData: Article[] = [
  {
    id: 'hygiene-apres-rapport',
    topic: 'Rapports',
    title: 'Après un rapport : les gestes simples',
    intro: 'Des gestes doux pour le confort intime après un rapport sexuel.',
    language: 'FR',
    free: true,
    image: 'rapports',
    steps: [
      {
        number: 1,
        title: 'Urine si tu en ressens le besoin',
        body: 'Uriner après un rapport peut aider à évacuer les bactéries proches de l’urètre et peut réduire le risque d’infection urinaire chez certaines personnes.',
      },
      {
        number: 2,
        title: 'Lave seulement l’extérieur',
        body: 'Rince la vulve à l’eau tiède et sèche en tamponnant avec une serviette propre. Le vagin se nettoie naturellement: aucun lavage interne n’est nécessaire.',
      },
      {
        number: 3,
        title: 'Observe ton confort',
        body: 'Une douleur, des brûlures, des saignements inhabituels ou une odeur forte qui persistent méritent l’avis d’un professionnel de santé.',
      },
    ],
    avoid: 'Évite les douches vaginales, sprays parfumés et savons agressifs après un rapport: ils peuvent irriter et déséquilibrer la flore vaginale.',
  },
  {
    id: 'alimentation-regles',
    topic: 'Alimentation',
    title: 'Fruits et règles : ce qui aide vraiment',
    intro: 'Aucun fruit ne déclenche ni n’augmente les menstruations. Une alimentation variée peut toutefois soutenir ton énergie et ton confort.',
    language: 'FR',
    free: true,
    image: 'alimentation',
    steps: [
      {
        number: 1,
        title: 'Mange varié et hydrate-toi',
        body: 'Fruits, légumes, céréales complètes, protéines et eau aident à couvrir tes besoins. Choisis les aliments que tu digères bien pendant tes règles.',
      },
      {
        number: 2,
        title: 'Pense au fer',
        body: 'En cas de règles abondantes, privilégie des aliments riches en fer comme les lentilles, haricots, oeufs, viande ou légumes verts. Un fruit riche en vitamine C peut aider l’absorption du fer végétal.',
      },
      {
        number: 3,
        title: 'Écoute tes symptômes',
        body: 'Un flux très abondant, des vertiges, une fatigue intense ou des douleurs qui empêchent tes activités doivent être discutés avec un professionnel de santé.',
      },
    ],
    avoid: 'Ne compte pas sur un aliment ou une boisson pour faire venir les règles. En cas de retard inhabituel ou de risque de grossesse, fais un test et demande conseil si besoin.',
  },
  {
    id: 'prevenir-difficultes-menstruelles',
    topic: 'Prévention',
    title: 'Prévenir les difficultés liées aux règles',
    intro: 'Quelques habitudes pour mieux anticiper les règles et savoir quand demander de l’aide.',
    language: 'FR',
    free: true,
    image: 'prevention',
    steps: [
      {
        number: 1,
        title: 'Note ton cycle et tes symptômes',
        body: 'Enregistre les dates, le flux, les douleurs et l’humeur. Ces informations aident à reconnaître ton fonctionnement habituel et à préparer un rendez-vous médical si nécessaire.',
      },
      {
        number: 2,
        title: 'Prépare ton confort',
        body: 'Garde les protections qui te conviennent, une bouillotte et de l’eau à disposition. Dormir suffisamment et bouger doucement peut aussi aider certaines personnes.',
      },
      {
        number: 3,
        title: 'Connais les signaux importants',
        body: 'Consulte en cas de douleur nouvelle ou très forte, de saignements très abondants, de malaise, de fièvre, ou si tes cycles changent beaucoup sans explication.',
      },
    ],
    avoid: 'Ne banalise pas une douleur invalidante ou un saignement qui t’inquiète. Un professionnel de santé peut rechercher une cause et proposer une solution adaptée.',
  },
  {
    id: 'toilette-intime',
    topic: 'Toilette',
    title: 'Toilette intime : les bonnes pratiques',
    intro: 'Apprends les gestes simples et sûrs pour prendre soin de ta zone intime au quotidien.',
    language: 'FR',
    free: true,
    image: 'toilette',
    steps: [
      {
        number: 1,
        title: 'Utilise de l\'eau tiède',
        body: 'Lave-toi avec de l\'eau tiède et un savon doux spécialisé ou tout simplement de l\'eau. Évite les savons agressifs qui peuvent perturber ton équilibre naturel.',
      },
      {
        number: 2,
        title: 'Privilégie le savon doux',
        body: 'Si tu utilises un savon, choisis un produit sans parfum, hypoallergénique et à pH neutre. Les savons ordinaires peuvent être trop agressifs pour cette zone sensible.',
      },
      {
        number: 3,
        title: 'Lave-toi avant et après les relations',
        body: 'Une bonne hygiène avant et après les relations sexuelles aide à prévenir les infections. C\'est une pratique simple mais importante pour ta santé.',
      },
      {
        number: 4,
        title: 'Sèche-toi bien',
        body: 'Après le lavage, sèche-toi doucement avec une serviette propre. L\'humidité peut favoriser la croissance de bactéries indésirables.',
      },
    ],
    avoid: 'Ne douche jamais l\'intérieur du vagin (douche vaginale). Ton corps s\'auto-nettoie naturellement. Les douches vaginales peuvent perturber l\'équilibre bactérien et causer des infections.',
  },
  {
    id: 'prevenir-odeurs',
    topic: 'Odeurs',
    title: 'Prévenir les odeurs naturellement',
    intro: 'Comprendre et gérer les odeurs intimes avec des solutions naturelles et efficaces.',
    language: 'FR',
    free: true,
    image: 'odeurs',
    steps: [
      {
        number: 1,
        title: 'Les odeurs sont normales',
        body: 'Chaque femme a une odeur intime unique qui varie selon le cycle hormonal, l\'alimentation et le niveau d\'activité physique. C\'est parfaitement normal et sain.',
      },
      {
        number: 2,
        title: 'Maintiens une bonne hygiène',
        body: 'Lave-toi régulièrement avec de l\'eau tiède et un savon doux. Cela suffit généralement à maintenir une bonne hygiène et à limiter les odeurs.',
      },
      {
        number: 3,
        title: 'Porte des sous-vêtements en coton',
        body: 'Le coton permet une meilleure circulation de l\'air. Évite les tissus synthétiques qui piègent l\'humidité et favorisent la croissance bactérienne.',
      },
      {
        number: 4,
        title: 'Hydrate-toi bien',
        body: 'Boire suffisamment d\'eau aide à diluer l\'urine et à maintenir un pH équilibré. Une bonne hydratation contribue également à une odeur plus neutre.',
      },
      {
        number: 5,
        title: 'Évite les facteurs qui amplifient les odeurs',
        body: 'Le stress, la transpiration excessive et une hygiène insuffisante peuvent amplifier les odeurs. Gère ton stress et donne-toi le temps de bien prendre soin de toi.',
      },
    ],
    avoid: 'N\'utilise pas de spray désodorisant intime ou de douche vaginale. Ces produits peuvent perturber l\'équilibre bactérien naturel et créer davantage de problèmes. Si une odeur très désagréable persiste, consulte un professionnel de santé.',
  },
  {
    id: 'rasage-sans-irritation',
    topic: 'Rasage',
    title: 'Rasage sans irritation : guide complet',
    intro: 'Apprends à te raser en douceur et à éviter les irritations et les rougeurs.',
    language: 'FR',
    free: false,
    image: 'rasage',
    steps: [
      {
        number: 1,
        title: 'Prépare ta peau',
        body: 'Lave la zone avec de l\'eau tiède et un savon doux. Une peau propre et humide se rase plus facilement. Certaines femmes aiment faire un léger gommage avant le rasage.',
      },
      {
        number: 2,
        title: 'Utilise une mousse ou un gel',
        body: 'Applique une mousse ou un gel de rasage spécialement formulé pour les zones sensibles. Cela réduit la friction et limite l\'irritation. Laisse agir quelques minutes pour ramollir les poils.',
      },
      {
        number: 3,
        title: 'Rase-toi avec des gestes lents et doux',
        body: 'Utilise un rasoir à plusieurs lames en bon état. Rase-toi lentement, en suivant la direction du poil, sans appuyer. Rince la lame régulièrement.',
      },
      {
        number: 4,
        title: 'Hydrate et protège après le rasage',
        body: 'Sèche-toi doucement et applique une crème ou un baume apaisant. L\'aloe vera ou une crème sans parfum calment l\'irritation. Évite les produits avec alcool qui assèchent la peau.',
      },
    ],
    avoid: 'Évite les rasoirs émoussés qui irritent la peau et causent des poils incarnés. N\'rase jamais sur une peau sèche. Ne rase pas trop souvent ; laisse quelques jours entre les rasages pour permettre à la peau de récupérer.',
  },
  {
    id: 'demangeaisons-intimes',
    topic: 'Démangeaisons',
    title: 'Gérer les démangeaisons intimes',
    intro: 'Comprendre les causes des démangeaisons et des solutions pour retrouver le confort.',
    language: 'FR',
    free: false,
    image: 'demangeaisons',
    steps: [
      {
        number: 1,
        title: 'Identifie la cause',
        body: 'Les démangeaisons peuvent être dues à des irritants (savons agressifs, tissus synthétiques), une infection fongique, une allergie, ou un déséquilibre du pH. Observe quand les démangeaisons apparaissent.',
      },
      {
        number: 2,
        title: 'Lave-toi doucement',
        body: 'Utilise uniquement de l\'eau tiède ou un savon très doux. Évite de gratter qui aggrave l\'irritation. Sèche-toi complètement mais doucement avec une serviette propre.',
      },
      {
        number: 3,
        title: 'Porte des vêtements appropriés',
        body: 'Choisis des sous-vêtements en coton et des pantalons amples. Les tissus synthétiques et les vêtements trop serrés piègent l\'humidité et favorisent les démangeaisons.',
      },
      {
        number: 4,
        title: 'Apaise avec des traitements naturels',
        body: 'L\'aloe vera, l\'huile de coco ou un bain tiède peuvent aider. Cependant, si les démangeaisons persistent plus de quelques jours, consulte un professionnel de santé.',
      },
    ],
    avoid: 'N\'utilise pas de crèmes ou de produits sans avis médical. Ne gratte pas, même si c\'est tentant. N\'utilise pas de spray ou de poudre. Si tu as une infection fongique diagnostiquée, évite les relations sexuelles jusqu\'à la fin du traitement.',
  },
  {
    id: 'exercices-douleurs',
    topic: 'Exercices',
    title: 'Exercices pour soulager les douleurs menstruelles',
    intro: 'Découvre des exercices doux et efficaces pour réduire les crampes et les douleurs.',
    language: 'FR',
    free: false,
    image: 'exercices',
    steps: [
      {
        number: 1,
        title: 'Marche légère',
        body: 'La marche est un excellent exercice doux pendant les règles. Elle améliore la circulation, réduit les crampes et aide à libérer des endorphines naturelles qui soulagent la douleur.',
      },
      {
        number: 2,
        title: 'Étirements doux',
        body: 'Des étirements légers des jambes, du dos et de l\'abdomen peuvent aider à relâcher les tensions musculaires. Étire-toi lentement et reste chaque position 20-30 secondes.',
      },
      {
        number: 3,
        title: 'Yoga doux',
        body: 'Des poses de yoga comme l\'enfant, le papillon, ou la torsion allongée sont excellentes pour soulager les crampes. Elles calment aussi le système nerveux et réduisent le stress.',
      },
      {
        number: 4,
        title: 'Nage ou eau chaude',
        body: 'La natation (l\'eau chaude surtout) aide à soulager les crampes. Tu peux aussi prendre un bain chaud ou utiliser une bouillotte sur l\'abdomen pendant 15-20 minutes.',
      },
      {
        number: 5,
        title: 'Évite les efforts intensifs',
        body: 'Pendant les deux premiers jours, évite les exercices intenses comme la course ou la musculation. Tu peux reprendre graduellement selon ton confort.',
      },
    ],
    avoid: 'Ne fais pas d\'exercices à haute intensité les deux premiers jours de tes règles. Évite les sports de contact ou les activités qui compriment l\'abdomen. Si une douleur est insupportable, repose-toi et consulte un professionnel de santé.',
  },
];

// Helper to get article by ID
export const getArticleById = (id: string): Article | undefined => {
  return articlesData.find(article => article.id === id);
};

// Helper to get articles by topic
export const getArticlesByTopic = (topic: string): Article[] => {
  if (topic === 'Tout') return articlesData;
  return articlesData.filter(article => article.topic === topic);
};

// Helper to get free articles
export const getFreeArticles = (): Article[] => {
  return articlesData.filter(article => article.free);
};

// Helper to get locked articles
export const getLockedArticles = (): Article[] => {
  return articlesData.filter(article => !article.free);
};
