import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCz53oDuaBwJ3aojZGAyTT4-52A78bZwrc",
  authDomain: "chat-app-f56ff.firebaseapp.com",
  projectId: "chat-app-f56ff",
  storageBucket: "chat-app-f56ff.appspot.com",
  messagingSenderId: "115923889659",
  appId: "1:115923889659:web:26d56d02012314c798ef5e"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
