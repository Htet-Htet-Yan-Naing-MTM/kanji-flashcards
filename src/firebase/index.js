import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyB_j1ulFjXCyPqBVbhHjjoVBaZpC5bkb6Y",
  authDomain: "kanji-flashcards-dc507.firebaseapp.com",
  projectId: "kanji-flashcards-dc507",
  storageBucket: "kanji-flashcards-dc507.firebasestorage.app",
  messagingSenderId: "787782625722",
  appId: "1:787782625722:web:762395aaa920b62d0c5583",
  measurementId: "G-66EW84MXZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
export const db = getFirestore(app);