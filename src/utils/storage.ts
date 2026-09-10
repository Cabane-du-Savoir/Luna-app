// Browser-compatible async storage wrapper replacing @react-native-async-storage/async-storage
export const AsyncStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      if (typeof window === 'undefined') return null;
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn(`Error reading ${key} from localStorage:`, e);
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`Error writing ${key} to localStorage:`, e);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn(`Error removing ${key} from localStorage:`, e);
    }
  },

  async clear(): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.clear();
    } catch (e) {
      console.warn('Error clearing localStorage:', e);
    }
  },
};

export default AsyncStorage;
