import firebase from 'firebase';

var firebase_config = {
  apiKey: 'AIzaSyDQlT9_i8eZXHJcn9bnc6GZAJaw9UTR_7E',
  authDomain: 'task-manager-744f4.firebaseapp.com',
  databaseURL: 'https://task-manager-744f4.firebaseio.com',
  projectId: 'task-manager-744f4',
  storageBucket: 'task-manager-744f4.appspot.com',
  messagingSenderId: '722453844581',
};

var fire = firebase.initializeApp(firebase_config);
export default fire;
