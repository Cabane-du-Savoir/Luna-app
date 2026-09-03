// Firebase Service - À configurer avec vos clés
// Ce fichier est un template - À adapter selon votre configuration Firebase

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { JournalEntry, Question, User } from '../types/data';

// Configuration Firebase - À remplacer par vos clés
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const hasFirebaseConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
const app = getApps().length > 0
  ? getApp()
  : initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

if (!hasFirebaseConfig && process.env.NODE_ENV === 'production') {
  throw new Error('Firebase configuration is missing. Add the EXPO_PUBLIC_FIREBASE_* variables.');
}

// Auth Functions
export const loginWithGoogle = async (idToken: string) => {
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    const result = await signInWithCredential(auth, credential);
    return result.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Firestore Helpers
export const firestore = {
  // User operations
  async saveUser(userId: string, userData: User) {
    await setDoc(doc(db, 'users', userId), userData, { merge: true });
  },

  async getUser(userId: string): Promise<User | null> {
    const snapshot = await getDoc(doc(db, 'users', userId));
    return snapshot.exists() ? snapshot.data() as User : null;
  },

  // Journal entries
  async saveJournalEntry(userId: string, entry: JournalEntry) {
    await setDoc(doc(db, 'users', userId, 'journal', entry.date), entry, { merge: true });
  },

  async getJournalEntries(userId: string): Promise<JournalEntry[]> {
    const snapshot = await getDocs(collection(db, 'users', userId, 'journal'));
    return snapshot.docs.map(item => item.data() as JournalEntry);
  },

  // Questions
  async postQuestion(userId: string, question: Omit<Question, 'id'>) {
    await addDoc(collection(db, 'questions'), { ...question, authorId: userId });
  },

  async getQuestions(): Promise<Question[]> {
    const snapshot = await getDocs(collection(db, 'questions'));
    return snapshot.docs.map(item => ({ id: item.id, ...item.data() } as Question));
  },
};

// Storage Helpers
export const storage_service = {
  async uploadProfilePhoto(userId: string, photo: Blob): Promise<string> {
    const photoRef = ref(storage, `users/${userId}/profile.jpg`);
    await uploadBytes(photoRef, photo);
    return getDownloadURL(photoRef);
  },

  async downloadProfilePhoto(userId: string): Promise<string | null> {
    try {
      return await getDownloadURL(ref(storage, `users/${userId}/profile.jpg`));
    } catch {
      return null;
    }
  },
};

export default app;
