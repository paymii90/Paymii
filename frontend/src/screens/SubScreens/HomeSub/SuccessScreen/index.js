import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import VerifyEmail from '../../../../../assets/VerifyEmail'

const SuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
const { coinName } = route.params || {};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <VerifyEmail style = {styles.image}/>

        <Text style={styles.title}>All done</Text>
        <Text style={styles.subtitle}>
          Congratulations! You have Successfully purchased {coinName} 
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
        navigation.navigate("Main", {
        screen: "Portfolio",
  })
}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SuccessScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    padding: 20,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#555",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#052644",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center'
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

