import firebase from 'firebase/compat/app';
import { getStorage, deleteObject, ref } from "firebase/storage";
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
// import {auth} from '../helpers/firebase'


import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// import store from './store';
// import { login as loginHandle, logout as logoutHandle } from './store/auth';
import toast from 'react-hot-toast';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID
};

// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export const auth = getAuth(firebaseApp);

const database = getDatabase();


const storage = getStorage(firebaseApp);
export default db;
export { storage, ref, deleteObject, database };

