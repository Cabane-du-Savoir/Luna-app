import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/tokens';

const CycleScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [showCourse, setShowCourse] = useState(false);
  const [courseStep, setCourseStep] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);

  // Mock data
  const daysUntilPeriod = 12;
  const currentPhase = 'Phase folliculaire';
  const currentDayOfCycle = 16;
  const cycleLength = 28;

  // Generate week days
  const today = new Date();
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - 3 + i);
    return date;
  });

  const courseSteps = [
    {
      title: 'Le cycle commence au jour 1',
      body: 'Le jour 1 est le premier jour des règles. Chaque nouveau cycle recommence au premier jour des règles suivantes.',
      exercise: 'Exemple : si tes règles commencent le 3 mai, le 3 mai est le jour 1.',
    },
    {
      title: 'Compter la durée du cycle',
      body: 'La durée se compte du premier jour des règles jusqu’à la veille des règles suivantes. Elle n’est pas la durée des saignements.',
      exercise: 'Exemple : début le 3 mai, cycle suivant le 31 mai : 28 jours.',
    },
    {
      title: 'Estimer les prochaines règles',
      body: 'Pour une première estimation, ajoute la durée habituelle du cycle à la date de début des dernières règles.',
      exercise: 'Exemple : début le 3 mai + 28 jours = prochaines règles estimées autour du 31 mai.',
    },
    {
      title: 'Une estimation, jamais une certitude',
      body: 'Le stress, la santé et les changements de rythme peuvent modifier un cycle. Note plusieurs cycles pour mieux reconnaître tes habitudes.',
      exercise: 'Si tes cycles sont irréguliers, Luna doit afficher une période estimée plutôt qu’un jour précis.',
    },
  ];

  const openCourse = () => {
    setCourseStep(0);
    setAnswer(null);
    setShowCourse(true);
  };

  if (showCourse) {
    const isQuiz = courseStep === courseSteps.length;
    const quizCorrect = answer === 1;

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container} contentContainerStyle={styles.courseContainer}>
          <View style={styles.courseTopBar}>
            <TouchableOpacity style={styles.courseBackButton} onPress={() => setShowCourse(false)}>
              <Text style={styles.courseBackText}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.courseProgress}>{isQuiz ? 'Quiz' : `${courseStep + 1} / ${courseSteps.length}`}</Text>
          </View>
          <View style={styles.courseIntroMark}>
            <Text style={styles.courseIntroMarkText}>✦</Text>
          </View>
          <Text style={styles.courseTitle}>Comprendre son cycle</Text>
          <Text style={styles.courseSubtitle}>Un petit cours pour apprendre à compter et mieux observer ses règles.</Text>

          {!isQuiz ? (
            <View style={styles.lessonCard}>
              <Text style={styles.lessonNumber}>ÉTAPE {courseStep + 1}</Text>
              <Text style={styles.lessonTitle}>{courseSteps[courseStep].title}</Text>
              <Text style={styles.lessonBody}>{courseSteps[courseStep].body}</Text>
              <View style={styles.exerciseCard}>
                <Text style={styles.exerciseLabel}>PETIT EXERCICE</Text>
                <Text style={styles.exerciseText}>{courseSteps[courseStep].exercise}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.lessonCard}>
              <Text style={styles.lessonNumber}>À TOI</Text>
              <Text style={styles.lessonTitle}>Un cycle de 30 jours commence le 1er juin. Quand commence l’estimation suivante ?</Text>
              {[29, 30, 31].map((value, index) => (
                <TouchableOpacity key={value} style={[styles.answerOption, answer === index && styles.answerOptionSelected]} onPress={() => setAnswer(index)}>
                  <Text style={styles.answerOptionText}>{value} juin</Text>
                </TouchableOpacity>
              ))}
              {answer !== null && <Text style={[styles.feedback, quizCorrect ? styles.feedbackGood : styles.feedbackTry]}>{quizCorrect ? 'Bravo. On ajoute 30 jours au 1er juin.' : 'Presque. Recompte en ajoutant la durée complète du cycle.'}</Text>}
            </View>
          )}

          <View style={styles.courseActions}>
            <TouchableOpacity style={styles.courseSecondaryButton} onPress={() => setShowCourse(false)}>
              <Text style={styles.courseSecondaryText}>Quitter</Text>
            </TouchableOpacity>
            {!isQuiz ? (
              <TouchableOpacity style={styles.coursePrimaryButton} onPress={() => setCourseStep(courseStep + 1)}>
                <Text style={styles.coursePrimaryText}>Continuer</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.coursePrimaryButton} onPress={() => { setCourseStep(0); setAnswer(null); }}>
                <Text style={styles.coursePrimaryText}>Recommencer</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.courseDisclaimer}>Les calculs de Luna sont des estimations et ne remplacent pas un avis médical.</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.greeting}>
            <Text style={styles.greetingText}>Bonjour Emma</Text>
            <Text style={styles.dateText}>{new Date().toLocaleDateString('fr-FR')}</Text>
          </View>
          <TouchableOpacity style={styles.avatar}>
            <Text style={styles.avatarText}>E</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>PROCHAINES RÈGLES</Text>
          <Text style={styles.heroBigNumber}>dans {daysUntilPeriod} jours</Text>
          <Text style={styles.heroPhase}>{currentPhase} · jour {currentDayOfCycle} de {cycleLength}</Text>

          {/* Phase bars */}
          <View style={styles.phaseBars}>
            {Array.from({ length: 5 }, (_, i) => (
              <View
                key={i}
                style={[
                  styles.phaseBar,
                  i < 2 && styles.phaseBarFilled,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Week View */}
        <View style={styles.section}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.weekScroll}
          >
            {weekDays.map((date, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayCell,
                  date.getDate() === selectedDay && styles.dayCellSelected,
                ]}
                onPress={() => setSelectedDay(date.getDate())}
              >
                <Text style={styles.dayName}>
                  {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
                </Text>
                <Text style={styles.dayNumber}>{date.getDate()}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Action Cards */}
        <View style={styles.actionCardsContainer}>
          <TouchableOpacity style={styles.actionCard} onPress={openCourse}>
            <Text style={styles.actionCardTitle}>📝 Flux</Text>
            <Text style={styles.actionCardSubtitle}>Enregistrer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={openCourse}>
            <Text style={styles.actionCardTitle}>💡 Conseil</Text>
            <Text style={styles.actionCardSubtitle}>du jour</Text>
          </TouchableOpacity>
        </View>

        {/* Month Calendar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calendrier du mois</Text>
          <View style={styles.monthCalendar}>
            {Array.from({ length: 30 }, (_, i) => (
              <View
                key={i}
                style={[
                  styles.calendarDay,
                  i < 5 && styles.calendarDayPeriod,
                  i >= 12 && i < 14 && styles.calendarDayFertile,
                ]}
              >
                <Text style={styles.calendarDayText}>{i + 1}</Text>
              </View>
            ))}
          </View>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.dotPeriod]} />
              <Text style={styles.legendText}>Règles</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.dotFertile]} />
              <Text style={styles.legendText}>Fertile</Text>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenHorizontalPadding,
    paddingVertical: 20,
  },
  greeting: {},
  greetingText: {
    fontSize: Typography.sizes.greeting,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
  },
  dateText: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.Blush,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontFamily: Typography.families.heading,
    color: Colors.Plum,
  },
  heroCard: {
    marginHorizontal: Spacing.screenHorizontalPadding,
    marginBottom: Spacing.verticalGapRegular,
    backgroundColor: Colors.CreamCard,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.Border,
  },
  heroLabel: {
    fontSize: 10.5,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  heroBigNumber: {
    fontSize: Typography.sizes.heroNumber,
    fontFamily: Typography.families.heading,
    color: Colors.Rose,
    marginBottom: 8,
  },
  heroPhase: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
    marginBottom: 16,
  },
  phaseBars: {
    flexDirection: 'row',
    gap: 4,
  },
  phaseBar: {
    height: 5,
    flex: 1,
    borderRadius: 2.5,
    backgroundColor: Colors.Blush,
  },
  phaseBarFilled: {
    backgroundColor: Colors.Rose,
  },
  section: {
    marginBottom: Spacing.verticalGapRegular,
  },
  sectionTitle: {
    fontSize: Typography.sizes.cardTitle,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 12,
    marginHorizontal: Spacing.screenHorizontalPadding,
  },
  weekScroll: {
    paddingHorizontal: Spacing.screenHorizontalPadding,
  },
  dayCell: {
    width: 50,
    height: 60,
    borderRadius: 16,
    backgroundColor: Colors.CreamCard,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.Border,
  },
  dayCellSelected: {
    borderColor: Colors.Rose,
    backgroundColor: Colors.BlushLight,
  },
  dayName: {
    fontSize: 10,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
  },
  dayNumber: {
    fontSize: 16,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginTop: 4,
  },
  actionCardsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: Spacing.screenHorizontalPadding,
    marginBottom: Spacing.verticalGapRegular,
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.CreamCard,
    borderRadius: 21,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.Border,
  },
  actionCardTitle: {
    fontSize: Typography.sizes.cardTitle,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 4,
  },
  actionCardSubtitle: {
    fontSize: Typography.sizes.secondary,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
  },
  monthCalendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.screenHorizontalPadding,
    marginBottom: 16,
  },
  calendarDay: {
    width: '10%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: Colors.CreamCard,
    borderWidth: 1,
    borderColor: Colors.Border,
    margin: '1.5%',
  },
  calendarDayPeriod: {
    backgroundColor: Colors.Rose,
    borderColor: Colors.Rose,
  },
  calendarDayFertile: {
    backgroundColor: Colors.BlushLight,
  },
  calendarDayText: {
    fontSize: 12,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  legend: {
    flexDirection: 'row',
    gap: 24,
    paddingHorizontal: Spacing.screenHorizontalPadding,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotPeriod: {
    backgroundColor: Colors.Rose,
  },
  dotFertile: {
    backgroundColor: Colors.BlushLight,
    borderWidth: 1,
    borderColor: Colors.Rose,
  },
  legendText: {
    fontSize: Typography.sizes.caption,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  courseContainer: {
    paddingBottom: 32,
  },
  courseTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenHorizontalPadding,
    paddingVertical: 16,
  },
  courseBackButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.BlushLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseBackText: {
    fontSize: 28,
    lineHeight: 32,
    color: Colors.Plum,
  },
  courseProgress: {
    fontSize: Typography.sizes.caption,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.55,
  },
  courseIntroMark: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.Blush,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  courseIntroMarkText: {
    fontSize: 28,
    color: Colors.Plum,
  },
  courseTitle: {
    fontSize: Typography.sizes.screenTitle,
    lineHeight: 34,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    textAlign: 'center',
    paddingHorizontal: Spacing.screenHorizontalPadding,
  },
  courseSubtitle: {
    fontSize: Typography.sizes.body,
    lineHeight: 21,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.65,
    textAlign: 'center',
    paddingHorizontal: Spacing.screenHorizontalPadding,
    marginTop: 8,
    marginBottom: 22,
  },
  lessonCard: {
    marginHorizontal: Spacing.screenHorizontalPadding,
    backgroundColor: Colors.CreamCard,
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 22,
    padding: 18,
  },
  lessonNumber: {
    fontSize: Typography.sizes.sectionLabel,
    letterSpacing: 1.5,
    fontFamily: Typography.families.body,
    color: Colors.Rose,
    marginBottom: 10,
  },
  lessonTitle: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: Typography.families.heading,
    color: Colors.Text,
    marginBottom: 10,
  },
  lessonBody: {
    fontSize: Typography.sizes.body,
    lineHeight: 22,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.72,
  },
  exerciseCard: {
    backgroundColor: Colors.BlushLight,
    borderRadius: 16,
    padding: 14,
    marginTop: 18,
  },
  exerciseLabel: {
    fontSize: Typography.sizes.sectionLabel,
    letterSpacing: 1.2,
    fontFamily: Typography.families.body,
    color: Colors.Plum,
    marginBottom: 6,
  },
  exerciseText: {
    fontSize: Typography.sizes.secondary,
    lineHeight: 20,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  answerOption: {
    minHeight: 48,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 16,
    paddingHorizontal: 14,
    marginTop: 10,
  },
  answerOptionSelected: {
    borderColor: Colors.Rose,
    backgroundColor: Colors.BlushLight,
  },
  answerOptionText: {
    fontSize: Typography.sizes.body,
    fontFamily: Typography.families.body,
    color: Colors.Text,
  },
  feedback: {
    fontSize: Typography.sizes.secondary,
    lineHeight: 19,
    fontFamily: Typography.families.body,
    marginTop: 14,
  },
  feedbackGood: {
    color: Colors.Plum,
  },
  feedbackTry: {
    color: Colors.Alert,
  },
  courseActions: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: Spacing.screenHorizontalPadding,
    marginTop: 18,
  },
  courseSecondaryButton: {
    flex: 1,
    minHeight: 52,
    borderWidth: 1,
    borderColor: Colors.BorderWarm,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseSecondaryText: {
    fontSize: Typography.sizes.buttonLabel,
    fontFamily: Typography.families.body,
    color: Colors.Plum,
  },
  coursePrimaryButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 26,
    backgroundColor: Colors.Plum,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coursePrimaryText: {
    fontSize: Typography.sizes.buttonLabel,
    fontFamily: Typography.families.body,
    color: Colors.TextOnPlum,
  },
  courseDisclaimer: {
    fontSize: Typography.sizes.caption,
    lineHeight: 17,
    fontFamily: Typography.families.body,
    color: Colors.Text,
    opacity: 0.45,
    textAlign: 'center',
    paddingHorizontal: Spacing.screenHorizontalPadding,
    marginTop: 16,
  },
});

export default CycleScreen;
