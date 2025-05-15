import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Button from "../Components/Button";
// import { SafeAreaView } from "react-navigation";

const Screen2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Paymii</Text>
      <View>
        <Button
          action={() => navigation.navigate("Register")}
          label="Get Started"
          backgroundColor="white"
          color="#B28143"
        />
        <Button
          action={() => navigation.navigate("SignIn")}
          label="Sign In"
          backgroundColor="white"
          color="#B28143"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#052644",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    flex: 1,
    width: "100%",
  },
  text: {
    fontSize: 56,
    fontWeight: "900",
    color: "#B28143",
    margin: "auto",
  },
});

export default Screen2;
