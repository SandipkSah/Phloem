import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyB4oXbeiEX-8ZvfPO4nrmBkx-hrKHPwHns",
  authDomain: "fir-auth-dev-f61ed.firebaseapp.com",
  projectId: "fir-auth-dev-f61ed",
  storageBucket: "fir-auth-dev-f61ed.appspot.com",
  messagingSenderId: "246817582391",
  appId: "1:246817582391:web:6f1eb2e12dcd8aa274beb2"
});

export const auth = app.auth();
export default app;