import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

//process.env.FIREBASE_API_KEY
const firebaseConfig = {
  apiKey: "AIzaSyBg9fOzVwqhJmTtkNq4ptxEyYML04ZyUp8",
  authDomain: "vue-vet-portal.firebaseapp.com",
  projectId: "vue-vet-portal",
  storageBucket: "vue-vet-portal.appspot.com",
  messagingSenderId: "405681588927",
  appId: "1:405681588927:web:f97172025090d7fcba540a"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
export { db }