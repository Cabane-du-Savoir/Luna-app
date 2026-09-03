import { CycleSettings, Cycle } from '../types/data';

/**
 * Calculate the next period date based on cycle settings
 */
export const calculateNextPeriod = (
  settings: CycleSettings,
  cycles: Cycle[]
): string => {
  const lastPeriodDate = new Date(settings.lastPeriodStart);
  
  // If we have at least 3 cycles, use the average
  if (cycles.length >= 3) {
    const lastThreeCycles = cycles.slice(-3);
    const totalLength = lastThreeCycles.reduce((sum, cycle) => sum + cycle.observedLength, 0);
    const averageLength = Math.round(totalLength / 3);
    const nextDate = new Date(lastPeriodDate);
    nextDate.setDate(nextDate.getDate() + averageLength);
    return nextDate.toISOString();
  }
  
  // Otherwise use the declared cycle length
  const nextDate = new Date(lastPeriodDate);
  nextDate.setDate(nextDate.getDate() + settings.cycleLength);
  return nextDate.toISOString();
};

/**
 * Get the current phase of the cycle
 */
export const getCurrentPhase = (
  settings: CycleSettings,
  cycles: Cycle[]
): string => {
  const nextPeriod = new Date(calculateNextPeriod(settings, cycles));
  const today = new Date();
  const daysUntilPeriod = Math.ceil(
    (nextPeriod.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntilPeriod <= settings.periodLength) {
    return 'Menstruation';
  } else if (daysUntilPeriod <= 7) {
    return 'Phase lutéale (pré-menstruelle)';
  } else if (daysUntilPeriod <= settings.cycleLength / 2) {
    return 'Phase folliculaire';
  } else {
    return 'Phase lutéale';
  }
};

/**
 * Get days until next period
 */
export const getDaysUntilPeriod = (
  settings: CycleSettings,
  cycles: Cycle[]
): number => {
  const nextPeriod = new Date(calculateNextPeriod(settings, cycles));
  const today = new Date();
  return Math.ceil(
    (nextPeriod.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
};

/**
 * Get the current day of the cycle
 */
export const getCurrentDayOfCycle = (
  settings: CycleSettings
): number => {
  const lastPeriodDate = new Date(settings.lastPeriodStart);
  const today = new Date();
  const elapsedDays = Math.floor(
    (today.getTime() - lastPeriodDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return ((elapsedDays % settings.cycleLength) + settings.cycleLength) % settings.cycleLength + 1;
};

/**
 * Format a date to a readable string
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
 * Get relative time (e.g., "2 days ago", "in 3 days")
 */
export const getRelativeTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - d.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Aujourd\'hui';
  if (diffDays === 1) return 'Hier';
  if (diffDays <= 7) return `Il y a ${diffDays} jours`;
  if (diffDays <= 30) return `Il y a ${Math.ceil(diffDays / 7)} semaines`;
  return `Il y a ${Math.ceil(diffDays / 30)} mois`;
};

/**
 * Validate cycle settings
 */
export const validateCycleSettings = (settings: CycleSettings): boolean => {
  return (
    settings.cycleLength >= 21 &&
    settings.cycleLength <= 35 &&
    settings.periodLength >= 2 &&
    settings.periodLength <= 7 &&
    settings.regularity !== undefined &&
    settings.lastPeriodStart !== undefined
  );
};

/**
 * Get week days array
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

/**
 * Get month calendar array
 */
export const getMonthCalendar = (date: Date = new Date()): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= lastDay || currentDate.getDay() !== 0) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};
