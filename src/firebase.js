// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL4h1tXGsB36GuyshXINxMmPPXw5G53a0",
  authDomain: "clonex-421e0.firebaseapp.com",
  projectId: "clonex-421e0",
  storageBucket: "clonex-421e0.firebasestorage.app",
  messagingSenderId: "113895862804",
  appId: "1:113895862804:web:b4c2e57ce5bb8158bfed01",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
