import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import SafeAreaWrapper from "../../../Components/SafeAreaWrapper";
import TopMovers from "./TopMovers";
import TopAssets from "./TopAssets";
import TopPicks from "./TopPicks";
import BottomActionButtons from "./BottomButtons";

const ExploreScreen = () => {
  return (
    <SafeAreaWrapper style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold", marginLeft: 20 }}>
        Explore
      </Text>
      <FlatList
        data={[]}
        ListHeaderComponent={
          <>
            <TopMovers />
            <TopAssets />
            <TopPicks />
          </>
        }
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
      <BottomActionButtons />
    </SafeAreaWrapper>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
=======
    backgroundColor: "#fff",
>>>>>>> origin/main
  },
});
