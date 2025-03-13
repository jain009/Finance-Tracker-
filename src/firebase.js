// Import the necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { getDatabase, ref, set, onValue } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZO38Qpt05XGsIiyrb5K1AT0RD3FgO4ZQ",
  authDomain: "finacetracker-b4ae1.firebaseapp.com",
  databaseURL: "https://finacetracker-b4ae1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "finacetracker-b4ae1",
  storageBucket: "finacetracker-b4ae1.appspot.com", // Corrected this line
  messagingSenderId: "861398720476",
  appId: "1:861398720476:web:f3c31ecf0f2c72f014f919",
  measurementId: "G-V4FYNE8K8D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app); // For real-time database
const provider = new GoogleAuthProvider();

// Export the necessary Firebase functions
export {
  db,
  auth,
  database, // Added database export
  provider,
  ref,
  doc,
  setDoc,
  set,
  onValue,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  collection, // Added this export if needed elsewhere
};
