// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBiLImB8Kx2gtvWc76BY9cN0mWx7sG4GEw',
    authDomain: 'todo-app-3536e.firebaseapp.com',
    projectId: 'todo-app-3536e',
    storageBucket: 'todo-app-3536e.appspot.com',
    messagingSenderId: '450049628180',
    appId: '1:450049628180:web:4f66d5fff552385695af01',
    databaseURL: 'https://todo-app-3536e-default-rtdb.firebaseio.com/'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)
