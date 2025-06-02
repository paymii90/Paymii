import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ClosureIcon from "../../../assets/signIn/close";
import Input from "../../Components/Input";
import Spacer from "../../Components/Spacer";
import Button from "../../Components/Button";
import ScreenWrapper from "../../Components/ScreenWrapper";
import axios from "axios";
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Uncomment if you want to save the token

const API_BASE_URL = "http://10.30.22.29:8080/api/auth"; // Backend URL

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePress = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) {
      setError("Email and Password are required!!");
      return;
    }
    if (!email.includes("@")) {
      setError("Email is invalid!");
      return;
    }

    try {
      // Make API call to login
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      console.log("Login success:", response.data);

      // If backend returns a token, you can store it for authenticated requests:
      // await AsyncStorage.setItem("token", response.data.token);

      Alert.alert("Login successful!", "Welcome back!");
      navigation.replace("Main"); // or your main/home screen
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Try again."
      );
      console.log("Login error:", err);
    }
  };

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.container}>
        <View style={styles.closeCont}>
          <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <ClosureIcon width={35} height={35} />
          </TouchableOpacity>
        </View>
        <Spacer />
        <Text style={styles.title}>Sign in to Paymii</Text>
        <Spacer />
        <View>
          <Input
            placeholder="SpongeBob@BikiniBottom.com"
            title="Email"
            value={email}
            action={setEmail}
            keyboard="email-address"
          />
        </View>
        <Spacer />
        <View>
          <Input
            placeholder="xxxxxxx"
            title="Password"
            value={password}
            action={setPassword}
            keyboard="default"
            visibility
          />
          <Spacer height={45} />
          <Text style={styles.error}>{error}</Text>
        </View>
        <Spacer height={45} />
        <View style={styles.actionsCont}>
          <Text style={styles.action}>Forget Password</Text>
          <Text style={styles.action}>Privacy Policy</Text>
        </View>
        <Spacer height={45} />
        <Button
          label="Sign In"
          backgroundColor="#052644"
          color="white"
          action={handleSubmit}
        />
      </SafeAreaView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 25,
    paddingTop: 40,
    flex: 1,
    width: "100%",
  },
  closeCont: {
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 12,
  },
  error: {
    color: "red",
    marginHorizontal: 10,
  },
  actionsCont: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  action: {
    color: "#052644",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default SignIn;
