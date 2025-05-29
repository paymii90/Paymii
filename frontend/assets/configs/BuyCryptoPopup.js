// BuyCryptoPopup.js //
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import ModalComponent from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome5";

const BuyCryptoPopup = ({ isVisible, onClose }) => {
  return (
    <ModalComponent
      isVisible={isVisible}
      onBackdropPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
      style={styles.modal}
    >
      <View style={styles.popupContainer}>
        <Text style={styles.title}>Choose an action</Text>

        <TouchableOpacity style={styles.optionBtn}>
          <Icon name="shopping-cart" size={18} color="#444" style={styles.icon} />
          <Text style={styles.optionText}>Buy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBtn}>
          <Icon name="money-bill-wave" size={18} color="#444" style={styles.icon} />
          <Text style={styles.optionText}>Sell</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBtn}>
          <Icon name="exchange-alt" size={18} color="#444" style={styles.icon} />
          <Text style={styles.optionText}>Convert</Text>
        </TouchableOpacity>
      </View>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  popupContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  icon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default BuyCryptoPopup;
