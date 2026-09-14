import React, { useEffect, useState } from 'react';
import { useAuthStore } from './store/authStore';
import { useDataStore } from './store/dataStore';
import { Navbar } from './components/layout/Navbar';
import { CycleView } from './components/cycle/CycleView';
import { TipsView } from './components/tips/TipsView';
import { JournalView } from './components/journal/JournalView';
import { QuestionsView } from './components/questions/QuestionsView';
import { ProfileView } from './components/profile/ProfileView';
import { OnboardingView } from './components/onboarding/OnboardingView';
import { LogModal } from './components/common/LogModal';
import { AppState } from './types/data';

export const App: React.FC = () => {
  const { user, loadUser, activatePremiumWithCode } = useAuthStore();
  const { cycleSettings, setCycleSettings } = useDataStore();
  const [currentTab, setCurrentTab] = useState<AppState['tab']>('cycle');
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      await loadUser();

      // Check if returning from pay.html with a code
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const codeParam = urlParams.get('code');
        if (codeParam) {
          activatePremiumWithCode(codeParam);
          window.history.replaceState({}, document.title, window.location.pathname);
        }

        const handleMessage = (e: MessageEvent) => {
          if (e.data?.type === 'LUNA_PAYMENT_SUCCESS' && e.data.code) {
            activatePremiumWithCode(e.data.code);
          }
        };
        window.addEventListener('message', handleMessage);
      }

      const hasStoredUser = !!localStorage.getItem('@luna_user');
      const hasCompletedOnboarding = localStorage.getItem('@luna_onboarding_completed') === 'true';

      if (!hasStoredUser && !hasCompletedOnboarding) {
        setShowOnboarding(true);
      } else {
        // Fallback demo setup if settings missing
        if (!cycleSettings) {
          setCycleSettings({
            cycleLength: 28,
            periodLength: 5,
            lastPeriodStart: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
            regularity: 'regular',
            contraception: 'aucune',
            isLearningMode: false,
          });
        }
      }

      setInitialized(true);
    };

    init();
  }, [loadUser, cycleSettings, setCycleSettings]);

  const handleCompleteOnboarding = () => {
    localStorage.setItem('@luna_onboarding_completed', 'true');
    setShowOnboarding(false);
    setCurrentTab('cycle');
  };

  if (!initialized) {
    return (
      <div className="min-h-screen bg-[#FFF8F9] flex flex-col items-center justify-center p-4">
        {/* Splash screen officiel : Goutte #4A1C2A seule au centre sur fond #FFF8F9 */}
        <div className="flex flex-col items-center justify-center space-y-4 animate-fade-in">
          <svg
            viewBox="420 560 170 260"
            width="72"
            height="110"
            className="shrink-0 select-none animate-pulse"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 504 578 C 504 578 574 660 574 728 C 574 767 543 798 504 798 C 465 798 434 767 434 728 C 434 660 504 578 504 578 Z"
              fill="#4A1C2A"
            />
          </svg>
          <p className="font-serif text-base text-[#4A1C2A] tracking-wider">
            Luna
          </p>
        </div>
      </div>
    );
  }

  // Show onboarding wizard if new user or explicitly requested
  if (showOnboarding) {
    return <OnboardingView onComplete={handleCompleteOnboarding} />;
  }

  return (
    <div className="min-h-screen bg-[#fffaf8] text-[#4a2135] flex flex-col selection:bg-[#f1d6da] selection:text-[#6A2C40]">
      {/* Navigation with Lucide icons (calendar, lightbulb, book-open, message-circle, user) */}
      <Navbar
        currentTab={currentTab}
        onTabChange={tab => setCurrentTab(tab)}
        onOpenLog={() => setLogModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 px-4 sm:px-6 pt-6 pb-20 md:pb-12 max-w-5xl w-full mx-auto">
        {currentTab === 'cycle' && (
          <CycleView onOpenTips={() => setCurrentTab('astuces')} />
        )}
        {currentTab === 'astuces' && <TipsView />}
        {currentTab === 'journal' && <JournalView />}
        {currentTab === 'questions' && <QuestionsView />}
        {currentTab === 'profil' && (
          <ProfileView onRestartOnboarding={() => setShowOnboarding(true)} />
        )}
      </main>

      {/* Footer */}
      <footer className="hidden md:block py-6 border-t border-[#f6e7e4] text-center text-xs text-[#4a2135]/50 bg-[#fffaf8]">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Luna V1.1 — Suivi intime, bienveillant et 100% hors-ligne</span>
          <div className="flex items-center gap-4 text-[#6A2C40]">
            <a href="/privacy.html" target="_blank" rel="noreferrer" className="hover:underline">
              Confidentialité
            </a>
            <a href="/support.html" target="_blank" rel="noreferrer" className="hover:underline">
              Support
            </a>
            <button
              onClick={() => setShowOnboarding(true)}
              className="hover:underline text-xs"
            >
              Revoir l'onboarding
            </button>
          </div>
        </div>
      </footer>

      {/* Quick Day Log Modal */}
      <LogModal isOpen={logModalOpen} onClose={() => setLogModalOpen(false)} />
    </div>
  );
};

export default App;
