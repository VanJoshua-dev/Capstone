// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app") ;
const { getFirestore } = require("firebase/firestore");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3ucZgEMoyhdeQkedU4s0eMuWwgONA_Cc",
  authDomain: "clickandbounce.firebaseapp.com",
  projectId: "clickandbounce",
  storageBucket: "clickandbounce.firebasestorage.app",
  messagingSenderId: "246467571168",
  appId: "1:246467571168:web:c6557e3f1004ac9296cf85",
  measurementId: "G-JX53JR5C1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };