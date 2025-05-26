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
} from "react-native";
import Spacer from "../../Components/Spacer";
import { BlurView } from "expo-blur";

//importing assets
import SearchIcon from "../../../assets/search";
import ChatIcon from "../../../assets/chatIcon";
import Logo from "../../../assets/logo.svg";
import Button from "../../Components/Button";
import ButtonsInfo from "../../../assets/configs/HomeButtons";
import SingleButtonItem from "../../../assets/configs/SingleButtonItem";
import Plus from "../../../assets/plus-1.png";
import mockCoinData from "../../../assets/configs/mockCoinData";

//api request
import { getMarketCoins } from "../../api/coinGecko";

const Home = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMarketCoins();

        const formatted = data.map((coin) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          price: `$${coin.current_price}`,
          image: coin.image,
        }));

        setCoinData(formatted);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchData();
  }, [activeButton]);

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "bottom", "left", "right"]}
    >
      <BlurView intensity={80} tint="light" style={styles.iconsCont}>
        <SearchIcon style={{ marginLeft: 30 }} width={30} height={30} />
        <ChatIcon style={{ marginRight: 30 }} width={30} height={30} />
      </BlurView>
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
          // action={handleBuyCrypto}
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
        {/* 👉 This shows only after a filter is selected */}
        {activeButton && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, color: "#333" }}>
              Showing results for:{" "}
              <Text style={{ fontWeight: "bold" }}>{activeButton}</Text>
            </Text>
            {coinData.map((coin) => (
              <View
                key={coin.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Image
                  source={{ uri: coin.image }}
                  style={{ width: 32, height: 32, marginRight: 10 }}
                />
                <Text style={{ flex: 1, fontWeight: "bold" }}>{coin.name}</Text>
                <Text>{coin.price}</Text>
              </View>
            ))}
          </View>
        )}
        <Spacer height={40} />
        <View style={styles.footButts}>
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
            // action={handleBuyCrypto}
          />
          <Image source={Plus} style={styles.plus} />
          <Button
            label="Transfer"
            backgroundColor="#011D5C"
            color="white"
            style={{
              borderRadius: 60,
              width: "40%",
              transform: [{ translateX: -30 }],
            }}
            labelStyle={{ fontWeight: 600 }}
            // action={handleBuyCrypto}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#f5f5f5",
    marginLeft: 12,
    marginRight: 12,
    // width: '90%'
  },
  iconsCont: {
    position: "absolute", // Fixes at the top
    top: 20,
    left: 0,
    right: 0,
    height: 90, // Fixed height
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(252, 243, 243, 0.66)",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    borderBottomWidth: 0.1,
    marginLeft: -20,
    marginRight: -20,
    zIndex: 1000, // Keeps header on top
  },
  logoCont: {
    // backgroundColor: 'blue',
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
    fontWeight: 800,
    color: "#111111",
  },
  subIntro: {
    fontSize: 18,
    fontWeight: 500,
    color: "#414141",
  },
  //scrooooll
  scrollContainer: {
    paddingHorizontal: 16,
  },
  footButts: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red",
  },
  plus: {
    zIndex: -1,
  },
});
