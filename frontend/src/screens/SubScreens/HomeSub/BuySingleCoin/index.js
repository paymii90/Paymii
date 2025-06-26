import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ImageBackground,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import SafeAreaWrapper from "../../../../Components/SafeAreaWrapper";
import { useNavigation, useRoute } from "@react-navigation/native";
import BuyPreviewModal from "./BuyPreviewModal";

const { width } = Dimensions.get("window");

const BuySingleCoin = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { coin } = route.params;

  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(10000); // GH₵10,00000 dummy balance
  const [showModal, setShowModal] = useState(false);

  const handleKeyPress = (key) => {
    if (key === "⌫") {
      setAmount((prev) => prev.slice(0, -1));
    } else {
      setAmount((prev) => prev + key);
    }
  };

  const keypad = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [".", "0", "⌫"],
  ];

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
            <TouchableOpacity style={styles.sellButton}>
              <Text>Sell</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <Text style={styles.label}>Enter Amount in GHC</Text>
        <Text style={styles.amount}>GH₵ {amount || "0"}</Text>
        <Text style={styles.range}>Current Price: GH₵{coin.current_price}</Text>
        <Text style={styles.balance}>Current Balance: ₵10,000</Text>

        <View style={styles.percentRow}>
          {["0%", "10%", "25%", "50%", "75%", "100%"].map((p) => {
            const value = parseInt(p.replace("%", ""));

            return (
              <TouchableOpacity
                key={p}
                style={styles.percentBtn}
                onPress={() => {
                  setAmount(((value / 100) * balance).toFixed(2));
                  console.log(value);
                }}
              >
                <Text style={styles.percentText}>{p}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={styles.keypad}>
            {keypad.map((row, i) => (
              <View key={i} style={styles.keypadRow}>
                {row.map((key) => (
                  <TouchableOpacity
                    key={key}
                    style={styles.key}
                    onPress={() => handleKeyPress(key)}
                  >
                    <Text style={styles.keyText}>{key}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.Btn}
            onPress={() => {
              if (amount <= 0) {
                alert("Enter Amount");
              } else if (amount > balance) {
                alert("Insufficient balance");
              } else {
                setShowModal(true);
              }
            }}
          >
            <Text style={styles.previewText}>PREVIEW BUY</Text>
          </TouchableOpacity>
        </View>

        <BuyPreviewModal
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

export default BuySingleCoin;

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
  range: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 6,
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
  keypad: {
    marginBottom: 30,
  },
  keypadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  key: {
    width: width / 3.5,
    padding: "3%",
    backgroundColor: "rgba(61, 61, 61, 0.24)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  keyText: {
    fontSize: 22,
    fontWeight: "600",
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
