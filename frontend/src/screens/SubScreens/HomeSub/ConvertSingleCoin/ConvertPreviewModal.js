import React,{ useState } from "react";
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
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";

const ConvertPreviewModal = ({
  visible,
  onClose,
  fromCoin,
  toCoin,
  amount,
}) => {
  const navigation = useNavigation();
  // Dummy conversion logic for now
  const conversionRate = fromCoin.current_price / toCoin.current_price;
  const convertedAmount = (parseFloat(amount) * conversionRate).toFixed(6);
  const [isConverting, setIsConverting] = useState(false); // [isBuying] = useState(false);

  const sendLocalNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🎉 Conversion Successful!",
        body: `You've successfully converted ${amount} ${fromCoin?.symbol.toUpperCase()} to ${convertedAmount} ${toCoin?.symbol.toUpperCase()} Check your portfolio now!`,
      },
      trigger: null, // Immediate
    });
  };

  const handleConvert = () => {
    // Later: trigger actual conversion logic

    //  try {
    // setIsConverting(true);
    //   const user = JSON.parse(await AsyncStorage.getItem("user"));
    //   let token = await AsyncStorage.getItem("token");

    //   if (!token) {
    //     const currentUser = FIREBASE_AUTH.currentUser;
    //     if (currentUser) {
    //       token = await currentUser.getIdToken(true);
    //       await AsyncStorage.setItem("token", token);
    //     } else {
    //       Toast.show({
    //         type: "error",
    //         text1: "Not Logged In",
    //         text2: "Please log in again.",
    //       });
    //       return;
    //     }
    //   }

    //   const buyData = {
    //     userId: user?.id,
    //     coinId: coin?.id || coin?.symbol,
    //     coinName: coin.name,
    //     coinSymbol: coin.symbol,
    //     coinImage: coin.image,
    //     coinPrice: coin.current_price,
    //     amount: parseFloat(amount),
    //     coinQuantity: parseFloat(coinValue),
    //     paymentMethod: "Mobile Money",
    //   };

    // const result = await buyCoin(buyData, token, ipAddress);
    // console.log("✅ Buy result:", result);

    onClose();
    setTimeout(() => {
      navigation.navigate("SuccessScreen");
      sendLocalNotification();
    }, 400);

    // setBalance((prev) => prev - parseFloat(amount));
    //   } catch (err) {
    //     console.log("❌ Buy error:", err);
    //     onClose();
    //     Toast.show({
    //       type: "error",
    //       text1: "Buy Failed",
    //       text2: "Something went wrong. Please try again.",
    //     });
    //   } finally {
    //     // setIsConverting(false);
    //   }
    // };
    // };
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
              {isConverting ? (
                <View style={styles.loadingWrapper}>
                  <LottieView
                    source={require("../../../../../assets/animations/loading.json")}
                    autoPlay
                    loop
                    style={{ width: 100, height: 100 }}
                  />
                  <Text style={styles.loadingText}>
                    Processing Convertion...
                  </Text>
                </View>
              ) : (
                <>
                  {/* HEADER */}
                  <View style={styles.header}>
                    <Image
                      source={{ uri: fromCoin?.image }}
                      style={styles.coinImage}
                    />
                    <View>
                      <Text style={styles.name}>{fromCoin?.name}</Text>
                      <Text style={styles.symbol}>
                        {fromCoin?.symbol?.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  {/* INFO */}
                  <View style={styles.info}>
                    <View style={styles.option}>
                      <Text style={styles.label}>Convert:</Text>
                      <Text style={styles.value}>
                        {amount} {fromCoin?.symbol?.toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.option}>
                      <Text style={styles.label}>You'll receive:</Text>
                      <Text style={styles.value}>
                        {convertedAmount} {toCoin?.symbol?.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  {/* ACTIONS */}
                  <TouchableOpacity
                    style={styles.convertButton}
                    onPress={handleConvert}
                  >
                    <Text style={styles.convertText}>Convert Now</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={onClose}>
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

export default ConvertPreviewModal;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  coinImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
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
  convertButton: {
    backgroundColor: "#052644",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  convertText: {
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
