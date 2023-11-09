// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy8D_5WaauBELucO5YAwFUF9_HyzuAwdI",
  authDomain: "nobin-udyokta.firebaseapp.com",
  projectId: "nobin-udyokta",
  storageBucket: "nobin-udyokta.appspot.com",
  messagingSenderId: "794984644817",
  appId: "1:794984644817:web:e701bdd4b3384c3dc4c5f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app) 