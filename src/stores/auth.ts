import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { auth } from '@/firebase';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loading = ref(true);

  const isAuthenticated = computed(() => !!user.value);

  function initAuth() {
    return new Promise<void>((resolve) => {
      onAuthStateChanged(auth, (firebaseUser) => {
        user.value = firebaseUser;
        loading.value = false;
        resolve();
      });
    });
  }

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  async function loginWithGithub() {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  }

  async function loginWithEmail(email: string, pass: string) {
    return signInWithEmailAndPassword(auth, email, pass);
  }

  async function registerWithEmail(email: string, pass: string) {
    return createUserWithEmailAndPassword(auth, email, pass);
  }

  async function logout() {
    return signOut(auth);
  }

  return {
    user,
    loading,
    isAuthenticated,
    initAuth,
    loginWithGoogle,
    loginWithGithub,
    loginWithEmail,
    registerWithEmail,
    logout,
  };
});
