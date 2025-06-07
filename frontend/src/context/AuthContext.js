import React, { createContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(""); // <-- For error messaging
  const auth = FIREBASE_AUTH;

  // Login logic
  const login = async (email, password) => {
    setLoading(true);
    setAuthError(""); // reset error on each attempt
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      // Use a friendly error message for login failure if you want
      setAuthError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Signup logic with automatic email verification and backend registration
  const signUp = async (firstName, lastName, email, password) => {
    setLoading(true);
    setAuthError(""); // reset error on each attempt
    try {
      // 1. Create user in Firebase Auth
      const response = await createUserWithEmailAndPassword(auth, email, password);

      // 2. Optionally update Firebase displayName
      await updateProfile(response.user, {
        displayName: `${firstName} ${lastName}`,
      });

      // 3. Send email verification!
      await sendEmailVerification(response.user);

      // 4. Get Firebase ID token (JWT)
      const idToken = await response.user.getIdToken();
      console.log("ID Token:", idToken);

      // 5. Register user in your backend
      const registerResp = await fetch("http://192.168.22.205:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
        }),
      });

      if (!registerResp.ok) {
        throw new Error("Failed to register user in backend");
      }

      setIsLoggedIn(true);
      setAuthError(""); // clear any error
      alert("Check your email to verify your account!");
      // Optionally: navigation.navigate("VerifyEmail");

    } catch (error) {
      console.log(error);
      // Friendly error handling
      if (error.code === "auth/email-already-in-use") {
        setAuthError("This email is already in use. Please use a different email.");
      } else if (error.code === "auth/invalid-email") {
        setAuthError("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setAuthError("Password should be at least 6 characters.");
      } else {
        setAuthError(error.message || "Sign Up Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ login, signUp, loading, authError }}>
      {children}
    </AuthContext.Provider>
  );
};
