import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDam9aUFtZ2qW63F8uDb9tlnbGyWrk9qJM",
    authDomain: "news-app-92e53.firebaseapp.com",
    projectId: "news-app-92e53",
    storageBucket: "news-app-92e53.appspot.com",
    messagingSenderId: "690856107946",
    appId: "1:690856107946:web:8a5ad7bb255c35012d15d3",
    measurementId: "G-FBFXGD8589"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export the auth, provider, and signInWithPopup function
export { auth, provider, signInWithPopup };
