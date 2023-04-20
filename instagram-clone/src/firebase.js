import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB__3fa1Uh1ANA2ZOTmPoL0hY1P9Gr3uSw",
  authDomain: "instagramclone-f3e9c.firebaseapp.com",
  projectId: "instagramclone-f3e9c",
  storageBucket: "instagramclone-f3e9c.appspot.com",
  messagingSenderId: "103158730298",
  appId: "1:103158730298:web:380666213c7c0d65fa6f03"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getFirestore(app)
export {auth, database};