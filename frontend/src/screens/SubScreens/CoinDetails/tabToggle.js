import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const TabToggle = ({ selectedTab, setSelectedTab }) => {
  return (
    <View style={styles.tabContainer}>
      <Pressable onPress={() => setSelectedTab("Balance")}>
        <Text
          style={[
            styles.tabText,
            selectedTab === "Balance" && styles.activeTab,
          ]}
        >
          Balance
        </Text>
      </Pressable>

      <Pressable onPress={() => setSelectedTab("Insights")}>
        <Text
          style={[
            styles.tabText,
            selectedTab === "Insights" && styles.activeTab,
          ]}
        >
          Insights
        </Text>
      </Pressable>
    </View>
  );
};

export default TabToggle;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 16,
    gap: 20,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  activeTab: {
    color: "#0047AB", // blue
    borderBottomWidth: 2,
    borderBottomColor: "#0047AB",
  },
});
