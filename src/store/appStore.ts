import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, JournalEntry, Flow, Mood, Article } from '../types/data';

interface AppStore extends AppState {
  setTab: (tab: AppState['tab']) => void;
  setArticle: (id: string | null) => void;
  setFlux: (flux: Flow) => void;
  setMood: (mood: Mood | undefined) => void;
  setSymptoms: (symptoms: string[]) => void;
  setSelectedDay: (day: number) => void;
  setTopic: (topic: string) => void;
  setQATab: (tab: 'recent' | 'unanswered') => void;
  toggleLike: (id: string) => void;
  setLanguage: (lang: 'FR' | 'EN') => void;
  setSettings: (settings: AppState['settings']) => void;
  openLog: () => void;
  closeLog: () => void;
  openPay: () => void;
  closePay: () => void;
  openAsk: () => void;
  closeAsk: () => void;
  persistState: () => Promise<void>;
  restoreState: () => Promise<void>;
}

export const useAppStore = create<AppStore>((set, get) => ({
  auth: false,
  tab: 'cycle',
  article: null,
  paid: false,
  trialDays: 3,
  flux: undefined,
  mood: undefined,
  symptoms: [],
  selectedDay: new Date().getDate(),
  topic: 'Tout',
  qaTab: 'recent',
  liked: [],
  lang: 'FR',
  settings: {
    reminder: true,
    weeklyTip: true,
    passcode: false,
    autoBackup: true,
  },
  logOpen: false,
  payOpen: false,
  askOpen: false,

  setTab: (tab) => set({ tab }),
  setArticle: (id) => set({ article: id }),
  setFlux: (flux) => set({ flux }),
  setMood: (mood) => set({ mood }),
  setSymptoms: (symptoms) => set({ symptoms }),
  setSelectedDay: (day) => set({ selectedDay: day }),
  setTopic: (topic) => set({ topic }),
  setQATab: (tab) => set({ qaTab: tab }),
  toggleLike: (id) => {
    const current = get().liked;
    set({ liked: current.includes(id) ? current.filter(l => l !== id) : [...current, id] });
  },
  setLanguage: (lang) => set({ lang }),
  setSettings: (settings) => set({ settings }),
  openLog: () => set({ logOpen: true }),
  closeLog: () => set({ logOpen: false }),
  openPay: () => set({ payOpen: true }),
  closePay: () => set({ payOpen: false }),
  openAsk: () => set({ askOpen: true }),
  closeAsk: () => set({ askOpen: false }),

  persistState: async () => {
    try {
      const state = get();
      await AsyncStorage.setItem('@luna_app_state', JSON.stringify(state));
    } catch (e) {
      console.error('Failed to persist state', e);
    }
  },

  restoreState: async () => {
    try {
      const state = await AsyncStorage.getItem('@luna_app_state');
      if (state) {
        set(JSON.parse(state));
      }
    } catch (e) {
      console.error('Failed to restore state', e);
    }
  },
}));
