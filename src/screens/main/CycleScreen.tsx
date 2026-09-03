import React, { useState, useMemo } from 'react';
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
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionCardTitle}>📝 Flux</Text>
            <Text style={styles.actionCardSubtitle}>Enregistrer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
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
});

export default CycleScreen;
