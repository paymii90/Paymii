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

//import icons
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { View } from "react-native";

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="home" size={30} color={tintColor} />
        ),
      },
    },
    Portfolio: {
      screen: PortfolioScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="pie-chart" size={30} color={tintColor} />
        ),
      },
    },
    Transactions: {
      screen: TransactionsScreen,
      navigationOptions: {
        tabBarLabel: () => null,
        tabBarIcon: ({ tintColor }) => (
          <View
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <MaterialIcons name="receipt" size={45} color={tintColor} />
          </View>
        ),
      },
    },
    Explore: {
      screen: ExploreScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="explore" size={30} color={tintColor} />
        ),
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="person" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "##052644",
      inactiveTintColor: "rgb(129, 129, 129)",
      style: {
        // backgroundColor: "#fff",
        // borderTopWidth: 0.5,
        // borderTopColor: "#ccc",
        // paddingBottom: 10,
        //  paddingTop: 10,
        // marginBottom: 10,
        paddingVertical: 10, // adds vertical padding inside the tab bar
        paddingHorizontal: 20, // optional, horizontal padding
        height: 60, // you can increase the height if you want more space
        backgroundColor: "#fff", // customize background color too if you want
        borderTopWidth: 1,
        borderTopColor: "#ddd",
      },
      labelStyle: {
        fontSize: 13,
        marginBottom: 5,
      },
    },
  }
);

export default createAppContainer(TabNavigator);
