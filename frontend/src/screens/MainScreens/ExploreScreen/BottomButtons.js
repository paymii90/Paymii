import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const BottomActionButtons = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.buy]}>
        <Text style={styles.buttonText}>Buy & Sell</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.transfer]}>
        <Text style={styles.buttonText}>Transfer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomActionButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 3,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buy: {
    backgroundColor: "#052644",
  },
  transfer: {
    backgroundColor: "#1e3c8a",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
