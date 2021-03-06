import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCYXNrgSOKES-ASlEj1MCKUBp5lFZ7vWME',
  authDomain: 'tweet-843ae.firebaseapp.com',
  projectId: 'tweet-843ae',
  storageBucket: 'tweet-843ae.appspot.com',
  messagingSenderId: '968749188940',
  appId: '1:968749188940:web:962a3a81e24d0ab16531e9',
  measurementId: 'G-41EZ985W1F',
};
firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
