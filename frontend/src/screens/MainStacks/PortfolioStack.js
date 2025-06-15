import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PortfolioScreen from "../MainScreens/PortfolioScreen";
import Searchbar from "../../Components/Searchbar";

const Stack = createNativeStackNavigator();

const PortfolioStack = () => (
  <Stack.Navigator screenOptions={{ header: () => <Searchbar /> }}>
    <Stack.Screen name="PortfolioMain" component={PortfolioScreen} />
    {/* Add screen like AssetDetail here */}
  </Stack.Navigator>
);

export default PortfolioStack;
