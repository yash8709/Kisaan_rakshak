import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDummyKey",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "kisaan-rakshak.firebaseapp.com",
    projectId: process.env.REACT_APP_PROJECT_ID || "kisaan-rakshak",
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET || "kisaan-rakshak.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || "123456789",
    appId: process.env.REACT_APP_APP_ID || "1:123456789:web:abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
