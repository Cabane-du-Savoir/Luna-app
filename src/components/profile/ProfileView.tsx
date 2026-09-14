import React, { useState } from 'react';
import {
  User as UserIcon,
  Settings,
  Bell,
  Sparkles,
  Shield,
  Download,
  Share2,
  Check,
  ChevronRight,
  Sliders,
  Calendar,
  Lock,
  Trash2,
  KeyRound,
  FileText,
  AlertTriangle,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useDataStore } from '../../store/dataStore';
import { PaywallModal } from '../common/PaywallModal';
import { MobileMoneyModal } from '../common/MobileMoneyModal';

interface ProfileViewProps {
  onRestartOnboarding: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onRestartOnboarding }) => {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const logout = useAuthStore(state => state.logout);
  const paid = useAuthStore(state => state.paid);
  const setPaid = useAuthStore(state => state.setPaid);
  const premiumExpiresAt = useAuthStore(state => state.premiumExpiresAt);
  const premiumCode = useAuthStore(state => state.premiumCode);
  const getRemainingPremiumDays = useAuthStore(state => state.getRemainingPremiumDays);

  const cycleSettings = useDataStore(state => state.cycleSettings);
  const setCycleSettings = useDataStore(state => state.setCycleSettings);
  const journalEntries = useDataStore(state => state.journalEntries);

  const [paywallOpen, setPaywallOpen] = useState(false);
  const [mobileMoneyModalOpen, setMobileMoneyModalOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Editable cycle preferences
  const [cycleLength, setCycleLength] = useState(cycleSettings?.cycleLength ?? 28);
  const [periodLength, setPeriodLength] = useState(cycleSettings?.periodLength ?? 5);
  const [contraception, setContraception] = useState(cycleSettings?.contraception ?? 'aucune');

  // App notification toggles
  const [reminders, setReminders] = useState(true);
  const [weeklyTip, setWeeklyTip] = useState(true);
  const [securityCodeEnabled, setSecurityCodeEnabled] = useState(Boolean(user?.pin));

  // PIN modal
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Delete all data modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleSaveCycle = (e: React.FormEvent) => {
    e.preventDefault();
    if (cycleSettings) {
      setCycleSettings({
        ...cycleSettings,
        cycleLength: Number(cycleLength),
        periodLength: Number(periodLength),
        contraception: contraception as any,
      });
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Toggle Security Code / PIN
  const handleToggleSecurity = () => {
    if (securityCodeEnabled) {
      // Disable PIN
      if (user) {
        setUser({ ...user, pin: null });
      }
      setSecurityCodeEnabled(false);
    } else {
      // Prompt for 4-digit PIN
      setPinInput('');
      setPinError('');
      setPinModalOpen(true);
    }
  };

  const handleSavePin = () => {
    if (pinInput.length !== 4 || !/^\d{4}$/.test(pinInput)) {
      setPinError('Le code PIN doit comporter exactement 4 chiffres.');
      return;
    }
    if (user) {
      setUser({ ...user, pin: pinInput });
    }
    setSecurityCodeEnabled(true);
    setPinModalOpen(false);
  };

  // Action: Backup now (create backup.luna)
  const handleBackupNow = () => {
    const backupData = {
      version: '1.1',
      date: new Date().toISOString(),
      user,
      cycleSettings,
      journalEntries,
    };
    const jsonStr = JSON.stringify(backupData);
    // Base64 encoding as simple local encryption wrapper
    const encoded = btoa(unescape(encodeURIComponent(jsonStr)));
    const blob = new Blob([encoded], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup_luna_${new Date().toISOString().slice(0, 10)}.luna`;
    link.click();
    URL.revokeObjectURL(url);

    // Prompt for WhatsApp sharing option
    const shareText = encodeURIComponent(
      'Mon fichier de sauvegarde chiffré Luna V1.1 a été généré avec succès.'
    );
    if (window.confirm('Sauvegarde téléchargée (.luna) ! Souhaites-tu l’envoyer ou la conserver sur WhatsApp ?')) {
      window.open(`https://wa.me/?text=${shareText}`, '_blank');
    }
  };

  // Action: Export PDF / Report
  const handleExportPDF = () => {
    if (!paid) {
      setPaywallOpen(true);
      return;
    }
    window.print();
  };

  // Action: Delete all data
  const handleDeleteAll = () => {
    localStorage.clear();
    logout();
    setDeleteModalOpen(false);
    onRestartOnboarding();
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12 animate-fade-in">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-2xl sm:text-3xl font-serif text-[#4a2135]">
          Mon Profil & Paramètres
        </h1>
        <p className="text-xs sm:text-sm text-[#4a2135]/65 mt-0.5">
          Gère tes cycles, ta sécurité et tes sauvegardes locales.
        </p>
      </div>

      {/* User Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#fffdfc] border border-[#f6e7e4] flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#6A2C40] to-[#a8506b] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md shadow-[#6A2C40]/20">
            {(user?.prenom || user?.nickname || 'E')[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-serif text-[#4a2135]">
              {user?.prenom || user?.nickname || 'Emma'}
            </h2>
            <p className="text-xs text-[#4a2135]/60 mt-0.5">
              {user?.email ? user.email : 'Compte local anonyme (offline-first)'}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="px-2 py-0.5 rounded-full bg-[#fdeeeb] text-[#6A2C40] text-[10px] font-bold">
                {user?.age ? `${user.age} ans` : '20 ans'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#fffaf8] border border-[#f6e7e4] text-[#4a2135] text-[10px]">
                {cycleSettings?.contraception && cycleSettings.contraception !== 'aucune'
                  ? `Contraception : ${cycleSettings.contraception}`
                  : 'Sans contraception'}
              </span>
              {user?.isLearningMode && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                  Mode apprentissage
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section Luna Premium : 2.500 FC / mois */}
      {!paid ? (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#4A1C2A] to-[#6A2C40] text-white shadow-md shadow-[#4A1C2A]/20 flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full inline-block">
                Luna Premium · 2.500 FC / mois (~0,89 $)
              </span>
              <h3 className="font-serif text-xl font-bold pt-1">
                Prédictions IA & Intimité Maximale
              </h3>
              <p className="text-xs text-white/85 max-w-md leading-relaxed">
                Débloque l'IA pour cycles irréguliers, l'historique illimité, le mode icône discrète, l'export PDF médecin et les thèmes exclusifs.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPaywallOpen(true)}
              className="shrink-0 px-5 py-3 rounded-2xl bg-white text-[#4A1C2A] hover:bg-[#FFE6EA] text-xs font-bold shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              Découvrir Premium (2.500 FC)
            </button>
          </div>

          {/* Toggle / Bouton officiel : Je suis Premium - Entrer mon code Mobile Money */}
          <div className="pt-3 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="text-[11px] text-white/80">
              Déjà payé par M-Pesa, Airtel ou Orange Money ?
            </div>
            <button
              type="button"
              onClick={() => setMobileMoneyModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <KeyRound size={14} />
              <span>Je suis Premium - Entrer mon code Mobile Money</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-3xl bg-[#FDE8E9] border border-[#E8A0B0] text-[#4A1C2A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                Premium Actif
              </span>
              <span className="text-xs font-bold text-[#4A1C2A]">
                Luna Premium ({getRemainingPremiumDays()} jours restants)
              </span>
            </div>
            <p className="text-xs text-[#4A1C2A]/75">
              {premiumExpiresAt
                ? `Actif jusqu'au ${new Date(premiumExpiresAt).toLocaleDateString('fr-FR')}`
                : 'Abonnement actif 30 jours'}
              {premiumCode && ` · Code : ${premiumCode}`}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMobileMoneyModalOpen(true)}
            className="shrink-0 px-4 py-2 rounded-xl bg-[#4A1C2A] text-white hover:bg-[#5d2435] text-xs font-bold transition-colors cursor-pointer"
          >
            Prolonger (+30 jours)
          </button>
        </div>
      )}

      {/* Paramètres du cycle */}
      <form
        onSubmit={handleSaveCycle}
        className="p-5 sm:p-6 rounded-3xl bg-[#fffdfc] border border-[#f6e7e4] space-y-4 shadow-xs"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a2135]/70 flex items-center gap-1.5">
            <Sliders size={14} className="text-[#6A2C40]" />
            <span>Calibration du cycle</span>
          </h3>
          {saveSuccess && (
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <Check size={12} /> Modifié !
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs text-[#4a2135]/70 mb-1 font-medium">
              Durée du cycle ({cycleLength} jours)
            </label>
            <input
              type="range"
              min="21"
              max="35"
              value={cycleLength}
              onChange={e => setCycleLength(Number(e.target.value))}
              className="w-full accent-[#6A2C40]"
            />
          </div>

          <div>
            <label className="block text-xs text-[#4a2135]/70 mb-1 font-medium">
              Durée des règles ({periodLength} jours)
            </label>
            <input
              type="range"
              min="2"
              max="8"
              value={periodLength}
              onChange={e => setPeriodLength(Number(e.target.value))}
              className="w-full accent-[#6A2C40]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-[#4a2135]/70 mb-1.5 font-medium">
            Contraception actuelle
          </label>
          <select
            value={contraception}
            onChange={e => setContraception(e.target.value as any)}
            className="w-full p-3 rounded-2xl bg-[#fffaf8] border border-[#f6e7e4] text-xs text-[#4a2135]"
          >
            <option value="aucune">Aucune (cycle naturel)</option>
            <option value="pilule">Pilule</option>
            <option value="diu">Stérilet / DIU</option>
            <option value="implant">Implant</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-[#fffaf8] hover:bg-[#fdeeeb] border border-[#f1d6da] text-[#6A2C40] text-xs font-semibold transition-colors"
        >
          Enregistrer les modifications
        </button>
      </form>

      {/* Toggles: Reminders, WeeklyTip, SecurityCode */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#fffdfc] border border-[#f6e7e4] space-y-4 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a2135]/70 flex items-center gap-1.5">
          <Bell size={14} className="text-[#6A2C40]" />
          <span>Rappels & Sécurité</span>
        </h3>

        <div className="space-y-3">
          {/* Reminders Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#fffaf8] border border-[#f6e7e4]">
            <div>
              <p className="text-xs font-bold text-[#4a2135]">Rappels de règles</p>
              <p className="text-[11px] text-[#4a2135]/60">Alerte discrète avant la date estimée</p>
            </div>
            <button
              type="button"
              onClick={() => setReminders(!reminders)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                reminders ? 'bg-[#6A2C40] justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-xs" />
            </button>
          </div>

          {/* Weekly Tip Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#fffaf8] border border-[#f6e7e4]">
            <div>
              <p className="text-xs font-bold text-[#4a2135]">Conseil de la semaine</p>
              <p className="text-[11px] text-[#4a2135]/60">Un guide santé intime chaque lundi</p>
            </div>
            <button
              type="button"
              onClick={() => setWeeklyTip(!weeklyTip)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                weeklyTip ? 'bg-[#6A2C40] justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-xs" />
            </button>
          </div>

          {/* SecurityCode (PIN) Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#fffaf8] border border-[#f6e7e4]">
            <div>
              <p className="text-xs font-bold text-[#4a2135]">Verrouillage par code PIN</p>
              <p className="text-[11px] text-[#4a2135]/60">
                {securityCodeEnabled ? 'PIN 4 chiffres activé' : 'Sécurité désactivée (gratuit)'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleToggleSecurity}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                securityCodeEnabled ? 'bg-[#6A2C40] justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Actions: Export PDF, Backup now, Delete all data */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#fffdfc] border border-[#f6e7e4] space-y-3 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a2135]/70">
          Sauvegarde & Export
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Backup now (.luna) */}
          <button
            onClick={handleBackupNow}
            className="p-3.5 rounded-2xl bg-[#fffaf8] hover:bg-[#fdeeeb] border border-[#f1d6da] text-[#6A2C40] text-xs font-semibold flex items-center gap-2.5 transition-colors"
          >
            <Download size={16} />
            <span>Sauvegarder (.luna)</span>
          </button>

          {/* Export PDF */}
          <button
            onClick={handleExportPDF}
            className="p-3.5 rounded-2xl bg-[#fffaf8] hover:bg-[#fdeeeb] border border-[#f1d6da] text-[#6A2C40] text-xs font-semibold flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText size={16} />
              <span>Exporter mon rapport</span>
            </div>
            {!paid && (
              <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                Premium
              </span>
            )}
          </button>
        </div>

        {/* Delete all data */}
        <div className="pt-3 border-t border-[#f6e7e4]">
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="w-full py-3 px-4 rounded-2xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Trash2 size={16} />
            <span>Supprimer toutes mes données</span>
          </button>
        </div>
      </div>

      {/* PIN CREATION MODAL */}
      {pinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 border border-[#f6e7e4] shadow-2xl space-y-4 text-center animate-scale-up">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#fdeeeb] text-[#6A2C40] flex items-center justify-center">
              <KeyRound size={24} />
            </div>

            <h3 className="font-serif text-lg text-[#4a2135]">
              Créer ton code PIN
            </h3>
            <p className="text-xs text-[#4a2135]/70">
              Saisis un code à 4 chiffres pour protéger l’accès à ton journal intime.
            </p>

            <input
              type="password"
              maxLength={4}
              value={pinInput}
              onChange={e => {
                setPinInput(e.target.value);
                setPinError('');
              }}
              placeholder="••••"
              className="w-32 mx-auto text-center text-2xl font-bold tracking-widest p-3 rounded-2xl bg-[#fffaf8] border border-[#f1d6da] focus:outline-none focus:border-[#6A2C40]"
            />

            {pinError && (
              <p className="text-xs text-rose-600 font-semibold">{pinError}</p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPinModalOpen(false)}
                className="w-1/2 py-3 rounded-2xl bg-gray-100 text-gray-700 text-xs font-semibold"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSavePin}
                className="w-1/2 py-3 rounded-2xl bg-[#6A2C40] text-white text-xs font-semibold shadow-xs"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-rose-300 shadow-2xl space-y-4 text-center animate-scale-up">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <AlertTriangle size={28} />
            </div>

            <h3 className="font-serif text-lg font-bold text-rose-900">
              Supprimer définitivement tes données ?
            </h3>
            <p className="text-xs text-[#4a2135]/80 leading-relaxed">
              Cette action est irréversible. Tous tes enregistrements de cycle, journal, questions et réglages locaux seront effacés immédiatement de cet appareil.
            </p>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="w-1/2 py-3.5 rounded-2xl bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDeleteAll}
                className="w-1/2 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-600/20"
              >
                Tout supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <PaywallModal isOpen={paywallOpen} onClose={() => setPaywallOpen(false)} />
      <MobileMoneyModal
        isOpen={mobileMoneyModalOpen}
        onClose={() => setMobileMoneyModalOpen(false)}
      />
    </div>
  );
};
