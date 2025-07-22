import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StackNavigator from "./src/navigation/StackNavigator"; // Auth stack
import TabNavigator from "./src/navigation/TabNavigator";     // Main app tabs
import CoinStack from "./src/screens/MainStacks/CoinStack";   // Coin details/buy
import AppProvider from "./src/context/AppProvider";
import { AuthContext } from "./src/context/AuthContext";
import { ActivityIndicator, View } from "react-native";

function Main() {
  const Root = createNativeStackNavigator();
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#052644" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
