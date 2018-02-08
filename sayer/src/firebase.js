import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyADW-3j_MSJ8B5lynJxAYmfXIvWUWKBjZc",
  authDomain: "sayer-4d692.firebaseapp.com",
  databaseURL: "https://sayer-4d692.firebaseio.com",
  projectId: "sayer-4d692",
  storageBucket: "sayer-4d692.appspot.com",
  messagingSenderId: "535861544601"
};

firebase.initializeApp(config);

export const db = firebase.database().ref('items/');
export const fireDb = firebase.database();
export const storageRef = firebase.storage().ref();
