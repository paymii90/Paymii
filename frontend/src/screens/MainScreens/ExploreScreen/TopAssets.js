import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";

const topAssets = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    current_price: 67000,
    price_change_percentage_24h: 2.3,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    current_price: 3800,
    price_change_percentage_24h: 1.1,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
    current_price: 150,
    price_change_percentage_24h: -0.9,
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860",
    current_price: 0.45,
    price_change_percentage_24h: -1.5,
  },
];

const TopAssets = () => {
  const renderItem = ({ item }) => {
    const isNegative = item.price_change_percentage_24h < 0;
    const changeColor = isNegative ? "#ea3943" : "#16c784";

    return (
      <View style={styles.assetItem}>
        <View style={styles.assetLeft}>
          <Image source={{ uri: item.image }} style={styles.assetImage} />
          <View>
            <Text style={styles.assetName}>{item.name}</Text>
            <Text style={styles.assetSymbol}>{item.symbol.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.assetRight}>
          <Text style={styles.assetPrice}>GH₵{item.current_price.toLocaleString()}</Text>
          <Text style={[styles.assetChange, { color: changeColor }]}>
            {item.price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top assets</Text>
      <FlatList
        data={topAssets.slice(0, 3)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>See all</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopAssets;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 12,
  },
  assetItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  assetLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  assetImage: {
    height: 32,
    width: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  assetName: {
    fontWeight: "600",
    fontSize: 14,
  },
  assetSymbol: {
    color: "#777",
    fontSize: 12,
  },
  assetRight: {
    alignItems: "flex-end",
  },
  assetPrice: {
    fontWeight: "600",
    fontSize: 14,
  },
  assetChange: {
    fontSize: 12,
  },
  button: {
    backgroundColor: "#001f3f",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
