import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, Alert } from "react-native";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { AuthContext } from "../../context/AuthContext";


const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  


  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) {
      setError("Email and Password are required!");
      return;
    }
    if (!email.includes("@")) {
      setError("Email is invalid!");
      return;
    }

    if (!error) {
      navigation.replace('Main')
      login(email, password);
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Sign in to Paymii</Text>
      <Input placeholder="Email" value={email} action={setEmail} keyboard="email-address" />
      <Input placeholder="Password" value={password} action={setPassword} keyboard="default" visibility />
      <Text style={styles.error}>{error}</Text>
      <Button label="Sign In" backgroundColor="#052644" color="white" action={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, justifyContent: "center" },
  Text: { fontWeight: "500", fontSize: 22, marginBottom: 20 },
  error: { color: "red", marginVertical: 10 },
});

export default SignIn;
