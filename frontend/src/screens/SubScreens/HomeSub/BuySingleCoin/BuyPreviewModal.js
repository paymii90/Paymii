import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";

const BuyPreviewModal = ({ visible, onClose, coin, amount }) => {
  const coinValue = (amount / coin?.current_price).toFixed(6);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.fullscreen}>
          {/* Fullscreen Blur */}
          <BlurView intensity={15} tint="light" style={StyleSheet.absoluteFill} />

          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.header}>
                <Image source={{ uri: coin?.image }} style={styles.coinImage} />
                <View>
                  <Text style={styles.name}>{coin?.name}</Text>
                  <Text style={styles.symbol}>{coin?.symbol.toUpperCase()}</Text>
                </View>
              </View>

              <View style={styles.info}>
                <View style={styles.option}>
                  <Text style={styles.label}>Amount (GHS):</Text>
                  <Text style={styles.value}>GH₵ {amount}</Text>
                </View>
                <View style={styles.option}>
                  <Text style={styles.label}>You’ll get:</Text>
                  <Text style={styles.value}>
                    {coinValue} {coin?.symbol.toUpperCase()}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyText}>Buy Now</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buyButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BuyPreviewModal;


const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginBottom: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  coinImage: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 20,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#052644",
  },
  symbol: {
    fontSize: 14,
    color: "#888",
  },
  info: {
    marginBottom: 25,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: "#333",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#052644",
  },
  buyButton: {
    backgroundColor: "#052644",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  buyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelText: {
    textAlign: "center",
    color: "red",
    marginTop: 5,
  },
});

