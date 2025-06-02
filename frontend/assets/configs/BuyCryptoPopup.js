// BuyCryptoPopup.js //
import React from "react";
import { useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation();
  return (
    <ModalComponent
      isVisible={isVisible}
      onBackdropPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
      style={styles.modal}
    >
      <View style={styles.popupContainer}>

        <TouchableOpacity
          style={styles.optionBtn}
          onPress={() => {
            onClose(); // closes popup first
            setTimeout(() => {
              navigation.navigate("Buy"); // then navigates after slight delay
            }, 200); // slight delay gives modal time to animate out
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="shopping-cart"
              size={18}
              color="#444"
              style={styles.icon}
            />
            <View>
              <Text style={styles.optionText}>Buy</Text>
              <Text style={{ fontWeight: 300, marginTop: 5 }}>
                Buy Crypto with cash
              </Text>
            </View>
          </View>
          <Icon name="arrow-right" size={18} color="#444" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionBtn}
          onPress={() => {
            onClose(); // closes popup first
            setTimeout(() => {
              navigation.navigate("Sell"); // then navigates after slight delay
            }, 200); // slight delay gives modal time to animate out
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="money-bill-wave"
              size={18}
              color="#444"
              style={styles.icon}
            />
            <View>
              <Text style={styles.optionText}>Sell</Text>
              <Text style={{ fontWeight: 300, marginTop: 5 }}>
                Buy Crypto with cash
              </Text>
            </View>
          </View>
          <Icon name="arrow-right" size={18} color="#444" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionBtn}
          onPress={() => {
            onClose(); // closes popup first
            setTimeout(() => {
              navigation.navigate("Convert"); // then navigates after slight delay
            }, 200); // slight delay gives modal time to animate out
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="exchange-alt"
              size={18}
              color="#444"
              style={styles.icon}
            />
            <View>
              <Text style={styles.optionText}>Convert</Text>
              <Text style={{ fontWeight: 300, marginTop: 5 }}>
                Buy Crypto with cash
              </Text>
            </View>
          </View>
          <Icon name="arrow-right" size={18} color="#444" />
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
    backgroundColor: "#CFCFCF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    borderColor: "#fff",
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
    // paddingBottom : 25,
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
