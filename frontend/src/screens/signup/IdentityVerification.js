import { View, StyleSheet, Text, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Identityverification from "../../../assets/identityverification.svg";
import Lock_fill from "../../../assets/Lock_fill.svg";
import Button from "../../Components/Button";

const IdentityVerification = ({ navigation }) => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  console.log(screenHeight);
  
  return (
    <SafeAreaProvider style={[styles.container, { height: screenHeight }]}>
      <SafeAreaView style={{ alignItems: "center" }}>
        <Identityverification style={styles.image} />
        <View>
          <Text style={styles.header}>Verify your identity</Text>
          <Text style={styles.text}>
            To help protect you from fraud and identity theft, and to comply
            with federal regulations, we need some info including:
          </Text>
          <View style={styles.unorderedList}>
            <Text style={styles.text}>• Legal name, home address, and DOB</Text>
            <Text style={styles.text}>• How you’ll use Coinbase</Text>
          </View>
        </View>
        <View style={styles.footercontainer}>
          <View style={styles.footer}>
            <Lock_fill />
            <Text style={styles.footerText}>
              This info is used only for identity verification and is
              transmitted securely using 128-bit encryption
            </Text>
          </View>
          <Button
            label="Continue"
            backgroundColor="#052644"
            color="white"
            action={() => navigation.navigate("Information")}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    // flex: 1,
    padding: "5%",
  },
  image: {
    // marginTop: "20%",
  },
  header: {
    marginTop: "20%",
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#111111",
  },
  unorderedList: {
    marginTop: "1%",
    alignSelf: "center",
  },
  footercontainer: {
    marginTop: "0%",
    width: "100%",
    // flex: 1,
    justifyContent: "flex-end",
    gap: "10%",
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

export default IdentityVerification;
