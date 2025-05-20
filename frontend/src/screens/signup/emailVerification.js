import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "../../Components/Button";

const emailVerification = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/emailverification.png")}
        style={styles.image}
      />
      <View style={styles.text}>
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>
          Verify your email
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          We sent you a verification email. Please tap the link inside that
          email to continue.
        </Text>
      </View>
      <View style={styles.buttons}>
        <Button
          backgroundColor="#052644"
          color="white"
          label="Check Inbox"
          action={() => navigation.navigate("Digit")}
        />
        <Button backgroundColor="#CFCFCF" color="black" label="Resend Email" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 50,
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  image: {
    border: 0,
    height: "40%",
    width: "auto",
    marginVertical: 30,
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttons: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    marginBottom: 10,
  },
});

export default emailVerification;
