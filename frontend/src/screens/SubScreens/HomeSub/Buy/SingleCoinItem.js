import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormattedCurrency } from "../../../../hooks/useFormattedCurrency";
import AntDesign from "@expo/vector-icons/AntDesign";
import MiniChart from "../../../../Components/MiniChart";

const SingleCoinItem = ({ singleCoinItem, path }) => {
  const navigation = useNavigation();
  const {
    name,
    current_price,
    price_change_percentage_24h,
    symbol,
    image,
    id,
  } = singleCoinItem;
  const formatCurrency = useFormattedCurrency();

  const percentageColor =
    price_change_percentage_24h > 0 ? "#16c784" : "#ea3943";

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CoinStack", {
          screen: path,
          params: { coin: singleCoinItem },
        })
      }
    >
      <View style={styles.container}>
        {/* Coin Image */}
        <Image style={styles.image} source={{ uri: image }} />

        {/* Coin Info */}
        <View style={styles.nameContainer}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {name}
          </Text>
          <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
        </View>

        {/* Mini Chart */}
        <View style={styles.chartWrapper}>
          <MiniChart coinId={id} backgroundcolor={"#fff"} />
        </View>

        {/* Price and Change */}
        <View style={styles.priceContainer}>
          <Text style={styles.price} numberOfLines={1} adjustsFontSizeToFit>
            {formatCurrency(current_price)}
          </Text>
          <View style={styles.percentageWrapper}>
            <AntDesign
              name={price_change_percentage_24h >= 0 ? "caretup" : "caretdown"}
              size={16}
              color={percentageColor}
            />
            <Text
              style={[styles.change, { color: percentageColor }]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {price_change_percentage_24h.toFixed(2)}%
            </Text>
          </View>
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
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 0.3,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nameContainer: {
    flex: 1.5,
    justifyContent: "center",
    paddingRight: 6,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    maxWidth: "100%",
  },
  symbol: {
    color: "#555",
    fontSize: 14,
  },
  chartWrapper: {
    width: 80,
    height: 40,
    marginHorizontal: 5,
  },
  priceContainer: {
    flex: 1.2,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  price: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "right",
  },
  percentageWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  change: {
    fontSize: 14,
    marginLeft: 3,
  },
});
