import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import Icon from "react-native-vector-icons/FontAwesome5";

const BuyCryptoPopup = ({ isVisible, onClose, singleCoinItem }) => {
  const navigation = useNavigation();

  const navigateWithDelay = (screen, passCoin = false) => {
    onClose();
    setTimeout(() => {
      navigation.navigate("CoinStack", {
        screen,
        params: passCoin ? { coin: singleCoinItem } : undefined,
      });
    }, 250);
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.fullscreen}>
          <BlurView intensity={20} tint="light" style={StyleSheet.absoluteFill} />

          <TouchableWithoutFeedback>
            <View style={styles.popupContainer}>
              <BuyOption
                icon={<Icon name="shopping-cart" size={18} color="#444" />}
                title="Buy"
                subtitle="Buy crypto with cash"
                onPress={() => navigateWithDelay("BuySingleCoin", true)}
              />
              <BuyOption
                icon={<Icon name="money-bill-wave" size={18} color="#444" />}
                title="Sell"
                subtitle="Sell crypto instantly"
                onPress={() => navigateWithDelay("SellSingleCoin", true)}
              />
              <BuyOption
                icon={<Icon name="exchange-alt" size={18} color="#444" />}
                title="Convert"
                subtitle="Swap to another coin"
                onPress={() => navigateWithDelay("Convert")}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const BuyOption = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.optionBtn} onPress={onPress}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={styles.icon}>{icon}</View>
      <View>
        <Text style={styles.optionText}>{title}</Text>
        <Text style={styles.optionSubtitle}>{subtitle}</Text>
      </View>
    </View>
    <Icon name="arrow-right" size={18} color="#444" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    justifyContent: "flex-end",
  },
  popupContainer: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  icon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#052644",
  },
  optionSubtitle: {
    fontSize: 13,
    fontWeight: "300",
    marginTop: 5,
    color: "#444",
  },
});

export default BuyCryptoPopup;
