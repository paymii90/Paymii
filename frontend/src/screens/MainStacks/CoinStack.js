// screens/MainStacks/CoinStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoinDetailScreen from "../SubScreens/CoinDetails";
import BuyAssets from "../SubScreens/HomeSub/Buy";
import ConvertAssets from "../SubScreens/HomeSub/Convert";
import SellScreen from "../SubScreens/HomeSub/SellAssets";
import SendCrypto from "../SubScreens/HomeSub/Send";
import Receive from "../SubScreens/HomeSub/Recieve";
import Deposit from "../SubScreens/HomeSub/Deposit/MethodSelection";
import Withdraw from "../SubScreens/HomeSub/Withdraw";
import BuySingleCoin from "../SubScreens/HomeSub/BuySingleCoin";
import SuccessScreen from "../SubScreens/HomeSub/SuccessScreen";
import SellSingleCoin from "../SubScreens/HomeSub/SellSingleCoin";
import SendCryptoScreen from "../SubScreens/HomeSub/SendCryptoScreen";
import ReceiveCryptoScreen from "../SubScreens/HomeSub/RecieveCryptoScreen";
import DepositConfirmation from "../SubScreens/HomeSub/Deposit/DepositConfirmation";
import MethodSelection from "../SubScreens/HomeSub/Deposit/Deposit";
import AddPayment from "../MainScreens/SettingsScreen/Payment/AddPayment";

import Chat from "../SubScreens/HomeSub/Chat";

const Stack = createNativeStackNavigator();

const CoinStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="MethodSelection"
  >
    <Stack.Screen name="CoinDetails" component={CoinDetailScreen} />
    <Stack.Screen name="Buy" component={BuyAssets} />
    <Stack.Screen name="Convert" component={ConvertAssets} />
    <Stack.Screen name="Sell" component={SellScreen} />
    <Stack.Screen name="Send" component={SendCrypto} />
    <Stack.Screen name="Receive" component={Receive} />
    <Stack.Screen name="Deposit" component={Deposit} />
    <Stack.Screen name="Withdraw" component={Withdraw} />
    <Stack.Screen name="BuySingleCoin" component={BuySingleCoin} />
    <Stack.Screen name="SellSingleCoin" component={SellSingleCoin} />
    <Stack.Screen name="SendCryptoScreen" component={SendCryptoScreen} />
    <Stack.Screen name="ReceiveCryptoScreen" component={ReceiveCryptoScreen} />
    <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
    <Stack.Screen name="Chat" component={Chat} />

    <Stack.Screen name="DepositConfirmation" component={DepositConfirmation} />
    {/* The screen names of MethodSelection and Deposit have interchanged */}
    <Stack.Screen name="MethodSelection" component={MethodSelection} />
    <Stack.Screen name="AddPayment" component={AddPayment} />
  </Stack.Navigator>
);

export default CoinStack;
