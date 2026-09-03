import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../types/navigation';
import { Colors, Typography, Spacing } from '../../constants/tokens';

type CycleLengthScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'CycleLength'>;

interface Chip {
  label: string;
  value: number;
  type: 'cycle' | 'period';
}

const CycleLengthScreen: React.FC = () => {
  const navigation = useNavigation<CycleLengthScreenNavigationProp>();
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);

  const cycleChips: Chip[] = [
    { label: '26', value: 26, type: 'cycle' },
    { label: '28', value: 28, type: 'cycle' },
    { label: '30', value: 30, type: 'cycle' },
    { label: 'Je ne sais pas', value: 0, type: 'cycle' },
  ];

  const periodChips: Chip[] = [
    { label: '3', value: 3, type: 'period' },
    { label: '5', value: 5, type: 'period' },
    { label: '7', value: 7, type: 'period' },
  ];

  const handleContinue = () => {
    navigation.navigate('Interests');
  };

  const renderChip = (chip: Chip) => {
    const isSelected = chip.type === 'cycle' ? cycleLength === chip.value : periodLength === chip.value;
    const handlePress = chip.type === 'cycle' ? () => setCycleLength(chip.value) : () => setPeriodLength(chip.value);

    return (
      <TouchableOpacity
        key={`${chip.type}-${chip.value}`}
        style={[
          styles.chip,
          isSelected && styles.chipSelected,
        ]}
        onPress={handlePress}
      >
        <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
          {chip.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ton cycle</Text>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Durée du cycle (jours)</Text>
        <View style={styles.chipsContainer}>
          {cycleChips.map(renderChip)}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Durée des règles (jours)</Text>
        <View style={styles.chipsContainer}>
          {periodChips.map(renderChip)}
        </View>
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
    paddingTop: 40,
  },
  title: {
    fontSize: Typography.sizes.screenTitle,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 40,
    textAlign: 'center',
  },
  section: {
    marginBottom: 40,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    textTransform: 'uppercase',
    marginBottom: 12,
    letterSpacing: 1,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: Colors.CreamCard,
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  chipSelected: {
    borderColor: Colors.Rose,
    backgroundColor: Colors.BlushLight,
  },
  chipText: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  chipTextSelected: {
    color: Colors.Plum,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: Colors.Plum,
    borderRadius: 26,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButtonText: {
    color: Colors.TextOnPlum,
    fontSize: Typography.sizes.buttonLabel,
    fontFamily: Typography.families.body,
    fontWeight: '500',
  },
});

export default CycleLengthScreen;
