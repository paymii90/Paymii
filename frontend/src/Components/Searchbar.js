import React from "react";
import { View, StyleSheet ,TouchableOpacity} from "react-native";
import ChatIcon from "../../assets/ChatIcon.svg";
import Search from "../../assets/Search.svg";
import { useNavigation } from "@react-navigation/native";

const Searchbar = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Search />
      <TouchableOpacity style={styles.chatIcon}
      onPress={() =>  navigation.navigate("CoinStack", {
                screen: "Chat",
              })}>
        <ChatIcon />
      </TouchableOpacity>
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
