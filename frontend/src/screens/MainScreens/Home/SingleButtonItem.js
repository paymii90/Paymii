import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const SingleButtonItem = ({ item, isActive, setActiveButton }) => {
  return (
    <Pressable
      onPress={setActiveButton}
      style={[
        styles.button,
        {
          backgroundColor: isActive ? "#375169" : "#e1e1e1",
          borderColor: isActive ? "#375169" : "#ccc",
        },
      ]}
    >
      <Text style={[styles.label, { color: isActive ? "#fff" : "#333" }]}>
        {item.label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
    marginRight: 10,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default SingleButtonItem;
