import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");

const CustomNumpad = ({ setAmount }) => {
  const keypad = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [".", "0", "⌫"],
  ];

  const handleKeyPress = (key) => {
    Haptics.selectionAsync();

    setAmount((prev) => {
      if (key === "⌫") {
        return prev.slice(0, -1);
      }

      if (key === ".") {
        // Prevent multiple dots
        if (prev.includes(".")) return prev;
        if (prev === "") return "0.";
      }

      if (key === "0" && prev === "0") return prev; // prevent multiple leading 0s
      if (prev === "0" && key !== ".") return key; // replace leading 0 if not decimal

      return prev + key;
    });
  };

  return (
    <View style={styles.keypad}>
      {keypad.map((row, i) => (
        <View key={i} style={styles.keypadRow}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              onPress={() => handleKeyPress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

export default CustomNumpad;

const styles = StyleSheet.create({
  keypad: {
    marginBottom: 30,
  },
  keypadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  key: {
    width: width / 3.5,
    padding: "3%",
    backgroundColor: "rgba(61, 61, 61, 0.24)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  keyText: {
    fontSize: 22,
    fontWeight: "600",
  },
});
