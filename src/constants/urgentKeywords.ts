export const URGENT_KEYWORDS: string[] = [
  'suicide',
  'saignement abondant 10 jours',
  'perte connaissance',
  'hémorragie',
  'hemorragie',
  'douleur insupportable',
  'évanouissement',
  'evanouissement',
  'grossesse extra',
  'perte de sang noir abondant',
];

export interface UrgentKeywordMatch {
  matched: boolean;
  keyword?: string;
  emergencyTitle: string;
  emergencyMessage: string;
  hotlines: { label: string; phone: string }[];
}

export function checkUrgentKeywords(text: string): UrgentKeywordMatch {
  const normalized = text.toLowerCase();
  const found = URGENT_KEYWORDS.find(keyword => normalized.includes(keyword.toLowerCase()));

  if (found) {
    return {
      matched: true,
      keyword: found,
      emergencyTitle: '🚨 Attention : Situation d’Urgence Médicale',
      emergencyMessage:
        'Le message saisi mentionne des symptômes ou une détresse qui nécessitent une prise en charge médicale immédiate. Luna ne peut pas traiter cette demande en ligne.',
      hotlines: [
        { label: 'Urgences médicales (SAMU / Ambulance)', phone: '15 (ou 112)' },
        { label: 'Centre de santé le plus proche', phone: 'Consulte sans délai' },
        { label: 'Ligne d’écoute et d’aide psychologique', phone: '3114' },
      ],
    };
  }

  return {
    matched: false,
    emergencyTitle: '',
    emergencyMessage: '',
    hotlines: [],
  };
}
