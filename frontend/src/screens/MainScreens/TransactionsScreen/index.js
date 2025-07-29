import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
import axios from "axios";
import { IpContext } from "../../../context/IpContext";
import { getAuth } from "firebase/auth";
import Button from "../../../Components/Button";
import LottieView from "lottie-react-native";
import Toast from "react-native-toast-message";

const TABS = [
  { name: "All", icon: "reorder-four" },
  { name: "Buy", icon: "arrow-down-circle" },
  { name: "Sell", icon: "arrow-up-circle" },
  { name: "Send", icon: "send" },
];

const SORT_OPTIONS = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
  { label: "Amount ↑", value: "amountHigh" },
  { label: "Amount ↓", value: "amountLow" },
];

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TransactionsScreen = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [filteredTx, setFilteredTx] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sortOption, setSortOption] = useState("latest");
  const { ipAddress } = useContext(IpContext);

  const groupByMonth = (data) => {
    const groups = {};
    data.forEach((tx) => {
      const month = moment(tx.timestamp).format("MMMM YYYY");
      if (!groups[month]) groups[month] = [];
      groups[month].push(tx);
    });
    return groups;
  };

  const fetchTransactions = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return console.warn("No user is currently signed in.");
      const idToken = await user.getIdToken();

      const response = await axios.get(
        `${ipAddress}/api/transactions/history`,
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );

      const sorted = response.data.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      setTransactions(sorted);
      applyFiltersAndSort("All", sortOption, sorted);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Transaction Fetch Failed",
        text2: error.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const applyFiltersAndSort = (tab, sort, base = transactions) => {
    let txs =
      tab === "All"
        ? [...base]
        : base.filter((tx) => tx.type.toLowerCase() === tab.toLowerCase());

    switch (sort) {
      case "oldest":
        txs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      case "amountHigh":
        txs.sort((a, b) => b.amount - a.amount);
        break;
      case "amountLow":
        txs.sort((a, b) => a.amount - b.amount);
        break;
      default:
        txs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveTab(tab);
    setSortOption(sort);
    setFilteredTx(txs);
    setGrouped(groupByMonth(txs));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

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
            tx.type === "SELL" || tx.type === "SEND"
              ? styles.negative
              : styles.positive,
          ]}
        >
          {tx.type === "SELL" || tx.type === "SEND" ? "-" : "+"}GH₵{" "}
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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.screenTitle}>Transactions</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 10 }}
        contentContainerStyle={{ flexDirection: "row", flexGrow: 1 }}
      >
        {TABS.map(({ name, icon }) => (
          <TouchableOpacity
            key={name}
            onPress={() => applyFiltersAndSort(name, sortOption)}
            style={[styles.tab, activeTab === name && styles.activeTab]}
          >
            <Ionicons
              name={icon}
              size={14}
              color={activeTab === name ? "#fff" : "#444"}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === name && styles.activeTabText,
              ]}
            >
              {name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 10 }}
        contentContainerStyle={{ flexDirection: "row", flexGrow: 1 }}
      >
        {SORT_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => applyFiltersAndSort(activeTab, option.value)}
            style={[
              styles.sortBtn,
              sortOption === option.value && styles.activeSortBtn,
            ]}
          >
            <Text
              style={[
                styles.sortText,
                sortOption === option.value && styles.activeSortText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredTx.length === 0 ? (
        <View style={styles.noTxContainer}>
          <Ionicons name="file-tray-outline" size={48} color="#aaa" />
          <Text style={styles.noTxText}>No {activeTab} transactions</Text>
          <Text style={styles.noTxSub}>
            Perform a {activeTab.toLowerCase()} transaction to see it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={Object.keys(grouped)}
          keyExtractor={(item) => item}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchTransactions} />
          }
          renderItem={({ item }) => (
            <View>
              <Text style={styles.monthHeader}>{item}</Text>
              {grouped[item].map((tx) => (
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
    marginBottom: 10,
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
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#eee",
    marginRight: 10,
    minWidth: 90,
    height: 42,
    flexShrink: 0,
    overflow: "hidden",
  },
  activeTab: {
    backgroundColor: "#052644",
  },
  tabText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },
  sortBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "#f2f2f2",
    marginRight: 10,
    height: 42,
    justifyContent: "center",
    flexShrink: 0,
    overflow: "hidden",
  },
  activeSortBtn: {
    backgroundColor: "#052644",
  },
  sortText: {
    fontSize: 13,
    color: "#444",
    textAlign: "center",
  },
  activeSortText: {
    color: "#fff",
    fontWeight: "600",
  },
});
