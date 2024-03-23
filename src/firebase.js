// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics }  from "firebase/analytics";
import { getFirestore }  from "firebase/firestore";
import { getAuth }       from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoaeVt3GJbPtx1Qe6lxqoyR49nul-nr6Y",
  authDomain: "food-delivery-402b3.firebaseapp.com",
  projectId: "food-delivery-402b3",
  storageBucket: "food-delivery-402b3.appspot.com",
  messagingSenderId: "23021774200",
  appId: "1:23021774200:web:f1a8c0a05ec264ec7b548d",
  measurementId: "G-MW534WPHKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()
export const db = getFirestore(app);
export const storage = getStorage(app)