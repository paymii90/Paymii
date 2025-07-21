import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { CoinContext } from "../../../context/CoinContext";
import { useNavigation } from "@react-navigation/native";

const TopAssets = () => {
  const { coins } = useContext(CoinContext);
  const [topAssets, setTopAssets] = useState(coins.slice(0, 3));
  const [buttonText, setbuttonText] = useState("See All");
  const navigation = useNavigation();
  

  const renderItem = ({ item }) => {
    const isNegative = item.price_change_percentage_24h < 0;
    const changeColor = isNegative ? "#ea3943" : "#16c784";

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CoinStack", {
            screen: "CoinDetails",
            params: { coin: item },
          })
        }
      >
        <View style={styles.assetItem}>
          <View style={styles.assetLeft}>
            <Image source={{ uri: item.image }} style={styles.assetImage} />
            <View>
              <Text style={styles.assetName}>{item.name}</Text>
              <Text style={styles.assetSymbol}>
                {item.symbol.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.assetRight}>
            <Text style={styles.assetPrice}>
              GH₵{item.current_price.toLocaleString()}
            </Text>
            <Text style={[styles.assetChange, { color: changeColor }]}>
              {item.price_change_percentage_24h.toFixed(2)}%
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top assets</Text>
      <FlatList
        data={topAssets}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity
        onPress={() => {
          setTopAssets(coins.slice(0, 10));
          setbuttonText("See Less");

          if (buttonText === "See Less") {
            setTopAssets(coins.slice(0, 3));
            setbuttonText("See All");
          }
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopAssets;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 12,
  },
  assetItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  assetLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  assetImage: {
    height: 32,
    width: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  assetName: {
    fontWeight: "600",
    fontSize: 14,
  },
  assetSymbol: {
    color: "#777",
    fontSize: 12,
  },
  assetRight: {
    alignItems: "flex-end",
  },
  assetPrice: {
    fontWeight: "600",
    fontSize: 14,
  },
  assetChange: {
    fontSize: 12,
  },
  button: {
    backgroundColor: "#001f3f",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
