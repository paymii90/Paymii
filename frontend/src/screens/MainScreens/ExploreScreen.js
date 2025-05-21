import { StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from "react";

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ExploreScreen</Text>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#fff",
    justifyContent: 'center',
  },
});
