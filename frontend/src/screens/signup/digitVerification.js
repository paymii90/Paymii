import React from "react";
import {
  KeyboardAvoidingView,
  Text,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const DigitVerification = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={5}
    >
      <Text style={styles.header}>
        Enter the 7-digit code we sent to your email
      </Text>
      <Text style={styles.text}>
        This extra step shows it is really you trying to sign in.
      </Text>
      <Input keyboard="numeric" />
      <View style={styles.buttons}>
        <Button
          label="Submit"
          backgroundColor="#052644"
          color="white"
          action={() => navigation.navigate("Interlude")}
        />
        <Button label="I need help" backgroundColor="#CFCFCF" color="black" />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
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
  },
});

export default DigitVerification;
