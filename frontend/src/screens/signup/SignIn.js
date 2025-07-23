import React, { useState, useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { AuthContext } from "../../context/AuthContext";
import Toast from "react-native-toast-message";
import KeyboardManager from "../../Components/KeyboardManager";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, authError } = useContext(AuthContext);

  const handleSubmit = async () => {
    setFormError("");

    if (!email || !password) {
      setFormError("Email and Password are required!");
      return;
    }
    if (!email.includes("@")) {
      setFormError("Email is invalid!");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
    } catch (error) {
      console.log("❌ Login handler error:", error);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message || "Something went wrong. Check your internet.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardManager>
        <View style={styles.container}>
          <Text style={styles.title}>Sign in to Paymii</Text>

          <Input
            placeholder="Email"
            value={email}
            action={setEmail}
            keyboard="email-address"
          />
          <Input
            placeholder="Password"
            value={password}
            action={setPassword}
            keyboard="default"
            visibility
          />

          {(formError || authError) && (
            <Text style={styles.error}>{formError || authError}</Text>
          )}

          <Button
            label={loading ? "Signing in..." : "Sign In"}
            backgroundColor="#052644"
            color="white"
            action={handleSubmit}
            disabled={loading}
          />
        </View>
      </KeyboardManager>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontWeight: "500",
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginVertical: 10,
    fontSize: 13,
    textAlign: "center",
  },
});
