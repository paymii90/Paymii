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
        backgroundColor="#011D5C"
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
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    position: "absolute",
    // top: 100,
    bottom: -170,
  },
  button: {
    borderRadius: 60,
    width: "40%",
    // transform: [{ translateX: 30 }],
  },
});

export default FooterButtons;
