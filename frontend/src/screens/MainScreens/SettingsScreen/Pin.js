import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Pin = () => {
  const [inputValue, setInputValue] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleTextChange = (text, index) => {
    const newValues = [...inputValue];
    newValues[index] = text.slice(-1); // Only keep the last digit
    setInputValue(newValues);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    } else {
      setActiveIndex(index);
    }
  };

  const handleBackspace = (index) => {
    if (inputValue[index] === "") {
      if (index > 0) {
        const newValues = [...inputValue];
        newValues[index - 1] = "";
        setInputValue(newValues);
        inputRefs.current[index - 1]?.focus();
        setActiveIndex(index - 1);
      }
    } else {
      const newValues = [...inputValue];
      newValues[index] = "";
      setInputValue(newValues);
      setActiveIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            style={[styles.circle, activeIndex === index && styles.active]}
          >
            <TextInput
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.input}
              keyboardType="numeric"
              value={inputValue[index]}
              onChangeText={(text) => handleTextChange(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(index);
                }
              }}
              maxLength={1}
              secureTextEntry={true} // Optional: mask input
              textAlign="center"
              selection={{ start: 0, end: 0 }}
            />
          </View>
        ))}
      </View>
      <Text style={styles.text}>Choose your PIN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: "50%",
  },
  circleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#052644",
    marginHorizontal: 5,
  },
  input: {
    fontSize: 22,
    color: "white",
    width: "100%",
    height: "100%",
  },
  active: {
    backgroundColor: "#052644",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#052644",
  },
});

export default Pin;
