import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, set, get } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-sdh-react.firebaseapp.com",
  databaseURL: "https://chat-sdh-react-default-rtdb.firebaseio.com",
  projectId: "chat-sdh-react",
  storageBucket: "chat-sdh-react.appspot.com",
  messagingSenderId: "987498289010",
  appId: "1:987498289010:web:742753347710d7d0fd2feb",
  measurementId: "G-VB30HD6HT2",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {
  database,
  ref,
  set,
  onValue,
  push,
  get,
  storage,
  storageRef,
  uploadBytes,
  getDownloadURL,
  auth,
};