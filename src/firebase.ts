import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDummyKey",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "kisaan-rakshak.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "kisaan-rakshak",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "kisaan-rakshak.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
