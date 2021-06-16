import firebase from "firebase/app";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBAkGT9zlfrykTY2Mh8mz2FWlYm16aCwsI",
    authDomain: "estore-72ef4.firebaseapp.com",
    projectId: "estore-72ef4",
    storageBucket: "estore-72ef4.appspot.com",
    messagingSenderId: "711948340650",
    appId: "1:711948340650:web:589f0812d5bb7b5cb32fd3",
    measurementId: "G-8S4V7KWNL2"
  };

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();

export {storage , firebase as defaul} ;
