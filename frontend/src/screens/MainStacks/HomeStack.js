import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../MainScreens/Home";
import BuyScreen from "../SubScreens/HomeSub/Buy";
import SellScreen from "../SubScreens/HomeSub/SellAssets";
import ConvertScreen from "../SubScreens/HomeSub/Convert";

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={Home} />
    <Stack.Screen name="Buy" component={BuyScreen} />
    <Stack.Screen name="Sell" component={SellScreen} />
    <Stack.Screen name="Convert" component={ConvertScreen} />
  </Stack.Navigator>
);

export default HomeStack;
