import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../MainScreens/SettingsScreen";
import AddPayment from "../MainScreens/SettingsScreen/AddPayment";

const Stack = createNativeStackNavigator();

const SettingsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SettingsMain" component={SettingsScreen} />
    <Stack.Screen name="AddPayment" component={AddPayment} />
    {/* Add screen like ProfileEdit, SecuritySettings, etc. here */}
  </Stack.Navigator>
);

export default SettingsStack;
