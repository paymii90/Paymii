import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
//import Checkbox from "../Components/Checkbox.js";
import ToggleButton from "./ToggleButton";

import Expand_down from "../../assets/Expand_down.svg";

const SearchList = ({ action, label, type, opacity }) => {
  return (
    <TouchableOpacity
      activeOpacity={opacity || 0.1}
      onPress={action}
      style={styles.container}
    >
      <Text style={styles.label}>{label}</Text>
      {type === "Checkbox" ? <ToggleButton /> : <Expand_down />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SearchList;
