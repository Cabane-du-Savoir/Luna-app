export interface DailyTip {
  id: string;
  phase: 'menstruation' | 'folliculaire' | 'ovulation' | 'luteale' | 'pre_regles' | string;
  jour_min: number;
  jour_max: number;
  categorie: string;
  titre: string;
  contenu: string;
  duree: string;
  isPremium: boolean;
}

export const allTips: DailyTip[] = [
  {
    id: "regles_j1_hydratation",
    phase: "menstruation",
    jour_min: 1,
    jour_max: 5,
    categorie: "Hydratation",
    titre: "J1-J3 : L'eau chaude est ton amie",
    contenu: "Pendant les règles, bois 1,5 à 2L d'eau par jour. Une eau tiède avec un peu de gingembre ou de thé peut aider à te sentir mieux au niveau du ventre. Évite les boissons très sucrées type Coca ce jour-là.",
    duree: "2 min",
    isPremium: false
  },
  {
    id: "regles_j2_alimentation",
    phase: "menstruation",
    jour_min: 1,
    jour_max: 5,
    categorie: "Alimentation",
    titre: "Tu perds du fer, on le compense",
    contenu: "Pendant les règles tu perds un peu de fer. Pense à manger : pondu, haricots, ndunda, petit poisson, foie une fois dans la semaine si tu peux. Ajoute un fruit comme orange ou mangue pour mieux absorber.",
    duree: "3 min",
    isPremium: false
  },
  {
    id: "regles_j3_mouvement",
    phase: "menstruation",
    jour_min: 1,
    jour_max: 5,
    categorie: "Mouvement",
    titre: "Pas besoin de forcer",
    contenu: "Les 2 premiers jours, pas de sport intense. Une marche de 15 minutes, des étirements doux du dos ou simplement t'allonger les genoux repliés peuvent soulager. Écoute ton corps.",
    duree: "2 min",
    isPremium: false
  },
  {
    id: "regles_j4_hygiene",
    phase: "menstruation",
    jour_min: 1,
    jour_max: 5,
    categorie: "Toilette intime",
    titre: "Hygiène pendant les règles",
    contenu: "Change ta serviette ou ton tissu toutes les 4 à 6h. Lave-toi à l'eau claire, de devant vers derrière. Il est normal de voir de petits caillots les 2 premiers jours. Si tu dois changer toutes les heures, parles-en à un soignant.",
    duree: "3 min",
    isPremium: false
  },
  {
    id: "folliculaire_j6_energie",
    phase: "folliculaire",
    jour_min: 6,
    jour_max: 13,
    categorie: "Energie",
    titre: "J6-J13 : Ton énergie revient",
    contenu: "Après les règles, beaucoup de filles se sentent plus légères et concentrées. C'est le bon moment pour tes révisions, le sport ou commencer un projet. Profites-en.",
    duree: "2 min",
    isPremium: false
  },
  {
    id: "folliculaire_j8_alimentation",
    phase: "folliculaire",
    jour_min: 6,
    jour_max: 13,
    categorie: "Alimentation",
    titre: "Mange frais et coloré",
    contenu: "Ton corps assimile bien cette semaine. Privilégie fruits, légumes, poisson, foufou en quantité raisonnable, matanga. Bois beaucoup d'eau. Ta peau sera aussi plus lumineuse.",
    duree: "2 min",
    isPremium: false
  },
  {
    id: "folliculaire_j10_mouvement",
    phase: "folliculaire",
    jour_min: 6,
    jour_max: 13,
    categorie: "Mouvement",
    titre: "C'est le moment de bouger",
    contenu: "Course légère, danse, corde à sauter 20 minutes. Ton endurance est meilleure. Si tu n'aimes pas le sport, marche rapide jusqu'à l'arrêt de bus suivant.",
    duree: "2 min",
    isPremium: false
  },
  {
    id: "ovulation_j14_pertes",
    phase: "ovulation",
    jour_min: 14,
    jour_max: 16,
    categorie: "Odeurs",
    titre: "Pertes transparentes qui filent ?",
    contenu: "Autour du milieu du cycle, tu peux voir des pertes blanches transparentes, qui s'étirent comme du blanc d'œuf. C'est normal, c'est le signe de l'ovulation. Ça dure 2 à 3 jours. Pas besoin de protège-slip parfumé.",
    duree: "3 min",
    isPremium: false
  },
  {
    id: "ovulation_j15_humeur",
    phase: "ovulation",
    jour_min: 14,
    jour_max: 16,
    categorie: "Humeur",
    titre: "Plus sensible ces jours-ci ?",
    contenu: "Certaines filles se sentent plus sensibles, ou ont plus d'envie. C'est lié aux hormones. C'est passager. Note ton humeur dans le Journal pour mieux te comprendre.",
    duree: "2 min",
    isPremium: false
  },
  {
    id: "ovulation_j14_fertilite",
    phase: "ovulation",
    jour_min: 14,
    jour_max: 16,
    categorie: "Cycle",
    titre: "Période fertile",
    contenu: "Si tu n'utilises pas de contraception, ces 3 jours autour de l'ovulation sont les jours où une grossesse est possible. Si tu as un doute, la section Questions est là, en anonyme. Ceci n'est pas une méthode contraceptive.",
    duree: "2 min",
    isPremium: false
  },
  {
    id: "luteale_j20_spm",
    phase: "luteale",
    jour_min: 17,
    jour_max: 28,
    categorie: "Douleurs",
    titre: "Seins sensibles, ventre gonflé ?",
    contenu: "C'est le SPM (syndrome prémenstruel). C'est fréquent : ballonnements, seins qui tirent, petite acné, irritabilité. Ce n'est pas dans ta tête. Dors 8h, marche 20 min.",
    duree: "3 min",
    isPremium: false
  },
  {
    "id": "luteale_j22_alimentation",
    phase: "luteale",
    jour_min: 17,
    jour_max: 28,
    categorie: "Alimentation",
    titre: "Envie de sucre avant les règles",
    contenu: "Envie de chocolat ou de foufou sucré ? Normal. Au lieu d'un paquet entier, mange un fruit (banane, mangue) + 2 carrés de chocolat noir ou une poignée d'arachides. Réduis un peu le sel et les cubes cette semaine, tu te sentiras moins gonflée.",
    duree: "3 min",
    isPremium: false
  },
  {
    id: "luteale_j24_mouvement",
    phase: "luteale",
    jour_min: 17,
    jour_max: 28,
    categorie: "Mouvement",
    titre: "Bouger pour moins de stress",
    contenu: "Même si tu es fatiguée, une marche lente de 20 minutes, de la danse douce à la maison ou des respirations profondes (inspire 4s, expire 6s) peuvent calmer l'irritabilité.",
    duree: "2 min",
    isPremium: false
  },
  {
    id: "pre_regles_j26_preparation",
    phase: "pre_regles",
    jour_min: 25,
    jour_max: 28,
    categorie: "Cycle",
    titre: "Tes règles arrivent dans 3 jours",
    contenu: "Prépare ton petit sac : 2 serviettes, un mouchoir, eau. C'est aussi le moment de noter dans le Journal comment tu te sens. Si tu as très mal chaque mois au point de ne pas aller à l'école, parles-en à une sage-femme.",
    duree: "2 min",
    isPremium: false
  }
];

/**
 * Logique dynamique de phase selon LUNA V1.1
 * day = today - lastPeriod + 1
 */
export function getPhase(lastPeriod: Date, cycleLength: number, today: Date = new Date()): string {
  const startOfDayToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfDayLastPeriod = new Date(lastPeriod.getFullYear(), lastPeriod.getMonth(), lastPeriod.getDate());
  const diffDays = Math.floor((startOfDayToday.getTime() - startOfDayLastPeriod.getTime()) / (1000 * 60 * 60 * 24));
  const day = diffDays + 1;

  if (day < 1) return "pre_regles";
  if (day <= 5) return "menstruation";
  if (day <= 13) return "folliculaire";
  if (day <= 16) return "ovulation";
  if (day <= cycleLength) return "luteale";
  return "pre_regles"; // retard
}

/**
 * Prend 1 tip au hasard (ou déterministe par jour) dans la phase du jour
 */
export function getTipForToday(phase: string, seedDate: Date = new Date()): DailyTip {
  const tipsOfPhase = allTips.filter(t => t.phase === phase);
  if (tipsOfPhase.length === 0) return allTips[0];
  
  // Utilise le jour de l'année pour avoir un conseil stable au long de la journée
  const startOfYear = new Date(seedDate.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((seedDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const index = Math.abs(dayOfYear) % tipsOfPhase.length;
  return tipsOfPhase[index];
}

/**
 * Pour notification J-3
 */
export function shouldNotifyPrePeriod(predictedNext: Date, today: Date = new Date()): boolean {
  const startOfDayToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfDayPredicted = new Date(predictedNext.getFullYear(), predictedNext.getMonth(), predictedNext.getDate());
  const diffDays = Math.round((startOfDayPredicted.getTime() - startOfDayToday.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays === 3;
}

export function getPhaseLabel(phase: string): string {
  switch (phase) {
    case 'menstruation':
      return 'Phase menstruelle (Règles)';
    case 'folliculaire':
      return 'Phase folliculaire (Énergie)';
    case 'ovulation':
      return 'Phase d’ovulation (Fécondité)';
    case 'luteale':
      return 'Phase lutéale (Écoute ton corps)';
    case 'pre_regles':
      return 'Phase pré-menstruelle (Préparation)';
    default:
      return 'Phase en cours';
  }
}
