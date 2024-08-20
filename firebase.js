import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD1VUu_zm97XUQKmJspYf_cUQX18sw22Rc",
  authDomain: "studyflash-ai.firebaseapp.com",
  projectId: "studyflash-ai",
  storageBucket: "studyflash-ai.appspot.com",
  messagingSenderId: "155923136767",
  appId: "1:155923136767:web:803df240da3e6b033e8cca",
  measurementId: "G-QJH3VJX4F8"
};

let app;
let db;

if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export { db };