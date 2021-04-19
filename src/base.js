import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCYXNrgSOKES-ASlEj1MCKUBp5lFZ7vWME',
  authDomain: 'tweet-843ae.firebaseapp.com',
  projectId: 'tweet-843ae',
  storageBucket: 'tweet-843ae.appspot.com',
  messagingSenderId: '968749188940',
  appId: '1:968749188940:web:962a3a81e24d0ab16531e9',
  measurementId: 'G-41EZ985W1F',
};
export default firebase.initializeApp(firebaseConfig);
