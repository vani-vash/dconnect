// client/src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// ✅ Replace these with your actual Firebase project config from Firebase Console
const firebaseConfig = {

  apiKey: "AIzaSyDU17iTYWO9JjZDglUQkUlVNNCGcQbyPxg",

  authDomain: "mentorshipapp-cd371.firebaseapp.com",

  projectId: "mentorshipapp-cd371",

  storageBucket: "mentorshipapp-cd371.firebasestorage.app",

  messagingSenderId: "253915857129",

  appId: "1:253915857129:web:73ad9a50e6a2e60534f078",

  measurementId: "G-XZY15Z03G1"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
