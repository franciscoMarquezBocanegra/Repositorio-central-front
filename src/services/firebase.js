import firebase from 'firebase/compat/app'; // <-- This must be first
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

try {
    //https://blogs.encamina.com/piensa-en-software-desarrolla-en-colores/como-gestionar-las-variables-de-entornos-en-reactjs/
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
} catch (error) {
    if (!/already exists/u.test(error.message)) {
        console.error('Firebase admin initialization error', error.stack);
    }
}

// Passing off firebase.auth() instead of firebase.auth
// allows us to share the same instance of Firebase throughout
// the entire app whenever we import it from here.
export const fb = {
    auth: firebase.auth(),
    storage: firebase.storage(),
    firestore: firebase.firestore(),
};
