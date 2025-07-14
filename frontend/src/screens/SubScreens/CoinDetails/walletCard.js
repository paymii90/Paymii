import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useContext } from "react";
import { usePortfolio } from "../../../context/portfolioContext";
import { CoinContext } from "../../../context/CoinContext";



const WalletCard = ({ image, name, symbol, coinId }) => {
  const { portfolio } = usePortfolio();
  const { getCoinById } = useContext(CoinContext);

  const matchedCoin = portfolio.find((item) => item.coin_id === coinId);
  const balance = matchedCoin ? matchedCoin.amount : 0;

  const coin = getCoinById(coinId);
  const current_price = coin ? coin.current_price : 0; // Assuming coin has current_price property
  // Calculate estimated GHS value based on balance and current price
  const estimatedGHS = balance * current_price || 0;

  return (
    <View style={styles.walletCard}>
      <Image source={{ uri: image }} style={styles.coinIcon} />
      <Text style={styles.walletLabel}>{name} Wallet</Text>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.walletBalance}>GH₵ {estimatedGHS.toFixed(2)}</Text>
        <Text style={styles.walletBalanceSmall}>{balance} {symbol.toUpperCase()}</Text>
      </View>
    </View>
  );
};


export default WalletCard;

const styles = StyleSheet.create({
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
});
