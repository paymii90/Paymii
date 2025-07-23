// src/components/KeyboardManager.js
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  View,
} from "react-native";

const KeyboardManager = ({ children }) => {
  const dummyData = [{ key: "wrapper" }];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        // keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <FlatList
          data={dummyData}
          keyExtractor={(item) => item.key}
          renderItem={() => (
            <View style={{ flex: 1,}}>{children}</View>
          )}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default KeyboardManager;
