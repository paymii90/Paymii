import React, { useContext, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import LottieView from "lottie-react-native";
import { useFormattedCurrency } from "../../../hooks/useFormattedCurrency";
import { WatchlistContext } from "../../../context/WatchlistContext";

const fallbackImage = "https://cdn-icons-png.flaticon.com/512/6596/6596121.png";

const Header = ({
  name,
  current_price,
  price_change_24h,
  price_change_percentage_24h,
  navigation,
  coinId,
  image,
}) => {
  const formatCurrency = useFormattedCurrency();
  const { watchlist, addToWatchlist, removeFromWatchlist } =
    useContext(WatchlistContext);

  const [animate, setAnimate] = useState(false);
  const animationRef = useRef(null);
  const isInWatchlist = watchlist.some((c) => c.id === coinId);

  const toggleWatchlist = () => {
    const coin = {
      id: coinId,
      name,
      image,
      current_price,
    };

    if (isInWatchlist) {
      removeFromWatchlist(coinId);
    } else {
      addToWatchlist(coin);
      setAnimate(true);
      animationRef.current?.play();
      setTimeout(() => setAnimate(false), 1500);
    }
  };

  return (
    <View>
      {/* Header Image + Overlay */}
      <ImageBackground
        source={{ uri: image || fallbackImage }}
        style={styles.headerBackground}
        imageStyle={styles.headerImage}
        blurRadius={10}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toggleWatchlist}
            style={styles.watchlistButton}
          >
            <View
              style={{
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {animate && (
                <LottieView
                  ref={animationRef}
                  source={require("../../../../assets/animations/star-fav.json")}
                  autoPlay={false}
                  loop={false}
                  style={styles.lottie}
                />
              )}
              <AntDesign
                name={isInWatchlist ? "star" : "staro"}
                size={24}
                color={isInWatchlist ? "#bada55" : "#fff"}
              />
            </View>
            <Text
              style={[
                styles.watchlistText,
                { color: isInWatchlist ? "#bada55" : "#fff" },
              ]}
            >
              {isInWatchlist ? "In Favourites" : "Add to Favourites"}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Coin Info */}
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
          {price_change_percentage_24h.toFixed(2)}%)
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerBackground: {
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  headerImage: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    objectFit: "cover",
    objectPosition: "center",
  },
  headerRow: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backBtn: {
    alignSelf: "flex-start",
  },
  watchlistButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  watchlistText: {
    fontSize: 14,
    fontWeight: "500",
  },
  label: {
    fontSize: 16,
    color: "#888",
    marginTop: 8,
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
  lottie: {
    width: 50,
    height: 50,
    position: "absolute",
    zIndex: 10,
  },
});
