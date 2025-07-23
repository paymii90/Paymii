import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StackNavigator from "./src/navigation/StackNavigator"; // Auth stack
import TabNavigator from "./src/navigation/TabNavigator"; // Main app tabs
import CoinStack from "./src/screens/MainStacks/CoinStack"; // Coin details/buy
import AppProvider from "./src/context/AppProvider";
import { AuthContext } from "./src/context/AuthContext";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import LottieView from "lottie-react-native";

function Main() {
  const Root = createNativeStackNavigator();
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={require("./assets/animations/loading.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer key={isLoggedIn ? "main" : "auth"}>
        <Root.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <>
              <Root.Screen name="Main" component={TabNavigator} />
              <Root.Screen name="CoinStack" component={CoinStack} />
            </>
          ) : (
            <Root.Screen name="Auth" component={StackNavigator} />
          )}
        </Root.Navigator>
        <StatusBar style="dark" />
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}
