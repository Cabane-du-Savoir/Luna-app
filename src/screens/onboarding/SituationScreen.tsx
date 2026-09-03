import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../types/navigation';
import { Colors, Typography, Spacing } from '../../constants/tokens';

type SituationScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Situation'>;

const SituationScreen: React.FC = () => {
  const navigation = useNavigation<SituationScreenNavigationProp>();
  const [selected, setSelected] = useState<string | null>(null);

  const situations = [
    { id: 'not_started', label: 'Pas encore commencé', description: 'Je n\'ai pas encore eu mes règles' },
    { id: 'just_started', label: 'Tout juste commencé', description: 'C\'est récent pour moi' },
    { id: 'had_for_a_while', label: 'Depuis longtemps', description: 'J\'ai eu mes règles pendant plusieurs années' },
    { id: 'irregular', label: 'Irrégulier', description: 'Mes cycles sont imprévisibles' },
  ];

  const handleContinue = () => {
    if (selected) {
      navigation.navigate('LastPeriod');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comment se présentent tes règles ?</Text>

      <ScrollView style={styles.cardsContainer} showsVerticalScrollIndicator={false}>
        {situations.map((situation) => (
          <TouchableOpacity
            key={situation.id}
            style={[
              styles.card,
              selected === situation.id && styles.cardSelected,
            ]}
            onPress={() => setSelected(situation.id)}
          >
            <Text style={styles.cardTitle}>{situation.label}</Text>
            <Text style={styles.cardDescription}>{situation.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.primaryButton, !selected && styles.disabled]}
        onPress={handleContinue}
        disabled={!selected}
      >
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
    marginBottom: 30,
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.CreamCard,
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  cardSelected: {
    borderColor: Colors.Rose,
    backgroundColor: Colors.BlushLight,
  },
  cardTitle: {
    fontSize: Typography.sizes.cardTitle,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
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
  disabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: Colors.TextOnPlum,
    fontSize: Typography.sizes.buttonLabel,
    fontFamily: Typography.families.body,
    fontWeight: '500',
  },
});

export default SituationScreen;
