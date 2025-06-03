import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9MI2af8XvqfcGDQAQdPk_cY6VPfJotNE",
  authDomain: "eccomerce-store-react.firebaseapp.com",
  projectId: "eccomerce-store-react",
  storageBucket: "eccomerce-store-react.firebasestorage.app",
  messagingSenderId: "245467498967",
  appId: "1:245467498967:web:3c78f57f1ed1328fa7e392",
  measurementId: "G-D18339LD5W",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
