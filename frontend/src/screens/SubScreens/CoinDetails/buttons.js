import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../../../Components/Button";

const Buttons = () => {
  return (
    <View style={styles.buttonRow}>
      <Button
        label="Buy & Sell"
        backgroundColor="#052644"
        color="white"
        style={{
          borderRadius: 60,
          width: "48%",
        }}
        labelStyle={{ fontWeight: 600 }}
        // action={() =>
        //   navigation.navigate("CoinStack", {
        //     screen: "Buy",
        //   })
        // }
      />
      <Button
        label="Transfer"
        backgroundColor="#011D5C"
        color="white"
        style={{
          borderRadius: 60,
          width: "48%",
        }}
        labelStyle={{ fontWeight: 600 }}
        // action={() => setBuySellPopupVisible(true)}
      />
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    position: "absolute",
    bottom: "1%",
    left: "5%",
    right: "5%",
    // backgroundColor: "red",


    //shadow
     // iOS shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 4,

  // Android shadow
  // iOS shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 4,

  // Android shadow
  elevation: 5,
  },
});
