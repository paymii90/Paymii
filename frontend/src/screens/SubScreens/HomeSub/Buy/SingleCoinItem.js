import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SingleCoinItem = ({ singleCoinItem }) => {
  const navigation = useNavigation();
  const { name, current_price, price_change_percentage_24h, symbol, image } =
    singleCoinItem;

  const percentageColor =
    price_change_percentage_24h > 0 ? "#16c784" : "#ea3943";
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CoinStack", {
          screen: "CoinDetails",
          params: { coin: singleCoinItem },
        })
      }
    >
      <View style={styles.container}>
        {/* Left: Coin Image */}
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />

        {/* Middle: Name and Symbol */}
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
        </View>

        {/* Right: Price and % Change */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>GH₵ {current_price.toFixed(2)}</Text>
          <Text style={[styles.change, { color: percentageColor }]}>
            {price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SingleCoinItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 0.25,
    borderBottomColor: "rgba(68, 66, 66, 0.24)",
  },
  image: {
    height: 40,
    width: 40,
    marginRight: 12,
    borderRadius: 20,
  },
  nameContainer: {
    // backgroundColor: 'red',
    flex: 1,
    marginLeft: 8,
  },
  name: {
    fontWeight: "bold",
    fontSize: 17,
  },
  symbol: {
    color: "#555",
    fontSize: 15,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  price: {
    fontWeight: "bold",
    fontSize: 17,
  },
  change: {
    fontSize: 15,
  },
});
