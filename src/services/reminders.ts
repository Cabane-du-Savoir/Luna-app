import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const scheduleCycleReminders = async (nextPeriod: Date, cycleLength: number, enabled: boolean): Promise<void> => {
  if (!enabled || Platform.OS === 'web') return;

  const permissions = await Notifications.getPermissionsAsync();
  if (permissions.status !== 'granted') {
    const requested = await Notifications.requestPermissionsAsync();
    if (requested.status !== 'granted') return;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('cycle-reminders', {
      name: 'Rappels Luna',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  await Notifications.cancelAllScheduledNotificationsAsync();
  for (let cycle = 0; cycle < 6; cycle += 1) {
    const reminderDate = new Date(nextPeriod);
    reminderDate.setDate(reminderDate.getDate() + cycle * cycleLength - 2);
    if (reminderDate <= new Date()) continue;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Un petit rappel Luna',
        body: 'Ça arrive dans deux jours. Pense à préparer ce dont tu as besoin.',
      },
      trigger: reminderDate,
    });
  }
};
