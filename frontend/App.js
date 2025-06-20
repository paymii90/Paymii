import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import TabNavigator from "./src/navigation/TabNavigator";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import { CoinProvider } from "./src/context/CoinContext";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ExploreStack from "./src/screens/MainStacks/ExploreStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function Main() {
  // const { isLoggedIn } = useContext(AuthContext);

  // if (isLoggedIn === null) return null; // Loading state (can show splash here)
  const Root = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Root.Navigator screenOptions={{ headerShown: false }}>
          <Root.Screen name="StackNavigator" component={StackNavigator} />
          {/* {isLoggedIn ? <TabNavigator /> : <StackNavigator />} */}
          {/* <StackNavigator /> */}
          <Root.Screen name="Explore" component={ExploreStack} />
        </Root.Navigator>
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
