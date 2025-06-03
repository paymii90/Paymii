import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../MainScreens/Home";
import BuyScreen from "../SubScreens/HomeSub/Buy";
import SellScreen from "../SubScreens/HomeSub/SellAssets";
import ConvertScreen from "../SubScreens/HomeSub/Convert";
import SendCrypto from "../SubScreens/HomeSub/Send";
import Receive from "../SubScreens/HomeSub/Recieve";
import Deposit from "../SubScreens/HomeSub/Deposit";
import Withdraw from "../SubScreens/HomeSub/Withdraw";
import Chat from "../SubScreens/HomeSub/Chat";

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={Home} />
    <Stack.Screen name="Buy" component={BuyScreen} />
    <Stack.Screen name="Sell" component={SellScreen} />
    <Stack.Screen name="Convert" component={ConvertScreen} />
    <Stack.Screen name="Send" component={SendCrypto} />
    <Stack.Screen name="Receive" component={Receive} />
    <Stack.Screen name="Deposit" component={Deposit} />
    <Stack.Screen name="Withdraw" component={Withdraw} />
    <Stack.Screen name="Chat" component={Chat} />
  </Stack.Navigator>
);

export default HomeStack;
