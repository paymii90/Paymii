import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const ToggleButton = () => {
  const [active, setActive] = useState(false);
  return (
    <TouchableOpacity
      activeOpacity={0.1}
      style={[styles.ToggleButton, active && styles.active]}
      onPress={() => (active === true ? setActive(false) : setActive(true))}
    >
      <View style={[styles.knob, active && styles.activeKnob]}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ToggleButton: {
    borderWidth: 1,
    borderColor: "#052644",
    width: 40,
    height: 20,
    borderRadius: 20,
  },
  active: {
    backgroundColor: "#CFCFCF",
    //opacity: 0.6,
  },
  knob: {
    flex: 1,
    width: "50%",
    backgroundColor: "#052644",
    borderRadius: 30,
    padding: 5,
  },
  activeKnob: {
    transform: [{ translateX: 20 }],
  },
});

export default ToggleButton;
