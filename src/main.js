import router from './router';

import PortalVue from 'portal-vue'


import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue'
import App from './App.vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkKfaAeQa86Hm40ApEeNM14DigYKqCXKY",
  authDomain: "consulting-app-001.firebaseapp.com",
  databaseURL: "https://consulting-app-001-default-rtdb.firebaseio.com",
  projectId: "consulting-app-001",
  storageBucket: "consulting-app-001.appspot.com",
  messagingSenderId: "431188420022",
  appId: "1:431188420022:web:5dc1d52c829d575ba00d17",
  measurementId: "G-2WLKR200HC"
};

// Initialize Firebase
initializeApp(firebaseConfig);
//export const db = getFirestore();

const app=createApp(App);


app.use(router);
app.mount('#app');
app.use(PortalVue)

import "bootstrap/dist/js/bootstrap.js"