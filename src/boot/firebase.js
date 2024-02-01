import { boot } from "quasar/wrappers";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdRqHhmUzk4llpP33I6OEj9a2P0Da5QbE",
  authDomain: "chat-vue3-quasar-35d1b.firebaseapp.com",
  projectId: "chat-vue3-quasar-35d1b",
  storageBucket: "chat-vue3-quasar-35d1b.appspot.com",
  messagingSenderId: "504900951899",
  appId: "1:504900951899:web:af1a0feb4169d164ba047e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { db, auth, timeStamp };

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
});
