import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";



const app = firebase.initializeApp({
  apiKey: "AIzaSyDiJqi8vCKtD4pKsasLuHB_coQMR4qRgXw",
  authDomain: "phloem-4ee0d.firebaseapp.com",
  projectId: "phloem-4ee0d",
  storageBucket: "phloem-4ee0d.appspot.com",
  messagingSenderId: "821422152508",
  appId: "1:821422152508:web:20ea520588fd7534c21c39"
});


export const auth = app.auth();
export const db = app.firestore()
// export const db = undefined
export default app;
