import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import SafeAreaWrapper from "../../../../Components/SafeAreaWrapper";
import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";

const { width } = Dimensions.get("window");

const WithdrawConfirmation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { amount } = route.params;

  const sendLocalNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🎉 Withdrawal Successful!",
        body: `You've successfully withdrawn GH₵ ${amount.toFixed(
          2
        )}. Check your portfolio now!`,
      },
      trigger: null, // Immediate
    });
  };

  const handleConfirm = async () => {
    // TODO: Replace with actual logic
    Toast.show({
      type: "success",
      text1: "Withdrawal successful",
      text2: "Your withdrawal has been processed successfully.",
    });
    navigation.navigate("Main", {
      screen: "Portfolio",
    });

    await sendLocalNotification();
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        {/* Top Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        {/* Main Content */}
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <Text style={styles.title}>Confirm Withdrawal</Text>
            <Text style={styles.subtitle}>You're about to Withdraw:</Text>
            <Text style={styles.amount}>GH₵ {amount}</Text>

            <View style={styles.infoCard}>
              <Text style={styles.infoText}>Withdraw To: Mobile Money</Text>
              <Text style={styles.infoText}>
                Transaction Fee: GH₵ {(0.05 * amount).toFixed(2)}
              </Text>
              {/* <Text style={styles.infoText}>
                Total: GH₵ {(parseFloat(amount) + 0.5).toFixed(2)}
              </Text> */}
            </View>
          </View>

          {/* Buttons anchored at bottom */}
          <View style={styles.btnGroup}>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
              <Text style={styles.btnText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default WithdrawConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
  amount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#052644",
    textAlign: "center",
    marginVertical: 20,
  },
  infoCard: {
    backgroundColor: "#072b42ff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 8,
  },
  btnGroup: {
    paddingBottom: "6%",
  },
  confirmBtn: {
    backgroundColor: "#052644",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelBtn: {
    alignItems: "center",
  },
  cancelText: {
    color: "#999",
    fontSize: 14,
  },
});
