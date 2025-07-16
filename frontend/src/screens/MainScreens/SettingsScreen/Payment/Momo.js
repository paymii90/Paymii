import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  Keyboard,
  ScrollView,
} from "react-native";
import Input from "../../../../Components/Input";
import Mtn from "../../../../../assets/Mtn";
import AirtelTigo from "../../../../../assets/AirtelTigo";
import Telecel from "../../../../../assets/Telecel";
import Button from "../../../../Components/Button";
import { TouchableWithoutFeedback } from "react-native-web";

const Momo = ({ navigation }) => {
  const [number, setNumber] = useState("");
  const [network, setNetwork] = useState("");
  return (
    <Pressable style={styles.mainContainer} onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Link your MoMo accont</Text>
        <Input
          title="Phone Number"
          keyboard="numeric"
          placeholder="+233 234567891"
          action={(number) => setNumber(number)}
          value={number}
        />
        <Text style={styles.label}>Select Network</Text>
        <View style={styles.networks}>
          <TouchableOpacity
            style={[
              styles.networkcontainer,
              network === "Mtn" && styles.active,
            ]}
            onPress={() => setNetwork("Mtn")}
          >
            <Mtn
              //viewbox="0 0 500 500"
              width="100%"
              height="150"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.networkcontainer,
              network === "Telecel" && styles.active,
            ]}
            onPress={() => setNetwork("Telecel")}
          >
            <Telecel width="100%" height="150" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.networkcontainer, network === "AT" && styles.active]}
            onPress={() => setNetwork("AT")}
          >
            <AirtelTigo width="100%" height="150" />
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text>
            By adding your Mobile Money account, you agree to the Mobile Money
            account terms.
          </Text>
          <Button
            backgroundColor="#052644"
            color="white"
            label="Add MoMo account"
            action={() => navigation.navigate("PhoneAuth")}
          />
        </View>
      </ScrollView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: "20%",
    //alignItems: "center",
    //paddingVertical: 20,
    //padding: "5%",//
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: "20%",
    //alignItems: "center",
    //paddingVertical: 20,
    padding: "5%",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: "10%",
    marginBottom: 10,
  },
  networks: {
    flexDirection: "row",
    gap: 4,
    //flex: 1,
  },
  networklogo: {
    width: "100%",
    height: 150,
  },
  networkcontainer: {
    width: "30%",
    flex: 1,
  },
  active: {
    borderWidth: 1,
    borderColor: "#052644",
  },
  footer: {
    gap: 15,
    justifyContent: "flex-end",
    height: "45%",
    width: "100%",
  },
});

export default Momo;
