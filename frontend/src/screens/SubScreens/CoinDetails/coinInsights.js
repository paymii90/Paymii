import { View, Text, StyleSheet } from "react-native";
import React from "react";
import StatItem from "./statItem";

const CoinInsights = ({ coin }) => {
  return (
    <View style={styles.container}>
      {/* About Section */}
      <Text style={styles.heading}>About {coin.name}</Text>
      <View style={{ width: "100%",flexDirection:"column" }}>
        <Text style={styles.about}>
          {coin.name} is one of the top cryptocurrencies by market cap. It is
          currently trading at ₵{coin.current_price.toLocaleString()}. This data
          is for informational purposes only.
        </Text>
      </View>

      {/* Market Stats */}
      <Text style={styles.heading}>Market stats</Text>

      <View style={{ paddingTop: 10 }}>
        <StatItem
          iconName="storefront-outline"
          label="Market cap"
          value={`GH₵ ${(coin.market_cap / 1e9).toFixed(1)} billion`}
        />
        <StatItem
          iconName="bar-chart-outline"
          label="Volume"
          value={`GH₵ ${(coin.total_volume / 1e9).toFixed(1)} billion`}
        />
        <StatItem
          iconName="refresh-outline"
          label="Circulating supply"
          value={coin.circulating_supply.toLocaleString()}
        />
        <StatItem
          iconName="analytics-outline"
          label="Trading activity"
          value="$36.6% sell"
        />
        <StatItem
          iconName="time-outline"
          label="Typical hold time"
          value="53 days"
        />
        <StatItem
          iconName="trophy-outline"
          label="All time high"
          value={`GH₵ ${coin.ath.toFixed(2)}`}
        />
        <StatItem
          iconName="warning-outline"
          label="All time low"
          value={`GH₵ ${coin.atl.toFixed(2)}`}
        />
        <StatItem
          iconName="diamond-outline"
          label="Popularity on Paymii"
          value={`#${coin.market_cap_rank}`}
        />
      </View>
    </View>
  );
};

export default CoinInsights;

const styles = StyleSheet.create({
  container: {
    // paddingTop: 16,
    // paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  about: {
    fontSize: 16,
    lineHeight: 22,
    color: "#333",
    marginBottom: 12,
    textAlign: "justify",
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
  },
});
