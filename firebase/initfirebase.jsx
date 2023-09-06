// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const clientCredentials = {
  apiKey: "AIzaSyB97yXsoKs8m_R46JEl_-0g-tVAmIMnylI",
  authDomain: "hpmsf-690d7.firebaseapp.com",
  projectId: "hpmsf-690d7",
  storageBucket: "hpmsf-690d7.appspot.com",
  messagingSenderId: "7464876636",
  appId: "1:7464876636:web:7379e72888d3a18aefc499",
  measurementId: "G-KT44X72E08"
};

// Initialize Firebase
export default function initFirebase() {
    const app = initializeApp(clientCredentials);
    const db = getFirestore(app);
    // const analytics = getAnalytics(app);
    console.log("Firebase has been init successfully");
}





// import firebase from "firebasea/app";

// import 'firebase/auth'
// import 'firebase/firestore'
// import 'firebase/storage'
// import 'firebase/analytics'
// import 'firebase/performance'


// const clientCredentials = {
//     apiKey: "AIzaSyB97yXsoKs8m_R46JEl_-0g-tVAmIMnylI",
//     authDomain: "hpmsf-690d7.firebaseapp.com",
//     projectId: "hpmsf-690d7",
//     storageBucket: "hpmsf-690d7.appspot.com",
//     messagingSenderId: "7464876636",
//     appId: "1:7464876636:web:7379e72888d3a18aefc499",
//     measurementId: "G-KT44X72E08",
//   };

// export default function initFirebase() {
//     // if (!firebase.apps.length) {
//         firebase.initializeApp(clientCredentials)
//         if (typeof window !== 'undefined') {
//             // Enable analytics
//             if ('measurementId' in clientCredentials) {
//                 firebase.analytics()
//                 firebase.performance()
//             }
//         }
//         console.log("Firebase has been init successfully");
//     // }
// }








// const firebaseConfig = {
//     apiKey: "AIzaSyB97yXsoKs8m_R46JEl_-0g-tVAmIMnylI",
//     authDomain: "hpmsf-690d7.firebaseapp.com",
//     projectId: "hpmsf-690d7",
//     storageBucket: "hpmsf-690d7.appspot.com",
//     messagingSenderId: "7464876636",
//     appId: "1:7464876636:web:7379e72888d3a18aefc499",
//     measurementId: "G-KT44X72E08",
//   };

//   function initFirebase() {
//       if (typeof window !== undefined) {
//           initializeApp(clientCredentials);
//           console.log("Firebase has been init successfully");
//       }
//   }
  
//   const app = initializeApp(clientCredentials);
  
//   const db = getFirestore(app);
  
//   const realDB = getDatabase(app);
  
//   export { initFirebase, db, realDB };