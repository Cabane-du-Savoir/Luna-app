import React, { useState } from 'react';
import { X, Sparkles, ChevronRight, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CycleCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CycleCourseModal: React.FC<CycleCourseModalProps> = ({ isOpen, onClose }) => {
  const [courseStep, setCourseStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const courseSteps = [
    {
      title: 'Le cycle commence au jour 1',
      body: 'Le jour 1 est le tout premier jour des règles (premiers saignements réels). Chaque nouveau cycle recommence au premier jour des règles suivantes.',
      exercise: 'Exemple : si tes règles commencent le 3 mai, le 3 mai est exactement le jour 1 de ton cycle.',
      badge: 'Bases Essentielles',
    },
    {
      title: 'Compter la durée du cycle',
      body: 'La durée d’un cycle se compte du premier jour des règles jusqu’à la veille des règles suivantes. Elle est différente de la durée des saignements (qui dure généralement 3 à 7 jours).',
      exercise: 'Exemple : début le 3 mai, prochaines règles le 31 mai : durée du cycle = 28 jours.',
      badge: 'Calcul du cycle',
    },
    {
      title: 'Estimer les prochaines règles',
      body: 'Pour une première estimation, ajoute la durée habituelle de ton cycle à la date de début de tes dernières règles.',
      exercise: 'Exemple : début le 3 mai + 28 jours = prochaines règles estimées autour du 31 mai.',
      badge: 'Anticipation',
    },
    {
      title: 'Une estimation, jamais une certitude absolue',
      body: 'Le stress, la fatigue, les émotions, les voyages et les changements hormonaux peuvent naturellement décaler un cycle de quelques jours. Observer plusieurs cycles permet de mieux connaître tes rythmes personnels.',
      exercise: 'Si tes cycles varient beaucoup, Luna prend en compte une plage estimée plutôt qu’un jour fixe.',
      badge: 'Santé & Écoute de soi',
    },
  ];

  if (!isOpen) return null;

  const isQuiz = courseStep === courseSteps.length;
  const quizCorrect = selectedAnswer === 1;

  const handleSelectQuiz = (index: number) => {
    setSelectedAnswer(index);
    if (index === 1) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {}
    }
  };

  const handleReset = () => {
    setCourseStep(0);
    setSelectedAnswer(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4a2135]/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#fffaf8] border border-[#f6e7e4] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#f6e7e4]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#fdeeeb] text-[#7a2d4f] flex items-center justify-center font-serif text-base">
              ✦
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#a8506b]">Mini-cours</span>
              <h3 className="text-base font-serif text-[#4a2135]">Comprendre son cycle</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-[#4a2135]/60 bg-[#fdeeeb] px-2.5 py-1 rounded-full">
              {isQuiz ? 'Quiz final' : `${courseStep + 1} / ${courseSteps.length}`}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-[#4a2135]/60 hover:text-[#4a2135] rounded-full hover:bg-[#fdeeeb] transition-colors"
              aria-label="Fermer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {!isQuiz ? (
          <div className="space-y-4">
            <span className="inline-block text-xs font-semibold text-[#7a2d4f] bg-[#fdeeeb] border border-[#f1d6da] px-2.5 py-0.5 rounded-full">
              {courseSteps[courseStep].badge}
            </span>

            <h4 className="text-xl font-serif text-[#4a2135]">
              {courseSteps[courseStep].title}
            </h4>

            <p className="text-sm text-[#4a2135]/80 leading-relaxed">
              {courseSteps[courseStep].body}
            </p>

            <div className="p-4 rounded-2xl bg-[#fffdfc] border border-[#f1d6da] mt-3">
              <span className="text-[11px] font-bold text-[#a8506b] tracking-wider uppercase block mb-1">
                Petit exercice concret
              </span>
              <p className="text-xs text-[#4a2135]/90 font-medium">
                {courseSteps[courseStep].exercise}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#7a2d4f]">
              <Award size={20} />
              <span className="text-xs font-bold uppercase tracking-wider">Mets en pratique</span>
            </div>

            <h4 className="text-lg font-serif text-[#4a2135]">
              Un cycle de 30 jours commence le 1er juin. Quand commencent approximativement les règles suivantes ?
            </h4>

            <div className="space-y-2 mt-3">
              {[
                { text: '29 juin', index: 0 },
                { text: '30 juin ou 1er juillet (environ 30 jours après)', index: 1 },
                { text: '15 juillet', index: 2 },
              ].map(opt => (
                <button
                  key={opt.index}
                  type="button"
                  onClick={() => handleSelectQuiz(opt.index)}
                  className={`w-full p-3.5 rounded-2xl text-left text-sm font-medium border transition-all ${
                    selectedAnswer === opt.index
                      ? selectedAnswer === 1
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200'
                        : 'border-rose-400 bg-rose-50 text-rose-900'
                      : 'border-[#f6e7e4] bg-[#fffdfc] text-[#4a2135] hover:border-[#f1d6da]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt.text}</span>
                    {selectedAnswer === opt.index && (
                      <span className="text-xs font-bold">
                        {opt.index === 1 ? '✓ Exact !' : 'Essaye encore'}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {selectedAnswer !== null && (
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  quizCorrect
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-[#fdeeeb] text-[#7a2d4f] border border-[#f1d6da]'
                }`}
              >
                {quizCorrect
                  ? '🎉 Bravo ! En ajoutant 30 jours au 1er jour du cycle (le 1er juin), on arrive autour du 30 juin / 1er juillet.'
                  : 'Presque ! Rappelle-toi qu’on compte la durée complète du cycle à partir du 1er jour des règles.'}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#f6e7e4] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#4a2135]/65 hover:text-[#4a2135] transition-colors"
          >
            Quitter
          </button>

          <div className="flex gap-2">
            {courseStep > 0 && !isQuiz && (
              <button
                type="button"
                onClick={() => setCourseStep(courseStep - 1)}
                className="px-4 py-2 rounded-xl border border-[#f1d6da] text-xs font-medium text-[#4a2135] hover:bg-[#fdeeeb]"
              >
                Précédent
              </button>
            )}

            {!isQuiz ? (
              <button
                type="button"
                onClick={() => setCourseStep(courseStep + 1)}
                className="px-5 py-2 rounded-xl bg-[#7a2d4f] hover:bg-[#8f3a5d] text-[#fdf3f0] text-xs font-medium flex items-center gap-1.5 shadow-md shadow-[#7a2d4f]/20"
              >
                <span>Continuer</span>
                <ChevronRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-[#7a2d4f] hover:bg-[#8f3a5d] text-[#fdf3f0] text-xs font-medium flex items-center gap-1.5 shadow-md shadow-[#7a2d4f]/20"
              >
                <RotateCcw size={14} />
                <span>Recommencer</span>
              </button>
            )}
          </div>
        </div>

        <p className="text-[11px] text-center text-[#4a2135]/45 mt-4">
          Les calculs de Luna sont des estimations statistiques et ne remplacent jamais un avis médical ni une contraception.
        </p>
      </div>
    </div>
  );
};
