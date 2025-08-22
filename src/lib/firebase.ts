import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
