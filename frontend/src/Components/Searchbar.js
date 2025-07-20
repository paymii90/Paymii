import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Keyboard,
  Dimensions,
} from "react-native";
import ChatIcon from "../../assets/ChatIcon.svg";
import Search from "../../assets/Search.svg";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Input from "./Input";

const { width } = Dimensions.get("window");

const Searchbar = () => {
  const navigation = useNavigation();
  const [clicked, setClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchDim = [
    { name: "Portfolio", navName: "Portfolio", id: 1 },
    { name: "Settings", navName: "Settings", id: 2 },
    { name: "Explore", navName: "Explore", id: 3 },
  ];

  const filteredResults = searchDim.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {clicked ? (
        <View style={styles.overlay}>
          <View style={styles.closeWrapper}>
            <TouchableOpacity
              onPress={() => {
                setSearchQuery("");
                setClicked(false);
                Keyboard.dismiss();
              }}
            >
              <AntDesign name="closecircle" size={22} color="black" />
            </TouchableOpacity>
          </View>

          <Input
            placeholder="Search"
            value={searchQuery}
            action={setSearchQuery}
            width={width * 0.9}
            fontSize={16}
          />

          <FlatList
            data={searchQuery ? filteredResults : []}
            keyExtractor={(item) => item.id.toString()}
            keyboardShouldPersistTaps="handled"
            style={styles.dropdown}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(item.navName);
                  setClicked(false);
                  setSearchQuery("");
                  Keyboard.dismiss();
                }}
              >
                <Text style={styles.resultText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              searchQuery.length > 0 ? (
                <Text style={styles.noResult}>
                  No results found for "{searchQuery}"
                </Text>
              ) : null
            }
          />
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={styles.chatIcon}
            onPress={() => setClicked(true)}
          >
            <Search />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.chatIcon}
            onPress={() =>
              navigation.navigate("CoinStack", {
                screen: "Chat",
              })
            }
          >
            <ChatIcon />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    position: "absolute",
    top: 60,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    zIndex: 1,
  },
  overlay: {
    position: "absolute",
    top: -20,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 2,
  },
  closeWrapper: {
    alignItems: "flex-end",
    paddingBottom: 4,
  },
  dropdown: {
    maxHeight: 200,
    marginTop: 10,
  },
  chatIcon: {
    padding: 8,
  },
  resultText: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  noResult: {
    padding: 12,
    fontStyle: "italic",
    color: "#999",
    textAlign: "center",
  },
});

export default Searchbar;
