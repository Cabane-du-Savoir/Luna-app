import { CycleSettings, Cycle, PredictionResult, ContraceptionType } from '../types/data';

/**
 * LUNA V1.1 Prediction Logic
 * Calculates next period date with statistical margin (+-2j or +-3j)
 */
export const predictNextPeriodDetailed = (
  settings: CycleSettings,
  cycles: Cycle[] = [],
  isLearningMode: boolean = false
): PredictionResult => {
  const contraception: ContraceptionType = settings.contraception || 'aucune';
  const fertilityDisabled = contraception !== 'aucune';
  const fertilityWarning = fertilityDisabled
    ? 'Prédiction d’ovulation désactivée : la contraception (hormonale ou mécanique) modifie la régularité du cycle naturel.'
    : undefined;

  // Learning mode check
  if (isLearningMode || settings.isLearningMode) {
    return {
      nextPeriodDate: null,
      displayText: 'On apprend à connaître ton cycle...',
      daysRemaining: null,
      margin: 3,
      isLearning: true,
      fertilityDisabled,
      fertilityWarning,
    };
  }

  const lastPeriodStart = new Date(settings.lastPeriodStart);
  if (isNaN(lastPeriodStart.getTime())) {
    return {
      nextPeriodDate: null,
      displayText: 'Date non renseignée',
      daysRemaining: null,
      margin: 2,
      isLearning: true,
      fertilityDisabled,
      fertilityWarning,
    };
  }

  // Extract recorded cycles durations
  const validCycles = cycles.filter(c => c.duration && c.duration > 0);

  let predictedDuration = settings.cycleLength || 28;
  let margin = 2;

  if (validCycles.length >= 2) {
    const last3 = validCycles.slice(-3).map(c => c.duration as number);
    const avg = last3.reduce((acc, val) => acc + val, 0) / last3.length;
    const variance =
      last3.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / last3.length;

    predictedDuration = Math.round(avg);
    margin = variance > 4 ? 3 : 2;
  } else if (settings.regularity === 'irregular') {
    margin = 3;
  }

  // Advance by predicted duration from lastPeriodStart until it represents next upcoming period
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const predictedDate = new Date(lastPeriodStart);
  predictedDate.setHours(0, 0, 0, 0);
  predictedDate.setDate(predictedDate.getDate() + predictedDuration);

  // If predicted date is in the past, roll forward
  while (predictedDate < today) {
    predictedDate.setDate(predictedDate.getDate() + predictedDuration);
  }

  const diffMs = predictedDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  const monthName = predictedDate.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
  });
  const displayText = `${monthName} ±${margin}j`;

  return {
    nextPeriodDate: predictedDate.toISOString().slice(0, 10),
    displayText,
    daysRemaining,
    margin,
    isLearning: false,
    fertilityDisabled,
    fertilityWarning,
  };
};

/**
 * Simple calculation helper for backward compatibility
 */
export const calculateNextPeriod = (
  settings: CycleSettings,
  cycles: Cycle[] = []
): string => {
  const result = predictNextPeriodDetailed(settings, cycles, settings.isLearningMode);
  if (result.nextPeriodDate) {
    return result.nextPeriodDate;
  }
  const fallback = new Date(settings.lastPeriodStart);
  fallback.setDate(fallback.getDate() + (settings.cycleLength || 28));
  return fallback.toISOString();
};

/**
 * Current Phase helper
 */
export const getCurrentPhase = (
  settings: CycleSettings,
  cycles: Cycle[] = []
): string => {
  if (settings.contraception && settings.contraception !== 'aucune') {
    return 'Cycle sous contraception';
  }

  const dayOfCycle = getCurrentDayOfCycle(settings);
  const periodLength = settings.periodLength || 5;
  const cycleLength = settings.cycleLength || 28;

  if (dayOfCycle <= periodLength) {
    return 'Menstruation';
  } else if (dayOfCycle < cycleLength / 2 - 2) {
    return 'Phase folliculaire';
  } else if (dayOfCycle <= cycleLength / 2 + 2) {
    return 'Fenêtre d’ovulation';
  } else {
    return 'Phase lutéale';
  }
};

/**
 * Days until next period
 */
export const getDaysUntilPeriod = (
  settings: CycleSettings,
  cycles: Cycle[] = []
): number => {
  const result = predictNextPeriodDetailed(settings, cycles, settings.isLearningMode);
  return result.daysRemaining ?? 0;
};

/**
 * Current day of cycle (1-indexed)
 */
export const getCurrentDayOfCycle = (settings: CycleSettings): number => {
  const lastPeriodDate = new Date(settings.lastPeriodStart);
  lastPeriodDate.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const elapsedDays = Math.floor(
    (today.getTime() - lastPeriodDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const length = settings.cycleLength || 28;

  return ((elapsedDays % length) + length) % length + 1;
};

/**
 * Format date in French
 */
export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Relative time helper
 */
export const getRelativeTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - d.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Aujourd’hui';
  if (diffDays === 1) return 'Hier';
  if (diffDays <= 7) return `Il y a ${diffDays} jours`;
  if (diffDays <= 30) return `Il y a ${Math.ceil(diffDays / 7)} semaines`;
  return `Il y a ${Math.ceil(diffDays / 30)} mois`;
};

/**
 * Week days around center date
 */
export const getWeekDays = (centerDate: Date = new Date()): Date[] => {
  const days: Date[] = [];
  const startDate = new Date(centerDate);
  startDate.setDate(startDate.getDate() - 3);

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    days.push(date);
  }

  return days;
};
