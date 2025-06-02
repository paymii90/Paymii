import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator"; // Auth screens
import TabNavigator from "./src/navigation/TabNavigator";     // Main app
import { AuthProvider, AuthContext } from "./src/context/AuthContext";

// This component decides what navigator to show based on login state
function Main() {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === null) return null; // Loading state (can show splash here)

  return (
    <NavigationContainer>
      {isLoggedIn ? <TabNavigator /> : <StackNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}
