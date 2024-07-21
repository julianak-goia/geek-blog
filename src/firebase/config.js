// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVn5QvIcePe8731iRxewukItCV8jwEOUM",
  authDomain: "miniblog-f6cb5.firebaseapp.com",
  projectId: "miniblog-f6cb5",
  storageBucket: "miniblog-f6cb5.appspot.com",
  messagingSenderId: "319214255857",
  appId: "1:319214255857:web:f382d40ca57f5a7cab7350",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializar banco de dados
const db = getFirestore(app);

export { db };
