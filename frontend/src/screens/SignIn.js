import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-navigation";
import ClosureIcon from "../../assets/signIn/close";
import Input from "../Components/Input";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passworderror, setPasswordError] = useState("");
  const handlePress = () => {
    //  navigate back to the previous screen
    navigation.replace("Sign");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.closeCont}>
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
          <ClosureIcon width={35} height={35} />
        </TouchableOpacity>
      </View>
      {/* Title  */}
      <Text style={styles.title}>Sign in to Coinbase</Text>
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
        <Text style={styles.error}>{passworderror}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
    alignItems: 'flex-start',
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
    marginBottom: 20
  },
});

export default SignIn;
