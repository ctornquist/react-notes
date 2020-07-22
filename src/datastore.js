import firebase from 'firebase';

/* <script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js"></script> */

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAzQ1eMg7GlyJGuKXMxTkxItXYQUA5uZ7g",
    authDomain: "firenotes-7f55e.firebaseapp.com",
    databaseURL: "https://firenotes-7f55e.firebaseio.com",
    projectId: "firenotes-7f55e",
    storageBucket: "firenotes-7f55e.appspot.com",
    messagingSenderId: "311596311079",
    appId: "1:311596311079:web:a7b38a3357e17c490b2402"
};

export function fetchNotes(callback) { 
    //do something here
    //callback() when done
  }

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
