// User Model (LUNA V1.1 Spec)
export interface User {
  prenom: string;
  age: number; // min 12, max 55, default 20
  email?: string | null;
  hasAccount: boolean;
  pin?: string | null; // 4 digits
  isLearningMode: boolean;
  anonymousByDefault: boolean;
  createdAt: string;

  // Backward compatibility aliases
  gmail?: string;
  nickname?: string;
  situation?: 'not_started' | 'just_started' | 'had_for_a_while' | 'irregular';
  language?: 'FR' | 'EN';
  signupDate?: string;
}

// Cycle Model & Settings (LUNA V1.1 Spec)
export type ContraceptionType = 'aucune' | 'pilule' | 'diu' | 'implant' | 'autre';

export interface CycleSettings {
  cycleLength: number; // 21-35
  periodLength: number; // 2-8
  lastPeriodStart: string; // ISO date
  regularity: 'regular' | 'irregular' | 'unknown';
  contraception: ContraceptionType;
  isLearningMode?: boolean;
}

export interface Cycle {
  id: string | number;
  startDate: string; // debut regles
  duration?: number | null; // duree cycle
  periodDuration?: number | null;
  contraception: ContraceptionType;
  endDate?: string;
}

// Prediction result with variance and margin (LUNA V1.1 Spec)
export interface PredictionResult {
  nextPeriodDate: string | null;
  displayText: string;
  daysRemaining: number | null;
  margin: number; // +-2 or +-3
  isLearning: boolean;
  fertilityDisabled: boolean;
  fertilityWarning?: string;
}

// DailyLog Model (LUNA V1.1 Spec)
export type Flow = 'rien' | 'leger' | 'moyen' | 'abondant' | 'none' | 'light' | 'medium' | 'heavy';
export type Mood = 'happy' | 'calm' | 'sad' | 'irritable' | 'tired' | 'good';

export interface DailyLog {
  id: string;
  date: string; // YYYY-MM-DD index
  flow?: Flow | null;
  mood?: Mood | null;
  symptoms: string[];
  note?: string | null;
}

// Alias for backwards compatibility
export type JournalEntry = DailyLog & {
  notes?: string;
};

// Content / Tips (LUNA V1.1 Spec)
export type TipCategory =
  | 'ALL'
  | 'TOILETTE'
  | 'ODEURS'
  | 'RASAGE'
  | 'DEMANGEAISONS'
  | 'DOULEURS'
  | 'RECETTES'
  | 'THEMES';

export interface ArticleStep {
  number: number;
  title: string;
  body: string;
}

export interface Article {
  id: string;
  topic: TipCategory | string;
  title: string;
  intro: string;
  steps: ArticleStep[];
  avoid?: string;
  image: string;
  free: boolean; // Must be true for TOILETTE, ODEURS, DEMANGEAISONS, DOULEURS, RASAGE
  isLocked?: boolean;
  language: 'FR' | 'EN';
}

// Questions Model (LUNA V1.1 Spec)
export interface Question {
  id: string;
  text: string;
  isAnonymous: boolean;
  status: 'pending' | 'answered_ai' | 'answered_pro';
  aiAnswer?: string | null;
  proAnswer?: string | null;
  isVerified: boolean;
  createdAt: string;
  tag?: string;
  likes?: number;

  // Backward compatibility aliases
  content?: string;
  author?: string;
  replies?: number;
}

// App State
export interface AppState {
  auth: boolean;
  tab: 'cycle' | 'astuces' | 'qa' | 'questions' | 'profil' | 'journal';
  article: string | null;
  paid: boolean;
  trialDays: number;
  flux?: Flow;
  mood?: Mood;
  symptoms: string[];
  selectedDay: number;
  topic: string;
  qaTab: 'recent' | 'unanswered';
  liked: string[];
  lang: 'FR' | 'EN';
  settings: {
    reminder: boolean;
    weeklyTip: boolean;
    passcode: boolean;
    autoBackup: boolean;
  };
  logOpen: boolean;
  payOpen: boolean;
  askOpen: boolean;
}
