import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Check,
  Search,
  Droplets,
  Heart,
  Trash2,
  Clock,
  Sparkles
} from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { Flow, Mood, DailyLog } from '../../types/data';

const FLOW_OPTIONS: { id: Flow; label: string; desc: string }[] = [
  { id: 'rien', label: 'Rien', desc: 'Pas de règles' },
  { id: 'leger', label: 'Léger', desc: 'Quelques gouttes' },
  { id: 'moyen', label: 'Moyen', desc: 'Flux régulier' },
  { id: 'abondant', label: 'Abondant', desc: 'Flux très intense' },
];

const MOOD_OPTIONS: { id: Mood; label: string; emoji: string }[] = [
  { id: 'happy', label: 'Bien', emoji: '😊' },
  { id: 'calm', label: 'Calme', emoji: '😌' },
  { id: 'irritable', label: 'À cran', emoji: '😠' },
  { id: 'sad', label: 'Triste', emoji: '😢' },
];

const SYMPTOM_OPTIONS = [
  'Crampes',
  'Fatigue',
  'Maux de tête',
  'Nausée',
  'Acné',
  'Ballonnements',
  'Douleurs lombaires',
  'Seins sensibles',
  'Sensibilité accrue',
  'Migraine',
];

export const JournalView: React.FC = () => {
  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);

  // Format Header: "Aujourd'hui - ven. 11 sept."
  const formattedTodayHeader = `Aujourd’hui - ${today.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })}`;

  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [flow, setFlow] = useState<Flow | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const entries = useDataStore(state => state.journalEntries);
  const getJournalEntry = useDataStore(state => state.getJournalEntry);
  const addJournalEntry = useDataStore(state => state.addJournalEntry);

  // Sync state when selected date changes
  useEffect(() => {
    const entry = getJournalEntry(selectedDate);
    if (entry) {
      setFlow(entry.flow || null);
      setMood(entry.mood || null);
      setSymptoms(entry.symptoms || []);
      setNote(entry.note || entry.notes || '');
    } else {
      setFlow(null);
      setMood(null);
      setSymptoms([]);
      setNote('');
    }
  }, [selectedDate, getJournalEntry]);

  const toggleSymptom = (sym: string) => {
    setSymptoms(prev =>
      prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addJournalEntry({
      id: selectedDate,
      date: selectedDate,
      flow,
      mood,
      symptoms,
      note,
      notes: note,
    });

    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);
  };

  // Section Récemment: Sort by date descending, limit 5
  const recentEntries = [...entries]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12 animate-fade-in relative">
      {/* SNACKBAR NOTIFICATION "Noté! 💜" */}
      {showSnackbar && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#6A2C40] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <Sparkles size={18} className="text-[#FFD166]" />
          <span className="font-semibold text-sm">Noté ! 💜</span>
        </div>
      )}

      {/* Header: "Aujourd'hui - ven. 11 sept." */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#4a2135] capitalize">
            {formattedTodayHeader}
          </h1>
          <p className="text-xs sm:text-sm text-[#4a2135]/65 mt-0.5">
            Note ton flux, ton humeur et tes ressentis du jour en toute intimité.
          </p>
        </div>

        {/* Date Selector */}
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="text-xs font-semibold p-2.5 rounded-2xl bg-[#fffdfc] border border-[#f6e7e4] text-[#6A2C40] focus:outline-none focus:ring-1 focus:ring-[#6A2C40]"
        />
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSave}
        className="bg-[#fffdfc] rounded-3xl border border-[#f6e7e4] p-5 sm:p-7 space-y-6 shadow-xs"
      >
        {/* Chips Flow: Single Select */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4a2135]/70 mb-2">
            Flux menstruel
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {FLOW_OPTIONS.map(opt => {
              const isSelected = flow === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setFlow(isSelected ? null : opt.id)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? 'border-[#6A2C40] bg-[#fdeeeb] text-[#6A2C40] shadow-xs'
                      : 'border-[#f6e7e4] bg-[#fffaf8] text-[#4a2135] hover:border-[#f1d6da]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{opt.label}</span>
                    <Droplets
                      size={14}
                      className={isSelected ? 'text-[#6A2C40]' : 'text-[#4a2135]/30'}
                    />
                  </div>
                  <p className="text-[11px] text-[#4a2135]/60 mt-1">{opt.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Emoji Mood: 4 options */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4a2135]/70 mb-2">
            Humeur du jour
          </label>
          <div className="grid grid-cols-4 gap-2.5">
            {MOOD_OPTIONS.map(opt => {
              const isSelected = mood === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setMood(isSelected ? null : opt.id)}
                  className={`p-3 rounded-2xl flex flex-col items-center justify-center border transition-all ${
                    isSelected
                      ? 'border-[#6A2C40] bg-[#fdeeeb] text-[#6A2C40] shadow-xs scale-[1.02]'
                      : 'border-[#f6e7e4] bg-[#fffaf8] text-[#4a2135] hover:border-[#f1d6da]'
                  }`}
                >
                  <span className="text-2xl mb-1">{opt.emoji}</span>
                  <span className="text-xs font-medium">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Symptoms: Multi-Select Wrap Chips */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4a2135]/70 mb-2">
            Symptômes & ressentis
          </label>
          <div className="flex flex-wrap gap-2">
            {SYMPTOM_OPTIONS.map(sym => {
              const isSelected = symptoms.includes(sym);
              return (
                <button
                  type="button"
                  key={sym}
                  onClick={() => toggleSymptom(sym)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-[#6A2C40] text-white shadow-xs'
                      : 'bg-[#fffaf8] text-[#4a2135]/75 border border-[#f6e7e4] hover:bg-[#fdeeeb]'
                  }`}
                >
                  {sym}
                </button>
              );
            })}
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4a2135]/70 mb-2">
            Note personnelle (facultative)
          </label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Écris librement ce qui te traverse l’esprit..."
            rows={3}
            className="w-full p-3.5 rounded-2xl bg-[#fffaf8] border border-[#f6e7e4] text-xs text-[#4a2135] focus:outline-none focus:border-[#6A2C40] resize-none"
          />
        </div>

        {/* CTA Enregistrer */}
        <button
          type="submit"
          className="w-full py-4 px-6 rounded-2xl bg-[#6A2C40] hover:bg-[#7d354c] text-white font-semibold text-sm shadow-md shadow-[#6A2C40]/25 transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Check size={18} />
          <span>Enregistrer mon journal</span>
        </button>
      </form>

      {/* Section Récemment: Query limit(5) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#4a2135]/70 flex items-center gap-1.5">
            <Clock size={14} className="text-[#a8506b]" />
            <span>Récemment (5 dernières entrées)</span>
          </h2>
        </div>

        {recentEntries.length === 0 ? (
          <div className="p-6 rounded-3xl bg-[#fffdfc] border border-[#f6e7e4] text-center text-xs text-[#4a2135]/60">
            Aucun enregistrement pour le moment. Renseigne ton premier jour ci-dessus !
          </div>
        ) : (
          <div className="space-y-2.5">
            {recentEntries.map(entry => {
              const entryDate = new Date(entry.date);
              const formattedDate = entryDate.toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              });

              return (
                <div
                  key={entry.date}
                  onClick={() => setSelectedDate(entry.date)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedDate === entry.date
                      ? 'border-[#6A2C40] bg-[#fdeeeb]'
                      : 'border-[#f6e7e4] bg-[#fffdfc] hover:border-[#f1d6da]'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#4a2135] capitalize">
                      {formattedDate}
                    </span>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {entry.flow && (
                        <span className="px-2 py-0.5 rounded-full bg-[#fdeeeb] text-[#6A2C40] text-[11px] font-semibold">
                          Flux : {entry.flow}
                        </span>
                      )}
                      {entry.mood && (
                        <span className="px-2 py-0.5 rounded-full bg-[#fffaf8] border border-[#f6e7e4] text-[#4a2135] text-[11px]">
                          Humeur : {entry.mood}
                        </span>
                      )}
                      {entry.symptoms && entry.symptoms.length > 0 && (
                        <span className="text-[11px] text-[#4a2135]/60">
                          {entry.symptoms.slice(0, 3).join(', ')}
                          {entry.symptoms.length > 3 ? '...' : ''}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-xs text-[#6A2C40] font-semibold">
                    Modifier →
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
