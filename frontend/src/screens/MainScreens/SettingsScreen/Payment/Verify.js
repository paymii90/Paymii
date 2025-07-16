import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Verified from "../../../../../assets/Verified";
import Button from "../../../../Components/Button";

const Verify = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Verified />
      <Text style={styles.header}>You're Verified!!</Text>"
      <Text>Your account has been verified successfully</Text>
      <View style={styles.button}>
        <Button label="Let's go" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: "30%",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
  button: {
    width: "90%",
    justifyContent: "flex-end",
    height: "50%",
  },
});

export default Verify;
