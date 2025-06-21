import React, { createContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
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
=======
  const [authError, setAuthError] = useState("");
  const auth = FIREBASE_AUTH;

  // 🔗 Fetch backend user by email
  const getUserByEmail = async (email) => {
    const res = await fetch(`http://10.80.32.185:8080/api/users/by-email?email=${email}`);
    if (!res.ok) throw new Error("User not found in backend");
    return res.json();
  };

  // ✅ LOGIN
  const login = async (email, password) => {
    setLoading(true);
    setAuthError("");
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Firebase login successful:", response);

      const user = response.user;
      if (!user) {
        console.warn("❗ Firebase user is null");
        return;
      }

      // 🔑 Force-refresh the ID token
      const idToken = await user.getIdToken(true);
      console.log("🔑 Firebase ID Token:", idToken);

      // 🔄 Get user from your backend
      const backendUser = await getUserByEmail(user.email);
      console.log("✅ Backend user:", backendUser);

      // 🧠 Store user + token
      await AsyncStorage.setItem("user", JSON.stringify(backendUser));
      await AsyncStorage.setItem("token", idToken);

      // 🔍 Verify token was stored
      const confirmToken = await AsyncStorage.getItem("token");
      console.log("🧠 Confirmed stored token:", confirmToken);

      setIsLoggedIn(true);
    } catch (error) {
      console.log("❌ Login error:", error);
>>>>>>> 460128f3b94239e4d5254f32650f7779896ef216
      setAuthError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  // Signup logic with automatic email verification and backend registration
  const signUp = async (firstName, lastName, email, password) => {
    setLoading(true);
    setAuthError(""); // reset error on each attempt
    try {
      // 1. Create user in Firebase Auth
      const response = await createUserWithEmailAndPassword(auth, email, password);

      // 2. Optionally update Firebase displayName
=======
  // ✅ SIGN UP
  const signUp = async (firstName, lastName, email, password) => {
    setLoading(true);
    setAuthError("");
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);

>>>>>>> 460128f3b94239e4d5254f32650f7779896ef216
      await updateProfile(response.user, {
        displayName: `${firstName} ${lastName}`,
      });

<<<<<<< HEAD
      // 3. Send email verification!
      await sendEmailVerification(response.user);

      // 4. Get Firebase ID token (JWT)
      const idToken = await response.user.getIdToken();
      console.log("ID Token:", idToken);

      // 5. Register user in your backend
      const registerResp = await fetch("http://10.30.22.215:8080/api/users/register", {
=======
      await sendEmailVerification(response.user);
      const idToken = await response.user.getIdToken(true); // also force refresh here
      await AsyncStorage.setItem("token", idToken); // ✅ store token too

      // Register in backend
      const registerResp = await fetch("http://10.80.32.185:8080/api/users/register", {
>>>>>>> 460128f3b94239e4d5254f32650f7779896ef216
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

<<<<<<< HEAD
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
=======
      if (!registerResp.ok) throw new Error("Failed to register user in backend");

      const backendUser = await getUserByEmail(email);
      await AsyncStorage.setItem("user", JSON.stringify(backendUser));

      setIsLoggedIn(true);
      alert("Check your email to verify your account!");
    } catch (error) {
      console.log("❌ Sign up error:", error);
      if (error.code === "auth/email-already-in-use") {
        setAuthError("This email is already in use.");
      } else if (error.code === "auth/invalid-email") {
        setAuthError("Please enter a valid email.");
>>>>>>> 460128f3b94239e4d5254f32650f7779896ef216
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
