import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import Spacer from "../../../Components/Spacer";
import { BlurView } from "expo-blur";
import Logo from "../../../../assets/logo.svg";
import Button from "../../../Components/Button";
import ButtonsInfo from "../../../../assets/configs/HomeButtons";
import SingleButtonItem from "./SingleButtonItem.js";
import Plus from "../../../../assets/plus-1.png";
import BuyCryptoPopup from "../../../../assets/configs/BuyCryptoPopup.js";
import { WatchlistContext } from "../../../context/WatchlistContext.js";
import { useCoins } from "../../../context/CoinContext.js";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getMarketCoins, fetchExchangeRate } from "../../../api/coinGecko";
import TransferPopup from "./TransferPopup.js";
import { useNavigation } from "@react-navigation/native";
import FooterButtons from "../../../Components/FooterButtons.js";
import CryptoNewsFeed from "../../../Components/CrytptoNewsFeed.js";
import LottieView from "lottie-react-native";
import { useFormattedCurrency } from "../../../hooks/useFormattedCurrency.js";
import MiniChart from "../../../Components/MiniChart.js";

const Home = () => {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState("Watchlist");
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // ✅ NEW
  const { coins, exchangeRate } = useCoins();
  const formatCurrency = useFormattedCurrency();
  const { watchlist } = useContext(WatchlistContext);

  let selectedData = {};

  switch (activeButton) {
    case "Watchlist":
      selectedData = coins.filter((coin) =>
        watchlist.some((w) => w.id === coin.id)
      );
      break;
    case "Trending":
      selectedData = coins
        .filter((coin) => coin.market_cap_rank <= 10)
        .slice(0, 5);
      break;
    case "Top Gainers":
      selectedData = coins
        .sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        )
        .slice(0, 5);
      break;
    case "Top Losers":
      selectedData = coins
        .sort(
          (a, b) =>
            a.price_change_percentage_24h - b.price_change_percentage_24h
        )
        .slice(0, 5);
      break;
    case "Most Buyers":
      selectedData = coins
        .filter((coin) => coin.total_volume > 1000000)
        .slice(0, 5);
      break;
    case "Most Searched":
      selectedData = coins
        .filter((coin) => coin.name.toLowerCase().includes("bit"))
        .slice(0, 5);
      break;
    default:
      selectedData = coins
        .filter((coin) => coin.name.toLowerCase().includes("ba"))
        .slice(0, 5);
  }

  useEffect(() => {
    fetchFilteredData();
  }, [activeButton, watchlist]);

  const fetchFilteredData = async () => {
    setLoading(true);
    try {
      setFilteredCoins(selectedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFilteredCoins([]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFilteredData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "bottom", "left", "right"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Spacer height={80} />
        <View style={styles.logoCont}>
          <Logo width={500} height={500} />
        </View>
        <View style={styles.introTexts}>
          <Text style={styles.intro}>Welcome to Paymii</Text>
          <Spacer height={4} />
          <Text style={styles.subIntro}>Make your first investment today</Text>
        </View>
        <Spacer height={40} />
        <Button
          label="Buy Crypto"
          backgroundColor="#375169"
          color="white"
          style={{ borderRadius: 60 }}
          labelStyle={{ fontWeight: 700 }}
          action={() =>
            navigation.navigate("CoinStack", {
              screen: "Buy",
            })
          }
        />
        <Spacer height={30} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {ButtonsInfo.map((item, index) => (
            <SingleButtonItem
              key={index}
              item={item}
              isActive={activeButton === item.label}
              setActiveButton={() => setActiveButton(item.label)}
            />
          ))}
        </ScrollView>
        <Spacer />

        {activeButton && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, color: "#333" }}>
              {selectedData.length > 0
                ? "Showing results for: "
                : "No results found for: "}
              <Text style={{ fontWeight: "bold" }}>{activeButton}</Text>
            </Text>
            {loading ? (
              <View style={styles.loader}>
                <LottieView
                  source={require("../../../../assets/animations/loading.json")}
                  autoPlay
                  loop
                  style={{ width: 100, height: 100 }}
                />
              </View>
            ) : (
              <View>
                {filteredCoins.length === 0 && activeButton === "Watchlist" ? (
                  <View style={styles.emptyWatchlistContainer}>
                    <TouchableOpacity
                      style={styles.plusCircle}
                      onPress={() => navigation.navigate("Explore")}
                    >
                      <AntDesign name="plus" size={32} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.emptyWatchlistText}>
                      Add assets to Favourites
                    </Text>
                  </View>
                ) : (
                  filteredCoins.map((item) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("CoinStack", {
                          screen: "CoinDetails",
                          params: { coin: item },
                        });
                      }}
                      key={item.id}
                    >
                      <View style={styles.coinContainer}>
                        <Image
                          source={{ uri: item.image }}
                          style={styles.logo}
                        />
                        <View style={styles.coinInfo}>
                          <Text
                            style={styles.name}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {item.name} ({item.symbol.toUpperCase()})
                          </Text>
                          <Text style={styles.price}>
                            {formatCurrency(item.current_price)}
                          </Text>
                        </View>
                        <MiniChart
                          coinId={item.id}
                          backgroundcolor={"#afaeaeff"}
                        />
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          {item.price_change_percentage_24h >= 0 ? (
                            <AntDesign name="caretup" size={20} color="green" />
                          ) : (
                            <AntDesign
                              name="caretdown"
                              size={20}
                              color="#ea3943"
                            />
                          )}
                          <Text
                            style={[
                              styles.priceChange,
                              {
                                color:
                                  item.price_change_percentage_24h >= 0
                                    ? "green"
                                    : "red",
                              },
                            ]}
                          >
                            {item.price_change_percentage_24h.toFixed(2)}%
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            )}
          </View>
        )}
        <Spacer height={40} />
        <CryptoNewsFeed />
      </ScrollView>

      <FooterButtons />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#f5f5f5",
    marginLeft: 12,
    marginRight: 12,
  },
  iconsCont: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(116, 99, 99, 0.66)",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    borderBottomWidth: 0.1,
    marginLeft: -20,
    marginRight: -20,
    zIndex: 1000,
  },
  logoCont: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 250,
  },
  introTexts: {
    alignItems: "center",
    justifyContent: "center",
  },
  intro: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111111",
  },
  subIntro: {
    fontSize: 18,
    fontWeight: "500",
    color: "#414141",
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  footButts: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  plus: {
    zIndex: -1,
  },
  coinContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#afaeaeff",
    borderRadius: 10,
    borderWidth: 0.25,
    borderColor: "#c04c4cff",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  coinInfo: {
    flex: 1,
  },
  name: {
    color: "#5a0b0bff",
    fontWeight: "bold",
    fontSize: 14,
  },
  price: {
    color: "#3a0101ff",
    fontSize: 13,
  },
  priceChange: {
    fontWeight: "600",
    fontSize: 13,
  },
  emptyWatchlistContainer: {
    alignItems: "center",
    marginVertical: 30,
    justifyContent: "center",
  },

  plusCircle: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: "#375169",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    elevation: 4,
  },

  emptyWatchlistText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
});
