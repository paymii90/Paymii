import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const SellHeader = ({ onSearch }) => {
  const navigation = useNavigation();
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
    if (isSearching) {
      setSearchText(""); // Clear on close
      onSearch && onSearch(""); // Reset search
    }
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
    onSearch && onSearch(text);
  };

  return (
    <View style={styles.container}>
      {/* Left: Close Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.leftButton}
      >
        <AntDesign name="arrowleft" size={30} color="black" />
      </TouchableOpacity>

      {/* Center: Title or Search Input */}
      <View style={styles.center}>
        {isSearching ? (
          <TextInput
            style={styles.searchInput}
            placeholder="Search asset..."
            value={searchText}
            onChangeText={handleSearchChange}
            autoFocus
          />
        ) : (
          <Text style={styles.title}>Select asset to send</Text>
        )}
      </View>

      {/* Right: Search/Close Icon */}
      <TouchableOpacity onPress={handleSearchToggle} style={styles.rightButton}>
        <AntDesign
          name={isSearching ? "close" : "search1"}
          size={26}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SellHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftButton: {},
  rightButton: {
    paddingHorizontal: 10,
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
  searchInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    width: 200,
    paddingVertical: 2,
  },
});
