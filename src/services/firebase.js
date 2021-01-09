import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/analytics';

console.log(process.env.VUE_APP_FIREBASE_CONFIG);

const config = JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG);

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
