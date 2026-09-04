import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../types/navigation';
import { Colors, Typography, Spacing } from '../../constants/tokens';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LastPeriodScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'LastPeriod'>;

const LastPeriodScreen: React.FC = () => {
  const navigation = useNavigation<LastPeriodScreenNavigationProp>();
  const [daysAgo, setDaysAgo] = useState(14);

  const lastPeriodDate = new Date();
  lastPeriodDate.setDate(lastPeriodDate.getDate() - daysAgo);
  
  const daysLabel = daysAgo === 1 ? 'jour' : 'jours';

  const handleContinue = async () => {
    await AsyncStorage.setItem('@luna_onboarding_last_period', lastPeriodDate.toISOString());
    navigation.navigate('CycleLength');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quand ont commencé tes dernières règles ?</Text>

      <View style={styles.dateDisplay}>
        <Text style={styles.daysLabel}>il y a {daysAgo} {daysLabel}</Text>
        <Text style={styles.dateText}>{lastPeriodDate.toLocaleDateString('fr-FR')}</Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={90}
        value={daysAgo}
        onValueChange={setDaysAgo}
        step={1}
      />

      <View style={styles.shortcuts}>
        <TouchableOpacity style={styles.shortcut} onPress={() => setDaysAgo(7)}>
          <Text style={styles.shortcutText}>Cette semaine</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shortcut} onPress={() => setDaysAgo(14)}>
          <Text style={styles.shortcutText}>Il y a 14 jours</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shortcut} onPress={() => setDaysAgo(30)}>
          <Text style={styles.shortcutText}>Il y a un mois</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
        <Text style={styles.primaryButtonText}>Continuer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Cream,
    paddingHorizontal: Spacing.screenHorizontalPadding,
    justifyContent: 'center',
  },
  title: {
    fontSize: Typography.sizes.screenTitle,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 40,
    textAlign: 'center',
  },
  dateDisplay: {
    alignItems: 'center',
    marginBottom: 40,
  },
  daysLabel: {
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    marginBottom: 8,
  },
  dateText: {
    fontSize: Typography.sizes.cardTitle,
    fontFamily: Typography.families.heading,
    color: Colors.Rose,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 40,
  },
  shortcuts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  shortcut: {
    backgroundColor: Colors.BlushLight,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  shortcutText: {
    fontSize: 11,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  primaryButton: {
    backgroundColor: Colors.Plum,
    borderRadius: 26,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.TextOnPlum,
    fontSize: Typography.sizes.buttonLabel,
    fontFamily: Typography.families.body,
    fontWeight: '500',
  },
});

export default LastPeriodScreen;
