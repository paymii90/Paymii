import { StyleSheet, Text, View } from "react-native";
import React, { use } from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFormattedCurrency } from "../../../hooks/useFormattedCurrency";
import AntDesign from "@expo/vector-icons/AntDesign";

const Header = ({
  name,
  current_price,
  price_change_24h,
  price_change_percentage_24h,
  navigation,
  exchangeRate,
}) => {
  const formatCurrency = useFormattedCurrency();

  return (
    <View>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      <Text style={styles.label}>{name} Price</Text>
      <Text style={styles.price}>{formatCurrency(current_price)}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
  backBtn: {
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  backArrow: {
    fontSize: 30,
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
