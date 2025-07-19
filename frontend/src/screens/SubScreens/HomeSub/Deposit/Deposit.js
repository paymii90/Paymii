// import React, { useCallback, useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Text,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// //import { FlatList } from "react-native-web";
// //import StatItem from "../../CoinDetails/statItem";
// import Visa from "../../../../../assets/Visa";
// import Telecel from "../../../../../assets/Telecel";
// import Mtn from "../../../../../assets/Mtn";
// import AirtelTigo from "../../../../../assets/AirtelTigo";
// import DummyPayment from "../../../../../assets/data/DummyPayment";
// import Button from "../../../../Components/Button";

// const MethodSelection = ({ navigation }) => {
//   const [id, setId] = useState(0);
//   //   const onRefresh = useCallback(() => {
//   //     refreshList();
//   //   }, [refreshList]);

//   //   if (loading) {
//   //     return (
//   //       <View style={styles.container1}>
//   //         <Text>Loading...</Text>
//   //       </View>
//   //     );
//   //   }
//   //   const renderItem = {useCallback(({item}) => {
//   //     console.log('rendering item');
//   //     item)
//   //   }}

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Payment Options</Text>
//       <Text style={styles.text}>
//         Select your preferred payment method in the list below
//       </Text>
//       <FlatList
//         data={DummyPayment}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[styles.cardContainer, id === item.id && styles.active]}
//             activeOpacity={0.1}
//             onPress={() => setId(item.id)}
//           >
//             <View style={styles.head}>
//               <Text style={styles.cardType}>{item.type}</Text>
//               <Text style={styles.cardNumber}>XXXXX{item.number.slice(5)}</Text>
//             </View>
//             {console.log("rendering data")}
//             {(item.logo === "Card" && <Visa />) ||
//               (item.logo === "Mtn" && <Mtn />) ||
//               (item.logo === "AirtelTigo" && <AirtelTigo />) ||
//               (item.logo === "Telecel" && <Telecel />)}
//           </TouchableOpacity>
//         )}
//       />
//       <View style={styles.buttons}>
//         <Button
//           label="Add another account"
//           action={() => navigation.navigate("AddPayment")}
//         />
//         <Button
//           label="Continue Transactions"
//           action={() =>
//             navigation.navigate("HomeStack", {
//               screen: "Deposit",
//             })
//           }
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingTop: "20%",
//     padding: "5%",
//   },
//   head: {
//     flexDirection: "row",
//     gap: 15,
//     alignItems: "center",
//   },
//   cardContainer: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#CFCFCF",
//     padding: 10,
//     marginVertical: 10,
//     //shadows
//     shadowColor: "black",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   cardType: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   cardNumber: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   header: {
//     fontSize: 26,
//     fontWeight: "bold",
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   active: {
//     borderColor: "#052644",
//   },
//   buttons: {
//     gap: 10,
//     justifyContent: "flex-start",
//   },
// });

// export default MethodSelection;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ImageBackground,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import SafeAreaWrapper from "../../../../Components/SafeAreaWrapper";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomNumpad from "../../../../Components/customNumpad";
const { width } = Dimensions.get("window");

const Deposit = () => {
  const navigation = useNavigation();

  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(10000); // GH₵10,00000 dummy balance
  const [showModal, setShowModal] = useState(false);

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.label}>Enter Amount in GHC</Text>
        <Text style={styles.amount}>GH₵ {amount || "0"}</Text>
        <Text style={styles.balance}>Current Balance: ₵10,000</Text>

        <View style={styles.percentRow}>
          {["0%", "10%", "25%", "50%", "75%", "100%"].map((p) => {
            const value = parseInt(p.replace("%", ""));

            return (
              <TouchableOpacity
                key={p}
                style={styles.percentBtn}
                onPress={() => {
                  setAmount(((value / 100) * balance).toFixed(2));
                  console.log(value);
                }}
              >
                <Text style={styles.percentText}>{p}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <CustomNumpad setAmount={setAmount} />

          <TouchableOpacity
            style={styles.Btn}
            onPress={() => {
              if (amount <= 0) {
                alert("Enter Amount");
              } else {
                navigation.navigate("DepositConfirmation", { amount });
              }
            }}
          >
            <Text style={styles.depositText}>DEPOSIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default Deposit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  headerImage: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    objectFit: "cover",
    objectPosition: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    marginRight: 10,
  },
  coinName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
  },
  sellButton: {
    fontSize: 12,
    color: "#f66",
    fontWeight: "bold",
    padding: "3%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  label: {
    marginTop: "5%",
    textAlign: "center",
    fontSize: 14,
    color: "#888",
  },
  amount: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  range: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 6,
  },
  balance: {
    textAlign: "center",
    marginVertical: 15,
    fontWeight: "600",
  },
  percentRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  percentBtn: {
    width: width / 6 - 10,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    marginVertical: 6,
  },
  percentText: {
    fontWeight: "500",
    color: "#333",
  },

  Btn: {
    backgroundColor: "#052644",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: "5%",
  },
  depositText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
