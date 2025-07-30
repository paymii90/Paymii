import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Button from "../../../Components/Button";
import SearchList from "../../../Components/SearchList";
import { AuthContext } from "../../../context/AuthContext";
import { getAuth } from "firebase/auth";
import CloseAccount from "./CloseAccount";

const SettingsScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email || "No email set");
      setUsername(user.displayName || "No username set");
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          {/* <Text style={styles.email}>{email}</Text> */}
          <Text style={styles.username}>{username}</Text>
        </View>
        <View style={styles.PaymentSection}>
          <Text>Payment Methods</Text>
          <Button
            backgroundColor="#052644"
            color="white"
            label="Add a payment method"
            action={() => navigation.navigate("AddPayment")}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Account</Text>
          <SearchList
            type="expand"
            label="Limits"
            action={() => navigation.navigate("Limits")}
          />
          <SearchList
            type="expand"
            label="Native Currency"
            action={() => navigation.navigate("Cur")}
          />
          {/* <SearchList
            type="expand"
            label="Privacy"
            //action={() => navigation.navigate("Cur")}
          /> */}
          {/* <SearchList type="expand" label="Phone Numbers" />
          <SearchList type="expand" label="Notification Settings" /> */}
          <SearchList
            type="expand"
            label="Close Account"
            action={() => setIsVisible(true)}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Display</Text>
          <SearchList type="Checkbox" label="Hide balances" opacity={1} />
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Security</Text>
          <SearchList type="Checkbox" label="Require Pin" opacity={1} />
          <SearchList
            type="expand"
            label="Change Pin"
            action={() => navigation.navigate("Pin")}
          />
          {/* <SearchList type="expand" label="Lock my account" /> */}
        </View>

        <Button
          color="red"
          backgroundColor="#CFCFCF"
          label="Sign Out"
          style={{ marginTop: 50 }}
          action={logout}
        />
      </ScrollView>
      <CloseAccount Visible={isVisible} onClose={() => setIsVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexGrow: 1,
    padding: "5%",
    paddingTop: "20%",
    paddingBottom: "5%",
  },
  username: {
    fontSize: 30,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111111",
    opacity: 0.8,
  },
  PaymentSection: {
    gap: 10,
    marginTop: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
  section: {
    marginTop: 10,
    marginBottom: 5,
  },
});

export default SettingsScreen;
