// this handles the tabs
import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";

// Import screen components
import Home from "../screens/MainScreens/Home";
import PortfolioScreen from "../screens/MainScreens/PortfolioScreen";
import TransactionsScreen from "../screens/MainScreens/TransactionsScreen";
import ExploreScreen from "../screens/MainScreens/ExploreScreen";
import SettingsScreen from "../screens/MainScreens/SettingsScreen";

const TabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Portfolio: PortfolioScreen,
    Transactions: TransactionsScreen,
    Explore: ExploreScreen,
    Profile: SettingsScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: "#007AFF",
      inactiveTintColor: "gray",
      style: {
        height: 60,
        paddingBottom: 5,
        backgroundColor: "#fff",
      },
    },
  }
);

export default createAppContainer(TabNavigator);