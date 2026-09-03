import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CycleSettings, JournalEntry, Article } from '../types/data';

interface DataStore {
  cycleSettings: CycleSettings | null;
  journalEntries: JournalEntry[];
  articles: Article[];
  
  setCycleSettings: (settings: CycleSettings) => void;
  addJournalEntry: (entry: JournalEntry) => void;
  updateJournalEntry: (date: string, entry: JournalEntry) => void;
  getJournalEntry: (date: string) => JournalEntry | undefined;
  setArticles: (articles: Article[]) => void;
  persistData: () => Promise<void>;
  restoreData: () => Promise<void>;
}

export const useDataStore = create<DataStore>((set, get) => ({
  cycleSettings: null,
  journalEntries: [],
  articles: [],

  setCycleSettings: (settings) => {
    set({ cycleSettings: settings });
    get().persistData();
  },

  addJournalEntry: (entry) => {
    const entries = [...get().journalEntries];
    const existing = entries.findIndex(e => e.date === entry.date);
    if (existing >= 0) {
      entries[existing] = entry;
    } else {
      entries.push(entry);
    }
    set({ journalEntries: entries });
    get().persistData();
  },

  updateJournalEntry: (date, entry) => {
    const entries = [...get().journalEntries];
    const index = entries.findIndex(e => e.date === date);
    if (index >= 0) {
      entries[index] = entry;
    } else {
      entries.push(entry);
    }
    set({ journalEntries: entries });
    get().persistData();
  },

  getJournalEntry: (date) => {
    return get().journalEntries.find(e => e.date === date);
  },

  setArticles: (articles) => set({ articles }),

  persistData: async () => {
    try {
      const state = get();
      await AsyncStorage.setItem('@luna_cycle_settings', JSON.stringify(state.cycleSettings));
      await AsyncStorage.setItem('@luna_journal_entries', JSON.stringify(state.journalEntries));
    } catch (e) {
      console.error('Failed to persist data', e);
    }
  },

  restoreData: async () => {
    try {
      const settings = await AsyncStorage.getItem('@luna_cycle_settings');
      const entries = await AsyncStorage.getItem('@luna_journal_entries');
      
      set({
        cycleSettings: settings ? JSON.parse(settings) : null,
        journalEntries: entries ? JSON.parse(entries) : [],
      });
    } catch (e) {
      console.error('Failed to restore data', e);
    }
  },
}));
