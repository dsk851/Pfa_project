// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tuv-store.firebaseapp.com",
  projectId: "tuv-store",
  storageBucket: "tuv-store.firebasestorage.app",
  messagingSenderId: "478358992617",
  appId: "1:478358992617:web:bb72bbddb0abbc87b96278",
  measurementId: "G-5GQFWT3D7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);
// const analytics = getAnalytics(app);