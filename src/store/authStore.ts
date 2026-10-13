import { create } from 'zustand';
import AsyncStorage from '../utils/storage';
import { User } from '../types/data';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  trialDays: number;
  paid: boolean;
  premiumExpiresAt: string | null;
  premiumCode: string | null;
  
  setUser: (user: User) => void;
  setAuthenticated: (auth: boolean) => void;
  setIsAuthenticated: (auth: boolean) => void;
  setToken: (token: string) => void;
  setTrialDays: (days: number) => void;
  setPaid: (paid: boolean) => void;
  activatePremiumWithCode: (code: string) => { success: boolean; message: string };
  activateGooglePlaySubscription: () => void;
  activateSasPaySubscription: (transactionId?: string) => void;
  getRemainingPremiumDays: () => number;
  logout: () => void;
  restoreToken: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  trialDays: 3, // Default trial period
  paid: false,
  premiumExpiresAt: null,
  premiumCode: null,

  setUser: (user: User) => {
    set({ user });
    void AsyncStorage.setItem('@luna_user', JSON.stringify(user));
  },
  setAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),
  setIsAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),
  setToken: (token: string) => {
    set({ token });
    void AsyncStorage.setItem('@luna_token', token);
  },
  setTrialDays: (days: number) => set({ trialDays: days }),
  setPaid: (paid: boolean) => {
    set({ paid });
    void AsyncStorage.setItem('@luna_paid', JSON.stringify(paid));
  },

  activatePremiumWithCode: (inputCode: string) => {
    const raw = (inputCode || '').trim().toUpperCase();
    if (!raw) {
      return { success: false, message: 'Veuillez entrer votre code SasPay / Mobile Money.' };
    }

    // Accept SASPAY-XXXXX, LUNA-XXXXX or raw XXXXX (alphanumeric, at least 4 chars)
    let normalized = raw;
    if (!raw.startsWith('SASPAY-') && !raw.startsWith('LUNA-')) {
      normalized = `SASPAY-${raw}`;
    }
    const codeBody = normalized.replace(/^SASPAY-|^LUNA-/, '');
    if (codeBody.length < 3) {
      return { success: false, message: 'Code invalide. Le format attendu est SASPAY-XXXXX ou LUNA-XXXXX.' };
    }

    // Calculate 30 days from now (or add 30 days to existing active date)
    const currentExpiry = get().premiumExpiresAt ? new Date(get().premiumExpiresAt!) : new Date();
    const baseDate = currentExpiry > new Date() ? currentExpiry : new Date();
    const newExpiry = new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    const expiryIso = newExpiry.toISOString();

    set({
      paid: true,
      premiumExpiresAt: expiryIso,
      premiumCode: normalized,
    });

    void AsyncStorage.setItem('@luna_paid', 'true');
    void AsyncStorage.setItem('@luna_premium_expires', expiryIso);
    void AsyncStorage.setItem('@luna_premium_code', normalized);

    return {
      success: true,
      message: `Félicitations ! Abonnement activé avec succès via SasPay pour 30 jours (jusqu'au ${newExpiry.toLocaleDateString('fr-FR')}).`,
    };
  },

  activateSasPaySubscription: (transactionId?: string) => {
    const code = transactionId ? (transactionId.startsWith('SASPAY-') ? transactionId : `SASPAY-${transactionId}`) : `SASPAY-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const newExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const expiryIso = newExpiry.toISOString();
    set({
      paid: true,
      premiumExpiresAt: expiryIso,
      premiumCode: code,
    });
    void AsyncStorage.setItem('@luna_paid', 'true');
    void AsyncStorage.setItem('@luna_premium_expires', expiryIso);
    void AsyncStorage.setItem('@luna_premium_code', code);
  },

  activateGooglePlaySubscription: () => {
    const newExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const expiryIso = newExpiry.toISOString();
    set({
      paid: true,
      premiumExpiresAt: expiryIso,
      premiumCode: 'PLAY-STORE-SUB',
    });
    void AsyncStorage.setItem('@luna_paid', 'true');
    void AsyncStorage.setItem('@luna_premium_expires', expiryIso);
    void AsyncStorage.setItem('@luna_premium_code', 'PLAY-STORE-SUB');
  },

  getRemainingPremiumDays: () => {
    const expires = get().premiumExpiresAt;
    if (!expires) return get().paid ? 30 : 0;
    const diff = new Date(expires).getTime() - Date.now();
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  },

  logout: () => {
    void AsyncStorage.removeItem('@luna_token');
    void AsyncStorage.removeItem('@luna_user');
    set({ user: null, isAuthenticated: false, token: null });
  },

  restoreToken: async () => {
    try {
      const token = await AsyncStorage.getItem('@luna_token');
      const user = await AsyncStorage.getItem('@luna_user');
      const paid = await AsyncStorage.getItem('@luna_paid');
      const premiumExpires = await AsyncStorage.getItem('@luna_premium_expires');
      const premiumCode = await AsyncStorage.getItem('@luna_premium_code');

      let isPaid = paid === 'true';
      if (premiumExpires) {
        const expDate = new Date(premiumExpires);
        if (expDate <= new Date()) {
          isPaid = false; // Expired 30 days
        }
      }

      if (token || user) {
        set({
          token: token || null,
          user: user ? JSON.parse(user) : null,
          isAuthenticated: true,
          paid: isPaid,
          premiumExpiresAt: premiumExpires || null,
          premiumCode: premiumCode || null,
        });
      }
    } catch (e) {
      console.error('Failed to restore token', e);
    }
  },

  loadUser: async () => {
    try {
      const user = await AsyncStorage.getItem('@luna_user');
      const paid = await AsyncStorage.getItem('@luna_paid');
      const premiumExpires = await AsyncStorage.getItem('@luna_premium_expires');
      const premiumCode = await AsyncStorage.getItem('@luna_premium_code');

      let isPaid = paid === 'true';
      if (premiumExpires) {
        const expDate = new Date(premiumExpires);
        if (expDate <= new Date()) {
          isPaid = false;
        }
      }

      if (user) {
        set({
          user: JSON.parse(user),
          isAuthenticated: true,
          paid: isPaid,
          premiumExpiresAt: premiumExpires || null,
          premiumCode: premiumCode || null,
        });
      }
    } catch (e) {
      console.error('Failed to load user', e);
    }
  },
}));
