import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyD4fKCVGgfzJBgcBWMyiSNfD6YJ2bILfIE",
    authDomain: "web-chat-app-bb514.firebaseapp.com",
    databaseURL: "https://web-chat-app-bb514.firebaseio.com",
    projectId: "web-chat-app-bb514",
    storageBucket: "web-chat-app-bb514.appspot.com",
    messagingSenderId: "1001465832119",
    appId: "1:1001465832119:web:bbc06254e37e3029b5a332",
    measurementId: "G-Y2F87ZHR12"
  });

ReactDOM.render(<App />, document.getElementById('root'));

