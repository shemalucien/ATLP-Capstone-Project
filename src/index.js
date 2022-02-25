import { initializeApp } from 'firebase/app'

import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp, getDoc, updateDoc
} from 'firebase/firestore'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword
} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyB9-BrPiVhdSTxtJ_oiykVVVvUX5WOo8-Q",
  authDomain: "my-portfolio-2ee02.firebaseapp.com",
  projectId: "my-portfolio-2ee02",
  storageBucket: "my-portfolio-2ee02.appspot.com",
  messagingSenderId: "333316907547",
  appId: "1:333316907547:web:858ca53bca386e1ab54ebe"
};
// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

// collection ref
const colRef = collection(db, 'users')

// realtime collection data

onSnapshot(colRef, (snapshot) => {
  let users = []
  snapshot.docs.forEach(doc => {
    users.push({ ...doc.data(), id: doc.id })
  })
  console.log(users)
})

//signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user created:', cred.user)
      signupForm.reset()
    })
    .catch((err) => {
      console.log(err.message)
    })
})


// logging in and out
const logoutButton = document.querySelector('.signout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('user signed out')
    })
    .catch(err => {
      console.log(err.message)
    })
})

const loginForm = document.querySelector('.signin')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value
  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user signed in:', cred.user)
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})