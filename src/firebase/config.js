import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

//process.env.FIREBASE_API_KEY
const firebaseConfig = {

};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
export { db }