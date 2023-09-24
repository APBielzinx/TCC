import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCz53oDuaBwJ3aojZGAyTT4-52A78bZwrc",
    authDomain: "chat-app-f56ff.firebaseapp.com",
    projectId: "chat-app-f56ff",
    storageBucket: "chat-app-f56ff.appspot.com",
    messagingSenderId: "115923889659",
    appId: "1:115923889659:web:26d56d02012314c798ef5e"
  };    

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
