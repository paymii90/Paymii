// TransferPopup.js //
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
import FontAwesome from "@expo/vector-icons/FontAwesome";

const TransferPopup = ({ isVisible, onClose }) => {
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
              navigation.navigate("CoinStack", {
                screen: "Send",
              }); // then navigates after slight delay
            }, 200); // slight delay gives modal time to animate out
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="arrow-up" size={18} color="#444" style={styles.icon} />
            <View>
              <Text style={styles.optionText}>Send</Text>
              <Text style={{ fontWeight: 300, marginTop: 5 }}>
                Send crypto to another wallet
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
              navigation.navigate("CoinStack", {
                screen: "Receive",
              }); // then navigates after slight delay
            }, 200); // slight delay gives modal time to animate out
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="arrow-down"
              size={18}
              color="#444"
              style={styles.icon}
            />
            <View>
              <Text style={styles.optionText}>Receive</Text>
              <Text style={{ fontWeight: 300, marginTop: 5 }}>
                Receive crypto from another wallet
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
              navigation.navigate("CoinStack", {
                screen: "Deposit",
              }); // then navigates after slight delay
            }, 200); // slight delay gives modal time to animate out
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="home" size={18} color="#444" style={styles.icon} />
            <View>
              <Text style={styles.optionText}>Deposit Cash</Text>
              <Text style={{ fontWeight: 300, marginTop: 5 }}>
                Transfer funds from your account
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
              navigation.navigate("CoinStack", {
                screen: "Withdraw",
              }); // then navigates after slight delay
            }, 200); // slight delay gives modal time to animate out
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome
              name="credit-card-alt"
              size={18}
              color="#444"
              style={styles.icon}
            />
            <View>
              <Text style={styles.optionText}>Withdraw Cash</Text>
              <Text style={{ fontWeight: 300, marginTop: 5 }}>
                Transfer funds to your account
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

  action: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },

  icon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default TransferPopup;
