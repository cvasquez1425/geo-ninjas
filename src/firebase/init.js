import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDUfhPCgt_WL0RGeSYAYl-5Da4DgoNTbIY",
  authDomain: "udemy-geo-ninjas-7855e.firebaseapp.com",
  databaseURL: "https://udemy-geo-ninjas-7855e.firebaseio.com",
  projectId: "udemy-geo-ninjas-7855e",
  storageBucket: "udemy-geo-ninjas-7855e.appspot.com",
  messagingSenderId: "447893763500",
  appId: "1:447893763500:web:21cea195dc83c59e86f609"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
//export our database
export default firebaseApp.firestore();
