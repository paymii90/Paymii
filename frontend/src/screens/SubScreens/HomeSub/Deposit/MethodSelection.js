import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
//import { FlatList } from "react-native-web";
//import StatItem from "../../CoinDetails/statItem";
import Visa from "../../../../../assets/Visa";
import Telecel from "../../../../../assets/Telecel";
import Mtn from "../../../../../assets/Mtn";
import AirtelTigo from "../../../../../assets/AirtelTigo";
import DummyPayment from "../../../../../assets/data/DummyPayment";
import Button from "../../../../Components/Button";

const MethodSelection = ({ navigation }) => {
  const [id, setId] = useState(0);
  //   const onRefresh = useCallback(() => {
  //     refreshList();
  //   }, [refreshList]);

  //   if (loading) {
  //     return (
  //       <View style={styles.container1}>
  //         <Text>Loading...</Text>
  //       </View>
  //     );
  //   }
  //   const renderItem = {useCallback(({item}) => {
  //     console.log('rendering item');
  //     item)
  //   }}

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Options</Text>
      <Text style={styles.text}>
        Select your preferred payment method in the list below
      </Text>
      <FlatList
        data={DummyPayment}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.cardContainer, id === item.id && styles.active]}
            activeOpacity={0.1}
            onPress={() => setId(item.id)}
          >
            <View style={styles.head}>
              <Text style={styles.cardType}>{item.type}</Text>
              <Text style={styles.cardNumber}>XXXXX{item.number.slice(5)}</Text>
            </View>
            {console.log("rendering data")}
            {(item.logo === "Card" && <Visa />) ||
              (item.logo === "Mtn" && <Mtn />) ||
              (item.logo === "AirtelTigo" && <AirtelTigo />) ||
              (item.logo === "Telecel" && <Telecel />)}
          </TouchableOpacity>
        )}
      />
      <View style={styles.buttons}>
        <Button
          label="Add another account"
          action={() => navigation.navigate("AddPayment")}
        />
        <Button
          label="Continue Transactions"
          action={() => navigation.navigate("Deposit")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: "20%",
    padding: "5%",
  },
  head: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CFCFCF",
    padding: 10,
    marginVertical: 10,
    //shadows
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardType: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  active: {
    borderColor: "#052644",
  },
  buttons: {
    gap: 10,
    justifyContent: "flex-start",
  },
});

export default MethodSelection;
