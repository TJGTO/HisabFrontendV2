// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfOma5FT32Q5LyjumVBQMPhSd_G-8nBx8",
  authDomain: "wfgkol2023.firebaseapp.com",
  projectId: "wfgkol2023",
  storageBucket: "wfgkol2023.appspot.com",
  messagingSenderId: "288029413543",
  appId: "1:288029413543:web:e33aaf5615c48f98120b82",
  measurementId: "G-6BHSFX9BGD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
