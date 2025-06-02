import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import Button from "../../Components/Button";
import CountryPicker from "react-native-country-picker-modal";
import Lock_fill from "../../../assets/Lock_fill.svg";

const Citizenship = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState("GH");
  const [countryName, setCountryName] = useState("Ghana");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textcontainer}>
        <Text style={styles.header}>What's your citizenship</Text>
        <Text style={styles.text}>
          If you are a citizen of more than one country, please pick one.
        </Text>
      </View>
      <View style={styles.Countrycontainer}>
        <CountryPicker
          withFilter
          withFlag
          withCountryNameButton
          withAlphaFilter
          countryCode={countryCode}
          onSelect={(country) => {
            setCountryName(country.name.common);
            setCountryCode(country.cca2);
          }}
        />
      </View>

      <View style={styles.footercontainer}>
        <View style={styles.footer}>
          <Lock_fill />
          <Text style={styles.footerText}>
            This info is used only for identity verification and is transmitted
            securely using 128-bit encryption
          </Text>
        </View>
        <Button
          label="Continue"
          backgroundColor="#052644"
          color="white"
          action={() => navigation.navigate("Verification")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  textcontainer: {
    alignItems: "flex-start",
    width: "90%",
    marginBottom: "5%",
  },
  header: {
    marginTop: "20%",
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
  Countrycontainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#052644",
    width: "90%",
  },
  footercontainer: {
    width: "90%",
    flex: 1,
    justifyContent: "flex-end",
    gap: "5%",
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111111",
  },
});

export default Citizenship;
