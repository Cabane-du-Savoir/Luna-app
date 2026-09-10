import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Plus,
  Heart,
  MessageCircle,
  ShieldCheck,
  Send,
  X,
  Sparkles,
  AlertTriangle,
  PhoneCall,
  UserCheck,
  EyeOff
} from 'lucide-react';
import { Question } from '../../types/data';
import { checkUrgentKeywords, UrgentKeywordMatch } from '../../constants/urgentKeywords';

const STORAGE_KEY = '@luna_questions_v1';
const DISCLAIMER_KEY = '@luna_qa_disclaimer_accepted';

const DEFAULT_QUESTIONS: Question[] = [
  {
    id: '1',
    text: 'Est-ce normal d’avoir des variations dans la durée de mes règles d’un mois à l’autre ?',
    isAnonymous: true,
    status: 'answered_pro',
    proAnswer:
      'Oui, de légères variations (2 à 4 jours) sont très fréquentes, en particulier lors des premières années, ou en période de fatigue, de stress ou de changement d’alimentation.',
    isVerified: true,
    createdAt: new Date(Date.now() - 3600 * 2000).toISOString(),
    tag: 'Cycle',
    likes: 18,
  },
  {
    id: '2',
    text: 'Comment apaiser les crampes menstruelles sans toujours prendre des comprimés ?',
    isAnonymous: true,
    status: 'answered_pro',
    proAnswer:
      'Une bouillotte chaude sur le bas-ventre, des étirements doux du bassin (posture de l’enfant), des tisanes chaudes (camomille, gingembre) et une bonne hydratation apportent souvent un réel soulagement.',
    isVerified: true,
    createdAt: new Date(Date.now() - 3600 * 8000).toISOString(),
    tag: 'Douleurs',
    likes: 24,
  },
  {
    id: '3',
    text: 'Est-ce qu’on peut tomber enceinte juste après la fin des règles ?',
    isAnonymous: true,
    status: 'answered_pro',
    proAnswer:
      'Oui, c’est possible, particulièrement pour les cycles courts où l’ovulation survient tôt, et car les spermatozoïdes peuvent survivre jusqu’à 5 jours dans les voies génitales.',
    isVerified: true,
    createdAt: new Date(Date.now() - 3600 * 24000).toISOString(),
    tag: 'Fertilité',
    likes: 12,
  },
];

export const QuestionsView: React.FC = () => {
  // Disclaimer state (Mandatory checkbox)
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState<boolean>(() => {
    return localStorage.getItem(DISCLAIMER_KEY) === 'true';
  });

  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_QUESTIONS;
    } catch {
      return DEFAULT_QUESTIONS;
    }
  });

  const [filter, setFilter] = useState<'all' | 'recent' | 'unanswered'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true); // Default TRUE per LUNA V1.1 specs
  const [categoryTag, setCategoryTag] = useState('Général');
  const [urgentAlert, setUrgentAlert] = useState<UrgentKeywordMatch | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  }, [questions]);

  const handleToggleDisclaimer = (checked: boolean) => {
    setAcceptedDisclaimer(checked);
    localStorage.setItem(DISCLAIMER_KEY, checked ? 'true' : 'false');
  };

  const handleOpenAskModal = () => {
    if (!acceptedDisclaimer) {
      alert('Veuillez cocher l’avertissement médical en haut de page avant de poser une question.');
      return;
    }
    setModalOpen(true);
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    // Check banned urgent keywords list
    const match = checkUrgentKeywords(questionText);
    if (match.matched) {
      setUrgentAlert(match);
      return; // Block submit!
    }

    // Local AI / Pro mock response for immediate support
    let mockAnswer =
      'Merci pour ta question. Chaque corps réagit à son rythme. Garde une bonne hydratation, note tes ressentis dans ton journal Luna et n’hésite pas à consulter un professionnel de santé en cas de doute persistant.';

    if (questionText.toLowerCase().includes('perte') || questionText.toLowerCase().includes('odeur')) {
      mockAnswer =
        'Les pertes transparentes ou blanchâtres sans odeur forte sont naturelles et protègent la flore. Si la couleur vire au vert/gris ou s’accompagne de brûlures, un prélèvement en cabinet médical est recommandé.';
    } else if (questionText.toLowerCase().includes('retard')) {
      mockAnswer =
        'Un retard de quelques jours peut être causé par le stress, une fatigue passagère ou un changement de rythme. En cas de rapports sexuels sans protection, un test urinaire de grossesse après quelques jours de retard reste le meilleur repère.';
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      text: questionText.trim(),
      isAnonymous,
      status: 'answered_ai',
      aiAnswer: mockAnswer,
      isVerified: true,
      createdAt: new Date().toISOString(),
      tag: categoryTag,
      likes: 1,
    };

    setQuestions([newQuestion, ...questions]);
    setQuestionText('');
    setModalOpen(false);
  };

  const handleLike = (id: string) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, likes: (q.likes || 0) + 1 } : q))
    );
  };

  const filteredQuestions = questions.filter(q => {
    if (filter === 'unanswered') return q.status === 'pending';
    return true;
  });

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12 animate-fade-in">
      {/* Top Medical Disclaimer Card (Mandatory Checkbox) */}
      <div className="p-5 rounded-3xl bg-[#fffdfc] border-2 border-[#f1d6da] shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-2xl bg-[#fdeeeb] text-[#6A2C40] shrink-0 mt-0.5">
            <AlertTriangle size={20} />
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="font-serif text-sm font-bold text-[#4a2135]">
              Avertissement médical préalable
            </h3>
            <p className="text-xs text-[#4a2135]/75 leading-relaxed">
              Les réponses fournies sont purement informatives et éducatives. Elles ne constituent en aucun cas un diagnostic ou une prescription médicale.
            </p>
            <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={acceptedDisclaimer}
                onChange={e => handleToggleDisclaimer(e.target.checked)}
                className="w-4 h-4 accent-[#6A2C40] rounded"
              />
              <span className="text-xs font-semibold text-[#6A2C40]">
                J’ai compris que ceci ne remplace pas une consultation médicale
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Header and CTA */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#4a2135]">
            Questions & Réponses
          </h1>
          <p className="text-xs sm:text-sm text-[#4a2135]/65 mt-0.5">
            Pose tes questions en toute discrétion et lis les conseils validés.
          </p>
        </div>

        <button
          onClick={handleOpenAskModal}
          disabled={!acceptedDisclaimer}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#6A2C40] hover:bg-[#7d354c] text-white text-xs font-semibold shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Plus size={16} />
          <span>Poser ma question</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#f6e7e4] pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            filter === 'all'
              ? 'bg-[#6A2C40] text-white'
              : 'text-[#4a2135]/70 hover:text-[#4a2135]'
          }`}
        >
          Toutes les questions
        </button>
        <button
          onClick={() => setFilter('recent')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            filter === 'recent'
              ? 'bg-[#6A2C40] text-white'
              : 'text-[#4a2135]/70 hover:text-[#4a2135]'
          }`}
        >
          Récentes
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map(q => (
          <div
            key={q.id}
            className="p-5 sm:p-6 rounded-3xl bg-[#fffdfc] border border-[#f6e7e4] space-y-4 shadow-xs"
          >
            {/* Header: Tag + Author + Anonymous Badge */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#fdeeeb] text-[#6A2C40] text-[11px] font-bold">
                  {q.tag || 'Général'}
                </span>
                <span className="text-[#4a2135]/60">
                  {q.isAnonymous ? 'Anonyme' : 'Utilisatrice'}
                </span>
              </div>
              <span className="text-[11px] text-[#4a2135]/50">
                {new Date(q.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                })}
              </span>
            </div>

            {/* Question Text */}
            <p className="font-serif text-base text-[#4a2135] leading-snug">
              {q.text}
            </p>

            {/* Answer */}
            {(q.proAnswer || q.aiAnswer) && (
              <div className="p-4 rounded-2xl bg-[#fffaf8] border border-[#f1d6da] space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#6A2C40]" />
                  <span className="text-xs font-bold text-[#6A2C40]">
                    {q.status === 'answered_pro'
                      ? 'Réponse vérifiée par sage-femme'
                      : 'Réponse informative Luna'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#4a2135]/85 leading-relaxed">
                  {q.proAnswer || q.aiAnswer}
                </p>
              </div>
            )}

            {/* Interactions */}
            <div className="flex items-center justify-between pt-1 border-t border-[#f6e7e4] text-xs text-[#4a2135]/60">
              <button
                onClick={() => handleLike(q.id)}
                className="flex items-center gap-1.5 hover:text-[#6A2C40] transition-colors"
              >
                <Heart size={14} className={q.likes ? 'text-rose-500 fill-rose-500' : ''} />
                <span>{q.likes || 0} utile</span>
              </button>
              <span className="text-[11px] text-[#4a2135]/40">
                Confidentiel & Bienveillant
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: Poser une question */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#fffdfc] rounded-3xl p-6 border border-[#f6e7e4] shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-2xl bg-[#fdeeeb] text-[#6A2C40]">
                  <HelpCircle size={20} />
                </div>
                <h3 className="font-serif text-lg text-[#4a2135]">
                  Poser une question
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-[#4a2135]/50 hover:text-[#4a2135] rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitQuestion} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4a2135]/70 mb-1.5">
                  Thématique
                </label>
                <select
                  value={categoryTag}
                  onChange={e => setCategoryTag(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-[#fffaf8] border border-[#f6e7e4] text-xs text-[#4a2135]"
                >
                  <option value="Toilette">Toilette & Hygiène</option>
                  <option value="Cycle">Cycle & Retards</option>
                  <option value="Douleurs">Douleurs & Crampes</option>
                  <option value="Pertes & Odeurs">Pertes & Odeurs</option>
                  <option value="Fertilité">Fertilité & Contraception</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4a2135]/70 mb-1.5">
                  Ta question (sois précise)
                </label>
                <textarea
                  rows={4}
                  value={questionText}
                  onChange={e => setQuestionText(e.target.value)}
                  placeholder="Ex : Est-ce normal d’avoir des spottings marrons au milieu de mon cycle ?"
                  required
                  className="w-full p-3.5 rounded-2xl bg-[#fffaf8] border border-[#f6e7e4] text-xs text-[#4a2135] focus:outline-none focus:border-[#6A2C40] resize-none"
                />
              </div>

              {/* Toggle "Anonyme ON" default TRUE */}
              <div className="p-3.5 rounded-2xl bg-[#fdeeeb] border border-[#f1d6da] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <EyeOff size={16} className="text-[#6A2C40]" />
                  <span className="text-xs font-semibold text-[#4a2135]">
                    Mode Anonyme
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    isAnonymous ? 'bg-[#6A2C40] justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-xs" />
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#6A2C40] hover:bg-[#7d354c] text-white font-semibold text-sm shadow-md shadow-[#6A2C40]/25 transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Send size={16} />
                <span>Envoyer ma question</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* URGENT MEDICAL EMERGENCY DIALOG (Banned keywords match) */}
      {urgentAlert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 border-2 border-rose-400 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex items-center gap-3 text-rose-700">
              <AlertTriangle size={28} />
              <h3 className="font-serif text-lg font-bold">
                {urgentAlert.emergencyTitle}
              </h3>
            </div>

            <p className="text-xs text-[#4a2135] leading-relaxed">
              {urgentAlert.emergencyMessage}
            </p>

            <div className="space-y-2 p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
              <span className="text-xs font-bold text-rose-900 block">
                Numéros d’assistance et urgences :
              </span>
              {urgentAlert.hotlines.map((h, i) => (
                <div key={i} className="flex items-center justify-between text-xs text-rose-800">
                  <span>{h.label}</span>
                  <span className="font-bold">{h.phone}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-gray-500">
              Luna a bloqué l’envoi de cette question en ligne pour ta propre sécurité et t’invite à te tourner vers des soignants immédiatement.
            </p>

            <button
              onClick={() => setUrgentAlert(null)}
              className="w-full py-3 px-4 rounded-2xl bg-[#6A2C40] text-white text-xs font-semibold"
            >
              J’ai compris, fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
