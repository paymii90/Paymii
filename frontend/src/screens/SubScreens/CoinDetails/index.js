import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "../../../Components/Button";

// const bitcoin = {
//   name: "Bitcoin",
//   symbol: "btc",
//   current_price: 38552.62,
//   price_change_24h: 1439.58,
//   price_change_percentage_24h: 3.88,
//   image:
//     "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
// };

const timeRanges = ["1H", "1D", "1W", "1M", "1Y", "All"];

const CoinDetailScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [selectedRange, setSelectedRange] = useState("1D");
  const route = useRoute();
  const { coin } = route.params;
  // console.log(coin);
  const { name, current_price,price_change_24h, price_change_percentage_24h, symbol, image } =
    coin;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView style={styles.container}>
        {/* Header */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.label}>{name} Price</Text>
        <Text style={styles.price}>
          ${current_price.toLocaleString()}
        </Text>
        <Text
          style={[
            styles.change,
            {
              color:
                price_change_percentage_24h > 0 ? "#16c784" : "#ea3943",
            },
          ]}
        >
          {price_change_24h > 0 ? "+" : ""}
          {price_change_24h.toFixed(2)} (
          {price_change_percentage_24h.toFixed(2)}%)
        </Text>

        {/* Chart Placeholder */}
        <View style={styles.chart}>
          <Text style={{ textAlign: "center" }}>📈 Chart goes here</Text>
        </View>

        {/* Time Range Selector */}
        <View style={styles.rangeSelector}>
          {timeRanges.map((range) => (
            <TouchableOpacity
              key={range}
              onPress={() => setSelectedRange(range)}
            >
              <Text
                style={[
                  styles.rangeText,
                  range === selectedRange && styles.rangeTextSelected,
                ]}
              >
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Wallet Info */}
        <View style={styles.walletCard}>
          <Image source={{ uri: image }} style={styles.coinIcon} />
          <Text style={styles.walletLabel}>{name} Wallet</Text>
          <View>
            <Text style={styles.walletBalance}>$0.00</Text>
            <Text style={styles.walletBalanceSmall}>0 {symbol.toUpperCase()}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.buttonRow}>
          <Button
            label="Buy & Sell"
            backgroundColor="#052644"
            color="white"
            style={{
              borderRadius: 60,
              width: "45%",
            }}
            labelStyle={{ fontWeight: 600 }}
            // action={() => setBuySellPopupVisible(true)}
          />
          <Button
            label="Transfer"
            backgroundColor="#011D5C"
            color="white"
            style={{
              borderRadius: 60,
              width: "45%",
            }}
            labelStyle={{ fontWeight: 600 }}
            // action={() => setBuySellPopupVisible(true)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backBtn: {
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  backArrow: {
    fontSize: 30,
  },
  label: {
    fontSize: 16,
    color: "#888",
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 5,
  },
  change: {
    marginTop: 4,
    fontWeight: "500",
  },
  chart: {
    height: 250,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    marginVertical: 20,
    justifyContent: "center",
  },
  rangeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  rangeText: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    color: "#666",
    borderRadius: 10,
  },
  rangeTextSelected: {
    color: "#000",
    fontWeight: "bold",
    backgroundColor: "#e0e0e0",
  },
  walletCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "#FAFAFA",
    borderRadius: 10,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  coinIcon: {
    height: 40,
    width: 40,
    marginRight: 15,
  },
  walletLabel: {
    flex: 1,
    fontWeight: "bold",
    marginLeft: "1%",
  },
  walletBalance: {
    fontSize: 16,
    marginTop: 4,
  },
  walletBalanceSmall: {
    fontSize: 12,
    color: "#888",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  buttonOutline: {
    flex: 1,
    borderColor: "#0033CC",
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
  },
  buttonTextOutline: {
    textAlign: "center",
    color: "#0033CC",
    fontWeight: "bold",
  },
});

export default CoinDetailScreen;
