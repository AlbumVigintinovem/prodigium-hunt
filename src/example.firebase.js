import firebase from 'firebase/compat/app';
import { getStorage, deleteObject, ref } from "firebase/storage";
import {getAuth} from 'firebase/auth'

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
  apiKey: "your-apiKeyI",
  authDomain: "your-authDomain",
  projectId: "your-projectId",
  storageBucket: "your-storageBucket",
  messagingSenderId: "your-messagingSenderId",
  appId: "your-appId"
};

// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export const auth = getAuth(firebaseApp);


const storage = getStorage(firebaseApp);
export default db;
export { storage, ref, deleteObject };

