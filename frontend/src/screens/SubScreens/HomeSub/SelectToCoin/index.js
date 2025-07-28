import React, { useContext, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import SelectToCoinHeader from "./header";
import SingleCoinItem from "../Buy/SingleCoinItem";
import { CoinContext } from "../../../../context/CoinContext";

const SelectToCoin = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { fromCoin } = route.params;
  console.log("fromCoin", fromCoin);
  

  const { coins, exchangeRate } = useContext(CoinContext);
  const [coinsData, setCoinsData] = useState(coins);

  const handleSearch = (text) => {
    const filteredCoins = coins.filter((coin) =>
      coin.name.toLowerCase().includes(text.toLowerCase())
    );
    setCoinsData(filteredCoins);
  };

  const handleSelectToCoin = (toCoin) => {
    navigation.navigate("CoinStack", {
      screen: "ConvertSingleCoin",
      params: {
        fromCoin,
        toCoin,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          data={coinsData}
          ListHeaderComponent={<SelectToCoinHeader onSearch={handleSearch} />}
          renderItem={({ item }) => (
            <SingleCoinItem
              singleCoinItem={item}
              onPress={() => handleSelectToCoin(item)}
            />
          )}
          keyExtractor={(item) => item.id?.toString() || item.name}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SelectToCoin;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
