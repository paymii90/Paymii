import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

const Input = (props) => {
  return (
    <View style={{ alignSelf: "center" }}>
      <Text style={styles.text}>{props.title}</Text>
      <View style={styles.container}>
        <TextInput
          value={props.value}
          placeholder={props.placeholder}
          secureTextEntry={props.visibility}
          onChangeText={props.action}
          keyboardType={props.keyboard}
          style={styles.Input}
        ></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Input: {
    padding: 16,
    width: 327,
    height: 58,
    justifyContent: "center",
  },
  container: {
    borderColor: "#CFCFCF",
    borderWidth: 1,
    borderRadius: 4,
    width: "95%",
  },
  text: {
    paddingVertical: 10,
    fontWeight: "medium",
    fontSize: 16,
  },
});

export default Input;
