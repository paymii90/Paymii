import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import SafeAreaWrapper from "../../../../Components/SafeAreaWrapper";

const { width } = Dimensions.get("window");

const SendCryptoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { coin } = route.params;

  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  return (
    <SafeAreaWrapper>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginBottom: 16 }}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.screenTitle}>Send {coin.name}</Text>

      <View style={styles.card}>
        {/* Coin Info Row */}
        <View style={styles.coinRow}>
          <Image source={{ uri: coin.image }} style={styles.coinImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.coinName}>{coin.name}</Text>
            <Text style={styles.coinSymbol}>{coin.symbol.toUpperCase()}</Text>
          </View>
          <Text style={styles.balance}>
            2.23464 {coin.symbol.toUpperCase()}
          </Text>
        </View>

        {/* Address Input */}
        <View style={styles.inputRow}>
          <TextInput
            placeholder="Enter Address"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
          {/* <Ionicons name="qr-code-outline" size={24} color="#333" /> */}
        </View>

        {/* Amount Input */}
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          style={styles.textInput}
        />

        {/* Note Input */}
        <TextInput
          placeholder="Note"
          value={note}
          onChangeText={setNote}
          style={styles.textInput}
        />

        {/* Fees */}
        <Text style={styles.fees}>
          Transaction fees: 0.0006 {coin.symbol.toUpperCase()}
        </Text>
        <Text style={styles.fees}>
          Min: 0.00061 {coin.symbol.toUpperCase()} - Max: 2.0006{" "}
          {coin.symbol.toUpperCase()}
        </Text>
      </View>

      {/* Note under card */}
      <Text style={styles.note}>
        * Block/Time will be calculated after the transaction is generated and
        broadcasted
      </Text>

      {/* Send Button */}
      <TouchableOpacity style={styles.sendBtn}>
        <Text style={styles.sendText}>SEND {coin.symbol.toUpperCase()}</Text>
      </TouchableOpacity>
    </SafeAreaWrapper>
  );
};

export default SendCryptoScreen;

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: "5%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  coinRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  coinImage: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  coinName: {
    fontSize: 16,
    fontWeight: "600",
  },
  coinSymbol: {
    fontSize: 13,
    color: "#555",
  },
  balance: {
    fontSize: 14,
    fontWeight: "600",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 14,
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
    fontSize: 14,
    marginBottom: 12,
  },
  fees: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  note: {
    fontSize: 11,
    color: "#888",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  sendBtn: {
    backgroundColor: "#052644",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: "6%",
    justifySelf: "flex-end",
  },
  sendText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
