import React, { useState, useEffect } from "react";
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
} from "react-native";
import Spacer from "../../../Components/Spacer";
import { BlurView } from "expo-blur";

//importing assets
import Logo from "../../../../assets/logo.svg";
import Button from "../../../Components/Button";
import ButtonsInfo from "../../../../assets/configs/HomeButtons";
import SingleButtonItem from "../../../../assets/configs/SingleButtonItem";
import Plus from "../../../../assets/plus-1.png";
import BuyCryptoPopup from "../../../../assets/configs/BuyCryptoPopup.js";

//mock data
import {
  watchlistCoins,
  trendingCoins,
  topGainers,
  topLosers,
  mostBuyers,
  mostSearched,
} from "../../../../assets/configs/mockCoinCategories.js";

//api request
import { getMarketCoins, fetchExchangeRate } from "../../../api/coinGecko";
import TransferPopup from "./TransferPopup.js";
import { useNavigation } from "@react-navigation/native";
import BottomActionButtons from "../ExploreScreen/BottomButtons.js";
import FooterButtons from "../../../Components/FooterButtons.js";

const Home = () => {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState("Watchlist");
  const [coins, setCoins] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(11);
  const [loading, setLoading] = useState(false);
  const [buySellPopupVisible, setBuySellPopupVisible] = useState(false);
  const [transferPopupVisible, setTransferPopupVisible] = useState(false);
  let selectedData = {};

  switch (activeButton) {
    case "Watchlist":
      selectedData = watchlistCoins;
      break;
    case "Trending":
      selectedData = trendingCoins;
      break;
    case "Top Gainers":
      selectedData = topGainers;
      break;
    case "Top Losers":
      selectedData = topLosers;
      break;
    case "Most Buyers":
      selectedData = mostBuyers;
      break;
    case "Most Searched":
      selectedData = mostSearched;
      break;
    default:
      selectedData = watchlistCoins;
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const rate = await fetchExchangeRate();
        // setExchangeRate(rate || 11);d
        setCoins(selectedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCoins([]);
      } finally {
        setLoading(false);
      }
    };

    if (activeButton) fetchData();
  }, [activeButton]);

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "bottom", "left", "right"]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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
              Showing results for:{" "}
              <Text style={{ fontWeight: "bold" }}>{activeButton}</Text>
            </Text>
            {loading ? (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="#000000" />
              </View>
            ) : (
              <View>
                {coins.map((item) => (
                  <View key={item.name} style={styles.coinContainer}>
                    <Image source={{ uri: item.image }} style={styles.logo} />
                    <View style={styles.coinInfo}>
                      <Text style={styles.name}>
                        {item.name} ({item.symbol.toUpperCase()})
                      </Text>
                      <Text style={styles.price}>
                        GH₵ {(item.current_price * exchangeRate).toFixed(2)}
                      </Text>
                    </View>
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
                ))}
              </View>
            )}
          </View>
        )}
        <Spacer height={40} />
        {/* <View style={styles.footButts}>
          <Button
            label="Buy & Sell"
            backgroundColor="#052644"
            color="white"
            style={{
              borderRadius: 60,
              width: "40%",
              transform: [{ translateX: 30 }],
            }}
            labelStyle={{ fontWeight: 600 }}
            action={() => setBuySellPopupVisible(true)}
          />
          <BuyCryptoPopup
            isVisible={buySellPopupVisible}
            onClose={() => setBuySellPopupVisible(false)}
          /> */}
        {/* <Image source={Plus} style={styles.plus} /> */}
        {/* <Button
            label="Transfer"
            backgroundColor="#011D5C"
            color="white"
            style={{
              borderRadius: 60,
              width: "40%",
              transform: [{ translateX: -30 }],
            }}
            labelStyle={{ fontWeight: 600 }}
            action={() => setTransferPopupVisible(true)}
          />
          <TransferPopup
            isVisible={transferPopupVisible}
            onClose={() => setTransferPopupVisible(false)}
          />
        </View> */}
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
    backgroundColor: "rgba(252, 243, 243, 0.66)",
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
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
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
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  price: {
    color: "#ccc",
    fontSize: 13,
  },
  priceChange: {
    fontWeight: "600",
    fontSize: 13,
  },
});
