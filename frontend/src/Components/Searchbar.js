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
import SafeAreaWrapper from "./SafeAreaWrapper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const Searchbar = ({text=''}) => {
  const navigation = useNavigation();
  const [clicked, setClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets();

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
              <AntDesign name="closecircle" size={24} color="black" />
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
            <Search width={24} height={24} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{text}</Text>
          <TouchableOpacity
            style={styles.chatIcon}
            onPress={() =>
              navigation.navigate("CoinStack", {
                screen: "Chat",
              })
            }
          >
            <ChatIcon width={24} height={24} />
          </TouchableOpacity>
        </>
      )}
    </View>
    
  );
};

const styles = StyleSheet.create({
  // main: {
  //   flex: 1,
  //   //position: "absolute",
  //   top: 0,
  //   width: "100%",
  //   height: 150,
  //   zIndex: 10,
  //   backgroundColor: '#CFCFCF',
  //   justifyContent: "space-between",
  //   zIndex: 1,
  //   backgroundColor: "#fff",
  // },
  container: {
    flexDirection: "row",
    width: "100%",
    height: 75,
   // position: "absolute",
   // top: 60,
   //backgroundColor: "#fff",
   // Adjust padding based on safe area insets
    alignItems: "center",
   // alignSelf: "center",
    justifyContent: "space-between",
    zIndex: 1,
    
  },
  overlay: {
    position: "absolute",
    top: 3,
    width: "100%",
    // top: 60,
    paddingTop: 10,
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
  main: {
   // flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: "-20%",
    height: 70,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    
   // textAlign: "center",
  },
});

export default Searchbar;
