import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../types/navigation';
import { Colors, Typography, Spacing } from '../../constants/tokens';
import { useAuthStore } from '../../store/authStore';

type InterestsScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Interests'>;

interface Topic {
  id: string;
  label: string;
}

const InterestsScreen: React.FC = () => {
  const navigation = useNavigation<InterestsScreenNavigationProp>();
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);
  
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [reminder, setReminder] = useState(true);
  const [weeklyTip, setWeeklyTip] = useState(true);

  const topics: Topic[] = [
    { id: 'toilette', label: 'Toilette intime' },
    { id: 'odeurs', label: 'Odeurs' },
    { id: 'rasage', label: 'Rasage' },
    { id: 'demangeaisons', label: 'Démangeaisons' },
    { id: 'exercices', label: 'Exercices' },
  ];

  const toggleTopic = (id: string) => {
    setSelectedTopics(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    // Complete onboarding
    setAuthenticated(true);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Centres d'intérêt</Text>

      <Text style={styles.subtitle}>Quels sujets t'intéressent ?</Text>
      <View style={styles.topicsContainer}>
        {topics.map(topic => (
          <TouchableOpacity
            key={topic.id}
            style={[
              styles.chip,
              selectedTopics.includes(topic.id) && styles.chipSelected,
            ]}
            onPress={() => toggleTopic(topic.id)}
          >
            <Text
              style={[
                styles.chipText,
                selectedTopics.includes(topic.id) && styles.chipTextSelected,
              ]}
            >
              {topic.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>2 jours avant tes règles</Text>
          <Switch
            value={reminder}
            onValueChange={setReminder}
            trackColor={{ false: Colors.Border, true: Colors.Blush }}
            thumbColor={reminder ? Colors.Plum : '#f4f3f4'}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Conseil hebdomadaire</Text>
          <Switch
            value={weeklyTip}
            onValueChange={setWeeklyTip}
            trackColor={{ false: Colors.Border, true: Colors.Blush }}
            thumbColor={weeklyTip ? Colors.Plum : '#f4f3f4'}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleFinish}>
        <Text style={styles.primaryButtonText}>Entrer dans Luna</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    marginBottom: 24,
    textAlign: 'center',
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 40,
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
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  toggleLabel: {
    fontSize: Typography.sizes.body,
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
    marginBottom: 40,
  },
  primaryButtonText: {
    color: Colors.TextOnPlum,
    fontSize: Typography.sizes.buttonLabel,
    fontFamily: Typography.families.body,
    fontWeight: '500',
  },
});

export default InterestsScreen;
