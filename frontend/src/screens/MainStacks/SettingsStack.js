import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../MainScreens/SettingsScreen";
import AddPayment from "../MainScreens/SettingsScreen/AddPayment";
import Momo from "../MainScreens/SettingsScreen/Momo";
import BankCard from "../MainScreens/SettingsScreen/BankCard";

const Stack = createNativeStackNavigator();

const SettingsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SettingsMain" component={SettingsScreen} />
    <Stack.Screen name="AddPayment" component={AddPayment} />
    <Stack.Screen name="MoMo" component={Momo} />
    <Stack.Screen name="Card" component={BankCard} />
    {/* Add screen like ProfileEdit, SecuritySettings, etc. here */}
  </Stack.Navigator>
);

export default SettingsStack;
