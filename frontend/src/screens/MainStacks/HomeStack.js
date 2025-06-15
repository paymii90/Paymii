import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../MainScreens/Home";
import Searchbar from "../../Components/Searchbar";

import Chat from "../SubScreens/HomeSub/Chat";

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ header: () => <Searchbar /> }}>
    <Stack.Screen name="HomeMain" component={Home} />
    <Stack.Screen name="Chat" component={Chat} />
  </Stack.Navigator>
);

export default HomeStack;
