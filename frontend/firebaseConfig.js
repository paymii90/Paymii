// firebase.js

import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZEQ7paP-yscm27rG0QRtVSocd7y9OnYw",
  authDomain: "paymii-9109f.firebaseapp.com",
  projectId: "paymii-9109f",
  storageBucket: "paymii-9109f.appspot.com", // <-- typo fixed!
  messagingSenderId: "320392084409",
  appId: "1:320392084409:web:35b9e03fe0f25631b45468",
  measurementId: "G-VGZ48SCEXV"
};

// Initialize Firebase app
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence for React Native
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});


