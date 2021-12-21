import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDa6PohSSSvlxDsN_JotMWzyefOMZ66MJ0",
    authDomain: "ping-pong-2d7e1.firebaseapp.com",
    databaseURL: "https://ping-pong-2d7e1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ping-pong-2d7e1",
    storageBucket: "ping-pong-2d7e1.appspot.com",
    messagingSenderId: "284764076175",
    appId: "1:284764076175:web:aff82641fa74c92e3cd8fa",
    measurementId: "G-2CCT5LFPEG"
}

let config = firebase.initializeApp(firebaseConfig);

export default config;