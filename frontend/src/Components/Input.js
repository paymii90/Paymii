import { StyleSheet, View, TextInput, Text } from "react-native";
import { useState } from "react";

const Input = ({ width = 345, fontSize = 14, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [flex, setFlex] = useState(props.flex);

  return (
    <View style={{ alignSelf: "center" }}>
      <Text style={[styles.text, { fontSize }]}>{props.title}</Text>
      <View style={styles.container}>
        <TextInput
          value={props.value}
          placeholder={props.placeholder}
          secureTextEntry={props.visibility}
          onChangeText={props.onChangeText || props.action} // <- supports both
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
    padding: 10,
    width: 327,
    height: 50,
    justifyContent: "center",
    fontSize: 16,
  },
  container: {
    borderColor: "#CFCFCF",
    borderWidth: 1,
    borderRadius: 4,
    width: "95%",
  },
  text: {
    fontWeight: "bold",
  },
  activeInput: {
    borderColor: "#052644",
    borderWidth: 1,
  },
});

export default Input;
