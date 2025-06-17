import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Input from "../../Components/Input";
import Checkbox from "../../Components/Checkbox";
import Button from "../../Components/Button";
import { AuthContext } from "../../context/AuthContext"; // <-- Make sure this path is correct!

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Get signUp and authError from AuthContext
  const { signUp, authError, loading } = useContext(AuthContext);

  const handleSubmit = async () => {
    navigation.navigate("Email");
    setFormError("");
    setPasswordError("");

    // Form validation
    if (!firstName || !lastName) {
      setFormError("First and last name are required");
      return;
    }
    if (!email) {
      setFormError("Email is required");
      return;
    }
    if (!email.includes("@")) {
      setFormError("Email is invalid");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    // Only proceed if form validation passes
    // await signUp(firstName, lastName, email, password);
    // Do NOT navigate yet! Wait until email is verified.
    if (!formError && !passwordError) {
      navigation.navigate("Email");
    }
  };

  return (
    <ScrollView style={styles.container}>
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
        {/* Show form error or auth error under email field
        {formError ? (
          <Text style={styles.error}>{formError}</Text>
        ) : authError ? (
          <Text style={styles.error}>{authError}</Text>
        ) : null} */}
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
        {passwordError ? (
          <Text style={styles.error}>{passwordError}</Text>
        ) : null}
      </View>
      <Checkbox
        style={styles.checkboxText}
        text="I certify that I am 18 years of age or older, and I agree to the User Agreement and Privacy Policy"
      />
      <View>
        <Button
          label={loading ? "Registering..." : "Start"}
          backgroundColor="#052644"
          color="white"
          action={handleSubmit}
          disabled={loading}
        />
      </View>
    </ScrollView>
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
    marginTop: 4,
    fontSize: 13,
  },
});

export default SignUp;
