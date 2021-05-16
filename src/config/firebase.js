import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const app = firebase.initializeApp({
  apiKey: "AIzaSyDvJNMVLzcS5wPEKCIiAPAzs5EA2TEpTEc",
  authDomain: "userauthwithfirebase.firebaseapp.com",
  projectId: "userauthwithfirebase",
  storageBucket: "userauthwithfirebase.appspot.com",
  messagingSenderId: "955364098264",
  appId: "1:955364098264:web:1e93e71d821200574817ad",
  measurementId: "G-TBQZKN8SDT",
});

export const auth = app.auth();
export const db = app.firestore();
