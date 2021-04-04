import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDB3ALxk1ZZ7pqGeWCFEMgqFNbJjX6GdoI",
  authDomain: "react-todo-app-35d00.firebaseapp.com",
  projectId: "react-todo-app-35d00",
  storageBucket: "react-todo-app-35d00.appspot.com",
  messagingSenderId: "866058771461",
  appId: "1:866058771461:web:2eab0a6850df5da819906c",
  measurementId: "G-KKJ8GZ266D"
})

const db = firebaseApp.firestore()

export default db;
