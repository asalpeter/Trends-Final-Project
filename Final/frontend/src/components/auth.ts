import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup, signOut } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC0aQKF-IhUgKo2N1_c_5JRxOiaghABXoU",
    authDomain: "guessing-game-76f46.firebaseapp.com",
    projectId: "guessing-game-76f46",
    storageBucket: "guessing-game-76f46.firebasestorage.app",
    messagingSenderId: "1018694836761",
    appId: "1:1018694836761:web:8a1a06c71931acb759c088",
    measurementId: "G-430WT51PK1"
  };

  export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user; // Returns user info
    } catch (error) {
      console.error("Error signing in");
    }
  };

  export const logOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out.");
    } catch (error) {
      console.error("Error signing out");
    }
  };
  
  const clientApp = initializeApp(firebaseConfig);
  const auth = getAuth(clientApp);
  const provider = new GoogleAuthProvider();

  export { auth, provider };
  