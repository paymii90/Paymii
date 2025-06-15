import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import Searchbar from "../../../Components/Searchbar";
import { BottomTabBarHeightCallbackContext } from "@react-navigation/bottom-tabs";
import Button from "../../../Components/Button";
//importing porfolio from mock coins
import { portfolio } from "../../../../assets/configs/mockCoinCategories";
import { totalValue } from "../../../../assets/configs/mockCoinCategories";
import FooterButtons from "../../../Components/FooterButtons";

const PortfolioScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Crypto");

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.header}>My Assets</Text>
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => {
              setActiveTab("Crypto");
            }}
            activeOpacity={0.1}
          >
            <Text
              style={[
                styles.tabHeader,
                activeTab === "Crypto" && styles.activeTabHeader,
              ]}
            >
              Crypto
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActiveTab("Cash");
            }}
            activeOpacity={0.1}
          >
            <Text
              style={[
                styles.tabHeader,
                activeTab === "Cash" && styles.activeTabHeader,
              ]}
            >
              Cash
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.balanceText}>
          <Text style={styles.balanceText}>GHS {totalValue}</Text>
        </View>
        {activeTab === "Crypto" ? (
          <View>
            <View style={styles.title}>
              <Text style={styles.titleHeader}>Coin</Text>
              <Text style={styles.titleHeader}>Price</Text>
              <Text style={styles.titleHeader}>Quantity</Text>
            </View>
            <FlatList
              keyExtractor={(item) => item.name}
              data={portfolio}
              renderItem={({ item }) => (
                <View style={styles.coinContainer}>
                  <View style={styles.coin}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.coinImage}
                    />
                    <View>
                      <Text style={styles.coinName}>{item.name}</Text>
                      <Text style={styles.coinSymbol}>{item.symbol}</Text>
                    </View>
                  </View>
                  <Text style={styles.price}>{item.price}</Text>
                  <Text style={styles.amount}>{item.amount}</Text>
                </View>
              )}
            />
            <Button
              label="Explore All Crypto"
              backgroundColor="#052644"
              color="white"
              style={{ marginTop: 30 }}
              action={() => navigation.navigate("Explore")}
            />
          </View>
        ) : (
          <Text>Not yet</Text>
        )}
        <FooterButtons />
      </View>
    </View>
  );
};

export default PortfolioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  subContainer: {
    paddingTop: "25%",
    padding: "5%",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
  },
  tabs: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
    // height: 100,
    // paddingBottom: 10,
    // borderBottomWidth: 1,
  },
  tabHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    height: 30,
    zIndex: 1,
    marginBottom: 20,
  },
  activeTabHeader: {
    borderBottomWidth: 2,
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "bold",
    display: "block",
    marginTop: 20,
    marginBottom: 10,
  },
  coinContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  coin: {
    flexDirection: "row",
  },
  coinImage: { width: 40, height: 40, marginRight: 12 },
  coinName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  coinSymbol: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#CFAFAF",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginStart: "20%",
  },
  titleHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
