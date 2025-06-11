import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../MainScreens/Home";
import CoinDetails from '../SubScreens/CoinDetails';

import Chat from "../SubScreens/HomeSub/Chat";

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={Home} />
    <Stack.Screen name="Chat" component={Chat} />
    {/* <Stack.Screen name="CoinDetails" component={CoinDetails} /> */}
  </Stack.Navigator>
);

export default HomeStack;
