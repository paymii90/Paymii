import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../MainScreens/SettingsScreen";

const Stack = createNativeStackNavigator();

const SettingsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SettingsMain" component={SettingsScreen} />
    {/* Add screen like ProfileEdit, SecuritySettings, etc. here */}
  </Stack.Navigator>
);

export default SettingsStack;
