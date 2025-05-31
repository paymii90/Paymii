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
<<<<<<< HEAD
          <View style={styles.action}>
            <Icon
              name="shopping-cart"
              size={18}
              color="#444"
              style={styles.icon}
            />
             <View>
              <Text style={styles.optionText}>Buy</Text>
              <Text style={styles.optionSubText}>Buy Crypto with cash</Text>
            </View>
          </View>
=======
          <Icon
            name="shopping-cart"
            size={18}
            color="#444"
            style={styles.icon}
          />
          <Text style={styles.optionText}>Buy</Text>
>>>>>>> origin/main
          <Icon
            name="arrow-right"
            size={18}
            color="#444"
            style={styles.icon2}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBtn}>
<<<<<<< HEAD
          <View style={styles.action}>
            <Icon
              name="money-bill-wave"
              size={18}
              color="#444"
              style={styles.icon}
            />
             <View>
              <Text style={styles.optionText}>Sell</Text>
              <Text style={styles.optionSubText}>Sell crypto for cash</Text>
            </View>
          </View>
          <Icon
            name="arrow-right"
            size={18}
            color="#444"
            style={styles.icon2}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBtn}>
          <View style={styles.action}>
            <Icon
              name="exchange-alt"
              size={18}
              color="#444"
              style={styles.icon}
            />
            <View>
              <Text style={styles.optionText}>Convert</Text>
              <Text style={styles.optionSubText}>Convert one crypto to another</Text>
            </View>
          </View>
          <Icon
            name="arrow-right"
            size={18}
            color="#444"
            style={styles.icon2}
          />
=======
          <Icon
            name="money-bill-wave"
            size={18}
            color="#444"
            style={styles.icon}
          />
          <Text style={styles.optionText}>Sell</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBtn}>
          <Icon
            name="exchange-alt"
            size={18}
            color="#444"
            style={styles.icon}
          />
          <Text style={styles.optionText}>Convert</Text>
>>>>>>> origin/main
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  optionBtn: {
    flexDirection: "row",
<<<<<<< HEAD
    justifyContent: "space-between",
=======
>>>>>>> origin/main
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
    // paddingBottom : 25,
  },
<<<<<<< HEAD
  action: {
    flexDirection: "row",
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  icon2: {},
=======
  icon: {
    marginRight: 12,
  },
  icon2: {
    
  },
>>>>>>> origin/main
  optionText: {
    fontSize: 16,
    color: "#333",
  },
<<<<<<< HEAD
  optionSubText:{
    fontWeight : '300',
    marginTop: 7,
  }
=======
>>>>>>> origin/main
});

export default BuyCryptoPopup;
