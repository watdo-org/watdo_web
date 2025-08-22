import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getIdToken,
  type User,
} from "firebase/auth";
import app from ".";

export default class FirebaseAuth {
  static auth = getAuth(app);
  static user: User | null = null;

  static async signUpWithEmail(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        FirebaseAuth.auth,
        email,
        password
      );
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  static async signInWithEmail(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        FirebaseAuth.auth,
        email,
        password
      );
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  static onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(FirebaseAuth.auth, (user) => {
      FirebaseAuth.user = user;
      callback(user);
    });
  }

  static async getUserIdToken(): Promise<string | null> {
    try {
      const user = FirebaseAuth.auth.currentUser;
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

  static async signOut() {
    try {
      await signOut(FirebaseAuth.auth);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}

export type { User };
