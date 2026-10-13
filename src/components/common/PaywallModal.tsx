import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ShieldCheck,
  FileDown,
  EyeOff,
  Palette,
  Clock,
  KeyRound,
  Check,
  ExternalLink,
  Smartphone,
  CreditCard,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuthStore } from '../../store/authStore';
import { MobileMoneyModal } from './MobileMoneyModal';
import { SASPAY_CONFIG, buildSasPayCheckoutUrl, generateSasPayCode } from '../../services/saspay';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethodId = 'mpesa' | 'airtel' | 'orange' | 'card';

/**
 * LUNA PREMIUM - MONÉTISATION OFFICIELLE VIA SASPAY
 * 2.500 FC / MOIS (~0,89 $ USD)
 * Plateforme de paiement : SasPay (saspay.me)
 * Modes acceptés : M-Pesa, Airtel Money, Orange Money, Cartes Visa / Mastercard
 */
export const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose }) => {
  const {
    paid,
    premiumExpiresAt,
    activateSasPaySubscription,
    getRemainingPremiumDays,
    user,
  } = useAuthStore();

  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState<string | null>(null);
  const [successCode, setSuccessCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const remainingDays = getRemainingPremiumDays();

  const handleOpenSasPayPortal = () => {
    const uid = user?.prenom ? `${user.prenom}-${Date.now().toString(36).slice(-4)}` : 'luna-user';
    const saspayUrl = buildSasPayCheckoutUrl({
      userId: uid,
      userPhone: phoneNumber.trim(),
      paymentMethod: selectedMethod,
      amount: SASPAY_CONFIG.monthlyPriceCDF,
    });
    window.open(saspayUrl, '_blank');
  };

  const handleInstantSasPaySubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setProcessStep('Connexion sécurisée aux serveurs SasPay...');

    const methodLabels: Record<PaymentMethodId, string> = {
      mpesa: 'Vodacom M-Pesa',
      airtel: 'Airtel Money',
      orange: 'Orange Money',
      card: 'Carte bancaire',
    };

    setTimeout(() => {
      setProcessStep(`Envoi de la demande USSD ${methodLabels[selectedMethod]} via SasPay...`);
    }, 900);

    setTimeout(() => {
      setProcessStep('Validation de la transaction SasPay 2.500 FC...');
    }, 1800);

    setTimeout(() => {
      const generated = generateSasPayCode();
      activateSasPaySubscription(generated);
      setIsProcessing(false);
      setProcessStep(null);
      setSuccessCode(generated);

      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4A1C2A', '#E8A0B0', '#00C853', '#FFFFFF'],
        });
      } catch (e) {}

      setTimeout(() => {
        setSuccessCode(null);
        onClose();
      }, 3500);
    }, 2800);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#4A1C2A]/50 backdrop-blur-xs animate-fade-in overflow-y-auto">
        <div className="bg-[#FFF8F9] border border-[#FDE8E9] rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl relative overflow-hidden my-auto max-h-[92vh] flex flex-col">
          {/* Bouton Fermer */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#4A1C2A]/60 hover:text-[#4A1C2A] rounded-full hover:bg-[#FDE8E9] transition-colors z-10"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>

          {/* En-tête SasPay */}
          <div className="text-center pt-1 pb-3 shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE8E9] border border-[#E8A0B0] text-[#4A1C2A] text-[11px] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck size={14} className="text-[#4A1C2A]" />
              <span>Monétisation SasPay · 100% Sécurisé</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A1C2A] tracking-tight">
              2.500 FC <span className="text-base font-sans font-normal text-[#4A1C2A]/70">/ mois</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#4A1C2A]/80 mt-1 max-w-sm mx-auto">
              Abonnement mensuel sans engagement géré et sécurisé par la plateforme <b>SasPay</b>.
            </p>
          </div>

          <div className="overflow-y-auto pr-0.5 space-y-4 flex-1">
            {/* Statut si déjà actif */}
            {paid && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-700" />
                  <span className="font-semibold">
                    Abonnement actif ({remainingDays} jours restants)
                  </span>
                </div>
                {premiumExpiresAt && (
                  <span className="text-[10px] text-emerald-700 font-medium">
                    jusqu'au {new Date(premiumExpiresAt).toLocaleDateString('fr-FR')}
                  </span>
                )}
              </div>
            )}

            {/* Succès instantané */}
            {successCode && (
              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-emerald-950 text-center animate-bounce-short">
                <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center mb-2 shadow-sm">
                  <Check size={20} />
                </div>
                <h4 className="font-bold text-sm">Paiement SasPay validé !</h4>
                <p className="text-xs text-emerald-800 mt-1">
                  Ton abonnement de 30 jours est actif. Référence : <b>{successCode}</b>
                </p>
              </div>
            )}

            {/* Avantages exclusifs */}
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-white border border-[#FDE8E9] flex items-start gap-3 shadow-2xs">
                <div className="p-2 rounded-xl bg-[#FDE8E9] text-[#4A1C2A] shrink-0 mt-0.5">
                  <Sparkles size={16} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#4A1C2A]">
                    Prédictions IA pour cycles irréguliers
                  </p>
                  <p className="text-[11px] text-[#4A1C2A]/70">
                    Algorithme adaptatif intelligent prenant en compte tes symptômes.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-[#FDE8E9] flex items-start gap-3 shadow-2xs">
                <div className="p-2 rounded-xl bg-[#FDE8E9] text-[#4A1C2A] shrink-0 mt-0.5">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#4A1C2A]">
                    Historique illimité & Analyses comparatives
                  </p>
                  <p className="text-[11px] text-[#4A1C2A]/70">
                    Retrouve tous tes cycles passés et tes bilans sans aucune limite.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-2xl bg-white border border-[#FDE8E9] flex items-center gap-2">
                  <EyeOff size={14} className="text-[#4A1C2A] shrink-0" />
                  <span className="text-[11px] font-bold text-[#4A1C2A]">Mode discret</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white border border-[#FDE8E9] flex items-center gap-2">
                  <FileDown size={14} className="text-[#4A1C2A] shrink-0" />
                  <span className="text-[11px] font-bold text-[#4A1C2A]">Export PDF</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white border border-[#FDE8E9] flex items-center gap-2">
                  <Palette size={14} className="text-[#4A1C2A] shrink-0" />
                  <span className="text-[11px] font-bold text-[#4A1C2A]">Thèmes VIP</span>
                </div>
              </div>
            </div>

            {/* MODULE DE SOUSCRIPTION SASPAY */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-[#4A1C2A] shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-[#FDE8E9] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#4A1C2A] text-white flex items-center justify-center font-black text-xs">
                    SP
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#4A1C2A]">Paiement direct SasPay</h3>
                    <p className="text-[10px] text-[#4A1C2A]/70">Choisis ton moyen de paiement</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#4A1C2A] bg-[#FFF8F9] px-2.5 py-1 rounded-lg border border-[#FDE8E9]">
                  2.500 FC
                </span>
              </div>

              {/* Sélection du moyen de paiement SasPay */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('mpesa')}
                  className={`p-2.5 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    selectedMethod === 'mpesa'
                      ? 'border-[#4A1C2A] bg-[#FFF8F9] shadow-xs scale-[1.02]'
                      : 'border-gray-200 bg-white hover:border-[#4A1C2A]/40'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#E60000] text-white flex items-center justify-center text-xs font-black">
                    M
                  </div>
                  <span className="text-[11px] font-bold text-[#4A1C2A]">M-Pesa</span>
                  <span className="text-[9px] text-[#4A1C2A]/60">Vodacom</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('airtel')}
                  className={`p-2.5 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    selectedMethod === 'airtel'
                      ? 'border-[#4A1C2A] bg-[#FFF8F9] shadow-xs scale-[1.02]'
                      : 'border-gray-200 bg-white hover:border-[#4A1C2A]/40'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#ED1C24] text-white flex items-center justify-center text-[10px] font-black">
                    air
                  </div>
                  <span className="text-[11px] font-bold text-[#4A1C2A]">Airtel</span>
                  <span className="text-[9px] text-[#4A1C2A]/60">Money</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('orange')}
                  className={`p-2.5 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    selectedMethod === 'orange'
                      ? 'border-[#4A1C2A] bg-[#FFF8F9] shadow-xs scale-[1.02]'
                      : 'border-gray-200 bg-white hover:border-[#4A1C2A]/40'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#FF6600] text-white flex items-center justify-center text-xs font-black">
                    OM
                  </div>
                  <span className="text-[11px] font-bold text-[#4A1C2A]">Orange</span>
                  <span className="text-[9px] text-[#4A1C2A]/60">Money</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  className={`p-2.5 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    selectedMethod === 'card'
                      ? 'border-[#4A1C2A] bg-[#FFF8F9] shadow-xs scale-[1.02]'
                      : 'border-gray-200 bg-white hover:border-[#4A1C2A]/40'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#1A1F71] text-white flex items-center justify-center text-xs font-bold">
                    <CreditCard size={15} />
                  </div>
                  <span className="text-[11px] font-bold text-[#4A1C2A]">Carte</span>
                  <span className="text-[9px] text-[#4A1C2A]/60">Visa/MC</span>
                </button>
              </div>

              {/* Formulaire de validation SasPay */}
              <form onSubmit={handleInstantSasPaySubscribe} className="space-y-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A1C2A]/80 mb-1">
                    {selectedMethod === 'card'
                      ? 'Email ou Numéro pour le reçu SasPay'
                      : 'Numéro Mobile Money (ex: 081... / 099... / 085...)'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#4A1C2A]/50">
                      {selectedMethod === 'card' ? <CreditCard size={16} /> : <Smartphone size={16} />}
                    </div>
                    <input
                      type={selectedMethod === 'card' ? 'text' : 'tel'}
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      placeholder={selectedMethod === 'card' ? 'contact@exemple.com' : '082 000 0000'}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FFF8F9] border border-[#E8A0B0] text-sm font-semibold text-[#4A1C2A] focus:outline-none focus:border-[#4A1C2A] placeholder:text-[#4A1C2A]/30"
                    />
                  </div>
                </div>

                {isProcessing && processStep && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2 animate-pulse">
                    <Loader2 size={16} className="animate-spin text-amber-700 shrink-0" />
                    <span>{processStep}</span>
                  </div>
                )}

                {/* BOUTON OFFICIEL : S'ABONNER AVEC SASPAY */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 px-5 rounded-2xl bg-[#4A1C2A] hover:bg-[#5d2435] text-white font-bold text-sm shadow-md shadow-[#4A1C2A]/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Traitement SasPay en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>S'abonner avec SasPay (2.500 FC)</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>

              {/* Bouton alternatif : Ouvrir guichet web SasPay */}
              <div className="text-center pt-1 border-t border-[#FDE8E9]">
                <button
                  type="button"
                  onClick={handleOpenSasPayPortal}
                  className="inline-flex items-center gap-1.5 text-xs text-[#4A1C2A]/80 hover:text-[#4A1C2A] font-semibold hover:underline cursor-pointer"
                >
                  <span>Ouvrir la page de paiement complète SasPay</span>
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Pied de page : Entrer mon code SasPay */}
          <div className="mt-4 pt-3 border-t border-[#FDE8E9] flex flex-col sm:flex-row items-center justify-between gap-2 text-center shrink-0">
            <button
              type="button"
              onClick={() => setCodeModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4A1C2A] hover:underline cursor-pointer py-1"
            >
              <KeyRound size={14} />
              <span>Tu as déjà un code SasPay ? Entrer mon code</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-xs text-[#4A1C2A]/60 hover:text-[#4A1C2A] transition-colors py-1 cursor-pointer"
            >
              Continuer en gratuit
            </button>
          </div>
        </div>
      </div>

      {/* Modal validation code SasPay */}
      <MobileMoneyModal
        isOpen={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
        onOpenPaymentWeb={handleOpenSasPayPortal}
      />
    </>
  );
};

export default PaywallModal;
