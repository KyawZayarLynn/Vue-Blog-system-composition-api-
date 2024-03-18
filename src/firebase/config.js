// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2ZFQLF_ZCSXUF5jAryhsVLCgLC8ugUOU",
  authDomain: "vue-blog-system-8aa7a.firebaseapp.com",
  projectId: "vue-blog-system-8aa7a",
  storageBucket: "vue-blog-system-8aa7a.appspot.com",
  messagingSenderId: "149863406280",
  appId: "1:149863406280:web:3e62096c9792860178a3fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };