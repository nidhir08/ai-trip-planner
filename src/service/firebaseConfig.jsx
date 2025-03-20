// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq0UWzyIot__q36POdseZPsSBUMV2bARk",
  authDomain: "ai-trip-planner-5dac4.firebaseapp.com",
  projectId: "ai-trip-planner-5dac4",
  storageBucket: "ai-trip-planner-5dac4.firebasestorage.app",
  messagingSenderId: "617441731434",
  appId: "1:617441731434:web:53eea90d4c0568a3803b13",
  measurementId: "G-SQBB9EX6ED"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
