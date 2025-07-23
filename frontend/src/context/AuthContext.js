import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
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
      setIsLoggedIn(true);
    } catch (error) {
      console.log("❌ Login error:", error);
      setAuthError("Login failed.");
      throw error; // Let UI handle toast
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

      if (!registerResp.ok) throw new Error("Failed to register user in backend");

      const backendUser = await getUserByEmail(email);
      await AsyncStorage.setItem("user", JSON.stringify(backendUser));
      // Do NOT set isLoggedIn here; wait until verification
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
      throw error;
      setIsLoggedIn(true);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Check Auth on App Load
  const checkAuthStatus = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      setIsLoggedIn(!!storedUser);
    } catch (error) {
      console.log("❌ Error checking auth status:", error);
      setIsLoggedIn(false);
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
    } catch (error) {
      console.log("❌ Logout error:", error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
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
