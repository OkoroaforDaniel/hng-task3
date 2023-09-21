import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBX0cDEj_ifx6H2nT_zZYCR_wssSJ0t6Io",
  authDomain: "hng-task3-auth.firebaseapp.com",
  projectId: "hng-task3-auth",
  storageBucket: "hng-task3-auth.appspot.com",
  messagingSenderId: "30455338447",
  appId: "1:30455338447:web:2cde4adfc2d2bef04e2eba",
  measurementId: "G-E6NQCH348X"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getAuth(app)