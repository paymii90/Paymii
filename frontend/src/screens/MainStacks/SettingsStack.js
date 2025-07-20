import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../MainScreens/SettingsScreen";
import AddPayment from "../MainScreens/SettingsScreen/Payment/AddPayment";
import Momo from "../MainScreens/SettingsScreen/Payment/Momo";
import BankCard from "../MainScreens/SettingsScreen/Payment/BankCard";
import PhoneAuth from "../MainScreens/SettingsScreen/Payment/PhoneAuth";
import Verify from "../MainScreens/SettingsScreen/Payment/Verify";
import ExploreScreen from "../MainScreens/ExploreScreen";
import Limits from "../MainScreens/SettingsScreen/Limit";
import Trial from "../MainScreens/SettingsScreen/Trial";

const Stack = createNativeStackNavigator();

const SettingsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SettingsMain" component={SettingsScreen} />
    <Stack.Screen name="AddPayment" component={AddPayment} />
    <Stack.Screen name="MoMo" component={Momo} />
    <Stack.Screen name="Card" component={BankCard} />
    <Stack.Screen name="PhoneAuth" component={PhoneAuth} />
    <Stack.Screen name="Verify" component={Verify} />
    <Stack.Screen name="ExploreMain" component={ExploreScreen} />
    <Stack.Screen name="Limits" component={Limits} />
    <Stack.Screen name="Trial" component={Trial} />
    {/* Add screen like ProfileEdit, SecuritySettings, etc. here */}
  </Stack.Navigator>
);

export default SettingsStack;
