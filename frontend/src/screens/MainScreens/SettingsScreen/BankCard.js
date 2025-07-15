import React from "react";
import { Text, View, StyleSheet, Pressable, Keyboard } from "react-native";
import Input from "../../../Components/Input";
import Button from "../../../Components/Button";

const BankCard = ({ navigation }) => {
  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <Text style={styles.header}>Link your ATM Card</Text>
      <Input title="Name" placeholder="SpongeBob SquarePants" />
      <Input title="Card Number" keyboard="numeric" />
      <View style={styles.innerInput}>
        <Input title="CVV" visible={false} width="170" keyboard="numeric" />
        <Input title="Expiry date" width="170" keyboard="numeric" />
      </View>
      <View style={styles.footer}>
        <Text>
          By adding a new card, you agree to the credit/debit card terms.
        </Text>
        <Button label="Add Card" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: "30%",
    padding: "5%",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
  },
  innerInput: {
    flexDirection: "row",
    //flex: 1,
    gap: 10,
  },
  footer: {
    height: "40%",
    justifyContent: "flex-end",
  },
});

export default BankCard;
