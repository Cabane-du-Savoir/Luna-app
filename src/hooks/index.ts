import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useAppStore } from '../store/appStore';
import { useDataStore } from '../store/dataStore';
import { CycleSettings, Cycle } from '../types/data';
import * as cycleUtils from '../utils/cycleCalculations';

/**
 * Hook pour accéder aux données d'authentification
 */
export const useAuth = () => {
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const token = useAuthStore(state => state.token);
  const setUser = useAuthStore(state => state.setUser);
  const logout = useAuthStore(state => state.logout);

  return {
    user,
    isAuthenticated,
    token,
    setUser,
    logout,
  };
};

/**
 * Hook pour accéder aux données de l'app
 */
export const useAppState = () => {
  const appState = useAppStore();

  return appState;
};

/**
 * Hook pour accéder aux données (cycle, journal, articles)
 */
export const useData = () => {
  const dataStore = useDataStore();

  return dataStore;
};

/**
 * Hook pour les calculs de cycle
 */
export const useCycleInfo = () => {
  const cycleSettings = useDataStore(state => state.cycleSettings);
  const [cycles, setCycles] = useState<Cycle[]>([]);

  const daysUntilPeriod = cycleSettings
    ? cycleUtils.getDaysUntilPeriod(cycleSettings, cycles)
    : 0;

  const currentPhase = cycleSettings
    ? cycleUtils.getCurrentPhase(cycleSettings, cycles)
    : '';

  const currentDayOfCycle = cycleSettings
    ? cycleUtils.getCurrentDayOfCycle(cycleSettings)
    : 0;

  const nextPeriodDate = cycleSettings
    ? cycleUtils.calculateNextPeriod(cycleSettings, cycles)
    : '';

  return {
    cycleSettings,
    daysUntilPeriod,
    currentPhase,
    currentDayOfCycle,
    nextPeriodDate,
  };
};

/**
 * Hook pour persister l'état automatiquement
 */
export const usePersistState = () => {
  const persistAppState = useAppStore(state => state.persistState);
  const persistData = useDataStore(state => state.persistData);

  useEffect(() => {
    // Auto-persist toutes les 30 secondes
    const interval = setInterval(() => {
      persistAppState();
      persistData();
    }, 30000);

    return () => clearInterval(interval);
  }, [persistAppState, persistData]);
};

/**
 * Hook pour gérer le countdown du trial
 */
export const useTrialCountdown = () => {
  const trialDays = useAuthStore(state => state.trialDays);
  const setTrialDays = useAuthStore(state => state.setTrialDays);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Chaque 24h, décrémenter
    const interval = setInterval(() => {
      const newDays = Math.max(0, trialDays - 1);
      setTrialDays(newDays);
      if (newDays === 0) {
        setIsExpired(true);
      }
    }, 86400000); // 24h

    return () => clearInterval(interval);
  }, [trialDays, setTrialDays]);

  return { trialDays, isExpired };
};

/**
 * Hook pour formater les dates
 */
export const useFormattedDate = (date: string | Date) => {
  const formatted = cycleUtils.formatDate(date);
  const relative = cycleUtils.getRelativeTime(date);

  return { formatted, relative };
};

/**
 * Hook pour récupérer les articles
 */
export const useArticles = (topic?: string) => {
  const articles = useDataStore(state => state.articles);
  const filtered = topic && topic !== 'Tout'
    ? articles.filter(a => a.topic === topic)
    : articles;

  return filtered;
};

/**
 * Hook pour gérer l'entrée du journal
 */
export const useJournalEntry = (date: string) => {
  const getEntry = useDataStore(state => state.getJournalEntry);
  const updateEntry = useDataStore(state => state.updateJournalEntry);

  const entry = getEntry(date);

  const save = (updates: any) => {
    const updatedEntry = {
      date,
      ...entry,
      ...updates,
    };
    updateEntry(date, updatedEntry);
  };

  return { entry, save };
};

/**
 * Hook pour gérer les likes des questions
 */
export const useLikes = () => {
  const liked = useAppStore(state => state.liked);
  const toggleLike = useAppStore(state => state.toggleLike);

  const isLiked = (id: string) => liked.includes(id);

  return { isLiked, toggleLike };
};

/**
 * Hook pour naviguer entre les sheets
 */
export const useSheets = () => {
  const logOpen = useAppStore(state => state.logOpen);
  const payOpen = useAppStore(state => state.payOpen);
  const askOpen = useAppStore(state => state.askOpen);

  const openLog = useAppStore(state => state.openLog);
  const closeLog = useAppStore(state => state.closeLog);
  const openPay = useAppStore(state => state.openPay);
  const closePay = useAppStore(state => state.closePay);
  const openAsk = useAppStore(state => state.openAsk);
  const closeAsk = useAppStore(state => state.closeAsk);

  return {
    logOpen,
    payOpen,
    askOpen,
    openLog,
    closeLog,
    openPay,
    closePay,
    openAsk,
    closeAsk,
  };
};
