import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH } from "../../../../../firebaseConfig";
import { buyCoin } from "../../../../api/transactionApi";
import { useNavigation } from "@react-navigation/native";
import { IpContext } from "../../../../context/IpContext";
import Toast from "react-native-toast-message";
import LottieView from "lottie-react-native";
import * as Notifications from "expo-notifications";

const BuyPreviewModal = ({
  visible,
  onClose,
  coin,
  amount,
  balance,
  setBalance,
}) => {
  const navigation = useNavigation();
  const { ipAddress } = useContext(IpContext);
  const coinValue = (amount / coin?.current_price).toFixed(6);
  const [isBuying, setIsBuying] = useState(false);

  const sendLocalNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🎉 Purchase Successful!",
        body: `You've successfully bought ${coinValue} ${coin?.symbol.toUpperCase()}. Check your portfolio now!`,
      },
      trigger: null, // Immediate
    });
  };

  const handleBuy = async () => {
    setIsBuying(true);
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      let token = await AsyncStorage.getItem("token");

      if (!token) {
        const currentUser = FIREBASE_AUTH.currentUser;
        if (currentUser) {
          token = await currentUser.getIdToken(true);
          await AsyncStorage.setItem("token", token);
        } else {
          Toast.show({
            type: "error",
            text1: "Not Logged In",
            text2: "Please log in again.",
          });
          return;
        }
      }

      const buyData = {
        userId: user?.id,
        coinId: coin?.id || coin?.symbol,
        coinName: coin.name,
        coinSymbol: coin.symbol,
        coinImage: coin.image,
        coinPrice: coin.current_price,
        amount: parseFloat(amount),
        coinQuantity: parseFloat(coinValue),
        paymentMethod: "Mobile Money",
      };

      // const result = await buyCoin(buyData, token, ipAddress);
      // console.log("✅ Buy result:", result);

      onClose();
      setTimeout(() => {
        navigation.navigate("SuccessScreen", { coinName: coin.name });
      }, 400);

      await sendLocalNotification();

      setBalance((prev) => prev - parseFloat(amount));
    } catch (err) {
      console.log("❌ Buy error:", err);
      onClose();
      Toast.show({
        type: "error",
        text1: "Buy Failed",
        text2: "Something went wrong. Please try again.",
      });
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.fullscreen}>
          <BlurView
            intensity={15}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {isBuying ? (
                <View style={styles.loadingWrapper}>
                  <LottieView
                    source={require("../../../../../assets/animations/loading.json")}
                    autoPlay
                    loop
                    style={{ width: 100, height: 100 }}
                  />
                  <Text style={styles.loadingText}>Processing Purchase...</Text>
                </View>
              ) : (
                <>
                  <View style={styles.header}>
                    <Image
                      source={{ uri: coin?.image }}
                      style={styles.coinImage}
                    />
                    <View>
                      <Text style={styles.name}>{coin?.name}</Text>
                      <Text style={styles.symbol}>
                        {coin?.symbol.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.info}>
                    <View style={styles.option}>
                      <Text style={styles.label}>Amount (GHS):</Text>
                      <Text style={styles.value}>GH₵ {amount}</Text>
                    </View>
                    <View style={styles.option}>
                      <Text style={styles.label}>You’ll get:</Text>
                      <Text style={styles.value}>
                        {coinValue} {coin?.symbol.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.buyButton}
                    onPress={handleBuy}
                  >
                    <Text style={styles.buyText}>Buy Now</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.buyButton} onPress={onClose}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BuyPreviewModal;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginBottom: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  coinImage: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 20,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#052644",
  },
  symbol: {
    fontSize: 14,
    color: "#888",
  },
  info: {
    marginBottom: 25,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: "#333",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#052644",
  },
  buyButton: {
    backgroundColor: "#052644",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  buyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelText: {
    textAlign: "center",
    color: "red",
    marginTop: 5,
  },
  loadingWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#052644",
    fontWeight: "500",
  },
});
