import { StyleSheet, View, TextInput, Text } from "react-native";
import { useState } from "react";

const Input = ({ width = 345, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [flex, setFlex] = useState(props.flex);
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
          style={[styles.Input, { width }, isFocused && styles.activeInput]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
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
    fontWeight: "bold",
    fontSize: 16,
  },
  activeInput: {
    borderColor: "#052644",
    borderWidth: 1,
  },
});

export default Input;
