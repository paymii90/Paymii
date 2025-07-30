import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IpContext } from "../../../context/IpContext";
import { getAuth } from "firebase/auth";
import Button from "../../../Components/Button";
import LottieView from "lottie-react-native";
import Toast from "react-native-toast-message";

const TransactionsScreen = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const { ipAddress } = useContext(IpContext);

  const filterTypes = ["ALL", "BUY", "SELL", "SEND", "RECEIVE"];

  const groupByMonth = (data) => {
    const groups = {};
    data.forEach((tx) => {
      const month = moment(tx.timestamp).format("MMMM YYYY");
      if (!groups[month]) groups[month] = [];
      groups[month].push(tx);
    });
    return groups;
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.warn("No user is currently signed in.");
          return;
        }

        const idToken = await user.getIdToken();

        const response = await axios.get(
          `${ipAddress}/api/transactions/history`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        const data = response.data.reverse(); // ⬅️ Reverse order here
        setTransactions(data);
        setGrouped(groupByMonth(data));
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Transaction Fetch Failed",
          text2: error.message || "Something went wrong. Check your internet.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filtered = selectedFilter === "ALL"
    ? transactions
    : transactions.filter((tx) => tx.type === selectedFilter);

  const groupedFiltered = groupByMonth(filtered);

  const renderTransaction = (tx) => (
    <View style={styles.txRow}>
      <Image source={{ uri: tx.coinImage }} style={styles.coinIcon} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.txType}>
          {tx.type} {tx.coinSymbol.toUpperCase()}
        </Text>
        <Text style={styles.txDate}>
          {moment(tx.timestamp).format("MMM DD, YYYY")}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={[
            styles.txAmount,
            tx.type === "BUY" || tx.type === "SEND"
              ? styles.negative
              : styles.positive,
          ]}
        >
          {tx.type === "BUY" || tx.type === "SEND" ? "-" : "+"}$
          {parseFloat(tx.amount).toFixed(2)}
        </Text>
        <Text style={styles.txCoinAmount}>
          {parseFloat(tx.coinQuantity).toFixed(6)} {tx.coinSymbol.toUpperCase()}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={require("../../../../assets/animations/loading.json")}
          autoPlay
          loop
          style={{ width: 150, height: 150 }}
        />
      </View>
    );
  }

  if (transactions.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: "space-around" }]}>
        <View style={styles.noTxContainer}>
          <Ionicons name="wallet-outline" size={64} color="#ccc" />
          <Text style={styles.noTxText}>You have no transactions</Text>
          <Text style={styles.noTxSub}>
            Buy crypto and your transactions will appear here.
          </Text>
        </View>
        <Button
          label="Buy Crypto"
          action={() => navigation.navigate("Explore")}
          backgroundColor="#052644"
          style={{ alignSelf: "center", borderRadius: 30, marginBottom: 20 }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.screenTitle}>Transactions</Text>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        {filterTypes.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setSelectedFilter(type)}
            style={[
              styles.tab,
              selectedFilter === type && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                selectedFilter === type && styles.activeTabText,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

     {Object.keys(groupedFiltered).length === 0 ? (
  <View style={styles.noTxContainer}>
    <Ionicons name="alert-circle-outline" size={48} color="#ccc" />
    <Text style={styles.noTxText}>No {selectedFilter.toLowerCase()} transactions</Text>
    <Text style={styles.noTxSub}>
      Try selecting a different filter or make a transaction to see it here.
    </Text>
  </View>
) : (
  <FlatList
    data={Object.keys(groupedFiltered)}
    keyExtractor={(item) => item}
    renderItem={({ item }) => (
      <View>
        <Text style={styles.monthHeader}>{item}</Text>
        {groupedFiltered[item].map((tx) => (
          <View key={tx.id}>{renderTransaction(tx)}</View>
        ))}
      </View>
    )}
    contentContainerStyle={{ paddingBottom: 80 }}
  />
)}

    </View>
  );
};


export default TransactionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  backBtn: {
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  txRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  coinIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  txType: {
    fontWeight: "600",
    fontSize: 14,
  },
  txDate: {
    color: "#888",
    fontSize: 12,
  },
  txAmount: {
    fontSize: 14,
    fontWeight: "bold",
  },
  positive: {
    color: "green",
  },
  negative: {
    color: "red",
  },
  txCoinAmount: {
    fontSize: 12,
    color: "#888",
  },
  monthHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 6,
  },
  noTxContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noTxText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  noTxSub: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    marginTop: 8,
  },
  filterTabs: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 12,
  backgroundColor: "#f2f2f2",
  padding: 6,
  borderRadius: 10,
},
tab: {
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 20,
},
activeTab: {
  backgroundColor: "#052644",
},
tabText: {
  color: "#444",
  fontSize: 13,
  fontWeight: "500",
},
activeTabText: {
  color: "#fff",
},

});