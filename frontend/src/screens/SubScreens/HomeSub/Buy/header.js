import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const BuyHeader = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      {/* Left: Close Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.leftButton}
      >
        <AntDesign name="close" size={30} color="black" />
      </TouchableOpacity>

      {/* Middle: Title */}
      <View style={styles.center}>
        <Text style={styles.title}>Select asset to buy</Text>
      </View>

      {/* Right: Spacer to balance layout */}
      <View style={styles.rightSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15.,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftButton: {
    // padding: 10,
    // marginLeft: 10,
  },
  center: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 22,
  },
  rightSpacer: {
    width: 44, // Matches close button width to balance layout
    marginRight: 10,
  },
});

export default BuyHeader;
