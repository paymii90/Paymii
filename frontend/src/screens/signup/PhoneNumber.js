import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Button from "../../Components/Button";

const PhoneNumber = () => {
  const phoneInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["left", "right", "top"]} style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={5}
        >
          <View style={styles.textContainer}>
            <Text style={styles.header}>Set up 2-step verification</Text>
            <Text>
              Enter your phone number so we can text you an authentication code.
            </Text>
          </View>
          <View style={styles.phone}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode="US"
              layout="second"
              containerStyle={{ width: "90%" }}
              onChangeFormattedText={(text) => {
                setPhoneNumber(text);
              }}
              withShadow
              //   autoFocus
            />
          </View>
          <View style={styles.button}>
            <Button
              label="Submit"
              backgroundColor="#052644"
              color="white"
              action={() => navigation.navigate("Interlude")}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: "5%",
    backgroundColor: "#FFFFFF",
  },
  phone: {
    alignSelf: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: "5%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textContainer: {
    marginTop: "20%",
    marginBottom: "10%",
    width: "90%",
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: "5%",
  },
});
export default PhoneNumber;
