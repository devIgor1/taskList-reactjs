import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDC35kqGE0muOFJNMXsSvJyclqU2Kic_xU",
  authDomain: "course-43c62.firebaseapp.com",
  projectId: "course-43c62",
  storageBucket: "course-43c62.appspot.com",
  messagingSenderId: "770496584136",
  appId: "1:770496584136:web:4c60005b65856fda4fc8fd",
  measurementId: "G-4P4L425P0C",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
