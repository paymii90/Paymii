import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import ChatIcon from "../../assets/ChatIcon.svg";
import Search from "../../assets/Search.svg";
import { useNavigation } from "@react-navigation/native";
import Input from "./Input";
import SearchData from "../../assets/data/SearchData";
import DummyPayment from "../../assets/data/DummyPayment";

const Searchbar = () => {
  const navigation = useNavigation();
  const [clicked, setClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [typing, setTyping] = useState(false);
  //implementing search logic
  const handleSearch = (query) => {
    setSearchQuery(query);
    setTyping(!query);

    if (query) {
      const filtered = SearchData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else setSearchResults([]);
  };

  const searchDim = [
    {
      name: "Portfolio",
      navName: "Portfolio",
      id: 1,
    },
    {
      name: "Settings",
      navName: "Settings",
      id: 2,
    },
    {
      name: "Explore",
      navName: "Explore",
      id: 3,
    },
  ];
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.chatIcon}
        onPress={() => setClicked(!clicked)}
      >
        <Search />
      </TouchableOpacity>
      {clicked === true ? (
        <View>
          <Input
            //onPress={setTyping(true)}
            key="input"
            placeholder="Search"
            style={styles.searchbox}
            width="300"
            fontSize="0"
            value={searchQuery}
            action={() => {
              handleSearch(searchQuery);
            }}
          />
          {typing && (
            <FlatList
              data={searchDim}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text>
                  {searchQuery ? "No results found" : "Start typing to search"}
                </Text>
              }
            />
          )}
        </View>
      ) : (
        <TouchableOpacity
          style={styles.chatIcon}
          key="icon"
          onPress={() =>
            navigation.navigate("CoinStack", {
              screen: "Chat",
            })
          }
        >
          <ChatIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    height: 60,
    position: "absolute",
    top: 60,
    alignItems: "center",
    alignSelf: "center",
  },
  searchbox: {
    padding: 0,
  },
});

export default Searchbar;
