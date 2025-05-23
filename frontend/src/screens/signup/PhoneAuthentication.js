import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

// const PhoneAuthentication = () => {
//   const [otp, setOtp] = useState(0);
//   return (
//     <View>
//       <Input value={otp} action={(text) => setOtp(text)} keyboard="numeric" />
//     </View>
//   );
// };

const PhoneAuthentication = () => {
  const [phoneOtp, setPhoneOtp] = useState("");
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={5}
    >
      <View style={{ alignContent: "flex-start" }}>
        <Text style={styles.header}>Enter authentication code</Text>
        <Text style={styles.text}>
          Enter the 7-digit code we sent to your phone number.
        </Text>
      </View>
      <Input
        keyboard="numeric"
        value={phoneOtp}
        action={(text) => setPhoneOtp(text)}
      />
      <View style={styles.buttons}>
        <Button
          label="Submit"
          backgroundColor="#052644"
          color="white"
          action={() => navigation.navigate("Interlude")}
        />
        <Button label="Resend Code" backgroundColor="#CFCFCF" color="black" />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "5%",
    flex: 1,
    alignItems: "center",
  },
  header: {
    marginTop: "30%",
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
  buttons: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: "5%",
    width: "100%",
  },
});

export default PhoneAuthentication;
