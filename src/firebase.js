import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCOd91ktvn_VTVWmiejenEhgAMqcOcZLDw",
  authDomain: "slack-clone-6e4b1.firebaseapp.com",
  projectId: "slack-clone-6e4b1",
  storageBucket: "slack-clone-6e4b1.appspot.com",
  messagingSenderId: "197177570653",
  appId: "1:197177570653:web:d80a594fccba97007ee4b4",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
