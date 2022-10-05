import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD5NT4I0GyLrLYy16Gaxoh9IEJt6BRmnlQ",
  authDomain: "video-eec15.firebaseapp.com",
  projectId: "video-eec15",
  storageBucket: "video-eec15.appspot.com",
  messagingSenderId: "62210481341",
  appId: "1:62210481341:web:13d50ba6704eb622b72bd4",
  measurementId: "G-MKBZK1ZJK4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
