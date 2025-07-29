import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useCoins } from "../../../context/CoinContext";
import { useNavigation } from "@react-navigation/native";
import CoinCard from "./CoinCard";

const TopMovers = () => {
  const navigation = useNavigation();
  const { coins } = useCoins();
  const movers = coins
    .filter((coin) => coin.market_cap_rank % 2 === 0)
    .slice(-10)
    .reverse();
  //   console.log(movers);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New on Paymii</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={movers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CoinCard item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default TopMovers;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
});
