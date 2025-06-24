//import { useContext } from "react";
//import { AuthContext } from "../../../context/AuthContext";
// import { Button, View, ScrollView } from "react-native";

// const SettingsScreen = () => {
//   // const { logout } = useContext(AuthContext);
//   return (
//     <ScrollView>
//       <View>
//         <Text>useremail@gmail.com</Text>
//         <View>USERNAME</View>
//       </View>
//     </ScrollView>
//   );
// };

// export default SettingsScreen;

import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

const SettingsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.email}>useremail@gmail.com</Text>
        <Text style={styles.username}>USERNAME</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: "5%",
    paddingTop: "20%",
  },
  username: {
    fontSize: 30,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111111",
    opacity: 80,
  },
});

export default SettingsScreen;
