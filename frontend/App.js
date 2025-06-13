import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import TabNavigator from "./src/navigation/TabNavigator";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import { CoinProvider } from './src/context/CoinContext'; 
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

function Main() {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === null) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* {isLoggedIn ? <TabNavigator /> : <StackNavigator />} */}
        <StackNavigator />
        <StatusBar style="dark" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CoinProvider> 
        <Main />
      </CoinProvider>
    </AuthProvider>
  );
}
