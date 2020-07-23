import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAzQ1eMg7GlyJGuKXMxTkxItXYQUA5uZ7g',
  authDomain: 'firenotes-7f55e.firebaseapp.com',
  databaseURL: 'https://firenotes-7f55e.firebaseio.com',
  projectId: 'firenotes-7f55e',
  storageBucket: 'firenotes-7f55e.appspot.com',
  messagingSenderId: '311596311079',
  appId: '1:311596311079:web:a7b38a3357e17c490b2402',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export function fetchNotes(callback) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
}

export function deleteNote(id) {
  firebase.database().ref('notes').child(id).remove();
}

export function updateNote(id, fields) {
  firebase.database().ref('notes').child(id).update(fields);
}

export function addNote(newNote) {
  firebase.database().ref('notes').push(newNote);
}
