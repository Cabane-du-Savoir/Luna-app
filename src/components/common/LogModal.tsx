import React, { useState, useEffect } from 'react';
import { X, Check, Calendar, Heart, Smile, Sparkles } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { Flow, Mood } from '../../types/data';

interface LogModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: string;
}

const FLOW_OPTIONS: { id: Flow; label: string; desc: string }[] = [
  { id: 'none', label: 'Aucun', desc: 'Pas de saignement' },
  { id: 'light', label: 'Léger', desc: 'Quelques gouttes' },
  { id: 'medium', label: 'Moyen', desc: 'Flux normal' },
  { id: 'heavy', label: 'Abondant', desc: 'Protection changée souvent' },
];

const MOOD_OPTIONS: { id: Mood; label: string; emoji: string }[] = [
  { id: 'good', label: 'Bien', emoji: '😊' },
  { id: 'tired', label: 'Fatiguée', emoji: '😴' },
  { id: 'irritable', label: 'À cran', emoji: '😠' },
  { id: 'sad', label: 'Triste', emoji: '😢' },
];

const SYMPTOMS_LIST = [
  'Crampes',
  'Fatigue',
  'Maux de tête',
  'Nausée',
  'Acné',
  'Ballonnements',
  'Douleurs lombaires',
  'Seins sensibles',
  'Énergie basse',
  'Autre',
];

export const LogModal: React.FC<LogModalProps> = ({ isOpen, onClose, initialDate }) => {
  const todayKey = initialDate || new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(todayKey);
  const [flow, setFlow] = useState<Flow | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const getJournalEntry = useDataStore(state => state.getJournalEntry);
  const addJournalEntry = useDataStore(state => state.addJournalEntry);

  useEffect(() => {
    if (isOpen) {
      setDate(todayKey);
      const entry = getJournalEntry(todayKey);
      if (entry) {
        setFlow(entry.flow ?? null);
        setMood(entry.mood ?? null);
        setSymptoms(entry.symptoms || []);
        setNotes(entry.notes ?? '');
      } else {
        setFlow(null);
        setMood(null);
        setSymptoms([]);
        setNotes('');
      }
      setSavedSuccess(false);
    }
  }, [isOpen, todayKey, getJournalEntry]);

  // When date changes in modal
  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    const entry = getJournalEntry(newDate);
    if (entry) {
      setFlow(entry.flow ?? null);
      setMood(entry.mood ?? null);
      setSymptoms(entry.symptoms || []);
      setNotes(entry.notes ?? '');
    } else {
      setFlow(null);
      setMood(null);
      setSymptoms([]);
      setNotes('');
    }
  };

  const toggleSymptom = (symptom: string) => {
    setSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSave = () => {
    addJournalEntry({
      id: date,
      date,
      flow: flow ?? undefined,
      mood: mood ?? undefined,
      symptoms,
      note: notes.trim() || undefined,
      notes: notes.trim() || undefined,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4a2135]/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#fffaf8] border border-[#f6e7e4] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#4a2135]/60 hover:text-[#4a2135] rounded-full hover:bg-[#fdeeeb] transition-colors"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        <div className="mb-5">
          <span className="text-xs font-semibold text-[#7a2d4f] uppercase tracking-wider">
            Enregistrement Quotidien
          </span>
          <h2 className="text-2xl font-serif text-[#4a2135] mt-1">Comment te sens-tu ?</h2>
          <div className="flex items-center gap-2 mt-2">
            <Calendar size={14} className="text-[#a8506b]" />
            <input
              type="date"
              value={date}
              onChange={e => handleDateChange(e.target.value)}
              className="text-xs bg-[#fdeeeb] border border-[#f1d6da] rounded-lg px-2 py-1 text-[#4a2135] focus:outline-none focus:ring-1 focus:ring-[#7a2d4f]"
            />
          </div>
        </div>

        <div className="space-y-5">
          {/* Flux */}
          <div>
            <label className="block text-xs font-semibold text-[#4a2135]/75 uppercase tracking-wider mb-2">
              Flux des règles
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FLOW_OPTIONS.map(opt => {
                const isSelected = flow === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFlow(opt.id)}
                    className={`p-2.5 text-left rounded-xl border text-sm transition-all ${
                      isSelected
                        ? 'border-[#7a2d4f] bg-[#fdeeeb] shadow-sm'
                        : 'border-[#f6e7e4] bg-[#fffdfc] hover:border-[#f1d6da]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${isSelected ? 'text-[#7a2d4f]' : 'text-[#4a2135]'}`}>
                        {opt.label}
                      </span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[#7a2d4f]" />}
                    </div>
                    <span className="text-[11px] text-[#4a2135]/60 block mt-0.5">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Humeur */}
          <div>
            <label className="block text-xs font-semibold text-[#4a2135]/75 uppercase tracking-wider mb-2">
              Humeur générale
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {MOOD_OPTIONS.map(opt => {
                const isSelected = mood === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setMood(opt.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-sm transition-all ${
                      isSelected
                        ? 'border-[#7a2d4f] bg-[#fdeeeb] text-[#7a2d4f] font-medium'
                        : 'border-[#f6e7e4] bg-[#fffdfc] text-[#4a2135] hover:border-[#f1d6da]'
                    }`}
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <span className="text-xs">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Symptômes */}
          <div>
            <label className="block text-xs font-semibold text-[#4a2135]/75 uppercase tracking-wider mb-2">
              Symptômes ressentis
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SYMPTOMS_LIST.map(sym => {
                const isSelected = symptoms.includes(sym);
                return (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => toggleSymptom(sym)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                      isSelected
                        ? 'bg-[#7a2d4f] text-[#fdf3f0] shadow-sm'
                        : 'bg-[#fffdfc] border border-[#f6e7e4] text-[#4a2135]/80 hover:border-[#f1d6da]'
                    }`}
                  >
                    {sym}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#4a2135]/75 uppercase tracking-wider mb-2">
              Notes personnelles (confidentielles)
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Écris tes observations, ressentis ou questions pour ton prochain rendez-vous..."
              rows={3}
              className="w-full p-3 rounded-2xl bg-[#fffdfc] border border-[#f6e7e4] focus:border-[#7a2d4f] focus:outline-none text-sm text-[#4a2135] placeholder:text-[#4a2135]/40 resize-none"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl border border-[#f1d6da] text-[#4a2135]/70 hover:bg-[#fdeeeb] text-sm font-medium transition-colors"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-3 px-4 rounded-2xl bg-[#7a2d4f] hover:bg-[#8f3a5d] text-[#fdf3f0] text-sm font-medium transition-all shadow-md shadow-[#7a2d4f]/20 flex items-center justify-center gap-2"
          >
            {savedSuccess ? (
              <>
                <Check size={16} />
                <span>Enregistré !</span>
              </>
            ) : (
              <span>Sauvegarder</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
