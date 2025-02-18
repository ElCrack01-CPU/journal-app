import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA8WwIPN7eUiazqiDYp1Xy04m13Wp-BO3w",
    authDomain: "journal-app-react-e7d18.firebaseapp.com",
    projectId: "journal-app-react-e7d18",
    storageBucket: "journal-app-react-e7d18.firebasestorage.app",
    messagingSenderId: "1008555727238",
    appId: "1:1008555727238:web:36da0e7c1c50b38d4d7407"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    app
}