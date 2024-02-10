// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFLg7hWao-BlklnDGVwHbAV57pcV0i1eo",
  authDomain: "medical-management-syste-d729c.firebaseapp.com",
  projectId: "medical-management-syste-d729c",
  storageBucket: "medical-management-syste-d729c.appspot.com",
  messagingSenderId: "132129444289",
  appId: "1:132129444289:web:c2dfdfd8c71ae58319df40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app)

