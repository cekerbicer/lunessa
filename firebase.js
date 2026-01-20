import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Firestore (Veri Tabanı) için bu importu ekliyoruz
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxa50SkN_UxFayHCc_RNssK1YjSeUUbNo",
  authDomain: "skindiseaseapp-108227.firebaseapp.com",
  projectId: "skindiseaseapp-108227",
  storageBucket: "skindiseaseapp-108227.firebasestorage.app",
  messagingSenderId: "472316702506",
  appId: "1:472316702506:web:075b7edeae3c422d04f853",
  measurementId: "G-LKH9VPP9WY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Firestore'u başlat ve dışa aktar (export)
const db = getFirestore(app);
const auth = getAuth(app);
// Uygulamanın diğer bileşenlerinde kullanmak için dışa aktarıyoruz
export { db, analytics, app, auth }; 


// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

// // TODO: Add SDKs for Firebase products that you want to use

// // https://firebase.google.com/docs/web/setup#available-libraries



// // Your web app's Firebase configuration

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {

//   apiKey: "AIzaSyDxa50SkN_UxFayHCc_RNssK1YjSeUUbNo",

//   authDomain: "skindiseaseapp-108227.firebaseapp.com",

//   projectId: "skindiseaseapp-108227",

//   storageBucket: "skindiseaseapp-108227.firebasestorage.app",

//   messagingSenderId: "472316702506",

//   appId: "1:472316702506:web:075b7edeae3c422d04f853",

//   measurementId: "G-LKH9VPP9WY"

// };



// // Initialize Firebase

// const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);