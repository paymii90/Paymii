import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
} from "react-native";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import DoB from "../../Components/DoB";

const PersonalInformation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={{ width: "100%" }}>
        <Text style={styles.header}>Enter your personal information</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={5}
        >
          <View>
            <Input
              title="Legal First Name"
              value={firstName}
              placeholder="SpongeBob"
              action={(text) => setFirstName(text)}
            />
            <Input
              title="Legal Last Name"
              value={lastName}
              placeholder="SquarePants"
              action={(text) => setLastName(text)}
            />
            <DoB />
            <Text style={styles.footerText}>
              We use 128-bit encryption for added security, and this information
              is only used for identity verification purposes
            </Text>
          </View>
          <View style={styles.button}>
            <Button
              label="Continue"
              backgroundColor="#052644"
              color="white"
              action={() => navigation.navigate("Information")}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "5%",
  },
  header: {
    marginTop: "15%",
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111111",
  },
  button: {
    // flex: 1,
    marginTop: "13%",
    justifyContent: "flex-end",
  },
});

export default PersonalInformation;
