import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Button from "../../../Components/Button";
import FooterButtons from "../../../Components/FooterButtons";
import { usePortfolio } from "../../../context/portfolioContext";
import Searchbar from "../../../Components/Searchbar";
import { useCoins } from "../../../context/CoinContext";

const PortfolioScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Crypto");
  const { portfolio, loading, refreshPortfolio } = usePortfolio();
  const { getCoinById } = useCoins();

  const onRefresh = useCallback(() => {
    refreshPortfolio();
  }, [refreshPortfolio]);

  // Auto-refresh when screen loads
  useEffect(() => {
    refreshPortfolio();
  }, []);

  const totalValue = portfolio.reduce((sum, item) => {
    const value = parseFloat(item.totalValue || 0);
    return sum + value;
  }, 0);

  return (
    <View style={styles.main}>
      <Searchbar text="Portfolio" />
      <View style={styles.container}>
        <FlatList
          data={[{ id: "header" }]} // dummy data for key prop
          keyExtractor={(item) => item.id}
          renderItem={null}
          ListHeaderComponent={
            <View style={styles.subContainer}>
              <Text style={styles.header}>My Assets</Text>

              {/* Tabs */}
              <View style={styles.tabs}>
                <TouchableOpacity onPress={() => setActiveTab("Crypto")}>
                  <Text
                    style={[
                      styles.tabHeader,
                      activeTab === "Crypto" && styles.activeTabHeader,
                    ]}
                  >
                    Crypto
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab("Cash")}>
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

              {/* Balance */}
              <View style={styles.balanceText}>
                <Text style={styles.balanceText}>
                  GHS {totalValue.toFixed(2)}
                </Text>
              </View>

              {/* Assets */}
              {activeTab === "Crypto" ? (
                <View>
                  <FlatList
                    data={portfolio}
                    keyExtractor={(item) =>
                      item.id?.toString() || item.coin_id
                    }
                    refreshControl={
                      <RefreshControl
                        refreshing={loading}
                        onRefresh={onRefresh}
                      />
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
                          style={styles.buyButton}
                          onPress={() => {
                            const coin = getCoinById(item.coin_id);
                            // console.log("Buying coin:", coin);
                            
                            navigation.navigate("CoinStack", {
                              screen: "CoinDetails",
                              params: { coin },
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
                    data={portfolio}
                    keyExtractor={(item) =>
                      item.id?.toString() || item.coin_id
                    }
                    refreshControl={
                      <RefreshControl
                        refreshing={loading}
                        onRefresh={onRefresh}
                      />
                    }
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.coinContainer}
                        onPress={() =>
                          navigation.navigate("CoinStack", {
                            screen: "CoinDetails",
                            params: { coin: item },
                          })
                        }
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
                        <Text style={styles.value}>{item.amount}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  <Button
                    label="Deposit Cash"
                    backgroundColor="#052644"
                    color="white"
                    action={() =>
                      navigation.navigate("CoinStack", { screen: "Buy" })
                    }
                  />
                </View>
              )}
            </View>
          }
        />
      </View>
      <FooterButtons style={styles.BottomActionButtons} />
    </View>
  );
};

export default PortfolioScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: "12%",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  subContainer: {
    padding: "5%",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },
  tabHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    height: 30,
    marginBottom: 20,
  },
  activeTabHeader: {
    borderBottomWidth: 2,
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  coinContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  coin: {
    flexDirection: "row",
  },
  coinImage: { width: 40, height: 40, marginRight: 12 },
  coinName: {},
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
  buyButton: {
    backgroundColor: "#111111",
    opacity: 0.8,
    padding: 5,
    borderRadius: 5,
  },
  BottomActionButtons: {
    justifyContent: "flex-end",
    height: 20,
  },
});
