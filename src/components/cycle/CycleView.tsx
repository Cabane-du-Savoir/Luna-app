import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  Plus,
  Droplets,
  AlertCircle,
  Lightbulb,
  Bell
} from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { useAuthStore } from '../../store/authStore';
import {
  predictNextPeriodDetailed,
  getCurrentDayOfCycle,
  getCurrentPhase,
  formatDate,
} from '../../utils/cycleCalculations';
import {
  getPhase,
  getTipForToday,
  shouldNotifyPrePeriod,
  getPhaseLabel,
} from '../../constants/tips';
import { CycleCourseModal } from './CycleCourseModal';
import { LogModal } from '../common/LogModal';

interface CycleViewProps {
  onOpenTips?: () => void;
}

export const CycleView: React.FC<CycleViewProps> = ({ onOpenTips }) => {
  const user = useAuthStore(state => state.user);
  const cycleSettings = useDataStore(state => state.cycleSettings);
  const setCycleSettings = useDataStore(state => state.setCycleSettings);
  const journalEntries = useDataStore(state => state.journalEntries);

  const [courseOpen, setCourseOpen] = useState(false);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [selectedDateForLog, setSelectedDateForLog] = useState<string | undefined>();
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());

  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);

  // Fallback defaults if settings not yet initialized
  const effectiveSettings = cycleSettings || {
    cycleLength: 28,
    periodLength: 5,
    lastPeriodStart: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    regularity: 'regular' as const,
    contraception: 'aucune' as const,
    isLearningMode: user?.isLearningMode ?? false,
  };

  const isLearning = user?.isLearningMode || effectiveSettings.isLearningMode;
  const prediction = predictNextPeriodDetailed(effectiveSettings, [], isLearning);
  const currentPhase = getCurrentPhase(effectiveSettings, []);
  const currentDayOfCycle = getCurrentDayOfCycle(effectiveSettings);
  const cycleLength = effectiveSettings.cycleLength || 28;
  const periodLength = effectiveSettings.periodLength || 5;
  const prenom = user?.prenom || user?.nickname || 'Emma';

  // Tracked entries for current month
  const currentMonthKey = today.toISOString().slice(0, 7);
  const trackedDaysThisMonth = journalEntries.filter(
    e => e.date.startsWith(currentMonthKey)
  ).length;

  // Dynamic Phase & Tip calculation per LUNA V1.1 specifications
  const lastPeriodDate = new Date(effectiveSettings.lastPeriodStart);
  const dynamicPhase = getPhase(lastPeriodDate, cycleLength, today);
  const dynamicTip = getTipForToday(dynamicPhase, today);
  const isPrePeriodNotice = prediction.nextPeriodDate
    ? shouldNotifyPrePeriod(new Date(prediction.nextPeriodDate), today)
    : false;

  // Quick action: Set period started today
  const handlePeriodStartToday = () => {
    setCycleSettings({
      ...effectiveSettings,
      lastPeriodStart: todayKey,
      isLearningMode: false,
    });
    setLogModalOpen(true);
  };

  // Week days array (7 days, centered on today)
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - 3 + i);
    return d;
  });

  // Month calendar calculation
  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const days: { date: Date; currentMonth: boolean; key: string }[] = [];

    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        currentMonth: false,
        key: prevDate.toISOString().slice(0, 10),
      });
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const d = new Date(year, month, i);
      days.push({
        date: d,
        currentMonth: true,
        key: d.toISOString().slice(0, 10),
      });
    }

    const remaining = 35 - days.length;
    const toAdd = remaining >= 0 ? remaining : 42 - days.length;
    for (let i = 1; i <= toAdd; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        currentMonth: false,
        key: nextDate.toISOString().slice(0, 10),
      });
    }

    return days;
  };

  const calendarDays = getMonthDays(calendarMonth);

  // Helper to determine day classification
  const isPeriodPast = (dateStr: string) => {
    const d = new Date(dateStr);
    const lastStart = new Date(effectiveSettings.lastPeriodStart);
    const diffDays = Math.round((d.getTime() - lastStart.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays >= 0 && diffDays < periodLength) return true;

    // Check if logged as flow
    const log = journalEntries.find(e => e.date === dateStr);
    if (log?.flow && log.flow !== 'rien' && log.flow !== 'none') return true;

    return false;
  };

  const isPeriodPredicted = (dateStr: string) => {
    if (!prediction.nextPeriodDate) return false;
    const d = new Date(dateStr);
    const nextStart = new Date(prediction.nextPeriodDate);
    const diffNext = Math.round((d.getTime() - nextStart.getTime()) / (1000 * 60 * 60 * 24));
    return diffNext >= 0 && diffNext < periodLength;
  };

  const isOvulation = (dateStr: string) => {
    // If contraception is active, ovulation is disabled per LUNA V1.1 specs
    if (prediction.fertilityDisabled || !prediction.nextPeriodDate) return false;

    const d = new Date(dateStr);
    const nextStart = new Date(prediction.nextPeriodDate);
    const ovulationDay = new Date(nextStart);
    ovulationDay.setDate(ovulationDay.getDate() - 14);

    const diff = Math.round((d.getTime() - ovulationDay.getTime()) / (1000 * 60 * 60 * 24));
    return diff >= -2 && diff <= 1;
  };

  const hasJournalEntry = (dateStr: string) => {
    return journalEntries.some(e => e.date === dateStr);
  };

  const openLogForDay = (dateStr: string) => {
    setSelectedDateForLog(dateStr);
    setLogModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12 animate-fade-in">
      {/* Top Welcome Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#4a2135]">
            Bonjour {prenom}
          </h1>
          <p className="text-xs sm:text-sm text-[#4a2135]/65 capitalize mt-0.5">
            {formatDate(today)}
          </p>
        </div>

        <button
          onClick={() => setCourseOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#fffdfc] border border-[#f6e7e4] text-[#6A2C40] hover:bg-[#fdeeeb] text-xs font-medium shadow-xs transition-colors"
        >
          <BookOpen size={14} />
          <span className="hidden sm:inline">Comprendre son cycle</span>
          <span className="sm:hidden">Guide</span>
        </button>
      </div>

      {/* Pre-period Notification J-3 */}
      {isPrePeriodNotice && (
        <div className="p-4 sm:p-5 rounded-3xl bg-[#fdeeeb] border-2 border-[#6A2C40] flex items-start gap-3.5 shadow-sm animate-pulse">
          <div className="p-2.5 rounded-2xl bg-[#6A2C40] text-white shrink-0 mt-0.5 shadow-xs">
            <Bell size={18} />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A2C40] block">
              Rappel J-3 · Préparation
            </span>
            <p className="text-xs sm:text-sm text-[#4a2135] font-semibold leading-relaxed">
              Tes règles arrivent dans 3 jours. Prépare ton petit sac : 2 serviettes, un mouchoir, de l’eau.
            </p>
          </div>
        </div>
      )}

      {/* Hero Prediction Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#f8e4e2] via-[#f1d6da] to-[#fdeeeb] border border-[#f1d6da] shadow-md shadow-[#6A2C40]/5">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/40 blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6A2C40] bg-white/70 backdrop-blur-xs px-3 py-1 rounded-full border border-white/40">
              Prochaines Règles
            </span>
            <span className="text-xs font-semibold text-[#4a2135]/70">
              {prediction.isLearning
                ? 'Apprentissage'
                : prediction.daysRemaining !== null && prediction.daysRemaining <= 0
                ? 'Aujourd’hui ou en cours'
                : `dans ${prediction.daysRemaining} jours`}
            </span>
          </div>

          <div className="mt-3 mb-2">
            <h2 className="text-3xl sm:text-4xl font-serif text-[#4a2135] tracking-tight">
              {prediction.isLearning ? (
                'On apprend à connaître ton cycle...'
              ) : (
                prediction.displayText
              )}
            </h2>
            <p className="text-sm font-medium text-[#a8506b] mt-1">
              {currentPhase} · <span className="text-[#4a2135]/75">Jour {currentDayOfCycle} sur {cycleLength}</span>
            </p>
          </div>

          {/* Contraception Warning */}
          {prediction.fertilityDisabled && (
            <div className="mt-3 mb-2 p-2.5 rounded-xl bg-white/80 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
              <AlertCircle size={14} className="text-amber-700 shrink-0" />
              <span>Prédiction d’ovulation désactivée (contraception active : {effectiveSettings.contraception})</span>
            </div>
          )}

          {/* Phase progression track */}
          <div className="mt-4 mb-5">
            <div className="flex items-center justify-between text-[11px] font-medium text-[#4a2135]/65 mb-1.5">
              <span>Menstruation</span>
              <span>Folliculaire</span>
              <span>{prediction.fertilityDisabled ? 'Repos' : 'Ovulation'}</span>
              <span>Lutéale</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { label: 'Menstruation', active: currentDayOfCycle <= periodLength },
                { label: 'Folliculaire', active: currentDayOfCycle > periodLength && currentDayOfCycle < cycleLength / 2 - 2 },
                { label: 'Ovulation', active: !prediction.fertilityDisabled && currentDayOfCycle >= cycleLength / 2 - 2 && currentDayOfCycle <= cycleLength / 2 + 2 },
                { label: 'Lutéale', active: currentDayOfCycle > cycleLength / 2 + 2 },
              ].map((phase, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    phase.active
                      ? 'bg-[#6A2C40] shadow-xs'
                      : 'bg-white/60 border border-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Action buttons inside Hero */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              onClick={() => openLogForDay(todayKey)}
              className="px-4 py-2.5 rounded-2xl bg-[#6A2C40] hover:bg-[#7d354c] text-[#fdf3f0] text-xs font-semibold shadow-sm shadow-[#6A2C40]/25 transition-transform active:scale-[0.98] flex items-center gap-1.5"
            >
              <Plus size={15} />
              <span>Noter au journal</span>
            </button>

            <button
              onClick={handlePeriodStartToday}
              className="px-4 py-2.5 rounded-2xl bg-white/80 hover:bg-white text-[#6A2C40] border border-[#f1d6da] text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Droplets size={14} className="text-[#a8506b]" />
              <span>Mes règles ont débuté</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mini-Calendar (ListView horizontal 7 jours, selected = today) */}
      <div className="bg-[#fffdfc] border border-[#f6e7e4] rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4a2135]/70">
            Cette Semaine
          </span>
          <span className="text-[11px] text-[#4a2135]/55">Sélectionne un jour pour renseigner tes ressentis</span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 text-center">
          {weekDays.map((d, i) => {
            const dateStr = d.toISOString().slice(0, 10);
            const isToday = dateStr === todayKey;
            const isPast = isPeriodPast(dateStr);
            const isPredicted = isPeriodPredicted(dateStr);
            const isOvu = isOvulation(dateStr);
            const hasLog = hasJournalEntry(dateStr);

            return (
              <button
                key={i}
                onClick={() => openLogForDay(dateStr)}
                className={`py-2.5 px-1 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  isToday
                    ? 'bg-[#6A2C40] text-[#fdf3f0] shadow-sm shadow-[#6A2C40]/30'
                    : isPast
                    ? 'bg-[#6A2C40]/10 text-[#6A2C40] font-bold'
                    : isPredicted
                    ? 'border-2 border-dashed border-[#FFB3C1] bg-[#fffaf8] text-[#4a2135]'
                    : isOvu
                    ? 'bg-[#FFD166]/20 text-[#4a2135]'
                    : 'bg-[#fffaf8] text-[#4a2135] hover:bg-[#fdeeeb]/60 border border-[#f6e7e4]'
                }`}
              >
                <span className="text-[10px] uppercase font-medium opacity-75">
                  {d.toLocaleDateString('fr-FR', { weekday: 'narrow' })}
                </span>
                <span className="text-sm font-semibold mt-0.5">{d.getDate()}</span>
                
                {/* Pastille */}
                <div className="h-2 flex items-center justify-center gap-1 mt-1">
                  {isPast && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6A2C40]" />
                  )}
                  {isPredicted && (
                    <span className="w-1.5 h-1.5 rounded-full border border-[#FFB3C1] bg-white" />
                  )}
                  {isOvu && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD166]" />
                  )}
                  {hasLog && !isPast && !isPredicted && !isOvu && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a8506b]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Full Calendar (Custom builder with isPeriodPast #6A2C40, isPeriodPredicted #FFB3C1, isOvulation #FFD166) */}
      <div className="bg-[#fffdfc] border border-[#f6e7e4] rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon size={18} className="text-[#a8506b]" />
            <h3 className="text-lg font-serif text-[#4a2135] capitalize">
              {calendarMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
            </h3>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                const prev = new Date(calendarMonth);
                prev.setMonth(prev.getMonth() - 1);
                setCalendarMonth(prev);
              }}
              className="p-1.5 text-[#4a2135]/60 hover:text-[#4a2135] rounded-xl hover:bg-[#fdeeeb] transition-colors"
              aria-label="Mois précédent"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCalendarMonth(new Date())}
              className="px-2.5 py-1 text-xs font-semibold text-[#6A2C40] hover:bg-[#fdeeeb] rounded-lg transition-colors"
            >
              Aujourd’hui
            </button>
            <button
              onClick={() => {
                const next = new Date(calendarMonth);
                next.setMonth(next.getMonth() + 1);
                setCalendarMonth(next);
              }}
              className="p-1.5 text-[#4a2135]/60 hover:text-[#4a2135] rounded-xl hover:bg-[#fdeeeb] transition-colors"
              aria-label="Mois suivant"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((name, i) => (
            <div key={i} className="text-[11px] font-bold text-[#4a2135]/50 py-1">
              {name}
            </div>
          ))}
        </div>

        {/* Month grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((item, idx) => {
            const isToday = item.key === todayKey;
            const isPast = isPeriodPast(item.key);
            const isPredicted = isPeriodPredicted(item.key);
            const isOvu = isOvulation(item.key);
            const hasLog = hasJournalEntry(item.key);

            return (
              <button
                key={idx}
                onClick={() => openLogForDay(item.key)}
                className={`min-h-[46px] p-1 rounded-xl text-center relative flex flex-col items-center justify-center transition-all ${
                  !item.currentMonth
                    ? 'opacity-25 text-[#4a2135]/40 hover:opacity-60'
                    : isToday
                    ? 'bg-[#6A2C40] text-[#fdf3f0] font-bold shadow-xs'
                    : isPast
                    ? 'bg-[#fdeeeb] text-[#6A2C40] font-bold border border-[#f1d6da]'
                    : isPredicted
                    ? 'border-2 border-dashed border-[#FFB3C1] bg-[#fffaf8] text-[#4a2135]'
                    : isOvu
                    ? 'bg-[#FFD166]/20 text-[#4a2135] font-semibold'
                    : 'text-[#4a2135] hover:bg-[#fdeeeb]/60'
                }`}
              >
                <span className="text-xs">{item.date.getDate()}</span>

                {/* Custom dot indicator */}
                <div className="h-2 flex items-center justify-center gap-1 mt-0.5">
                  {isPast && (
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isToday ? 'bg-white' : 'bg-[#6A2C40]'
                      }`}
                      title="Règles passées"
                    />
                  )}
                  {isPredicted && (
                    <span
                      className="w-2 h-2 rounded-full border border-[#FFB3C1] bg-white"
                      title="Prédiction"
                    />
                  )}
                  {isOvu && (
                    <span
                      className="w-2 h-2 rounded-full bg-[#FFD166]"
                      title="Ovulation"
                    />
                  )}
                  {hasLog && !isPast && !isPredicted && !isOvu && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isToday ? 'bg-white' : 'bg-[#a8506b]'
                      }`}
                      title="Journal noté"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-[#f6e7e4] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#4a2135]/75">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#6A2C40]" />
            <span>Règles passées (prune #6A2C40)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-dashed border-[#FFB3C1] bg-white" />
            <span>Prédiction (rose clair #FFB3C1)</span>
          </div>
          {!prediction.fertilityDisabled && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FFD166]" />
              <span>Ovulation (jaune #FFD166)</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#a8506b]" />
            <span>Noté au journal</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: [Conseil du jour - Dynamic from assets/tips.json] */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#fdeeeb] border border-[#f1d6da] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-2xl bg-white text-[#6A2C40] shrink-0 mt-0.5 shadow-xs">
            <Lightbulb size={20} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#6A2C40] uppercase tracking-wider bg-white/70 px-2.5 py-0.5 rounded-full border border-[#f1d6da]">
                {getPhaseLabel(dynamicPhase)}
              </span>
              <span className="text-[11px] text-[#4a2135]/60 font-medium">
                {dynamicTip.categorie} · {dynamicTip.duree}
              </span>
            </div>
            <h3 className="font-serif text-sm sm:text-base font-bold text-[#4a2135]">
              {dynamicTip.titre}
            </h3>
            <p className="text-xs sm:text-sm text-[#4a2135]/80 leading-relaxed max-w-xl">
              {dynamicTip.contenu}
            </p>
          </div>
        </div>

        {onOpenTips && (
          <button
            onClick={onOpenTips}
            className="self-end sm:self-center shrink-0 px-4 py-2.5 rounded-2xl bg-white border border-[#f1d6da] text-[#6A2C40] hover:bg-[#6A2C40] hover:text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Tous les conseils →
          </button>
        )}
      </div>

      {/* Modals */}
      <CycleCourseModal isOpen={courseOpen} onClose={() => setCourseOpen(false)} />
      <LogModal
        isOpen={logModalOpen}
        onClose={() => setLogModalOpen(false)}
        initialDate={selectedDateForLog}
      />
    </div>
  );
};
