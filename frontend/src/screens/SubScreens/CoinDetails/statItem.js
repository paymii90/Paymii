import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const StatItem = ({ iconName, label, value }) => {
  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={20} color="#052644" style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default StatItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 8,
    width: 20,
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
});
