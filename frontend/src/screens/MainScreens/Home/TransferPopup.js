import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BlurView } from "expo-blur";

const TransferPopup = ({ isVisible, onClose }) => {
  const navigation = useNavigation();

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.fullscreen}>
          <BlurView
            intensity={20}
            tint="light"
            style={StyleSheet.absoluteFill}
          />

          <TouchableWithoutFeedback>
            <View style={styles.popupContainer}>
              <TransferOption
                icon={<Icon name="arrow-up" size={18} color="#444" />}
                title="Send"
                subtitle="Send crypto to another wallet"
                onPress={() => navigateWithDelay("Send")}
              />

              <TransferOption
                icon={<Icon name="arrow-down" size={18} color="#444" />}
                title="Receive"
                subtitle="Receive crypto from another wallet"
                onPress={() => navigateWithDelay("Receive")}
              />

              <TransferOption
                icon={<Icon name="home" size={18} color="#444" />}
                title="Deposit Cash"
                subtitle="Transfer funds from your account"
                onPress={() => navigateWithDelay("Deposit")}
              />

              <TransferOption
                icon={
                  <FontAwesome name="credit-card-alt" size={18} color="#444" />
                }
                title="Withdraw Cash"
                subtitle="Transfer funds to your account"
                onPress={() => navigateWithDelay("Withdraw")}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  function navigateWithDelay(screenName) {
    onClose();
    setTimeout(() => {
      navigation.navigate("CoinStack", { screen: screenName });
    }, 250);
  }
};

const TransferOption = ({ icon, title, subtitle, onPress }) => (
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

export default TransferPopup;
