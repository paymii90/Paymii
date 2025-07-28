import React, { useState } from "react";
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
import CustomNumpad from "../../../../Components/customNumpad";
import { useFormattedCurrency } from "../../../../hooks/useFormattedCurrency";
import ConvertPreviewModal from "./ConvertPreviewModal"; // you’ll build this next

const { width } = Dimensions.get("window");

const ConvertSingleCoin = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { fromCoin, toCoin } = route.params;

  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0.45); // Hardcoded crypto balance

  const formatCurrency = useFormattedCurrency();

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        {/* Blurred Header */}
        <ImageBackground
          source={{ uri: fromCoin.image }}
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

            <Text style={styles.coinName} numberOfLines={2}>
              Convert {fromCoin.name}
            </Text>
          </View>
        </ImageBackground>

        {/* Balance */}
        <Text style={styles.balance}>
          {balance} {fromCoin.symbol.toUpperCase()} available
        </Text>

        {/* Conversion Selector */}
        <View style={styles.selectorBox}>
          <View style={styles.coinSelector}>
            <Text style={styles.coinLabel}>From</Text>
            <Text style={styles.coinSymbol}>
              {fromCoin.symbol.toUpperCase()}
            </Text>
          </View>

          <View style={styles.swapIconContainer}>
            <Ionicons name="swap-vertical" size={20} color="#000" />
          </View>

          <View style={styles.coinSelector}>
            <Text style={styles.coinLabel}>To</Text>
            <Text style={styles.coinSymbol}>{toCoin.symbol.toUpperCase()}</Text>
          </View>
        </View>

        {/* Amount */}
        <Text style={styles.amount}>{amount || "0.00"}</Text>

        {/* Numpad & Button */}
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <CustomNumpad setAmount={setAmount} />

          <TouchableOpacity
            style={styles.Btn}
            onPress={() => {
              if (parseFloat(amount) > balance || parseFloat(amount) <= 0)
                return;
              navigation.navigate("ConvertPreviewModal", {
                fromCoin,
                toCoin,
                amount,
              });
            }}
          >
            <Text style={styles.previewText}>PREVIEW CONVERT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default ConvertSingleCoin;

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
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    marginRight: 10,
  },
  coinName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
  },
  balance: {
    textAlign: "center",
    marginVertical: 15,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  selectorBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  coinSelector: {
    alignItems: "center",
  },
  coinLabel: {
    fontSize: 12,
    color: "#555",
  },
  coinSymbol: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  swapIconContainer: {
    padding: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  amount: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
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
