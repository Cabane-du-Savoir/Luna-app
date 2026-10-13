const sharp = require('sharp');

const screens = [
  {
    file: 'screenshot-1.png',
    tag: 'PREDICTIONS DU CYCLE',
    title: 'Suivez votre cycle au jour le jour',
    sub: 'Anticipez vos regles et vos phases en douceur',
    h1: 'Bonjour, Sarah',
    h2: "Aujourd'hui - Jour 14 du cycle",
    phase: 'PHASE OVULATOIRE',
    day: 'Jour 14',
    subphase: 'Prochaines regles dans 14 jours',
    b1_label: 'Chances de conception',
    b1_val: 'Elevees (Pic)',
    b2_label: 'Duree du cycle',
    b2_val: '28 jours regulier',
    cta: '+ Noter mes symptomes du jour'
  },
  {
    file: 'screenshot-2.png',
    tag: 'CALENDRIER MENSTRUEL',
    title: 'Calendrier &amp; Fertilite',
    sub: 'Visualisez vos fenetres de fecondite et vos regles',
    h1: 'Calendrier Luna',
    h2: 'Septembre 2026',
    phase: 'OVULATION EST SimeE',
    day: '12 Sept',
    subphase: 'Fenetre fertile du 10 au 14 Septembre',
    b1_label: 'Periode de regles',
    b1_val: 'Du 1 au 4 Sept',
    b2_label: 'Phase luteale',
    b2_val: '14 jours restants',
    cta: 'Voir tous les mois'
  },
  {
    file: 'screenshot-3.png',
    tag: 'JOURNAL DE SANTE',
    title: 'Enregistrez vos symptomes',
    sub: 'Flux menstruel, humeur, energie et crampes',
    h1: 'Journal Quotidien',
    h2: 'Comment vous sentez-vous ?',
    phase: 'HUMEUR &amp; FLUX',
    day: 'Sereine',
    subphase: 'Flux leger - Crampes faibles',
    b1_label: 'Humeur dominante',
    b1_val: 'Calme &amp; Positive',
    b2_label: 'Symptomes physiques',
    b2_val: 'Aucune douleur forte',
    cta: 'Enregistrer dans mon journal'
  },
  {
    file: 'screenshot-4.png',
    tag: '100% HORS-LIGNE &amp; PRIVE',
    title: 'Vos donnees restent chez vous',
    sub: 'Aucun compte requis, aucune pub, confidentialite absolue',
    h1: 'Securite &amp; Respect',
    h2: 'Protection maximale de la vie privee',
    phase: 'STOCKAGE 100% LOCAL',
    day: '100% Hors-ligne',
    subphase: 'Aucune donnee de sante transmise a des tiers',
    b1_label: 'Donnees personnelles',
    b1_val: 'Restent sur l appareil',
    b2_label: 'Publicites &amp; Pisteurs',
    b2_val: 'Absolument aucuns',
    cta: 'Exporter mes donnees de cycle'
  }
];

async function generate() {
  for (const s of screens) {
    const svg = `
      <svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF0F3" />
            <stop offset="100%" stop-color="#FFE3E8" />
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#E05776" flood-opacity="0.12" />
          </filter>
        </defs>

        <rect width="1080" height="1920" fill="url(#bgGrad)" />

        <rect x="100" y="90" width="360" height="46" rx="23" fill="#FFE0E6" />
        <text x="280" y="121" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="800" fill="#E05776" letter-spacing="1">${s.tag}</text>

        <text x="100" y="210" font-family="sans-serif" font-size="52" font-weight="800" fill="#33101E">${s.title}</text>
        <text x="100" y="270" font-family="sans-serif" font-size="25" font-weight="400" fill="#7A354A">${s.sub}</text>

        <rect x="100" y="380" width="880" height="1420" rx="44" fill="#FFFFFF" filter="url(#shadow)" />

        <text x="160" y="470" font-family="sans-serif" font-size="34" font-weight="800" fill="#33101E">${s.h1}</text>
        <text x="160" y="515" font-family="sans-serif" font-size="22" fill="#99556B">${s.h2}</text>

        <circle cx="540" cy="840" r="230" fill="#FFF5F7" stroke="#FFE0E6" stroke-width="26" />
        <circle cx="540" cy="840" r="230" fill="none" stroke="#E05776" stroke-width="26" stroke-dasharray="1445" stroke-dashoffset="500" stroke-linecap="round" transform="rotate(-90 540 840)" />

        <text x="540" y="790" text-anchor="middle" font-family="sans-serif" font-size="24" font-weight="bold" fill="#E05776">${s.phase}</text>
        <text x="540" y="870" text-anchor="middle" font-family="sans-serif" font-size="64" font-weight="900" fill="#33101E">${s.day}</text>
        <text x="540" y="920" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#888888">${s.subphase}</text>

        <rect x="160" y="1160" width="360" height="140" rx="24" fill="#FFF0F3" />
        <text x="200" y="1215" font-family="sans-serif" font-size="20" font-weight="bold" fill="#E05776">${s.b1_label}</text>
        <text x="200" y="1265" font-family="sans-serif" font-size="28" font-weight="800" fill="#901B39">${s.b1_val}</text>

        <rect x="560" y="1160" width="360" height="140" rx="24" fill="#F0FDF4" />
        <text x="600" y="1215" font-family="sans-serif" font-size="20" font-weight="bold" fill="#16A34A">${s.b2_label}</text>
        <text x="600" y="1265" font-family="sans-serif" font-size="28" font-weight="800" fill="#166534">${s.b2_val}</text>

        <rect x="160" y="1370" width="760" height="110" rx="32" fill="#E05776" />
        <text x="540" y="1438" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="#FFFFFF">${s.cta}</text>
      </svg>
    `;

    await sharp(Buffer.from(svg))
      .png()
      .toFile('public/' + s.file);
    console.log('Created ' + s.file);
  }
}

generate();
