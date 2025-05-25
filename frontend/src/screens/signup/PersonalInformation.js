import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  Pressable,
  KeyboardAvoidingView,
  Text,
  Platform,
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={5}
        >
          <Input
            title="Legal First Name"
            value={firstName}
            placeholder="SpongeBob"
            action={(text) => setFirstName(text)}
          />
          <Input
            title="Legal Last Name"
            value={lastName}
            placeholder="SpongeBob"
            action={(text) => setLastName(text)}
          />
          <DoB />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default PersonalInformation;
