import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../../../Components/Button";

const Buttons = ({ navigation, singleCoinItem, setBuySellPopupVisible, setTransferPopupVisible }) => {
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
        action={() => setBuySellPopupVisible(true)}
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
        action={() => setTransferPopupVisible(true)}
      />
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
});
