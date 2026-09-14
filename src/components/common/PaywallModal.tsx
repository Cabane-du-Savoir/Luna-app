import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Sparkles,
  Shield,
  FileDown,
  EyeOff,
  Palette,
  Clock,
  KeyRound,
  Check,
  ExternalLink,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { MobileMoneyModal } from './MobileMoneyModal';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * LUNA PREMIUM - ÉCRAN OFFICIEL 2.500 FC / MOIS
 * Couleurs Luna :
 * - prune : #4A1C2A
 * - blush : #FFF8F9
 * - blushCard : #FDE8E9
 *
 * Bouton 1 : [Bouton prune] S'abonner avec Carte Visa via Google Play
 * Bouton 2 : [Bouton blanc avec logos] Payer par Mobile Money (M-Pesa / Airtel / Orange)
 * Lien : "Tu as déjà un code ? Entrer mon code Mobile Money"
 */
export const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose }) => {
  const {
    paid,
    premiumExpiresAt,
    activateGooglePlaySubscription,
    getRemainingPremiumDays,
    user,
  } = useAuthStore();

  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [googlePlaySuccess, setGooglePlaySuccess] = useState(false);

  if (!isOpen) return null;

  const remainingDays = getRemainingPremiumDays();

  const handleGooglePlay = () => {
    activateGooglePlaySubscription();
    setGooglePlaySuccess(true);
    setTimeout(() => {
      setGooglePlaySuccess(false);
      onClose();
    }, 1500);
  };

  const handleMobileMoney = () => {
    const uid = user?.prenom ? `${user.prenom}-${Date.now().toString(36).slice(-4)}` : 'luna-user';
    window.open(`/pay.html?uid=${encodeURIComponent(uid)}`, '_blank');
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#4A1C2A]/45 backdrop-blur-xs animate-fade-in overflow-y-auto">
        <div className="bg-[#FFF8F9] border border-[#FDE8E9] rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl relative overflow-hidden my-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#4A1C2A]/60 hover:text-[#4A1C2A] rounded-full hover:bg-[#FDE8E9] transition-colors"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>

          {/* En-tête de l'offre */}
          <div className="text-center pt-1 pb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE8E9] border border-[#E8A0B0] text-[#4A1C2A] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles size={13} />
              <span>Luna Premium</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A1C2A] tracking-tight">
              2.500 FC <span className="text-base font-sans font-normal text-[#4A1C2A]/70">/ mois</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#4A1C2A]/75 mt-1 max-w-xs mx-auto">
              (soit environ 0,89 $ USD) · Sans engagement, renouvelable au mois.
            </p>
          </div>

          {/* Statut si déjà actif */}
          {paid && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
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

          {/* Liste des fonctionnalités Premium */}
          <div className="space-y-2 mb-5">
            <div className="p-3 rounded-2xl bg-[#FFFFFF] border border-[#FDE8E9] flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#FDE8E9] text-[#4A1C2A] shrink-0 mt-0.5">
                <Sparkles size={16} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#4A1C2A]">
                  Prédictions IA pour cycles irréguliers
                </p>
                <p className="text-[11px] text-[#4A1C2A]/70">
                  Algorithme adaptatif avec marge de tolérance intelligente.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#FFFFFF] border border-[#FDE8E9] flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#FDE8E9] text-[#4A1C2A] shrink-0 mt-0.5">
                <Clock size={16} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#4A1C2A]">
                  Historique complet & illimité
                </p>
                <p className="text-[11px] text-[#4A1C2A]/70">
                  Visualise tous tes cycles passés sans aucune limite de temps.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#FFFFFF] border border-[#FDE8E9] flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#FDE8E9] text-[#4A1C2A] shrink-0 mt-0.5">
                <EyeOff size={16} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#4A1C2A]">
                  Mode icône discrète
                </p>
                <p className="text-[11px] text-[#4A1C2A]/70">
                  Masque l'icône de l'application sur ton écran pour préserver ton intimité.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-2xl bg-[#FFFFFF] border border-[#FDE8E9] flex items-center gap-2">
                <FileDown size={15} className="text-[#4A1C2A] shrink-0" />
                <span className="text-[11px] font-bold text-[#4A1C2A]">Export PDF médecin</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-[#FFFFFF] border border-[#FDE8E9] flex items-center gap-2">
                <Palette size={15} className="text-[#4A1C2A] shrink-0" />
                <span className="text-[11px] font-bold text-[#4A1C2A]">Thèmes exclusifs</span>
              </div>
            </div>
          </div>

          {/* Rappel : Gratuit à vie */}
          <div className="mb-5 p-2.5 rounded-xl bg-[#FFE6EA]/50 border border-[#E8A0B0]/40 text-center">
            <p className="text-[11px] text-[#4A1C2A]/85">
              💡 <b>Gratuit à vie :</b> Calendrier, journal intime, les 14 guides de phase et 3 notifications clés (J-3, J1, J14).
            </p>
          </div>

          {/* LES 2 BOUTONS OFFICIELS */}
          <div className="space-y-3">
            {/* BOUTON 1 - GOOGLE PLAY (Prune #4A1C2A) */}
            <button
              onClick={handleGooglePlay}
              className="w-full min-h-[64px] py-3 px-5 rounded-2xl bg-[#4A1C2A] hover:bg-[#5d2435] text-white font-semibold text-sm shadow-md shadow-[#4A1C2A]/20 transition-all active:scale-[0.98] flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <CreditCard size={22} className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-sm leading-snug">
                    S'abonner avec Carte Visa
                  </div>
                  <div className="text-[11px] text-white/80 font-normal">
                    via Google Play (2.500 FC / mois)
                  </div>
                </div>
              </div>
              {googlePlaySuccess ? (
                <span className="text-xs bg-white text-[#4A1C2A] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 shrink-0">
                  <Check size={14} /> Activé
                </span>
              ) : (
                <span className="text-xs bg-white/20 px-2 py-1 rounded-lg shrink-0 font-mono">
                  ~0,89 $
                </span>
              )}
            </button>

            {/* BOUTON 2 - MOBILE MONEY (Blanc avec bordure #4A1C2A et logos M-Pesa, Airtel, Orange) */}
            <button
              onClick={handleMobileMoney}
              className="w-full min-h-[64px] py-3 px-5 rounded-2xl bg-white border-2 border-[#4A1C2A] hover:bg-[#FFF8F9] text-[#4A1C2A] font-semibold text-sm shadow-xs transition-all active:scale-[0.98] flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3 text-left">
                {/* 3 petits cercles avec logos M-Pesa, Airtel, Orange */}
                <div className="flex -space-x-2 shrink-0">
                  <div
                    className="w-8 h-8 rounded-full bg-[#E60000] text-white flex items-center justify-center text-[10px] font-black border-2 border-white shadow-xs"
                    title="Vodacom M-Pesa"
                  >
                    M
                  </div>
                  <div
                    className="w-8 h-8 rounded-full bg-[#ED1C24] text-white flex items-center justify-center text-[9px] font-black border-2 border-white shadow-xs"
                    title="Airtel Money"
                  >
                    air
                  </div>
                  <div
                    className="w-8 h-8 rounded-full bg-[#FF6600] text-white flex items-center justify-center text-[9px] font-black border-2 border-white shadow-xs"
                    title="Orange Money"
                  >
                    OM
                  </div>
                </div>

                <div>
                  <div className="font-bold text-sm leading-snug text-[#4A1C2A]">
                    Payer par Mobile Money
                  </div>
                  <div className="text-[11px] text-[#4A1C2A]/70 font-normal">
                    M-Pesa · Airtel · Orange (CinetPay RDC)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-[#4A1C2A] font-bold shrink-0">
                <span>2.500 FC</span>
                <ExternalLink size={14} />
              </div>
            </button>
          </div>

          {/* Entrer mon code Mobile Money */}
          <div className="mt-4 pt-3 border-t border-[#FDE8E9] flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
            <button
              type="button"
              onClick={() => setCodeModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4A1C2A] hover:underline cursor-pointer py-1"
            >
              <KeyRound size={14} />
              <span>Tu as déjà un code ? Entrer mon code Mobile Money</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-xs text-[#4A1C2A]/50 hover:text-[#4A1C2A] transition-colors py-1 cursor-pointer"
            >
              Continuer en gratuit
            </button>
          </div>
        </div>
      </div>

      {/* Code validation modal */}
      <MobileMoneyModal
        isOpen={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
        onOpenPaymentWeb={handleMobileMoney}
      />
    </>
  );
};

export default PaywallModal;
