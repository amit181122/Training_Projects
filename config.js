const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyA6vSVITx9Rx51m6IXB-VcKNnO_JVVnrSw",
    authDomain: "image-uploading-8409d.firebaseapp.com",
    projectId: "image-uploading-8409d",
    storageBucket: "image-uploading-8409d.appspot.com",
    messagingSenderId: "590564128696",
    appId: "1:590564128696:web:ce3877c22e10e05bb8014d",
    measurementId: "G-045M5KFN7L"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

const user = db.collection('users');

module.exports = user