import { boot } from "quasar/wrappers";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDh68tCGaF47CR1FqINXg4Vc5j_9NNcHB4",
  authDomain: "chat-project-f6680.firebaseapp.com",
  projectId: "chat-project-f6680",
  storageBucket: "chat-project-f6680.appspot.com",
  messagingSenderId: "138746904326",
  appId: "1:138746904326:web:b62f7b61d4899ec0d36887",
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
