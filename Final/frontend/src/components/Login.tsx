import { useState, useEffect } from "react";
import { signInWithGoogle, logOut , auth} from "./auth";
import { onAuthStateChanged, User } from "firebase/auth";

const AuthComponent = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

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

  const handleDeleteAccount = async () => {
    if (user) {
      setIsDeleting(true);
      setError('');

      try {
        const response = await fetch("http://localhost:8080/delete-account", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.email }),
        });

        const result = await response.json();

        if (response.ok) {
          alert("Your account has been deleted.");
          await logOut(); // Log out the user after successful deletion
          window.location.href = "/login"; // Redirect to login page or home
        } else {
          setError(result.message || "Failed to delete account");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        setError("Something went wrong. Please try again later.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <>
          <h2>Welcome, {user.displayName}!</h2>
          <button onClick={handleSignOut} style={styles.logoutBtn}>
            Sign Out
          </button>
          <br />
          <button
            onClick={handleDeleteAccount}
            style={styles.deleteBtn}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete My Account"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
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
  deleteBtn: {
    backgroundColor: "#FF6347", // Tomato color for Delete button
    color: "#FFF",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default AuthComponent;
