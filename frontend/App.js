import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import TabNavigator from "./src/navigation/TabNavigator";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ExploreStack from "./src/screens/MainStacks/ExploreStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppProvider from "./src/context/AppProvider";

function Main() {
  const Root = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Root.Navigator screenOptions={{ headerShown: false }}>
          <Root.Screen name="StackNavigator" component={StackNavigator} />
          <Root.Screen name="Explore" component={ExploreStack} />
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
