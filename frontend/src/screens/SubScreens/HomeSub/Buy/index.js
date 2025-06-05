import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import BuyHeader from "./header";
import { SafeAreaView } from "react-native-safe-area-context";
import SingleCoinItem from "./SingleCoinItem";
import cryptocurrencies from '../../../../../assets/data/cryptocurrencies.json'

const BuyAssets = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BuyHeader />
      <FlatList
        data={cryptocurrencies}
        renderItem={({ item }) => <SingleCoinItem singleCoinItem={item} />}
      />
    </SafeAreaView>
  );
};

export default BuyAssets;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
