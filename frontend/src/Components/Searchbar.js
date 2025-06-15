import React from "react";
import { View, StyleSheet } from "react-native";
import ChatIcon from "../../assets/ChatIcon.svg";
import Search from "../../assets/Search.svg";

const Searchbar = () => {
  return (
    <View style={styles.container}>
      <Search />
      <ChatIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    position: "absolute",
    top: 60,
    alignItems: "center",
    alignSelf: "center",
  },
});

export default Searchbar;
