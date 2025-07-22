import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import SafeAreaWrapper from "../../../../Components/SafeAreaWrapper";
import { useNavigation, useRoute } from "@react-navigation/native";
import SellPreviewModal from "./SellPreviewModal";
import CustomNumpad from "../../../../Components/customNumpad";
import { usePortfolio } from "../../../../context/portfolioContext";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

const SellSingleCoin = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { coin } = route.params;

  const { portfolio } = usePortfolio();
  const [amount, setAmount] = useState("0");
  const [balance, setBalance] = useState("0");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (portfolio && coin?.id) {
      const matchedCoin = portfolio.find((item) => item.coin_id === coin.id);
      if (matchedCoin) {
        setBalance(matchedCoin.amount.toString());
      } else {
        setBalance("10"); // fallback to 0 instead of 10
      }
    }
  }, [portfolio, coin]);

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: coin.image }}
          style={styles.headerBackground}
          imageStyle={styles.headerImage}
          blurRadius={10}
        >
          <View style={styles.overlay}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.coinName}>{coin.name}</Text>
            <TouchableOpacity
              style={styles.sellButton}
              onPress={() => {
                navigation.navigate("CoinStack", {
                  screen: "BuySingleCoin",
                  params: { coin },
                });
              }}
            >
              <Text>Buy</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <Text style={styles.label}>Enter Amount in crypto</Text>
        <Text style={styles.amount}>
          {amount || "0"} {coin.symbol.toUpperCase()}
        </Text>
        <Text style={styles.balance}>
          Current Balance: {balance} {coin.symbol.toUpperCase()}
        </Text>

        <View style={styles.percentRow}>
          {["0%", "10%", "25%", "50%", "75%", "100%"].map((p) => {
            const value = parseInt(p.replace("%", ""));
            return (
              <TouchableOpacity
                key={p}
                style={styles.percentBtn}
                onPress={() =>
                  setAmount(((parseFloat(balance) * value) / 100).toFixed(2))
                }
              >
                <Text style={styles.percentText}>{p}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <CustomNumpad setAmount={setAmount} />

          <TouchableOpacity
            style={styles.Btn}
            onPress={() => {
              const amountNum = parseFloat(amount);
              const balanceNum = parseFloat(balance);

              if (isNaN(amountNum) || amountNum <= 0) {
                Toast.show({
                  type: "error",
                  text1: "Invalid Amount",
                  text2: "Please enter a valid amount.",
                });
              } else if (amountNum > balanceNum) {
                Toast.show({
                  type: "error",
                  text1: "Insufficient Balance",
                  text2: "You don’t have enough funds to proceed.",
                });
              } else {
                setShowModal(true);
              }
            }}
          >
            <Text style={styles.previewText}>PREVIEW SELL</Text>
          </TouchableOpacity>
        </View>

        <SellPreviewModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          coin={coin}
          amount={amount}
          balance={balance}
          setBalance={setBalance}
        />
      </View>
    </SafeAreaWrapper>
  );
};

export default SellSingleCoin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  headerImage: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    objectFit: "cover",
    objectPosition: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    marginRight: 10,
  },
  coinName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
  },
  sellButton: {
    fontSize: 12,
    color: "#f66",
    fontWeight: "bold",
    padding: "3%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  label: {
    marginTop: "5%",
    textAlign: "center",
    fontSize: 14,
    color: "#888",
  },
  amount: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  balance: {
    textAlign: "center",
    marginVertical: 15,
    fontWeight: "600",
  },
  percentRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  percentBtn: {
    width: width / 6 - 10,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    marginVertical: 6,
  },
  percentText: {
    fontWeight: "500",
    color: "#333",
  },
  Btn: {
    backgroundColor: "#052644",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: "5%",
  },
  previewText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
