import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBZXBwUFQvUCmXrgZ6oOgabyXee0MtB1wk",
  authDomain: "start-5247b.firebaseapp.com",
  projectId: "start-5247b",
  storageBucket: "start-5247b.appspot.com",
  messagingSenderId: "361369059500",
  appId: "1:361369059500:web:380595fa1ab2834d0c5f09",
  measurementId: "G-QNH0K99HHJ",
}

console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db , storage};