import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import SellHeader from "./header";
import { SafeAreaView } from "react-native-safe-area-context";
import SingleCoinItem from "../Buy/SingleCoinItem";
import { CoinContext } from "../../../../context/CoinContext";
import { useNavigation } from "@react-navigation/native";

const Convert = () => {
  const { coins, exchangeRate } = useContext(CoinContext);
  const [coinsData, setCoinsData] = useState(coins);
  const navigation = useNavigation();

  const handleSearch = (text) => {
    const filteredCoins = coins.filter((coin) =>
      coin.name.toLowerCase().includes(text.toLowerCase())
    );
    setCoinsData(filteredCoins);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={100}
      >
        <FlatList
          data={coinsData}
          ListHeaderComponent={<SellHeader onSearch={handleSearch} />}
          renderItem={({ item }) => (
            <SingleCoinItem
              singleCoinItem={item}
              onPress={() => {
                navigation.navigate("CoinStack", {
                  screen: "SelectToCoin",
                  params: { fromCoin: item },
                });
              }}
              exchangeRate={exchangeRate}
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

export default Convert;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
