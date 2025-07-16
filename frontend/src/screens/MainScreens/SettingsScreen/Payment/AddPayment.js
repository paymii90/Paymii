import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Paymentmethod from "../../../../../assets/Paymentmethod.svg";
import Button from "../../../../Components/Button";
//import { ScrollView } from "react-native-web";

const AddPayment = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Paymentmethod />
      <Text style={styles.header}>Let's add your account</Text>
      <Text style={styles.text}>
        One step closer to your first trade. Add your card/MoMo now.
      </Text>
      <View style={styles.Buttons}>
        <Button
          backgroundColor="#052644"
          color="white"
          label="Add mobile money number"
          action={() => navigation.navigate("MoMo")}
        />
        <Button
          backgroundColor="#052644"
          color="white"
          label="Add Bank Account"
          action={() => {
            navigation.navigate("Card");
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
    backgroundColor: "white",
    paddingTop: "25%",
    // paddingVertical: "15%",
    paddingStart: 10,
  },
  header: {
    fontWeight: "bold",
    fontSize: 26,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  Buttons: {
    width: "90%",
    gap: 20,
    justifyContent: "flex-end",
    //alignItems: "flex-end",
    height: "45%",
  },
});

export default AddPayment;
