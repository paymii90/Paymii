import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchList from "../../../Components/SearchList";
import CreditCard from "../../../../assets/CreditCard";
import Send_hor from "../../../../assets/Send_hor";
import Vector from "../../../../assets/Vector";

const Limits = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Limits</Text>
      <SearchList
        logoState={true}
        logo={<CreditCard />}
        label="3D Secure Purchases "
        type="Checkbox"
        opacity={1}
      />
      <SearchList
        logoState={true}
        logo={<Send_hor />}
        label="Send Crypto Currency "
        type="Checkbox"
        opacity={1}
      />
      <SearchList
        logoState={true}
        logo={<Vector />}
        label="Receive Crypto Currency "
        type="Checkbox"
        opacity={1}
      />
      <Text style={styles.text}>
        You have the highest level of account limits and features available
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: "20%",
  },
  text: {
    padding: "5%",
    borderWidth: 1,
    margin: "5%",
    marginTop: "15%",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    //flex: 1,
    flexDirection: "row",
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: "10%",
  },
});

export default Limits;
