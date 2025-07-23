import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useFormattedCurrency } from "../../../hooks/useFormattedCurrency";

const CoinCard = ({ item, navigation }) => {
  const formatCurrency = useFormattedCurrency();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CoinStack", {
          screen: "CoinDetails",
          params: { coin: item },
        })
      }
      style={styles.coinCard}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{formatCurrency(item.current_price)}</Text>
      <Text
        style={[
          styles.change,
          {
            color: item.price_change_percentage_24h > 0 ? "#16c784" : "#ea3943",
          },
        ]}
      >
        {item.price_change_percentage_24h > 0 ? "+" : ""}
        {item.price_change_percentage_24h.toFixed(2)}%
      </Text>
    </TouchableOpacity>
  );
};

export default CoinCard;

const styles = StyleSheet.create({
  coinCard: {
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    // alignItems: "center",
    justifyContent: "center",

    width: 120,
  },
  image: {
    width: 35,
    height: 35,
    marginBottom: 6,
  },
  name: {
    fontWeight: 700,
    fontSize: 13,
  },
  price: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#393939",
  },
  change: {
    fontSize: 12,
    marginTop: 2,
  },
});
