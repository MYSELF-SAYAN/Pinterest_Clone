import { initializeApp } from 'firebase/app';
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyCN5rl6VNVEhFSMPdblDs7Js-x5XxG8uNc",
  authDomain: "advancedpinterest.firebaseapp.com",
  projectId: "advancedpinterest",
  storageBucket: "advancedpinterest.appspot.com",
  messagingSenderId: "372190934702",
  appId: "1:372190934702:web:e71cd517630fdeeb6adf3f",
  measurementId: "G-3V3W1PQRDE"
};


const app = initializeApp(firebaseConfig);
export const googleProvider=new GoogleAuthProvider()
export const auth=getAuth(app)
export const db =getFirestore()
export const storage=getStorage(app)