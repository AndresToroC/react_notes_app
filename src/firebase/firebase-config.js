import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCh9w6AfKuM0jGr4BGJqMbE1zDUqvetUeg",
    authDomain: "restaurants-4f617.firebaseapp.com",
    databaseURL: "https://restaurants-4f617.firebaseio.com",
    projectId: "restaurants-4f617",
    storageBucket: "restaurants-4f617.appspot.com",
    messagingSenderId: "873285171599",
    appId: "1:873285171599:web:aca79a15f12ce4d017b3fa"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export {
    firebase, db
}