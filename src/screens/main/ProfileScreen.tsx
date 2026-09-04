import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Typography, Spacing } from '../../constants/tokens';
import { useAuthStore } from '../../store/authStore';
import { useDataStore } from '../../store/dataStore';
import { useAppStore } from '../../store/appStore';
import { calculateNextPeriod } from '../../utils/cycleCalculations';
import { scheduleCycleReminders } from '../../services/reminders';
import { getPremiumProduct, purchasePremium, restorePremiumPurchase } from '../../services/purchases';

const ProfileScreen: React.FC = () => {
  const [settings, setSettings] = useState({
    reminder: true,
    weeklyTip: true,
    passcode: false,
    autoBackup: true,
  });
  const [reminderHour, setReminderHour] = useState(9);
  const [purchaseLabel, setPurchaseLabel] = useState('Obtenir l’accès à vie');
  const [isPurchasing, setIsPurchasing] = useState(false);

  const user = {
    name: 'Emma',
    email: 'emma@example.com',
  };

  const { logout, paid, trialDays, setPaid } = useAuthStore();
  const cycleSettings = useDataStore(state => state.cycleSettings);
  const setAppSettings = useAppStore(state => state.setSettings);
  const lastBackup = '2 jours';

  useEffect(() => {
    const restoreNotificationSettings = async () => {
      const saved = await AsyncStorage.getItem('@luna_notification_settings');
      if (!saved) return;
      const value = JSON.parse(saved);
      setSettings(value.settings ?? settings);
      setReminderHour(value.reminderHour ?? 9);
    };
    void restoreNotificationSettings();
  }, []);

  useEffect(() => {
    const loadPremiumProduct = async () => {
      try {
        const product = await getPremiumProduct();
        if (product) setPurchaseLabel(`Obtenir l’accès à vie · ${product.localizedPrice}`);
      } catch {
        // Google Play is unavailable in web preview and before the product is published for testing.
      }
    };
    void loadPremiumProduct();
  }, []);

  const handleLogout = () => {
    logout();
  };

  const toggleSetting = async (key: keyof typeof settings) => {
    const nextSettings = {
      ...settings,
      [key]: !settings[key],
    };
    setSettings(nextSettings);
    setAppSettings(nextSettings);
    if (key === 'reminder' && cycleSettings) {
      await scheduleCycleReminders(
        new Date(calculateNextPeriod(cycleSettings, [])),
        cycleSettings.cycleLength,
        nextSettings.reminder,
        reminderHour,
      );
    }
    await AsyncStorage.setItem('@luna_notification_settings', JSON.stringify({ settings: nextSettings, reminderHour }));
  };

  const changeReminderHour = async (hour: number) => {
    setReminderHour(hour);
    await AsyncStorage.setItem('@luna_notification_settings', JSON.stringify({ settings, reminderHour: hour }));
    if (settings.reminder && cycleSettings) {
      await scheduleCycleReminders(new Date(calculateNextPeriod(cycleSettings, [])), cycleSettings.cycleLength, true, hour);
    }
  };

  const handleCopyLink = () => {
    alert('Lien copié ✓\nluna.app/telecharger');
  };

  const handlePurchase = async () => {
    setIsPurchasing(true);
    try {
      await purchasePremium();
      setPaid(true);
      Alert.alert('Accès activé', 'Merci. Tous les contenus premium sont maintenant accessibles.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Le paiement n’a pas pu être finalisé.';
      Alert.alert('Achat non finalisé', message);
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleRestorePurchase = async () => {
    setIsPurchasing(true);
    try {
      const restored = await restorePremiumPurchase();
      setPaid(restored);
      Alert.alert(restored ? 'Achat restauré' : 'Aucun achat trouvé', restored ? 'Ton accès à vie est de nouveau actif.' : 'Connecte-toi au compte Google utilisé lors de l’achat.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'La restauration a échoué.';
      Alert.alert('Restauration impossible', message);
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.name[0]}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>
        </View>

        {/* Access Card */}
        <View style={styles.accessCard}>
          {!paid ? (
            <>
              <Text style={styles.accessLabel}>ESSAI GRATUIT</Text>
              <Text style={styles.accessTitle}>Encore {trialDays} jours</Text>
              <Text style={styles.accessSubtitle}>Ensuite 5 $ une seule fois, à vie</Text>
              <TouchableOpacity style={[styles.payButton, isPurchasing && styles.payButtonDisabled]} onPress={handlePurchase} disabled={isPurchasing}>
                <Text style={styles.payButtonText}>{isPurchasing ? 'Connexion à Google Play...' : purchaseLabel}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRestorePurchase} disabled={isPurchasing}>
                <Text style={styles.restorePurchaseText}>Restaurer un achat</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.accessLabel}>ACCÈS À VIE</Text>
              <Text style={styles.accessTitle}>Tout est débloqué</Text>
            </>
          )}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Rappel avant tes règles</Text>
            <Switch
              value={settings.reminder}
              onValueChange={() => toggleSetting('reminder')}
              trackColor={{ false: Colors.Border, true: Colors.Blush }}
              thumbColor={settings.reminder ? Colors.Plum : '#f4f3f4'}
            />
          </View>
          <View style={styles.reminderTimeRow}>
            <Text style={styles.reminderTimeLabel}>Heure du rappel</Text>
            <View style={styles.hourOptions}>
              {[8, 9, 18, 20].map(hour => (
                <TouchableOpacity key={hour} style={[styles.hourOption, reminderHour === hour && styles.hourOptionSelected]} onPress={() => changeReminderHour(hour)}>
                  <Text style={[styles.hourOptionText, reminderHour === hour && styles.hourOptionTextSelected]}>{hour} h</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Conseil hebdomadaire</Text>
            <Switch
              value={settings.weeklyTip}
              onValueChange={() => toggleSetting('weeklyTip')}
              trackColor={{ false: Colors.Border, true: Colors.Blush }}
              thumbColor={settings.weeklyTip ? Colors.Plum : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Code de sécurité</Text>
            <Switch
              value={settings.passcode}
              onValueChange={() => toggleSetting('passcode')}
              trackColor={{ false: Colors.Border, true: Colors.Blush }}
              thumbColor={settings.passcode ? Colors.Plum : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Sauvegarde automatique</Text>
            <Switch
              value={settings.autoBackup}
              onValueChange={() => toggleSetting('autoBackup')}
              trackColor={{ false: Colors.Border, true: Colors.Blush }}
              thumbColor={settings.autoBackup ? Colors.Plum : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Language */}
        <View style={styles.section}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Langue</Text>
            <Text style={styles.settingValue}>Français</Text>
          </View>
        </View>

        {/* Backup */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sauvegardes</Text>
          <View style={styles.backupInfo}>
            <Text style={styles.backupLabel}>Dernière sauvegarde</Text>
            <Text style={styles.backupTime}>{lastBackup}</Text>
          </View>
          <TouchableOpacity style={styles.backupButton}>
            <Text style={styles.backupButtonText}>Sauvegarder maintenant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.restoreButton}>
            <Text style={styles.restoreButtonText}>Restaurer</Text>
          </TouchableOpacity>
        </View>

        {/* Share */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.shareRow} onPress={handleCopyLink}>
            <Text style={styles.shareLabel}>Partager Luna</Text>
            <Text style={styles.shareLink}>luna.app/telecharger</Text>
          </TouchableOpacity>
        </View>

        {/* Data & Privacy */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkText}>Mes données</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkText}>Conditions d'utilisation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkText}>Politique de confidentialité</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Se déconnecter</Text>
        </TouchableOpacity>

        {/* Version */}
        <View style={styles.footerSection}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.Cream,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.Cream,
  },
  screenContent: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: Spacing.screenHorizontalPadding,
    paddingVertical: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.Blush,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontFamily: Typography.families.heading,
    color: Colors.Plum,
  },
  userInfo: {},
  userName: {
    fontSize: Typography.sizes.cardTitle,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
  },
  accessCard: {
    marginHorizontal: Spacing.screenHorizontalPadding,
    marginBottom: Spacing.verticalGapRegular,
    backgroundColor: Colors.BlushLight,
    backgroundImage: 'linear-gradient(160deg,#f8e4e2,#f1d6da)',
    borderRadius: 21,
    padding: 20,
  },
  accessLabel: {
    fontSize: 10.5,
    fontFamily: Typography.families.body,
    color: Colors.Plum,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
    fontWeight: '500',
  },
  accessTitle: {
    fontSize: Typography.sizes.cardTitle,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 2,
  },
  accessSubtitle: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
    marginBottom: 12,
  },
  payButton: {
    backgroundColor: Colors.Plum,
    borderRadius: 26,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  payButtonText: {
    color: Colors.TextOnPlum,
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.body,
    fontWeight: '500',
  },
  payButtonDisabled: {
    opacity: 0.6,
  },
  restorePurchaseText: {
    fontSize: Typography.sizes.caption,
    fontFamily: Typography.families.body,
    color: Colors.Plum,
    textAlign: 'center',
    marginTop: 12,
  },
  section: {
    paddingHorizontal: Spacing.screenHorizontalPadding,
    marginBottom: Spacing.verticalGapRegular,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  settingLabel: {
    flex: 1,
    paddingRight: 16,
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  settingValue: {
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
  },
  reminderTimeRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  reminderTimeLabel: {
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    marginBottom: 10,
  },
  hourOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hourOption: {
    minWidth: 48,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 16,
    backgroundColor: Colors.CreamCard,
  },
  hourOptionSelected: {
    borderColor: Colors.Rose,
    backgroundColor: Colors.BlushLight,
  },
  hourOptionText: {
    fontSize: Typography.sizes.caption,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  hourOptionTextSelected: {
    color: Colors.Plum,
    fontWeight: '500',
  },
  backupInfo: {
    marginBottom: 12,
  },
  backupLabel: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
    marginBottom: 2,
  },
  backupTime: {
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
  },
  backupButton: {
    backgroundColor: Colors.CreamCard,
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    alignItems: 'center',
  },
  backupButtonText: {
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.body,
    color: Colors.Plum,
  },
  restoreButton: {
    backgroundColor: Colors.CreamCard,
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  restoreButtonText: {
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.body,
    color: Colors.Plum,
  },
  shareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  shareLabel: {
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  shareLink: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Plum,
  },
  linkRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  linkText: {
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  logoutButton: {
    marginHorizontal: Spacing.screenHorizontalPadding,
    backgroundColor: Colors.CreamCard,
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButtonText: {
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.body,
    color: Colors.Alert,
  },
  footerSection: {
    paddingHorizontal: Spacing.screenHorizontalPadding,
    paddingBottom: 20,
    alignItems: 'center',
  },
  versionText: {
    fontSize: Typography.sizes.caption,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.45,
  },
});

export default ProfileScreen;
