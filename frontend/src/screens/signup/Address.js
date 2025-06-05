import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import Button from "../../Components/Button";
import Input from "../../Components/Input";

const Address = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ marginBottom: "10%" }}>
        <Text style={styles.header}>Enter your address</Text>
        <Text style={styles.text}>
          Enter the street address of your primary residence. Please do not use
          a PO box or business address
        </Text>
      </View>
      <Input
        title="Search for Address"
        placeholder="Enter your address"
      ></Input>
      <View style={styles.button}>
        <Button label="Submit" backgroundColor="#052644" color="white" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    padding: "5%",
  },
  header: {
    marginTop: "30%",
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
});

export default Address;
