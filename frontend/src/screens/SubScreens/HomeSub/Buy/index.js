import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import BuyHeader from "./header";
import { SafeAreaView } from "react-native-safe-area-context";
import SingleCoinItem from "./SingleCoinItem";
import { CoinContext } from "../../../../context/CoinContext";

const BuyAssets = () => {
  const { coins } = useContext(CoinContext);
  const [coinsData, setCoinsData] = useState(coins);

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
        // keyboardVerticalOffset={100} // adjust based on header height
      >
        <FlatList
          data={coinsData}
          ListHeaderComponent={<BuyHeader onSearch={handleSearch} />}
          renderItem={({ item }) => <SingleCoinItem singleCoinItem={item} path="CoinDetails" />}
          keyExtractor={(item) => item.id?.toString() || item.name}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BuyAssets;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
