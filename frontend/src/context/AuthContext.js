import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IpContext } from "./IpContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const auth = FIREBASE_AUTH;
  const { ipAddress } = useContext(IpContext);

  // 🔗 Fetch backend user by email
  const getUserByEmail = async (email) => {
    const res = await fetch(`${ipAddress}/api/users/by-email?email=${email}`);
    if (!res.ok) throw new Error("User not found in backend");
    return res.json();
  };

  // ✅ LOGIN
  const login = async (email, password) => {
    setLoading(true);
    setAuthError("");
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;
      const idToken = await user.getIdToken(true);
      const backendUser = await getUserByEmail(user.email);
      await AsyncStorage.setItem("user", JSON.stringify(backendUser));
      await AsyncStorage.setItem("token", idToken);
      // onAuthStateChanged will set isLoggedIn
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ SIGN UP
  const signUp = async (firstName, lastName, email, password) => {
    setLoading(true);
    setAuthError("");
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(response.user, {
        displayName: `${firstName} ${lastName}`,
      });

      await sendEmailVerification(response.user);

      const idToken = await response.user.getIdToken(true);
      await AsyncStorage.setItem("token", idToken);

      const registerResp = await fetch(`${ipAddress}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ firstName, lastName, email }),
      });

      const responseText = await registerResp.text();
      console.log("🛠 Backend response:", registerResp.status, responseText);

      if (!registerResp.ok) {
        throw new Error("Failed to register user in backend");
      }

      const backendUser = await getUserByEmail(email);
      await AsyncStorage.setItem("user", JSON.stringify(backendUser));

      return { success: true, message: "Verification email sent" };
    } catch (error) {
      console.log("❌ Sign up error:", error);
      if (error.code === "auth/email-already-in-use") {
        setAuthError("This email is already in use.");
      } else if (error.code === "auth/invalid-email") {
        setAuthError("Please enter a valid email.");
      } else if (error.code === "auth/weak-password") {
        setAuthError("Password should be at least 6 characters.");
      } else {
        setAuthError(error.message || "Sign Up Failed");
      }
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  // 🔓 Logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
      setIsLoggedIn(false);
      console.log("✅ Logged out");
    } catch (error) {
      console.log("❌ Logout error:", error);
    }
  };

  // 🔁 Listen to Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const backendUser = await getUserByEmail(user.email);
          await AsyncStorage.setItem("user", JSON.stringify(backendUser));
          const idToken = await user.getIdToken(true);
          await AsyncStorage.setItem("token", idToken);
          setIsLoggedIn(true);
        } catch (error) {
          console.log("❌ Error syncing user:", error);
          setIsLoggedIn(false);
        }
      } else {
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("token");
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        signUp,
        logout,
        isLoggedIn,
        setIsLoggedIn,
        loading,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
