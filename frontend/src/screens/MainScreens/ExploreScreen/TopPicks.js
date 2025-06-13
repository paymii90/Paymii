import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";

// Dummy data for now
const topPicks = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
  },
];

const TopPicks = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top picks for you</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={topPicks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.symbol}>{item.symbol}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TopPicks;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#052644",
  },
  card: {
    backgroundColor: "#f4f6fa",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 12,
    width: 100,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  symbol: {
    fontSize: 12,
    color: "#888",
  },
});
