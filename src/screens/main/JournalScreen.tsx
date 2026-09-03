import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/tokens';

type Flow = 'none' | 'light' | 'medium' | 'heavy';
type Mood = 'good' | 'tired' | 'irritable' | 'sad';

const JournalScreen: React.FC = () => {
  const [flow, setFlow] = useState<Flow | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  const flowOptions: Flow[] = ['none', 'light', 'medium', 'heavy'];
  const moodOptions: { id: Mood; label: string; emoji: string }[] = [
    { id: 'good', label: 'Bien', emoji: '😊' },
    { id: 'tired', label: 'Fatiguée', emoji: '😴' },
    { id: 'irritable', label: 'À cran', emoji: '😠' },
    { id: 'sad', label: 'Triste', emoji: '😢' },
  ];

  const symptomOptions = [
    'Crampes',
    'Fatigue',
    'Maux de tête',
    'Nausée',
    'Acné',
    'Ballonnements',
    'Douleurs',
    'Autre',
  ];

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const toggleSymptom = (symptom: string) => {
    setSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Journal</Text>
          <Text style={styles.subtitle}>Aujourd'hui</Text>
        </View>

        {/* Flux Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Flux</Text>
          <View style={styles.optionsContainer}>
            {flowOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.option,
                  flow === option && styles.optionSelected,
                ]}
                onPress={() => setFlow(option)}
              >
                <Text style={styles.optionText}>
                  {option === 'none' ? 'Rien' : option === 'light' ? 'Léger' : option === 'medium' ? 'Moyen' : 'Abondant'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Mood Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Humeur</Text>
          <View style={styles.moodContainer}>
            {moodOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.moodOption,
                  mood === option.id && styles.moodOptionSelected,
                ]}
                onPress={() => setMood(option.id)}
              >
                <Text style={styles.moodEmoji}>{option.emoji}</Text>
                <Text style={styles.moodLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Symptoms Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Symptômes</Text>
          <View style={styles.symptomsContainer}>
            {symptomOptions.map(symptom => (
              <TouchableOpacity
                key={symptom}
                style={[
                  styles.symptomChip,
                  symptoms.includes(symptom) && styles.symptomChipSelected,
                ]}
                onPress={() => toggleSymptom(symptom)}
              >
                <Text
                  style={[
                    styles.symptomChipText,
                    symptoms.includes(symptom) && styles.symptomChipTextSelected,
                  ]}
                >
                  {symptom}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>
            {isSaved ? 'Enregistré ✓' : 'Enregistrer'}
          </Text>
        </TouchableOpacity>

        {/* Recent Entries */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Récemment</Text>
          <View style={styles.entryRow}>
            <Text style={styles.entryDate}>Hier</Text>
            <Text style={styles.entrySummary}>Léger flux · Bien · Fatigue</Text>
          </View>
          <View style={styles.entryRow}>
            <Text style={styles.entryDate}>2 jours</Text>
            <Text style={styles.entrySummary}>Moyen · Fatiguée · Crampes</Text>
          </View>
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
  header: {
    paddingHorizontal: Spacing.screenHorizontalPadding,
    paddingVertical: 20,
  },
  title: {
    fontSize: Typography.sizes.screenTitle,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
  },
  section: {
    paddingHorizontal: Spacing.screenHorizontalPadding,
    marginBottom: Spacing.verticalGapRegular,
  },
  sectionLabel: {
    fontSize: 14,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    flex: 1,
    backgroundColor: Colors.CreamCard,
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionSelected: {
    borderColor: Colors.Rose,
    backgroundColor: Colors.BlushLight,
  },
  optionText: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodOption: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  moodOptionSelected: {
    backgroundColor: Colors.BlushLight,
    paddingVertical: 12,
    borderRadius: 16,
    paddingHorizontal: 12,
  },
  moodEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 11,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomChip: {
    backgroundColor: Colors.CreamCard,
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  symptomChipSelected: {
    borderColor: Colors.Rose,
    backgroundColor: Colors.BlushLight,
  },
  symptomChipText: {
    fontSize: Typography.sizes.caption,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  symptomChipTextSelected: {
    color: Colors.Plum,
    fontWeight: '500',
  },
  saveButton: {
    marginHorizontal: Spacing.screenHorizontalPadding,
    backgroundColor: Colors.Plum,
    borderRadius: 26,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: Spacing.verticalGapRegular,
  },
  saveButtonText: {
    color: Colors.TextOnPlum,
    fontSize: Typography.sizes.buttonLabel,
    fontFamily: Typography.families.body,
    fontWeight: '500',
  },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  entryDate: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
  },
  entrySummary: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
});

export default JournalScreen;
