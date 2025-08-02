import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCX-q2aL-LnPzGt6aUbnTr9yAltfFwpboA",
  authDomain: "hearthhand-c011e.firebaseapp.com",
  projectId: "hearthhand-c011e",
  storageBucket: "hearthhand-c011e.firebasestorage.app",
  messagingSenderId: "472898431148",
  appId: "1:472898431148:web:35f9ac5650fa57d7b19709",
  measurementId: "G-3C6C0L9613",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
