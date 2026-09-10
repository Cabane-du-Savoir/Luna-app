import { create } from 'zustand';
import AsyncStorage from '../utils/storage';
import { User } from '../types/data';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  trialDays: number;
  paid: boolean;
  
  setUser: (user: User) => void;
  setAuthenticated: (auth: boolean) => void;
  setIsAuthenticated: (auth: boolean) => void;
  setToken: (token: string) => void;
  setTrialDays: (days: number) => void;
  setPaid: (paid: boolean) => void;
  logout: () => void;
  restoreToken: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  trialDays: 3, // Default trial period
  paid: false,

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
      if (token || user) {
        set({
          token: token || null,
          user: user ? JSON.parse(user) : null,
          isAuthenticated: true,
          paid: paid === 'true',
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
      if (user) {
        set({
          user: JSON.parse(user),
          isAuthenticated: true,
          paid: paid === 'true',
        });
      }
    } catch (e) {
      console.error('Failed to load user', e);
    }
  },
}));
