import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import SafeAreaWrapper from "../../../Components/SafeAreaWrapper";
import TopMovers from "./TopMovers";
import TopAssets from "./TopAssets";
import TopPicks from "./TopPicks";
import Spacer from "../../../Components/Spacer";
import FooterButtons from "../../../Components/FooterButtons";
import Searchbar from "../../../Components/Searchbar";

const ExploreScreen = () => {
  return (
    <SafeAreaWrapper>
      <Searchbar text="Explore" />
      <View style={styles.container}>
       

        <FlatList
          data={[]}
          ListHeaderComponent={
            <>
              <Spacer height={30} />
              <TopMovers />
              <TopAssets />
              <TopPicks />
              <Spacer height={30} />
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
    // paddingTop: 10,
    // elevation: 3
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 20,
    paddingVertical: 20,
    alignItems: 'center'
  },
});
