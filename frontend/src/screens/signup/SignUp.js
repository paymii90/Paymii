import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import Input from "../../Components/Input";
import Checkbox from "../../Components/Checkbox";
import Button from "../../Components/Button";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext"; // <-- Make sure this path is correct!

const API_BASE_URL = "http://10.30.22.120:8080/api/auth";  // <-- REPLACE with your actual PC IP!

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Use login from AuthContext
  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    console.log("handleSubmit CALLED");
    setError("");
    setPasswordError("");

    // Validation
    if (!firstName || !lastName) {
      setError("First and last name are required");
      console.log("Validation error: missing first or last name");
      return;
    }
    if (!email) {
      setError("Email is required");
      console.log("Validation error: missing email");
      return;
    }
    if (!email.includes("@")) {
      setError("Email is invalid");
      console.log("Validation error: invalid email");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      console.log("Validation error: missing password");
      return;
    }

    // API Call
    try {
      console.log("Attempting signup with:", {
        firstName,
        lastName,
        email,
        password,
      });

      console.log("Passing validation, about to call API");
      const response = await axios.post(`${API_BASE_URL}/register`, {
        firstName,
        lastName,
        email,
        password,
      });
      console.log("Signup success:", response.data);

      Alert.alert("Signup successful!", "Welcome to Paymii!");

      // Login using context (store token or flag)
      await login(response.data.token || "loggedin"); 
      // No need for navigation.navigate here, the app will switch screens automatically
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Try again."
      );
      console.log("Signup error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Create Your Account</Text>
      <Input
        placeholder="Sponge"
        title="First Name"
        keyboard="default"
        value={firstName}
        action={setFirstName}
      />
      <Input
        placeholder="Bob"
        title="Last Name"
        keyboard="default"
        value={lastName}
        action={setLastName}
      />
      <View>
        <Input
          placeholder="SpongeBob@BikiniBottom.com"
          title="Email"
          value={email}
          action={setEmail}
          keyboard="email-address"
        />
        <Text style={styles.error}>{error}</Text>
      </View>
      <View>
        <Input
          placeholder="xxxxxxx"
          title="Password"
          value={password}
          action={setPassword}
          keyboard="default"
          visibility
        />
        <Text style={styles.error}>{passwordError}</Text>
      </View>
      <Checkbox
        style={styles.checkboxText}
        text="I certify that I am 18 years of age or older, and I agree to the User Agreement and Privacy Policy"
      />
      <Button
        label="Start"
        backgroundColor="#052644"
        color="white"
        action={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    padding: "auto",
    paddingHorizontal: 20,
  },
  Text: {
    fontWeight: "500",
    fontSize: 22,
    marginVertical: 20,
  },
  error: {
    color: "red",
    marginHorizontal: 10,
  },
});

export default SignUp;
