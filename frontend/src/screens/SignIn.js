import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-navigation";
import ClosureIcon from "../../assets/signIn/close";
import Input from "../Components/Input";
import Spacer from "../Components/Spacer";
import Button from "../Components/Button";
import ScreenWrapper from "../Components/ScreenWrapper";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passworderror, setPasswordError] = useState("");
  const handlePress = () => {
    //  navigate back to the previous screen
    navigation.goBack();
  };

  const handleSubmit = () => {
    if (email && password) {
      setError("No error");
      navigation.replace("Main");
    } else {
      setError("Email and Password are required!!");
    }
    // navigation.replace("Sign");
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
        {/* Title  */}
        <Text style={styles.title}>Sign in to Paymii</Text>
        <Spacer />
        {/* email  */}
        <View>
          <Input
            placeholder="SpongeBob@BikiniBottom.com"
            title="Email"
            value={email}
            action={setEmail}
            // style.title={{ width: "90%" }}
            //value="email"
            keyboard="email-address"
          />
        </View>
        <Spacer />
        {/* Password  */}
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
    fontWeight: 700,
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
    fontWeight: 700,
    fontSize: 16,
  },
});

export default SignIn;
