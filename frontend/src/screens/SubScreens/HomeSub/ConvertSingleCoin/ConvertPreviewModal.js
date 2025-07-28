
import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { BlurView } from "expo-blur";
import { useFormattedCurrency } from "../../../../hooks/useFormattedCurrency";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const ConvertPreviewModal = ({
  visible,
  onClose,
  fromCoin,
  toCoin,
  amount,
  convertedAmount,
  onConfirm,
}) => {
  const formatCurrency = useFormattedCurrency();

  if (!fromCoin || !toCoin) return null;

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <Pressable onPress={onClose} style={styles.modalBackground}>
        <BlurView intensity={50} tint="light" style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={22} color="#333" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Image source={{ uri: fromCoin.image }} style={styles.coinImage} />
            <Text style={styles.coinSymbol}>{fromCoin.symbol.toUpperCase()}</Text>
            <Text style={styles.arrow}>→</Text>
            <Image source={{ uri: toCoin.image }} style={styles.coinImage} />
            <Text style={styles.coinSymbol}>{toCoin.symbol.toUpperCase()}</Text>
          </View>

          <Text style={styles.amount}>
            ₵{amount} = {formatCurrency(convertedAmount)} {toCoin.symbol.toUpperCase()}
          </Text>

          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmText}>CONFIRM CONVERT</Text>
          </TouchableOpacity>
        </BlurView>
      </Pressable>
    </Modal>
  );
};

export default ConvertPreviewModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.9,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  coinImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  coinSymbol: {
    fontWeight: "bold",
    marginHorizontal: 6,
    fontSize: 16,
    color: "#333",
  },
  arrow: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
  },
  amount: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 30,
    textAlign: "center",
    color: "#222",
  },
  confirmButton: {
    backgroundColor: "#052644",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
