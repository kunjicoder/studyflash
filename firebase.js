// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1VUu_zm97XUQKmJspYf_cUQX18sw22Rc",
  authDomain: "studyflash-ai.firebaseapp.com",
  projectId: "studyflash-ai",
  storageBucket: "studyflash-ai.appspot.com",
  messagingSenderId: "155923136767",
  appId: "1:155923136767:web:803df240da3e6b033e8cca",
  measurementId: "G-QJH3VJX4F8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Correctly initialize Firestore
const analytics = getAnalytics(app);

export { db };