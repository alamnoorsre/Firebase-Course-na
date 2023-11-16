
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC-NxCJbVh3uWm584FZZbUVQoW3JlEwdR0",
  authDomain: "fir-course-na.firebaseapp.com",
  projectId: "fir-course-na",
  storageBucket: "fir-course-na.appspot.com",
  messagingSenderId: "248855822877",
  appId: "1:248855822877:web:c8526c40d799339f6ffcf4",
  measurementId: "G-7S0SMW039S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);