import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "../../../Components/Button";
import Header from "./header";
import ChartComponent from "./chart";
import Buttons from "./buttons";
import TabToggle from "./tabToggle";
import WalletCard from "./walletCard";
import CoinInsights from "./coinInsights";
import BuyCryptoPopup from "./BuyCryptoPopup";
import TransferPopup from "./TransferPopup";
import { useCoins } from "../../../context/CoinContext";
import CoinChartData from "../../../../assets/data/crypto.json";

const CoinDetailScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [selectedRange, setSelectedRange] = useState("1M");
  const [selectedTab, setSelectedTab] = useState("Balance");
  const [buySellPopupVisible, setBuySellPopupVisible] = useState(false);
  const [transferPopupVisible, setTransferPopupVisible] = useState(false);

  const route = useRoute();
  const { coin } = route.params;
  const { exchangeRate } = useCoins();

  // console.log(coin);
  const {
    name,
    current_price,
    price_change_24h,
    price_change_percentage_24h,
    symbol,
    image,
  } = coin;

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        // paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <Header
          name={name}
          current_price={current_price}
          price_change_24h={price_change_24h}
          price_change_percentage_24h={price_change_percentage_24h}
          navigation={navigation}
          exchangeRate={exchangeRate}
          coinId={coin.id}
          image={coin.image}
        />

        {/* Chart Placeholder */}
        <ChartComponent prices={CoinChartData.prices} />
        {/* Balance or Insights  */}
        <TabToggle selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {selectedTab === "Balance" ? (
          <WalletCard
            image={coin.image}
            name={coin.name}
            symbol={coin.symbol}
            coinId={coin.id}
          />
        ) : (
          <CoinInsights coin={coin} /> // Render coin info/description
        )}

        {/* Actions */}
      </ScrollView>
      <Buttons
        navigation={navigation}
        singleCoinItem={coin}
        setBuySellPopupVisible={setBuySellPopupVisible}
        setTransferPopupVisible={setTransferPopupVisible}
      />
      <BuyCryptoPopup
        isVisible={buySellPopupVisible}
        onClose={() => setBuySellPopupVisible(false)}
        singleCoinItem={coin}
      />
      <TransferPopup
        isVisible={transferPopupVisible}
        onClose={() => setTransferPopupVisible(false)}
        singleCoinItem={coin}
      />
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20, // sets both left and right
    paddingBottom: "5%",
    backgroundColor: "#fff",
  },
});

export default CoinDetailScreen;
