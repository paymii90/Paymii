
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Searchbar from "../../../Components/Searchbar";
//import { BottomTabBarHeightCallbackContext } from "@react-navigation/bottom-tabs";
import Button from "../../../Components/Button";
//importing porfolio from mock coins
//import { portfolio } from "../../../../assets/configs/mockCoinCategories";
//import { totalValue } from "../../../../assets/configs/mockCoinCategories";
import FooterButtons from "../../../Components/FooterButtons";
import BottomActionButtons from "../ExploreScreen/BottomButtons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePortfolio } from "../../../context/portfolioContext";

const PortfolioScreen = ({ navigation }) => {
//useEffect(()=>{})  
 const [activeTab, setActiveTab] = useState("Crypto");
  const { portfolio, loading, refreshPortfolio } = usePortfolio();

  const onRefresh = useCallback(() => {
    refreshPortfolio();
  }, [refreshPortfolio]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const totalValue = portfolio.reduce((sum, item) => {
    const value = parseFloat(item.totalValue || 0);
    return sum + value;
  }, 0);

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
          <Text style={styles.balanceText}>
            GHS
            {portfolio.reduce((sum, item) => sum + item.totalValue, 0).toFixed(2)}
          </Text>
        </View>
        {activeTab === "Crypto" ? (
          <View>
            <FlatList
              keyExtractor={(item) => item.name}
              data={portfolio}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={onRefresh} />
              }
              renderItem={({ item }) => (
                
                <View style={styles.coinContainer}>
                  <View style={styles.coin}>
                    <Image
                      source={{ uri: item.coin_image }}
                      style={styles.coinImage}
                    />
                    <View>
                      <Text style={styles.coinName}>{item.coin_id}</Text>
                      <Text style={styles.coinSymbol}>
                        {item.coin_symbol.toUpperCase()}
                      </Text>
                    </View>
                    
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.1}
                    style={styles.buyButton}
                    onPress={() => {
                      
                      navigation.navigate("CoinStack", {
                        screen: "CoinDetails",
                        params: { coin: item },
                      });
                    }}
                  >
                    <Text style={styles.buyButtonText}>Buy</Text>
                  </TouchableOpacity>
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
          <View>
            <FlatList
              keyExtractor={(item) => item.id}
              data={portfolio}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={onRefresh} />
              }
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.1}
                    style={styles.coinContainer}
                    onPress={() => {
                      navigation.navigate("CoinStack", {
                        screen: "CoinDetails",
                        params: { coin: item },
                      });
                      console.log("navigating to coin screen");
                    }}
                  >
                    <View style={styles.coin}>
                      <Image
                        source={{ uri: item.coin_image }}
                        style={styles.coinImage}
                      />
                      <View style={styles.coinName}>
                        <Text style={styles.Name}>{item.coin_id}</Text>
                        <Text style={styles.coinSymbol}>
                          {item.coin_symbol.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.value}>{item.amount}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
            <Button
              color="white"
              backgroundColor="#052644"
              label="Deposit Cash"
              action={() =>
                navigation.navigate("CoinStack", {
                  screen: "Buy",
                })
              }
            />
          </View>
        )}
      </View>
      <FooterButtons style={styles.BottomActionButtons} />;
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
    // fontSize: 16,
    // fontWeight: "bold",
  },
  coinSymbol: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#CFAFAF",
  },

  buyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
  Name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
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
  buyButton: {
    backgroundColor: "#111111",
    opacity: "80%",
    padding: 5,
    borderRadius: 5,
  },
});
