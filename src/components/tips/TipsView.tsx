import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  ChevronLeft,
  BookOpen,
  AlertTriangle,
  Heart,
  Share2,
  Check
} from 'lucide-react';
import { articlesData, HEALTH_FREE_CATEGORIES } from '../../constants/articles';
import { Article } from '../../types/data';
import { useAuthStore } from '../../store/authStore';
import { PaywallModal } from '../common/PaywallModal';

export const TipsView: React.FC = () => {
  const { paid } = useAuthStore();
  const [selectedTopic, setSelectedTopic] = useState<string>('ALL');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [savedFavorites, setSavedFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('@luna_saved_articles');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [copiedLink, setCopiedLink] = useState(false);

  // LUNA V1.1 Categories Filter Chips
  const filterChips: { id: string; label: string; isBonus?: boolean }[] = [
    { id: 'ALL', label: 'Tous' },
    { id: 'TOILETTE', label: 'Toilette' },
    { id: 'ODEURS', label: 'Odeurs' },
    { id: 'RASAGE', label: 'Rasage' },
    { id: 'DEMANGEAISONS', label: 'Démangeaisons' },
    { id: 'DOULEURS', label: 'Douleurs' },
    { id: 'RECETTES', label: 'Recettes', isBonus: true },
    { id: 'THEMES', label: 'Thèmes', isBonus: true },
  ];

  const filteredArticles =
    selectedTopic === 'ALL'
      ? articlesData
      : articlesData.filter(a => a.topic === selectedTopic);

  const isArticleLocked = (article: Article): boolean => {
    // Health categories are ALWAYS free per LUNA V1.1 business rule
    if (HEALTH_FREE_CATEGORIES.includes(article.topic as string)) {
      return false;
    }
    // Only locked if flagged as locked and user has not unlocked lifetime
    return Boolean(article.isLocked && !paid);
  };

  const handleOpenArticle = (article: Article) => {
    if (isArticleLocked(article)) {
      setPaywallOpen(true);
      return;
    }
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFavorite = (id: string) => {
    const updated = savedFavorites.includes(id)
      ? savedFavorites.filter(item => item !== id)
      : [...savedFavorites, id];
    setSavedFavorites(updated);
    localStorage.setItem('@luna_saved_articles', JSON.stringify(updated));
  };

  const handleShare = (article: Article) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: `${article.title} - Guide santé Luna`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Detailed Article Reader
  if (selectedArticle) {
    const isFav = savedFavorites.includes(selectedArticle.id);

    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-fade-in">
        {/* Back Button and Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-1 text-xs font-semibold text-[#6A2C40] hover:text-[#4a2135] py-2 px-3 rounded-2xl bg-[#fffdfc] border border-[#f6e7e4] transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Tous les guides</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(selectedArticle.id)}
              className={`p-2.5 rounded-2xl border transition-colors ${
                isFav
                  ? 'bg-rose-50 border-rose-200 text-[#6A2C40]'
                  : 'bg-[#fffdfc] border-[#f6e7e4] text-[#4a2135]/60 hover:text-[#4a2135]'
              }`}
              title="Ajouter aux favoris"
            >
              <Heart size={16} className={isFav ? 'fill-current' : ''} />
            </button>
            <button
              onClick={() => handleShare(selectedArticle)}
              className="p-2.5 rounded-2xl bg-[#fffdfc] border border-[#f6e7e4] text-[#4a2135]/60 hover:text-[#4a2135] transition-colors relative"
              title="Partager le guide"
            >
              {copiedLink ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative rounded-3xl overflow-hidden aspect-video bg-[#fdeeeb] border border-[#f1d6da]">
          <img
            src={selectedArticle.image}
            alt={selectedArticle.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4a2135]/80 via-transparent to-transparent flex items-end p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#6A2C40]/80 backdrop-blur-xs px-3 py-1 rounded-full">
              {selectedArticle.topic}
            </span>
          </div>
        </div>

        {/* Title and Intro */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#4a2135] leading-snug">
            {selectedArticle.title}
          </h1>
          <p className="text-sm text-[#4a2135]/80 mt-2.5 leading-relaxed bg-[#fffdfc] p-4 rounded-2xl border border-[#f6e7e4]">
            {selectedArticle.intro}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#4a2135]/70">
            Conseils pratiques étape par étape
          </h2>
          {selectedArticle.steps.map(step => (
            <div
              key={step.number}
              className="p-5 rounded-2xl bg-[#fffdfc] border border-[#f6e7e4] flex items-start gap-4 shadow-xs"
            >
              <span className="w-8 h-8 rounded-2xl bg-[#fdeeeb] text-[#6A2C40] font-bold text-sm flex items-center justify-center shrink-0">
                {step.number}
              </span>
              <div className="space-y-1">
                <h3 className="font-serif text-base text-[#4a2135]">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4a2135]/75 leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Avoid Section */}
        {selectedArticle.avoid && (
          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3.5">
            <AlertTriangle size={20} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                À éviter absolument
              </h4>
              <p className="text-xs sm:text-sm text-amber-900/85 leading-relaxed">
                {selectedArticle.avoid}
              </p>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="text-center pt-4 text-xs text-[#4a2135]/50">
          Ce contenu éducatif a été rédigé avec des spécialistes de santé. Il ne remplace pas une consultation médicale.
        </div>
      </div>
    );
  }

  // Articles Grid & Filter View
  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#4a2135]">
            Astuces & Guides Santé
          </h1>
          <p className="text-xs sm:text-sm text-[#4a2135]/65 mt-0.5">
            100% hors-ligne · Des réponses fiables sur le corps et l’hygiène intime.
          </p>
        </div>
      </div>

      {/* Category Chips (ALL, TOILETTE, ODEURS, RASAGE, DEMANGEAISONS, DOULEURS, RECETTES, THEMES) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {filterChips.map(chip => (
          <button
            key={chip.id}
            onClick={() => setSelectedTopic(chip.id)}
            className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedTopic === chip.id
                ? 'bg-[#6A2C40] text-[#fdf3f0] shadow-xs'
                : 'bg-[#fffdfc] text-[#4a2135]/80 hover:text-[#4a2135] border border-[#f6e7e4] hover:bg-[#fdeeeb]'
            }`}
          >
            <span>{chip.label}</span>
            {chip.isBonus && (
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-bold">
                Bonus
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Health free badge reminder */}
      <div className="p-3 rounded-2xl bg-[#fffdfc] border border-[#f6e7e4] flex items-center justify-between text-xs text-[#4a2135]/75">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Tous les guides de santé essentiels sont <strong>100% gratuits</strong>.</span>
        </div>
        {!paid && (
          <button
            onClick={() => setPaywallOpen(true)}
            className="text-[#6A2C40] font-semibold hover:underline"
          >
            Soutenir Luna (5$)
          </button>
        )}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredArticles.map(article => {
          const locked = isArticleLocked(article);
          const isFav = savedFavorites.includes(article.id);

          return (
            <div
              key={article.id}
              onClick={() => handleOpenArticle(article)}
              className="group bg-[#fffdfc] rounded-3xl border border-[#f6e7e4] overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full bg-[#fdeeeb] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badge Topic */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#6A2C40]/85 backdrop-blur-xs text-white">
                    {article.topic}
                  </span>
                </div>

                {/* Lock or Free Icon */}
                <div className="absolute top-3 right-3">
                  {locked ? (
                    <div className="p-1.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
                      <Lock size={14} />
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600/90 text-white backdrop-blur-xs">
                      Gratuit
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base text-[#4a2135] group-hover:text-[#6A2C40] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#4a2135]/70 mt-1 line-clamp-2 leading-relaxed">
                    {article.intro}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f6e7e4] flex items-center justify-between text-xs text-[#4a2135]/60">
                  <span className="font-medium text-[#6A2C40]">
                    {locked ? 'Contenu bonus' : 'Lire le guide →'}
                  </span>
                  {isFav && (
                    <Heart size={14} className="fill-[#6A2C40] text-[#6A2C40]" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <PaywallModal isOpen={paywallOpen} onClose={() => setPaywallOpen(false)} />
    </div>
  );
};
