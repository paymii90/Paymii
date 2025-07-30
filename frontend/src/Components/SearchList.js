import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
//import Checkbox from "../Components/Checkbox.js";
import ToggleButton from "./ToggleButton";

import Expand_down from "../../assets/Expand_down.svg";

const SearchList = ({
  action,
  label,
  type,
  opacity,
  logoState = false,
  logo,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={opacity || 0.1}
      onPress={action}
      style={styles.container}
    >
      <View style={styles.name}>
        {logoState === true && logo}
        <Text style={styles.label}>{label}</Text>
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: "#CFCFCF",
    // borderTopWidth: 1,
    // borderTopColor: "#CFCFCF",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-between",
    gap: 10,
  },
});

export default SearchList;
