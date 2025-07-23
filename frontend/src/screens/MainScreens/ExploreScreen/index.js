import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import SafeAreaWrapper from "../../../Components/SafeAreaWrapper";
import TopMovers from "./TopMovers";
import TopAssets from "./TopAssets";
import TopPicks from "./TopPicks";
import Spacer from "../../../Components/Spacer";
import FooterButtons from "../../../Components/FooterButtons";

const ExploreScreen = () => {
  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Explore</Text>

        <FlatList
          data={[]}
          ListHeaderComponent={
            <>
              <Spacer height={30} />
              <TopMovers />
              <TopAssets />
              <TopPicks />
            </>
          }
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
        <FooterButtons />
      </View>
    </SafeAreaWrapper>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 20,
    paddingVertical: 20,
  },
});
