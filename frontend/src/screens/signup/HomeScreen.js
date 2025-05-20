import React, { useEffect } from "react";
import { Text, StyleSheet, View, Image } from "react-native";

const HomeScreen = ({ navigation }) => {
  // creating the automatic navigation
  useEffect(() => {
    console.log("timer started...");

    //setting the timer
    const timer = setTimeout(() => {
      console.log("navigating to new screen");
      navigation.replace("Sign");
    }, 3000);

    //clearing  the timer
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.Container}>
      <Image style={styles.Image} source={require("../../assets/logo1.png")} />
      <Text style={styles.Text}>Paymii</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#052644",
    justifyContent: "center",
    alignItems: "center",
    // display: "flex",
    flexDirection: "row",
  },
  Image: {
    width: 200,
    height: 200,
  },
  Text: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#B28143",
    marginStart: -50,
  },
});

export default HomeScreen;
