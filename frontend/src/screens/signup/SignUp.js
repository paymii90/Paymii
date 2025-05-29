import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Input from "../../Components/Input";
import Checkbox from "../../Components/Checkbox";
import Button from "../../Components/Button";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passworderror, setPasswordError] = useState("");

  const handleSubmit = () => {
    if (!email) {
      setError("Email is required");
      console.log(email);
    } else if (!email.includes("@")) {
      setError("Email is invalid");
      console.log(email);
    } else {
      console.log("submitting form");
    }

    if (!password) {
      setPasswordError("Password is required");
      console.log(email);
    } else {
      setPasswordError("");
    }

    if (!passworderror && !error) {
      navigation.navigate("Email");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Create Your Account</Text>
      <Input placeholder="Sponge" title="First Name" keyboard="default" />
      <Input placeholder="Bob" title="Last Name" keyboard="default" />
      <View>
        <Input
          placeholder="SpongeBob@BikiniBottom.com"
          title="Email"
          value={email}
          action={setEmail}
          // style={{ width: "90%" }}
          //value="email"
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
        <Text style={styles.error}>{passworderror}</Text>
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
    // alignItems: "center",
    paddingHorizontal: "20",
  },
  Text: {
    fontWeight: "medium",
    fontSize: 22,
    marginVertical: 20,
  },
  error: {
    color: "red",
    marginHorizontal: 10,
  },
});

export default SignUp;
