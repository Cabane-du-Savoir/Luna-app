// Design Tokens - Colors
export const Colors = {
  Plum: '#7a2d4f',
  PlumHover: '#8f3a5d',
  Rose: '#a8506b',
  Blush: '#f1d6da',
  BlushLight: '#fdeeeb',
  BlushPale: '#f8e4e2',
  Cream: '#fffaf8',
  CreamCard: '#fffdfc',
  Border: '#f6e7e4',
  BorderWarm: '#f1d6da',
  BorderAlert: '#e9c4ca',
  Text: '#4a2135',
  TextDark: '#3a1a29',
  TextOnPlum: '#fdf3f0',
  Alert: '#8f3a5d',
};

// Typography
export const Typography = {
  families: {
    heading: 'PlayfairDisplay_400Regular',
    body: 'Jost',
  },
  sizes: {
    heroNumber: 46,
    screenTitle: 30,
    articleTitle: 32,
    greeting: 26,
    cardTitle: 20,
    questionText: 19,
    wordmark: 15,
    buttonLabel: 15,
    body: 14,
    secondary: 13,
    sectionLabel: 10.5,
    caption: 11.5,
    statusBar: 12,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
  },
};

// Spacing
export const Spacing = {
  screenHorizontalPadding: 22,
  verticalGapDense: 16,
  verticalGapRegular: 18,
  cardPadding: 17,
  bottomSheetPadding: 22,
};

// Border Radius
export const BorderRadius = {
  phoneFrame: 44,
  bottomSheetTop: 30,
  heroCard: 28,
  card: 21,
  button: 26,
  badge: 8,
  dayCell: 16,
};

// Shadows
export const Shadows = {
  primaryButton: '0 12px 26px rgba(122,45,79,.24)',
  card: '0 1px 3px rgba(74,33,53,.06)',
  phoneFrame: '0 30px 70px rgba(74,33,53,.28)',
  fab: '0 10px 22px rgba(122,45,79,.3)',
};

// Gradients
export const Gradients = {
  heroCard: 'linear-gradient(160deg,#f8e4e2,#f1d6da)',
  welcomeSignup: 'linear-gradient(175deg,#fdf3f0,#f8e4e2 50%,#f1d6da)',
  lockScreen: 'linear-gradient(165deg,#4a2135,#7a2d4f 55%,#a8506b)',
  logoMark: 'linear-gradient(135deg,#d98a9a,#7a2d4f)',
};

// Touch targets
export const TouchTargets = {
  minimum: 44,
  chip: 38,
};

// Text Opacities (on #4a2135)
export const TextOpacities = {
  articleBody: 0.72,
  secondary: 0.65,
  tertiary: 0.5,
  labelsAndCaptions: 0.45,
  mutedNumbers: 0.4,
};
