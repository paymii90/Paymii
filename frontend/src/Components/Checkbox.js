import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";

const Checkbox = ({ text }) => {
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setChecked(!checked)}
      style={styles.container}
      activeOpacity={0.7}
    >
      <View style={styles.checkbox}>
        {checked && (
          <View style={styles.activeCheckbox}>
            <FontAwesome name="check" size={16} color="white" />
          </View>
        )}
      </View>
      <Text style={styles.checkboxText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 30,
  },
  checkboxText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkbox: {
    height: 24,
    width: 24,
    borderWidth: 2,
    borderColor: "#444",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  activeCheckbox: {
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#052644",
  },
});

export default Checkbox;
