import React from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import Scan from "../../../assets/Scan.svg";
import Button from "../../Components/Button";

const ScanScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Scan style={styles.image} />
      <Text style={styles.header}>Secure your account</Text>
      <Text style={styles.text}>
        One way we keep your account secure is with 2-step verification, which
        requires your phone number. We will never call you or use your number
        without your permission
      </Text>
      <View style={styles.button}>
        <Button
          backgroundColor="#052644"
          color="white"
          label="Submit"
          action={() => navigation.navigate("Phone")}
        />
      </View>
    </View>
  );
};

const ScreenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  image: {
    marginTop: "30%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: "5%",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: "5%",
  },
  button: {
    flex: 1,
    marginBottom: "5%",
    width: ScreenWidth,
    padding: "5%",
    justifyContent: "flex-end",
  },
});

export default ScanScreen;
