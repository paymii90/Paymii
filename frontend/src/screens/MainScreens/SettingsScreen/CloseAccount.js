import React from "react";
import { StyleSheet, Text, Platform, View } from "react-native";
import Button from "../../../Components/Button";
import ModalComponent from "react-native-modal";

const CloseAccount = ({ Visible, onClose }) => {
  return (
    <ModalComponent
      style={styles.modal}
      isVisible={Visible}
      onBackdropPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
    >
      <View style={styles.popupContainer}>
        <View style={styles.header}>
          <Text style={styles.heading}>Are you sure?</Text>
          <Text style={styles.warning}>
            Upon closing your account, it cannot be undone
          </Text>
        </View>
        <Text style={styles.text}>
          IF YOU HAVE A WEB3 WALLET, TRANSFER ALL OF YOUR ASSESTS TO AN EXTERNAL
          WALLET FIRST.
        </Text>
        <Text style={styles.text}>
          If you do not, you will permanently lose access to those assets We
          will not be able recover these assets after your account has been
          closed.
        </Text>
        <Text style={styles.text}>
          By continuing to close your account, you agree that Paymii is not
          responsible for any losses arising out of your failure to transfer
          your assets to an external wallet
        </Text>
        <Button
          backgroundColor="black"
          color="red"
          label="I agree"
          action={() => {
            onClose();
          }}
        />
      </View>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    width: "100%",
    alignSelf: "center",
  },
  popupContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
  },
  warning: {
    fontSize: 16,
    color: "red",
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
  header: {
    marginBottom: 10,
  },
});

export default CloseAccount;
