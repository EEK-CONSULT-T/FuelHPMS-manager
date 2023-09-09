// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB97yXsoKs8m_R46JEl_-0g-tVAmIMnylI",
  authDomain: "hpmsf-690d7.firebaseapp.com",
  projectId: "hpmsf-690d7",
  storageBucket: "hpmsf-690d7.appspot.com",
  messagingSenderId: "7464876636",
  appId: "1:7464876636:web:7379e72888d3a18aefc499",
  measurementId: "G-KT44X72E08",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
