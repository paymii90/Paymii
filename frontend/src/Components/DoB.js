import React, { useState } from "react";
import { View, Text, Pressable, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DoB = () => {
  const [DoB, setDoB] = useState(new Date(1999, 4, 1));
  const [showPicker, setShowPicker] = useState(false);
  const [focused, setFocused] = useState(false);

  const formattedDate = DoB.toLocaleDateString();

  const handleOpen = () => {
    setShowPicker(true);
    setFocused(true);
  };
  const handleClose = (event, selectedDate) => {
    setShowPicker(false);
    setFocused(false);
    if (selectedDate) setDoB(selectedDate);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date of Birth</Text>

      <Pressable
        onPress={handleOpen}
        style={[styles.input, focused && styles.activeInput]}
      >
        <Text style={styles.inputText}>{formattedDate}</Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={DoB}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleClose}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignSelf: "center",
    width: "95%",
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    // height: "37%",
    justifyContent: "center",
    //container
    borderColor: "#CFCFCF",
    borderWidth: 1,
    borderRadius: 4,
    // width: "95%",
  },
  inputText: {
    padding: 16,
    width: 327,
    height: 58,
    justifyContent: "center",
  },
  activeInput: {
    borderColor: "#052644",
    borderWidth: 1,
  },
});

export default DoB;
