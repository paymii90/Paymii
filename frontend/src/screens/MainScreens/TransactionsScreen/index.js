import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TransactionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>TransactionsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
});

export default TransactionsScreen;
