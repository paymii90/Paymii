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
import KeyboardManager from "../../../../Components/KeyboardManager";

const SendCrypto = () => {
  const { coins, exchangeRate } = useContext(CoinContext);
  const [coinsData, setCoinsData] = useState(coins);

  const handleSearch = (text) => {
    const filteredCoins = coins.filter((coin) =>
      coin.name.toLowerCase().includes(text.toLowerCase())
    );
    setCoinsData(filteredCoins);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardManager>
        <FlatList
          data={coinsData}
          ListHeaderComponent={<SellHeader onSearch={handleSearch} />}
          renderItem={({ item }) => (
            <SingleCoinItem
              singleCoinItem={item}
              path="ReceiveCryptoScreen"
              exchangeRate={exchangeRate}
            />
          )}
          keyExtractor={(item) => item.id?.toString() || item.name}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </KeyboardManager>
    </SafeAreaView>
  );
};

export default SendCrypto;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
