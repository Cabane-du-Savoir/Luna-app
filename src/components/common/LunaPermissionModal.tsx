import React from 'react';
import { Bell, Heart, X } from 'lucide-react';

interface LunaPermissionModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDismiss: () => void;
}

/**
 * POP-UP PERMISSION LUNA (+400% d'acceptation)
 * Soft ask déclenché après avoir vu la valeur (ValueScreen S8).
 * Texte validé et verrouillé :
 * - Titre : "Ne rate plus tes règles"
 * - Body : "Luna t'envoie 1 seule notification 3 jours avant tes règles pour que tu sois prête. Promis, pas de spam."
 * - Bouton 1 : "Oui, préviens-moi 💜"
 * - Bouton 2 : "Plus tard" (gris clair rassurant)
 */
export const LunaPermissionModal: React.FC<LunaPermissionModalProps> = ({
  isOpen,
  onAccept,
  onDismiss,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#4A1C2A]/40 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md bg-[#FFF8F9] border-t sm:border border-[#FDE8E9] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl relative overflow-hidden animate-slide-up">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#FFE6EA] rounded-full blur-2xl -z-10 pointer-events-none" />

        <div className="flex justify-end -mt-1 -mr-1">
          <button
            onClick={onDismiss}
            className="p-2 text-[#4A1C2A]/50 hover:text-[#4A1C2A] rounded-full hover:bg-[#FDE8E9]/60 transition-colors"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="text-center pt-0 pb-2">
          {/* Icon Badge */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#FFE6EA] text-[#4A1C2A] flex items-center justify-center shadow-xs">
            <Bell size={30} className="text-[#4A1C2A]" />
          </div>

          <h3 className="text-2xl font-serif font-bold text-[#4A1C2A] mb-2 tracking-tight">
            Ne rate plus tes règles
          </h3>

          <p className="text-sm text-[#4A1C2A]/80 leading-relaxed max-w-xs mx-auto mb-6">
            Luna t'envoie 1 seule notification 3 jours avant tes règles pour que tu sois prête. Promis, pas de spam.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={onAccept}
            className="w-full py-4 px-6 rounded-2xl bg-[#4A1C2A] hover:bg-[#5d2435] text-white font-semibold text-base shadow-md shadow-[#4A1C2A]/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Oui, préviens-moi 💜</span>
          </button>

          <button
            type="button"
            onClick={onDismiss}
            className="w-full py-3 text-xs text-center font-medium text-[#4A1C2A]/55 hover:text-[#4A1C2A] transition-colors cursor-pointer"
          >
            Plus tard
          </button>
        </div>
      </div>
    </div>
  );
};

export default LunaPermissionModal;
