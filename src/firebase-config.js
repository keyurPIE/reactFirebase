// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABMGOnRSp_EuiYdltFqC2rxumEYQY95Ew",
  authDomain: "todoapp-9f30c.firebaseapp.com",
  projectId: "todoapp-9f30c",
  storageBucket: "todoapp-9f30c.appspot.com",
  messagingSenderId: "647467203478",
  appId: "1:647467203478:web:6a0181df5d74a260963bb7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// Export firestore database
// It will be imported into your react app whenever it is needed
