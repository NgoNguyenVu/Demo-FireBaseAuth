// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBjSmRKc-lU6cg3C8FCO1irvkJELinVj5o",
  authDomain: "contactlistapp-12b92.firebaseapp.com",
  projectId: "contactlistapp-12b92",
  storageBucket: "contactlistapp-12b92.appspot.com",
  messagingSenderId: "811938266804",
  appId: "1:811938266804:android:043c2297097999f69ce1e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
