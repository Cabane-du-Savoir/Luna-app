import React from 'react';
import {
  Calendar,
  Lightbulb,
  BookOpen,
  MessageCircle,
  User,
  Plus
} from 'lucide-react';
import { AppState } from '../../types/data';

interface NavbarProps {
  currentTab: AppState['tab'];
  onTabChange: (tab: AppState['tab']) => void;
  onOpenLog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onTabChange, onOpenLog }) => {
  // Exact Lucide icons as specified in Jira task:
  // calendar, lightbulb, book-open, message-circle, user
  const tabs: { id: AppState['tab']; label: string; icon: React.ReactNode }[] = [
    { id: 'cycle', label: 'Cycle', icon: <Calendar size={18} /> },
    { id: 'astuces', label: 'Astuces', icon: <Lightbulb size={18} /> },
    { id: 'journal', label: 'Journal', icon: <BookOpen size={18} /> },
    { id: 'questions', label: 'Questions', icon: <MessageCircle size={18} /> },
    { id: 'profil', label: 'Profil', icon: <User size={18} /> },
  ];

  return (
    <>
      {/* Top Header for Desktop & Tablet */}
      <header className="sticky top-0 z-40 bg-[#fffaf8]/95 backdrop-blur-md border-b border-[#f6e7e4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            onClick={() => onTabChange('cycle')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#6A2C40] to-[#a8506b] text-[#fdf3f0] flex items-center justify-center font-serif text-lg font-bold shadow-xs">
              ☾
            </div>
            <div>
              <span className="text-xl font-serif font-bold text-[#4a2135] tracking-tight">
                Luna
              </span>
              <span className="hidden sm:inline-block text-[10px] text-[#6A2C40] font-medium ml-2 uppercase tracking-widest bg-[#fdeeeb] px-2 py-0.5 rounded-full border border-[#f1d6da]">
                V1.1 · Santé intime
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map(tab => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#6A2C40] text-white shadow-xs'
                      : 'text-[#4a2135]/70 hover:text-[#4a2135] hover:bg-[#fdeeeb]'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action on right */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenLog}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#6A2C40] hover:bg-[#7d354c] text-white text-xs font-semibold shadow-xs transition-transform active:scale-95"
            >
              <Plus size={15} />
              <span className="hidden sm:inline">Noter mon jour</span>
              <span className="sm:hidden">Noter</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fffaf8]/95 backdrop-blur-md border-t border-[#f6e7e4] px-2 py-1.5 shadow-lg">
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
          {tabs.map(tab => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all ${
                  isActive
                    ? 'text-[#6A2C40] font-bold'
                    : 'text-[#4a2135]/50 hover:text-[#4a2135]'
                }`}
              >
                <div
                  className={`p-1.5 rounded-xl transition-all ${
                    isActive ? 'bg-[#fdeeeb] text-[#6A2C40]' : ''
                  }`}
                >
                  {tab.icon}
                </div>
                <span className="text-[10px] mt-0.5">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
