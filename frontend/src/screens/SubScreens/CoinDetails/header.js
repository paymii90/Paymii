import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useFormattedCurrency } from "../../../hooks/useFormattedCurrency";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../../context/UserContext"; // 🔁 assumes you're scoping watchlist per user

const Header = ({
  name,
  current_price,
  price_change_24h,
  price_change_percentage_24h,
  navigation,
  id,
}) => {
  const formatCurrency = useFormattedCurrency();
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const { user } = useContext(UserContext);
  const email = user?.email || "guest";
  const WATCHLIST_KEY = `watchlist_${email}`;

  useEffect(() => {
    const loadWatchlistStatus = async () => {
      try {
        const stored = await AsyncStorage.getItem(WATCHLIST_KEY);
        const list = stored ? JSON.parse(stored) : [];
        setIsWatchlisted(list.includes(id));
      } catch (err) {
        console.error("Failed to load watchlist:", err);
      }
    };

    loadWatchlistStatus();
  }, [id]);

  const toggleWatchlist = async () => {
    try {
      const stored = await AsyncStorage.getItem(WATCHLIST_KEY);
      const list = stored ? JSON.parse(stored) : [];

      let updatedList = [];

      if (list.includes(id)) {
        updatedList = list.filter((coinId) => coinId !== id);
      } else {
        updatedList = [...list, id];
      }

      await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedList));
      setIsWatchlisted(!isWatchlisted);
    } catch (error) {
      console.error("Watchlist update failed:", error);
    }
  };

  return (
    <View>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleWatchlist}>
          <AntDesign
            name={isWatchlisted ? "star" : "staro"}
            size={26}
            color={isWatchlisted ? "#facc15" : "#fff"}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>{name} Price</Text>
      <Text style={styles.price}>{formatCurrency(current_price)}</Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        {price_change_24h >= 0 ? (
          <AntDesign name="caretup" size={20} color="#16c784" />
        ) : (
          <AntDesign name="caretdown" size={20} color="#ea3943" />
        )}
        <Text
          style={[
            styles.change,
            {
              color: price_change_percentage_24h > 0 ? "#16c784" : "#ea3943",
            },
          ]}
        >
          {price_change_24h > 0 ? "+" : ""}
          {formatCurrency(price_change_24h)} (
          {price_change_percentage_24h.toFixed(2)}
          %)
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  backBtn: {
    alignSelf: "flex-start",
  },
  label: {
    fontSize: 16,
    color: "#888",
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 5,
  },
  change: {
    marginTop: 4,
    fontWeight: "500",
  },
});
