import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Shield,
  Calendar as CalendarIcon,
  Check,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useDataStore } from '../../store/dataStore';
import { ContraceptionType } from '../../types/data';
import { predictNextPeriodDetailed } from '../../utils/cycleCalculations';

interface OnboardingViewProps {
  onComplete: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  // Steps S1 to S9 (represented as indices 0 to 8)
  const [currentStep, setCurrentStep] = useState<number>(0);

  // S2 Privacy Checkbox
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // S3 Last Period Date (allow past 90 days)
  const today = new Date();
  const maxDate = today.toISOString().slice(0, 10);
  const minPast90 = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  const defaultLastPeriod = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  const [lastPeriodDate, setLastPeriodDate] = useState<string>(defaultLastPeriod);
  const [dontRememberPeriod, setDontRememberPeriod] = useState<boolean>(false);

  // S4 Cycle Duration Chips [26][28][30][Je ne sais pas]
  const [cycleDurationChoice, setCycleDurationChoice] = useState<'26' | '28' | '30' | 'unknown'>('28');
  const isLearningMode = cycleDurationChoice === 'unknown' || dontRememberPeriod;

  // S5 Period Duration Chips [2j][3-4j][5-7j][Irrégulier]
  const [periodDurationChoice, setPeriodDurationChoice] = useState<'2j' | '3-4j' | '5-7j' | 'irregulier'>('5-7j');

  // S6 Contraception Chips [Aucune][Pilule][DIU][Implant][Autre]
  const [contraception, setContraception] = useState<ContraceptionType>('aucune');

  // S7 Profile: Prenom (max 20), Age (min 12, max 55, default 20 NOT 16)
  const [prenom, setPrenom] = useState('Emma');
  const [age, setAge] = useState<number>(20);

  // S9 SavePrompt Email (optional)
  const [email, setEmail] = useState('');

  const setUser = useAuthStore(state => state.setUser);
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
  const setCycleSettings = useDataStore(state => state.setCycleSettings);

  // Calculate duration number from chips
  const cycleDays = cycleDurationChoice === 'unknown' ? 28 : parseInt(cycleDurationChoice, 10);
  const periodDays =
    periodDurationChoice === '2j'
      ? 2
      : periodDurationChoice === '3-4j'
      ? 4
      : periodDurationChoice === '5-7j'
      ? 5
      : 5;

  // Calculate prediction for S8
  const previewSettings = {
    cycleLength: cycleDays,
    periodLength: periodDays,
    lastPeriodStart: dontRememberPeriod ? defaultLastPeriod : lastPeriodDate,
    regularity:
      periodDurationChoice === 'irregulier' || isLearningMode
        ? ('irregular' as const)
        : ('regular' as const),
    contraception,
    isLearningMode,
  };
  const prediction = predictNextPeriodDetailed(previewSettings, [], isLearningMode);

  // Finalize & Save
  const handleSaveAndExit = (withAccount: boolean) => {
    const cleanPrenom = prenom.trim().slice(0, 20) || 'Emma';
    const cleanEmail = email.trim() ? email.trim() : null;

    setUser({
      prenom: cleanPrenom,
      age: age || 20,
      email: withAccount ? cleanEmail : null,
      hasAccount: withAccount && !!cleanEmail,
      isLearningMode,
      anonymousByDefault: true,
      createdAt: new Date().toISOString(),
      nickname: cleanPrenom,
      gmail: cleanEmail || undefined,
    });

    setCycleSettings({
      cycleLength: cycleDays,
      periodLength: periodDays,
      lastPeriodStart: dontRememberPeriod ? defaultLastPeriod : lastPeriodDate,
      regularity:
        periodDurationChoice === 'irregulier' || isLearningMode
          ? 'irregular'
          : 'regular',
      contraception,
      isLearningMode,
    });

    setIsAuthenticated(true);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-[#fffaf8] flex flex-col justify-between p-4 sm:p-8 max-w-xl mx-auto">
      {/* Top Bar / Progress */}
      <div className="flex items-center justify-between pt-2 pb-4">
        {currentStep > 0 && currentStep < 8 ? (
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            className="p-2 text-[#4a2135]/60 hover:text-[#4a2135] rounded-full hover:bg-[#fdeeeb] transition-colors"
            aria-label="Étape précédente"
          >
            <ChevronLeft size={20} />
          </button>
        ) : (
          <div className="w-8" />
        )}

        {/* Step Indicator S1 to S9 */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? 'w-6 bg-[#6A2C40]'
                  : i < currentStep
                  ? 'w-2 bg-[#a8506b]'
                  : 'w-2 bg-[#f1d6da]'
              }`}
            />
          ))}
        </div>

        <span className="text-[11px] font-bold text-[#6A2C40]/60">
          S{currentStep + 1}/9
        </span>
      </div>

      {/* Main Container */}
      <div className="my-auto py-2">
        {/* S1 - Welcome */}
        {currentStep === 0 && (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#6A2C40] to-[#a8506b] text-[#fdf3f0] flex items-center justify-center font-serif text-3xl font-bold shadow-lg shadow-[#6A2C40]/25">
              ☾
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#6A2C40] bg-[#fdeeeb] px-3.5 py-1 rounded-full border border-[#f1d6da]">
                Luna V1.1
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif text-[#4a2135] mt-3">
                Ton cycle, ton corps, sans tabou
              </h1>
              <p className="text-sm text-[#4a2135]/75 max-w-sm mx-auto mt-2 leading-relaxed">
                Suivi intime, prédictions douces et guides essentiels. 100% hors-ligne, sans publicité.
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="w-full py-4 px-6 rounded-2xl bg-[#6A2C40] hover:bg-[#7d354c] text-[#fdf3f0] font-semibold text-base shadow-md shadow-[#6A2C40]/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Commencer</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* S2 - Privacy (3 cards + Checkbox "J'ai compris") */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#fdeeeb] text-[#6A2C40] flex items-center justify-center shrink-0">
                <Shield size={24} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#a8506b]">
                  Étape 2 sur 9 · Confidentialité
                </span>
                <h2 className="text-2xl font-serif text-[#4a2135]">
                  Une intimité protégée
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#fffdfc] border border-[#f6e7e4] flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#4a2135] uppercase tracking-wider">
                    Stockage 100% Local (Offline-first)
                  </h3>
                  <p className="text-xs text-[#4a2135]/75 mt-0.5">
                    Tes données de règles et ressentis restent sur ton appareil.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#fffdfc] border border-[#f6e7e4] flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#4a2135] uppercase tracking-wider">
                    Zéro tracking santé
                  </h3>
                  <p className="text-xs text-[#4a2135]/75 mt-0.5">
                    Aucun tracker publicitaire ni Firebase Analytics sur tes données de santé.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#fffdfc] border border-[#f6e7e4] flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#4a2135] uppercase tracking-wider">
                    Anonyme par défaut
                  </h3>
                  <p className="text-xs text-[#4a2135]/75 mt-0.5">
                    Aucune obligation de créer un compte ou de donner un email pour utiliser Luna.
                  </p>
                </div>
              </div>
            </div>

            {/* Required Checkbox */}
            <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#fdeeeb] border border-[#f1d6da] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={e => setPrivacyAccepted(e.target.checked)}
                className="w-5 h-5 accent-[#6A2C40] rounded"
              />
              <span className="text-xs font-semibold text-[#4a2135]">
                J'ai compris et j'accepte le fonctionnement sécurisé de Luna.
              </span>
            </label>

            <button
              disabled={!privacyAccepted}
              onClick={() => setCurrentStep(2)}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#6A2C40] hover:bg-[#7d354c] text-[#fdf3f0] font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#6A2C40]/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Continuer</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* S3 - LastPeriod (CalendarPicker past 90 days + Button [Je ne m'en souviens pas]) */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#a8506b]">
                Étape 3 sur 9 · Dernières règles
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#4a2135] mt-1">
                Quand ont débuté tes dernières règles ?
              </h2>
              <p className="text-xs text-[#4a2135]/70 mt-1">
                Le premier jour de saignements réels permet de calculer ton prochain cycle.
              </p>
            </div>

            {!dontRememberPeriod ? (
              <div className="p-5 rounded-3xl bg-[#fffdfc] border border-[#f6e7e4] space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4a2135]/70">
                  Sélectionne la date (90 derniers jours max)
                </label>
                <div className="flex items-center gap-3">
                  <CalendarIcon size={18} className="text-[#6A2C40]" />
                  <input
                    type="date"
                    min={minPast90}
                    max={maxDate}
                    value={lastPeriodDate}
                    onChange={e => setLastPeriodDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#fffaf8] border border-[#f1d6da] text-sm text-[#4a2135] focus:outline-none focus:ring-1 focus:ring-[#6A2C40]"
                  />
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#fdeeeb] border border-[#f1d6da] text-xs text-[#6A2C40] font-medium">
                Aucun problème ! Luna démarrera en mode d'apprentissage et tu pourras noter tes règles dès qu'elles arriveront.
              </div>
            )}

            <button
              type="button"
              onClick={() => setDontRememberPeriod(!dontRememberPeriod)}
              className={`w-full py-3 px-4 rounded-2xl border text-xs font-semibold transition-all ${
                dontRememberPeriod
                  ? 'bg-[#6A2C40] text-[#fdf3f0] border-[#6A2C40]'
                  : 'bg-[#fffdfc] text-[#6A2C40] border-[#f1d6da] hover:bg-[#fdeeeb]'
              }`}
            >
              {dontRememberPeriod ? '✓ Je m’en souviens finalement' : 'Je ne m’en souviens pas'}
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#6A2C40] hover:bg-[#7d354c] text-[#fdf3f0] font-semibold text-sm shadow-md shadow-[#6A2C40]/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Continuer</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* S4 - CycleDuration: Chips [26][28][30][Je ne sais pas] */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#a8506b]">
                Étape 4 sur 9 · Durée du cycle
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#4a2135] mt-1">
                Combien de jours dure ton cycle ?
              </h2>
              <p className="text-xs text-[#4a2135]/70 mt-1">
                Du 1er jour des règles jusqu’à la veille des règles suivantes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: '26', label: '26 jours', desc: 'Cycle court' },
                { id: '28', label: '28 jours', desc: 'Moyenne classique' },
                { id: '30', label: '30 jours', desc: 'Cycle plus long' },
                { id: 'unknown', label: 'Je ne sais pas', desc: 'Mode apprentissage' },
              ].map(chip => (
                <button
                  key={chip.id}
                  onClick={() => setCycleDurationChoice(chip.id as any)}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    cycleDurationChoice === chip.id
                      ? 'border-[#6A2C40] bg-[#fdeeeb] text-[#6A2C40] shadow-xs'
                      : 'border-[#f6e7e4] bg-[#fffdfc] text-[#4a2135] hover:border-[#f1d6da]'
                  }`}
                >
                  <p className="font-bold text-sm">{chip.label}</p>
                  <p className="text-[11px] text-[#4a2135]/60 mt-0.5">{chip.desc}</p>
                </button>
              ))}
            </div>

            {cycleDurationChoice === 'unknown' && (
              <p className="text-xs text-[#6A2C40] bg-[#fdeeeb] p-3 rounded-xl border border-[#f1d6da]">
                💡 Mode apprentissage activé : Luna affinera les calculs après 2 ou 3 cycles enregistrés.
              </p>
            )}

            <button
              onClick={() => setCurrentStep(4)}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#6A2C40] hover:bg-[#7d354c] text-[#fdf3f0] font-semibold text-sm shadow-md shadow-[#6A2C40]/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Continuer</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* S5 - PeriodDuration: Chips [2j][3-4j][5-7j][Irrégulier] */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#a8506b]">
                Étape 5 sur 9 · Durée des saignements
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#4a2135] mt-1">
                Combien de temps durent tes règles ?
              </h2>
              <p className="text-xs text-[#4a2135]/70 mt-1">
                Le nombre de jours de saignement à chaque cycle.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: '2j', label: '2 jours' },
                { id: '3-4j', label: '3-4 jours' },
                { id: '5-7j', label: '5-7 jours (habituel)' },
                { id: 'irregulier', label: 'Irrégulier / variable' },
              ].map(chip => (
                <button
                  key={chip.id}
                  onClick={() => setPeriodDurationChoice(chip.id as any)}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    periodDurationChoice === chip.id
                      ? 'border-[#6A2C40] bg-[#fdeeeb] text-[#6A2C40] shadow-xs'
                      : 'border-[#f6e7e4] bg-[#fffdfc] text-[#4a2135] hover:border-[#f1d6da]'
                  }`}
                >
                  <p className="font-bold text-sm">{chip.label}</p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentStep(5)}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#6A2C40] hover:bg-[#7d354c] text-[#fdf3f0] font-semibold text-sm shadow-md shadow-[#6A2C40]/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Continuer</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* S6 - Contraception: Chips [Aucune][Pilule][DIU][Implant][Autre] */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#a8506b]">
                Étape 6 sur 9 · Contraception
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#4a2135] mt-1">
                Utilises-tu une contraception ?
              </h2>
              <p className="text-xs text-[#4a2135]/70 mt-1">
                La contraception hormonale ou mécanique modifie les phases naturelles d’ovulation.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'aucune', label: 'Aucune' },
                { id: 'pilule', label: 'Pilule' },
                { id: 'diu', label: 'Stérilet / DIU' },
                { id: 'implant', label: 'Implant' },
                { id: 'autre', label: 'Autre' },
              ].map(chip => (
                <button
                  key={chip.id}
                  onClick={() => setContraception(chip.id as any)}
                  className={`p-3.5 rounded-2xl text-center border text-xs font-semibold transition-all ${
                    contraception === chip.id
                      ? 'border-[#6A2C40] bg-[#fdeeeb] text-[#6A2C40] shadow-xs'
                      : 'border-[#f6e7e4] bg-[#fffdfc] text-[#4a2135] hover:border-[#f1d6da]'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* CRITICAL WARNING IF CONTRACEPTION != 'aucune' */}
            {contraception !== 'aucune' && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 animate-fade-in">
                <AlertCircle size={18} className="text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Prédiction d'ovulation désactivée</p>
                  <p className="mt-0.5 text-amber-800/80 leading-relaxed">
                    Sous contraception ({contraception}), le cycle n'est plus régi par l'ovulation physiologique naturelle. Luna masque la fenêtre de fertilité pour éviter toute confusion.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setCurrentStep(6)}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#6A2C40] hover:bg-[#7d354c] text-[#fdf3f0] font-semibold text-sm shadow-md shadow-[#6A2C40]/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Continuer</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* S7 - Profile: Prenom (max 20), Age (min 12, max 55, default 20 NOT 16) */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#a8506b]">
                Étape 7 sur 9 · Profil
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#4a2135] mt-1">
                Faisons connaissance
              </h2>
              <p className="text-xs text-[#4a2135]/70 mt-1">
                Un prénom ou un pseudonyme pour personnaliser ton tableau de bord.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4a2135]/70 mb-1.5">
                  Prénom ou surnom (max 20 caractères)
                </label>
                <input
                  type="text"
                  maxLength={20}
                  value={prenom}
                  onChange={e => setPrenom(e.target.value)}
                  placeholder="Ex : Emma"
                  className="w-full p-3.5 rounded-2xl bg-[#fffdfc] border border-[#f6e7e4] text-base text-[#4a2135] focus:outline-none focus:border-[#6A2C40]"
                />
                <span className="text-[11px] text-[#4a2135]/50 float-right mt-1">
                  {prenom.length}/20
                </span>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4a2135]/70 mb-1.5">
                  Âge : <span className="text-[#6A2C40] font-bold text-sm">{age} ans</span> (défaut : 20 ans)
                </label>
                <input
                  type="range"
                  min="12"
                  max="55"
                  value={age}
                  onChange={e => setAge(Number(e.target.value))}
                  className="w-full accent-[#6A2C40]"
                />
                <div className="flex justify-between text-xs text-[#4a2135]/50 mt-1">
                  <span>12 ans</span>
                  <span>20 ans</span>
                  <span>55 ans</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(7)}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#6A2C40] hover:bg-[#7d354c] text-[#fdf3f0] font-semibold text-sm shadow-md shadow-[#6A2C40]/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Calculer ma prédiction</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* S8 - ValueScreen: Calcule et affiche immédiatement.
            Titre "Merci {prenom}, voilà ta prédiction" + calendrier pastilles + CTA "Voir mon calendrier" */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-fade-in text-center">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-[#6A2C40] to-[#a8506b] text-[#fdf3f0] flex items-center justify-center shadow-lg shadow-[#6A2C40]/25">
              <Sparkles size={30} />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#6A2C40] bg-[#fdeeeb] px-3.5 py-1 rounded-full border border-[#f1d6da]">
                Résultat instantané
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#4a2135] mt-2">
                Merci {prenom}, voilà ta prédiction
              </h2>
            </div>

            {/* Prediction Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#f8e4e2] via-[#f1d6da] to-[#fdeeeb] border border-[#f1d6da] shadow-sm text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A2C40]">
                Prochaines règles estimées
              </span>
              <h3 className="text-3xl font-serif text-[#4a2135] mt-1">
                {prediction.isLearning ? 'Mode apprentissage' : prediction.displayText}
              </h3>
              <p className="text-xs text-[#4a2135]/70 mt-1">
                {prediction.isLearning
                  ? 'Enregistre tes prochaines règles pour calibrer ton modèle personnel.'
                  : `Prévues dans environ ${prediction.daysRemaining} jours.`}
              </p>

              {/* Pastilles calendrier */}
              <div className="mt-5 pt-4 border-t border-[#f1d6da] flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#6A2C40]" />
                  <span className="text-[#4a2135] font-medium">Règles passées</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-dashed border-[#FFB3C1] bg-white" />
                  <span className="text-[#4a2135] font-medium">Prédiction</span>
                </div>
                {!prediction.fertilityDisabled && (
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#FFD166]" />
                    <span className="text-[#4a2135] font-medium">Ovulation</span>
                  </div>
                )}
              </div>
            </div>

            {prediction.fertilityDisabled && (
              <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-2xl border border-amber-200">
                {prediction.fertilityWarning}
              </p>
            )}

            <button
              onClick={() => setCurrentStep(8)}
              className="w-full py-4 px-6 rounded-2xl bg-[#6A2C40] hover:bg-[#7d354c] text-[#fdf3f0] font-semibold text-base shadow-md shadow-[#6A2C40]/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Voir mon calendrier</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* S9 - SavePrompt (seulement APRÈS valeur):
            Input Email (optional) +
            - Primary: "Continuer sans compte" (white, border prune #6A2C40)
            - Secondary: "Sauvegarder avec email" (filled prune #6A2C40)
            - Tertiary: "Continuer avec Google" (text link)
            Acceptance Criteria S9: Arrive on dashboard WITHOUT email! */}
        {currentStep === 8 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <span className="text-xs uppercase font-bold tracking-widest text-[#a8506b]">
                Dernière étape
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#4a2135] mt-1">
                Souhaites-tu sauvegarder tes données ?
              </h2>
              <p className="text-xs text-[#4a2135]/70 mt-1 max-w-sm mx-auto">
                Facultatif. Tu peux utiliser Luna immédiatement et à 100% en local, sans aucun compte.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-[#fffdfc] border border-[#f6e7e4] space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4a2135]/70">
                Email de sauvegarde (facultatif)
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="nom@exemple.com"
                className="w-full p-3.5 rounded-2xl bg-[#fffaf8] border border-[#f1d6da] text-sm text-[#4a2135] focus:outline-none focus:border-[#6A2C40]"
              />
              <p className="text-[11px] text-[#4a2135]/50">
                Permet de restaurer tes cycles en cas de changement d’appareil.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* PRIMARY CTA: Continuer sans compte (style: white, border prune #6A2C40) */}
              <button
                type="button"
                onClick={() => handleSaveAndExit(false)}
                className="w-full py-4 px-6 rounded-2xl bg-white border-2 border-[#6A2C40] text-[#6A2C40] hover:bg-[#fdeeeb] font-semibold text-sm transition-all active:scale-[0.98] shadow-xs"
              >
                Continuer sans compte
              </button>

              {/* SECONDARY CTA: Sauvegarder avec email (style: filled prune #6A2C40) */}
              <button
                type="button"
                onClick={() => handleSaveAndExit(true)}
                disabled={!email.trim()}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#6A2C40] hover:bg-[#7d354c] text-[#fdf3f0] font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#6A2C40]/20 transition-all active:scale-[0.98]"
              >
                Sauvegarder avec email
              </button>

              {/* TERTIARY: Continuer avec Google (text link) */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => handleSaveAndExit(true)}
                  className="text-xs font-medium text-[#6A2C40] hover:underline"
                >
                  Continuer avec Google
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
