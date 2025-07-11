import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransactionsScreen from "../MainScreens/TransactionsScreen";

const Stack = createNativeStackNavigator();

const TransactionsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TransactionsMain" component={TransactionsScreen} />
    {/* Add screen like TransactionDetail here */}
  </Stack.Navigator>
);

export default TransactionsStack;
