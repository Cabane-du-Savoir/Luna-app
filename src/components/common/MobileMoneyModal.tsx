import React, { useState } from 'react';
import { X, KeyRound, Check, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuthStore } from '../../store/authStore';

interface MobileMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPaymentWeb?: () => void;
}

export const MobileMoneyModal: React.FC<MobileMoneyModalProps> = ({
  isOpen,
  onClose,
  onOpenPaymentWeb,
}) => {
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const activatePremiumWithCode = useAuthStore(state => state.activatePremiumWithCode);
  const user = useAuthStore(state => state.user);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const result = activatePremiumWithCode(code);
    if (result.success) {
      setFeedback({ type: 'success', message: result.message });
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#4A1C2A', '#E8A0B0', '#FFE6EA'],
        });
      } catch (e) {}
      setTimeout(() => {
        onClose();
        setFeedback(null);
        setCode('');
      }, 1800);
    } else {
      setFeedback({ type: 'error', message: result.message });
    }
  };

  const handleOpenPayPage = () => {
    const uid = user?.prenom ? `${user.prenom}-${Date.now().toString(36).slice(-4)}` : 'luna-user';
    const payUrl = `/pay.html?uid=${encodeURIComponent(uid)}`;
    window.open(payUrl, '_blank');
    if (onOpenPaymentWeb) onOpenPaymentWeb();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A1C2A]/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FFF8F9] border border-[#FDE8E9] rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#4A1C2A]/60 hover:text-[#4A1C2A] rounded-full hover:bg-[#FDE8E9] transition-colors"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        <div className="text-center pt-2 pb-3">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#FFE6EA] text-[#4A1C2A] flex items-center justify-center shadow-xs">
            <KeyRound size={26} className="text-[#4A1C2A]" />
          </div>

          <span className="text-[11px] uppercase font-bold tracking-widest text-[#4A1C2A] bg-[#FDE8E9] px-3 py-1 rounded-full">
            RDC · Mobile Money
          </span>

          <h3 className="text-2xl font-serif font-bold text-[#4A1C2A] mt-2 mb-1">
            Entre ton code Mobile Money
          </h3>
          <p className="text-xs text-[#4A1C2A]/70 max-w-xs mx-auto">
            Code reçu après ton paiement CinetPay de 2.500 FC (ex: <b>LUNA-8K2P9</b>). Débloque 30 jours complets.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4 pt-1">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1C2A]/70 mb-1.5">
              Code d'activation (LUNA-XXXXX)
            </label>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder="ex: LUNA-8K2P9"
              className="w-full p-4 rounded-2xl bg-white border-2 border-[#E8A0B0] text-base font-mono font-bold text-center tracking-widest text-[#4A1C2A] focus:outline-none focus:border-[#4A1C2A] placeholder:text-[#4A1C2A]/30"
              autoFocus
            />
          </div>

          {feedback && (
            <div
              className={`p-3.5 rounded-2xl text-xs flex items-start gap-2 ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {feedback.type === 'success' ? (
                <Check size={16} className="shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-[#4A1C2A] hover:bg-[#5d2435] text-white font-bold text-base shadow-md shadow-[#4A1C2A]/20 transition-all active:scale-[0.98] cursor-pointer"
          >
            Valider mon code (30 jours)
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-[#FDE8E9] text-center space-y-2">
          <p className="text-xs text-[#4A1C2A]/60">Tu n'as pas encore payé ?</p>
          <button
            type="button"
            onClick={handleOpenPayPage}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4A1C2A] hover:underline cursor-pointer"
          >
            <span>Payer 2.500 FC sur luna.app/pay (M-Pesa / Airtel / Orange)</span>
            <ExternalLink size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMoneyModal;
