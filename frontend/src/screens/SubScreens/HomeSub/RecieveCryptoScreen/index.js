import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  Dimensions,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";
import Ionicons from "@expo/vector-icons/Ionicons";
import SafeAreaWrapper from "../../../../Components/SafeAreaWrapper";

const { width } = Dimensions.get("window");

const ReceiveCryptoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { coin } = route.params;

  const dummyAddress = `NCo-${coin?.symbol}yFCpQnRBxV2sVmGUY`;

  const handleCopy = () => {
    Clipboard.setStringAsync(dummyAddress);
    alert("Address copied to clipboard");
  };

  const handleShare = () => {
    Share.share({
      message: dummyAddress,
    });
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Receive {coin.name}</Text>

        <View style={styles.card}>
          <Image source={{ uri: coin?.image }} style={styles.coinImage} />
          <Text style={styles.title}>
            Scan the QR code to get Receive address
          </Text>

          <View style={styles.qrContainer}>
            <QRCode value={dummyAddress} size={width * 0.4} />
          </View>

          <Text style={styles.orText}>or</Text>
          <Text style={styles.label}>Your {coin?.name} Address</Text>

          <View style={styles.addressBox}>
            <Text style={styles.address}>{dummyAddress}</Text>
            <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
              <Text style={styles.copyText}>Copy Address</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.note}>
            * Block/Time will be calculated after the transaction is generated
            and broadcasted
          </Text>
        </View>

        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <Text style={styles.shareText}>SHARE ADDRESS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};

export default ReceiveCryptoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
  },
  backButton: {
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgb(235, 232, 232)",
    borderRadius: 12,
    padding: "6%",
    alignItems: "center",
    marginTop: "5%",
  },
  coinImage: {
    width: width * 0.12,
    height: width * 0.12,
    resizeMode: "contain",
    marginBottom: "3%",
  },
  title: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: "5%",
  },
  qrContainer: {
    backgroundColor: "#fff",
    padding: "5%",
    borderRadius: 12,
    marginBottom: "4%",
  },
  orText: {
    color: "#aaa",
    marginVertical: "2%",
  },
  label: {
    fontWeight: "600",
    marginBottom: "2%",
  },
  addressBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: "4%",
    alignItems: "center",
    marginBottom: "4%",
  },
  address: {
    fontSize: 12,
    color: "#333",
    marginBottom: "3%",
  },
  copyBtn: {
    backgroundColor: "#e6f0ff",
    paddingVertical: "2%",
    paddingHorizontal: "6%",
    borderRadius: 8,
  },
  copyText: {
    fontWeight: "500",
    color: "#052644",
  },
  note: {
    fontSize: 11,
    color: "#888",
    textAlign: "center",
    marginTop: "4%",
  },
  shareBtn: {
    backgroundColor: "#052644",
    paddingVertical: "4%",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: "6%",
  },
  shareText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
