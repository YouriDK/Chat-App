import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { createContext } from 'react';
import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCOd91ktvn_VTVWmiejenEhgAMqcOcZLDw',
  authDomain: 'slack-clone-6e4b1.firebaseapp.com',
  projectId: 'slack-clone-6e4b1',
  storageBucket: 'slack-clone-6e4b1.appspot.com',
  messagingSenderId: '197177570653',
  appId: '1:197177570653:web:d80a594fccba97007ee4b4',
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const ChatAppContext = createContext<any>({});
