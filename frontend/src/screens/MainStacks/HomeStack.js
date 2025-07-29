import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../MainScreens/Home";
import Searchbar from "../../Components/Searchbar";

//

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={Home} />
    
    
  </Stack.Navigator>
);

export default HomeStack;