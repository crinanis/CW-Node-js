import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAJQioOMYEaHU76Je0W6lpOJlHdc9eHQQc",
    authDomain: "spicezen-ebf0d.firebaseapp.com",
    projectId: "spicezen-ebf0d",
    storageBucket: "spicezen-ebf0d.appspot.com",
    messagingSenderId: "51723599620",
    appId: "1:51723599620:web:5dab0d077ca72c8c895a51",
    measurementId: "G-49PDG3HREW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;