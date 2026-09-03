// User
export interface User {
  gmail: string;
  nickname?: string;
  age?: number;
  situation: 'not_started' | 'just_started' | 'had_for_a_while' | 'irregular';
  language: 'FR' | 'EN';
  passcodeHash?: string;
  signupDate: string;
}

// Cycle
export interface CycleSettings {
  cycleLength: number; // 26-35
  periodLength: number; // 3-7
  lastPeriodStart: string; // ISO date
  regularity: 'regular' | 'irregular' | 'unknown';
}

export interface Cycle {
  startDate: string;
  endDate?: string;
  observedLength: number;
  nextPrediction: string;
}

// Journal
export type Flow = 'none' | 'light' | 'medium' | 'heavy';
export type Mood = 'good' | 'tired' | 'irritable' | 'sad';

export interface JournalEntry {
  date: string;
  flow?: Flow;
  mood?: Mood;
  symptoms: string[];
  notes?: string;
}

// Content
export interface Article {
  id: string;
  topic: 'Toilette' | 'Odeurs' | 'Rasage' | 'Démangeaisons' | 'Exercices';
  title: string;
  intro: string;
  steps: ArticleStep[];
  avoid: string;
  image: string;
  free: boolean;
  language: 'FR' | 'EN';
}

export interface ArticleStep {
  number: number;
  title: string;
  body: string;
}

// Questions
export interface Question {
  id: string;
  tag: string;
  content: string;
  createdAt: string;
  author: string;
  answer?: QuestionAnswer;
  replies: number;
  likes: number;
}

export interface QuestionAnswer {
  id: string;
  content: string;
  author: string;
  verified: boolean;
  profession: string; // e.g. "sage-femme"
}

// Purchase
export interface Purchase {
  id: string;
  paid: boolean;
  method: 'google_play' | 'paypal' | 'card' | 'mobile_money';
  amount: number;
  date: string;
  transactionReference: string;
  promoCode?: string;
}

// App State
export interface AppState {
  auth: boolean;
  tab: 'cycle' | 'astuces' | 'qa' | 'profil' | 'journal';
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
