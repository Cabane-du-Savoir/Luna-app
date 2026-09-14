/**
 * LUNA V1.1 - Notifications gratuites à vie :
 * 3 notifications clés :
 * 1. J-3 : "Ne rate plus tes règles" (3 jours avant pour se préparer)
 * 2. J1 : "Jour 1 de tes règles" (bienveillance et symptômes)
 * 3. J14 : "Mi-cycle & Phase ovulatoire" (pic d'énergie & créativité)
 */

export interface LunaNotificationPlan {
  id: string;
  type: 'J-3' | 'J1' | 'J14';
  title: string;
  body: string;
  date: Date;
}

export const requestLunaNotificationPermission = async (): Promise<boolean> => {
  try {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
  } catch (e) {
    console.warn('Erreur demande permission notification:', e);
  }
  return true;
};

export const calculateLuna3Notifications = (
  lastPeriodStart: Date,
  cycleLength: number = 28
): LunaNotificationPlan[] => {
  const plans: LunaNotificationPlan[] = [];

  // Next period date
  const nextPeriod = new Date(lastPeriodStart);
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

  // 1. J-3 (3 jours avant les prochaines règles)
  const jMinus3 = new Date(nextPeriod);
  jMinus3.setDate(jMinus3.getDate() - 3);
  jMinus3.setHours(9, 0, 0, 0);

  plans.push({
    id: 'luna-notif-j-minus-3',
    type: 'J-3',
    title: 'Ne rate plus tes règles 💜',
    body: "Luna t'envoie 1 seul rappel : tes règles sont prévues dans 3 jours pour que tu sois prête.",
    date: jMinus3,
  });

  // 2. J1 (Jour 1 estimé des prochaines règles)
  const j1 = new Date(nextPeriod);
  j1.setHours(9, 0, 0, 0);

  plans.push({
    id: 'luna-notif-j-1',
    type: 'J1',
    title: 'Tes règles commencent aujourd’hui 🩸',
    body: 'Prends un moment pour toi. Pense à noter ton flux et tes ressentis dans ton journal intime.',
    date: j1,
  });

  // 3. J14 (Mi-cycle / Ovulation ~ 14 jours avant les règles suivantes)
  const j14 = new Date(nextPeriod);
  j14.setDate(j14.getDate() - 14);
  j14.setHours(10, 0, 0, 0);

  plans.push({
    id: 'luna-notif-j-14',
    type: 'J14',
    title: 'Phase Ovulatoire & Énergie 🌸',
    body: 'Mi-cycle : pic d’énergie, clarté et créativité aujourd’hui. Profite de cette phase lumineuse.',
    date: j14,
  });

  return plans;
};

export const scheduleCycleReminders = async (
  nextPeriod: Date,
  cycleLength: number,
  enabled: boolean,
  hour = 9
): Promise<void> => {
  if (!enabled) return;

  const notifs = calculateLuna3Notifications(nextPeriod, cycleLength);

  // In browser, save active schedule to localStorage
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('@luna_scheduled_notifications', JSON.stringify(notifs));
      console.log('Luna 3 Notifications enregistrées (J-3, J1, J14):', notifs);
    } catch (e) {
      console.warn('Storage notification log error:', e);
    }
  }
};

