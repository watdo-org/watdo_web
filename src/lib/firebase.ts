import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getIdToken,
  type User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfbgZUnxzeBIyEk5Tn-aNUcg-WGLMbbKg",
  authDomain: "watdo-0x6708.firebaseapp.com",
  projectId: "watdo-0x6708",
  storageBucket: "watdo-0x6708.firebasestorage.app",
  messagingSenderId: "795505223709",
  appId: "1:795505223709:web:22871488177231263f3ef4",
  measurementId: "G-RPSMM236BR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function signUpWithEmail(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function getUserIdToken(): Promise<string | null> {
  try {
    const user = auth.currentUser;
    if (!user) {
      return null;
    }

    const token = await getIdToken(user);
    return token;
  } catch (error) {
    console.error("Error getting ID token:", error);
    return null;
  }
}
