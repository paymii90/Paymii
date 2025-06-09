import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const WalletCard = ({image, name, symbol}) => {
  return (
    <View style={styles.walletCard}>
      <Image source={{ uri: image }} style={styles.coinIcon} />
      <Text style={styles.walletLabel}>{name} Wallet</Text>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.walletBalance}>GH₵0.00</Text>
        <Text style={styles.walletBalanceSmall}>0 {symbol.toUpperCase()}</Text>
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
