// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIza***",
  authDomain: "emma-***",
  projectId: "emma-***",
  storageBucket: "emma-***",
  messagingSenderId: "708***",
  appId: "1:708***"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
