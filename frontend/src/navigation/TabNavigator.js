import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { View } from "react-native";

import Home from "../screens/MainScreens/Home";
import PortfolioScreen from "../screens/MainScreens/PortfolioScreen";
import TransactionsScreen from "../screens/MainScreens/TransactionsScreen";
import ExploreScreen from "../screens/MainScreens/ExploreScreen";
import SettingsScreen from "../screens/MainScreens/SettingsScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = "";
        let iconSize = size;
        let iconStyle = {};

        switch (route.name) {
          case "Home":
            iconName = "home";
            iconSize = 28;
            break;
          case "Portfolio":
            iconName = "pie-chart";
            iconSize = 28;
            break;
          case "Transactions":
            iconName = "receipt";
            iconSize = 35;
            iconStyle = { marginBottom: -5 };
            break;
          case "Explore":
            iconName = "explore";
            iconSize = 28;
            break;
          case "Settings":
            iconName = "person";
            iconSize = 28;
            break;
        }

        return (
          <View style={[{ alignItems: "center", justifyContent: "center" }, iconStyle]}>
            <MaterialIcons name={iconName} size={iconSize} color={color} />
          </View>
        );
      },
      tabBarActiveTintColor: "#052644",
      tabBarInactiveTintColor: "rgb(129, 129, 129)",
      tabBarStyle: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: 60,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
      },
      tabBarLabelStyle: {
        fontSize: 13,
        marginBottom: 5,
      },
      headerShown: false, // Hide header for all screens
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Portfolio" component={PortfolioScreen} />
    <Tab.Screen
      name="Transactions"
      component={TransactionsScreen}
      options={{ tabBarLabel: () => null }}
    />
    <Tab.Screen name="Explore" component={ExploreScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

export default TabNavigator;
