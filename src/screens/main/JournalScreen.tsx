import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/tokens';
import { useDataStore } from '../../store/dataStore';
import { Flow, Mood } from '../../types/data';

const todayKey = new Date().toISOString().slice(0, 10);

const JournalScreen: React.FC = () => {
  const [flow, setFlow] = useState<Flow | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [search, setSearch] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const entries = useDataStore(state => state.journalEntries);
  const getJournalEntry = useDataStore(state => state.getJournalEntry);
  const addJournalEntry = useDataStore(state => state.addJournalEntry);

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

  useEffect(() => {
    const entry = getJournalEntry(todayKey);
    if (entry) {
      setFlow(entry.flow ?? null);
      setMood(entry.mood ?? null);
      setSymptoms(entry.symptoms);
      setNotes(entry.notes ?? '');
    }
  }, [getJournalEntry]);

  const handleSave = () => {
    addJournalEntry({
      date: todayKey,
      flow: flow ?? undefined,
      mood: mood ?? undefined,
      symptoms,
      notes: notes.trim() || undefined,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const filteredEntries = entries
    .slice()
    .sort((first, second) => second.date.localeCompare(first.date))
    .filter(entry => {
      const content = `${entry.date} ${entry.flow ?? ''} ${entry.mood ?? ''} ${entry.symptoms.join(' ')} ${entry.notes ?? ''}`;
      return content.toLocaleLowerCase('fr-FR').includes(search.trim().toLocaleLowerCase('fr-FR'));
    });

  const formatEntry = (value: string) => new Date(`${value}T12:00:00`).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  });

  const toggleSymptom = (symptom: string) => {
    setSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
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

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Notes</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Comment te sens-tu aujourd'hui ?"
            placeholderTextColor="#927b85"
            multiline
            maxLength={500}
            textAlignVertical="top"
            style={styles.notesInput}
          />
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
          <Text style={styles.sectionLabel}>Historique</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Rechercher dans le journal"
            placeholderTextColor="#927b85"
            style={styles.searchInput}
          />
          {filteredEntries.length === 0 ? (
            <Text style={styles.emptyText}>Aucune entrée trouvée. Enregistre ton premier ressenti aujourd'hui.</Text>
          ) : (
            filteredEntries.slice(0, 20).map(entry => (
              <View key={entry.date} style={styles.entryRow}>
                <Text style={styles.entryDate}>{formatEntry(entry.date)}</Text>
                <View style={styles.entryContent}>
                  <Text style={styles.entrySummary}>
                    {[entry.flow && { none: 'Rien', light: 'Léger', medium: 'Moyen', heavy: 'Abondant' }[entry.flow], entry.mood && { good: 'Bien', tired: 'Fatiguée', irritable: 'À cran', sad: 'Triste' }[entry.mood], ...entry.symptoms].filter(Boolean).join(' · ') || 'Note enregistrée'}
                  </Text>
                  {entry.notes ? <Text style={styles.entryNote} numberOfLines={1}>{entry.notes}</Text> : null}
                </View>
              </View>
            ))
          )}
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
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 2,
  },
  moodOptionSelected: {
    backgroundColor: Colors.BlushLight,
    borderRadius: 16,
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
  notesInput: {
    minHeight: 96,
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 16,
    backgroundColor: Colors.CreamCard,
    padding: 14,
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.body,
    color: Colors.Text,
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
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  entryDate: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
    width: 58,
  },
  entryContent: {
    flex: 1,
  },
  entrySummary: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  entryNote: {
    fontSize: Typography.sizes.caption,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
    marginTop: 2,
  },
  searchInput: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 16,
    backgroundColor: Colors.CreamCard,
    paddingHorizontal: 14,
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: Typography.sizes.secondary,
    lineHeight: 20,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
    paddingVertical: 8,
  },
});

export default JournalScreen;
