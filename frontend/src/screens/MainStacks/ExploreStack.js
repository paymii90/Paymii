import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExploreScreen from "../MainScreens/ExploreScreen";
import CoinDetailScreen from "../SubScreens/CoinDetails";
import Searchbar from "../../Components/Searchbar";

const Stack = createNativeStackNavigator();

const ExploreStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false}}>
    <Stack.Screen name="ExploreMain" component={ExploreScreen} />
    {/* Add more screens like Categories, Trending, etc. here */}
  </Stack.Navigator>
);

export default ExploreStack;
