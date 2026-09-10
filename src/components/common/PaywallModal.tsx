import React from 'react';
import { X, Check, Sparkles, Shield, HeartHandshake, BookOpen } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose }) => {
  const { paid, setPaid } = useAuthStore();

  if (!isOpen) return null;

  const handleUnlock = () => {
    setPaid(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4a2135]/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#fffaf8] border border-[#f6e7e4] rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#f1d6da]/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#4a2135]/60 hover:text-[#4a2135] rounded-full hover:bg-[#fdeeeb] transition-colors"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        <div className="text-center pt-2 pb-4">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-[#a8506b] to-[#7a2d4f] text-[#fdf3f0] flex items-center justify-center shadow-lg shadow-[#7a2d4f]/20">
            <Sparkles size={28} />
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#7a2d4f] bg-[#fdeeeb] px-3 py-1 rounded-full border border-[#f1d6da]">
            Accès Illimité Luna
          </span>
          <h3 className="text-2xl font-serif text-[#4a2135] mt-2 mb-1">
            Prends soin de toi, sans limites
          </h3>
          <p className="text-sm text-[#4a2135]/70">
            Un achat unique pour débloquer l’ensemble des guides, articles et analyses de cycle.
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#fffdfc] border border-[#f6e7e4]">
            <div className="p-1 rounded-full bg-[#fdeeeb] text-[#7a2d4f] mt-0.5">
              <BookOpen size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#4a2135]">Tous les articles & guides intimes</p>
              <p className="text-xs text-[#4a2135]/60">Rasage, démangeaisons, exercices pour soulager les crampes...</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#fffdfc] border border-[#f6e7e4]">
            <div className="p-1 rounded-full bg-[#fdeeeb] text-[#7a2d4f] mt-0.5">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#4a2135]">Estimations de cycle personnalisées</p>
              <p className="text-xs text-[#4a2135]/60">Suivi précis des phases et alertes pré-menstruelles intelligentes.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#fffdfc] border border-[#f6e7e4]">
            <div className="p-1 rounded-full bg-[#fdeeeb] text-[#7a2d4f] mt-0.5">
              <Shield size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#4a2135]">Confidentialité absolue</p>
              <p className="text-xs text-[#4a2135]/60">100% sans publicité, zéro revente de données intimes.</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleUnlock}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#7a2d4f] hover:bg-[#8f3a5d] text-[#fdf3f0] font-medium text-base shadow-lg shadow-[#7a2d4f]/25 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {paid ? (
              <>
                <Check size={18} />
                Accès Débloqué ✓
              </>
            ) : (
              <>
                <span>Obtenir l’accès à vie · 5,00 $</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs text-center text-[#4a2135]/60 hover:text-[#4a2135] transition-colors"
          >
            Peut-être plus tard
          </button>
        </div>

        <p className="text-[11px] text-center text-[#4a2135]/45 mt-4">
          Paiement sécurisé et unique. Pas d'abonnement récurrent.
        </p>
      </div>
    </div>
  );
};
