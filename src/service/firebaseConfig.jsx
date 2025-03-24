// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmSJ4KXtGg8ZPAJawjbr0NBVY3pX2oYe4",
  authDomain: "quiet-result-454211-a5.firebaseapp.com",
  projectId: "quiet-result-454211-a5",
  storageBucket: "quiet-result-454211-a5.firebasestorage.app",
  messagingSenderId: "609008795223",
  appId: "1:609008795223:web:a2cb042dd528f3a2e62d12",
  measurementId: "G-WGB93G2DWX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
