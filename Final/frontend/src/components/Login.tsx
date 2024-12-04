import { useState, useEffect } from "react";
import { signInWithGoogle, logOut } from "./auth";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./auth";

const AuthComponent = () => {
  const [user, setUser] = useState<User | null>(null); 

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    const user = await signInWithGoogle();
    console.log("Signed in user:", user);
  };

  const handleSignOut = async () => {
    await logOut();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <>
          <h2>Welcome, {user.displayName}!</h2>
          <button onClick={handleSignOut} style={styles.logoutBtn}>
            Sign Out
          </button>
        </>
      ) : (
        <button onClick={handleSignIn} style={styles.loginBtn}>
          Sign in with Google
        </button>
      )}
    </div>
  );
};

const styles = {
  loginBtn: {
    backgroundColor: "#4285F4",
    color: "#FFF",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  logoutBtn: {
    backgroundColor: "#DB4437",
    color: "#FFF",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AuthComponent;
