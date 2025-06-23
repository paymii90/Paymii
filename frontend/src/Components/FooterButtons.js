import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

//importing needed components
import Button from "./Button";
import TransferPopup from "../screens/MainScreens/Home/TransferPopup";
import BuyCryptoPopup from "../../assets/configs/BuyCryptoPopup";
// import Plus from "../../assets/plus-1.png";

const FooterButtons = () => {
  const [buySellPopupVisible, setBuySellPopupVisible] = useState(false);
  const [transferPopupVisible, setTransferPopupVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Button
        label="Buy & Sell"
        backgroundColor="#052644"
        color="white"
        style={styles.button}
        labelStyle={{ fontWeight: 600 }}
        action={() => setBuySellPopupVisible(true)}
      />

      {/* Popup to show  */}

      <BuyCryptoPopup
        isVisible={buySellPopupVisible}
        onClose={() => setBuySellPopupVisible(false)}
      />
      <Button
        label="Transfer"
        backgroundColor="#1e3c8a"
        color="white"
        style={styles.button}
        labelStyle={{ fontWeight: 600 }}
        action={() => setTransferPopupVisible(true)}
      />
      {/* Popup to show  */}

      <TransferPopup
        isVisible={transferPopupVisible}
        onClose={() => setTransferPopupVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    flex: 1,
    // paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 5,
  },
});

export default FooterButtons;
