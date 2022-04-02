// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkZ60hXXZOaY-8sXSB1o8YDyl2xmLlGtg",
  authDomain: "react-login-udemy.firebaseapp.com",
  projectId: "react-login-udemy",
  storageBucket: "react-login-udemy.appspot.com",
  messagingSenderId: "501825596157",
  appId: "1:501825596157:web:e2560e7b46f4723a892c94",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
