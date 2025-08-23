import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "login-sparkcart.firebaseapp.com",
  projectId: "login-sparkcart",
  storageBucket: "login-sparkcart.firebasestorage.app",
  messagingSenderId: "377833688110",
  appId: "1:377833688110:web:45da53efc66a6cf57823bf"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}