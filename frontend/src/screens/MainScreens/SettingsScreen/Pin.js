import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Pin = () => {
  const [inputValue, setInputValue] = useState(["", "", "", ""]); // Array for each circle
  const inputRefs = useRef([]); // Refs for each TextInput
  const [activeIndex, setActiveIndex] = useState(-1);
  //   index === 0 ? inputRefs.current[0].focus() : null;

  const handleTextChange = (text, index) => {
    // Update current circle
    const newValues = [...inputValue];
    newValues[index] = text.slice(-1); // Only allow 1 character per circle
    setInputValue(newValues);

    // //Auto focus first circle on startup
    // useEffect(() => {
    //   inputRefs.current[0]?.focus();
    // }, []);

    // Auto-focus next circle if a character was entered
    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }
    activeIndex === 3 ? setActiveIndex(3) : setActiveIndex(activeIndex + 1);
    console.log(index, activeIndex);
  };

  const handleBackspace = (index) => {
    inputValue[index] = "";
    // Move focus to previous circle on backspace if current is empty
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
    index -= 1;
    index === 0 ? setActiveIndex(-1) : setActiveIndex(index - 1);
    console.log(index, activeIndex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            style={[styles.circle, activeIndex >= index && styles.active]}
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
              cursorColor={null}
              selection={{ start: 0, end: 0 }}
              textAlign="center"
            />
          </View>
        ))}
      </View>
      {/* Hidden single input for mobile keyboards */}
      {/* <TextInput
        style={styles.hiddenInput}
        value={inputValue.join("")}
        keyboardType="numeric"
        onChangeText={(text) => {
          // Distribute text across circles
          const newValues = ["", "", "", ""];
          text
            .split("")
            .slice(0, 4)
            .forEach((char, i) => {
              newValues[i] = char;
            });
          setInputValue(newValues);
        }}
        maxLength={4}
      /> */}{" "}
      <Text style={styles.text}>Choose your pin</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // justifyContent: "center",
    alignItems: "center",
    paddingTop: "50%",
  },
  circleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 30,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#052644",
  },
  input: {
    // width: "100%",
    // height: "100%",
    fontSize: 0,
    textAlign: "center",
  },
  //   hiddenInput: {
  //     position: "absolute",
  //     width: 0,
  //     height: 0,
  //     opacity: 0,
  //   },
  active: {
    backgroundColor: "#052644",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default Pin;
