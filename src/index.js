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
const colRef_queries = collection(db, 'queries')
const colRef_subscribers = collection(db, 'subscribers')

// realtime collection data
onSnapshot(colRef, (snapshot) => {
  let users = []
  snapshot.docs.forEach(doc => {
    users.push({ ...doc.data(), id: doc.id })
  })
  console.log(users)
})
onSnapshot(colRef_queries, (snapshot) => {
  let queries = []
  snapshot.docs.forEach(doc => {
    queries.push({ ...doc.data(), id: doc.id })
  })
  console.log(queries)
})
onSnapshot(colRef_subscribers, (snapshot) => {
  let subs = []
  snapshot.docs.forEach(doc => {
    subs.push({ ...doc.data(), id: doc.id })
  })
  console.log(subs)
})
// Submitting Queries
const sendQueryForm = document.querySelector('.query')
sendQueryForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef_queries, {
    name: sendQueryForm.name.value,
    email: sendQueryForm.email.value,
    message: sendQueryForm.message.value,
    createdAt: serverTimestamp()
  })
    .then(() => {
      sendQueryForm.reset()
      console.log('Message Sent:')
      alert('Message Sent:')
    })
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
      alert('user created:', cred.user)
      signupForm.reset()
    })
    .catch((err) => {
      console.log(err.message)
    })
})


// logging in
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value
  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user signed in:', cred.user)
      alert('user signed in:', cred.user)
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})

//adding subscription
const sendSubscription = document.querySelector('.sendsub')
sendSubscription.addEventListener('submit', (e) => {

  e.preventDefault()

  addDoc(colRef_subscribers, {

    email: sendSubscription.email.value,
    createdAt: serverTimestamp()
  })
    .then(() => {
      sendSubscription.reset()
      console.log('Subscription Sent:')
      alert('Subscription Sent:')
    })
})

// deleting subscription
const deleteSubscription = document.querySelector('.subscribe')
deleteSubscription.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'subscribers', deleteSubscription.email.value)

  deleteDoc(docRef)
    .then(() => {
      deleteSubscription.reset()
      console.log('Subscription Removed:')
      alert('Subscription Removed:')
    })
})
