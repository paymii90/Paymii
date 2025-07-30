import React, { useMemo, useState } from "react";
//mport Searchbar from "../../../Components/Searchbar";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Input from "../../../Components/Input";
import currencyMap from "currency-list";

const NativeCurrency = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const allCurrencies = useMemo(() => {
    const curr = currencyMap.getAll("en");
    return Object.values(curr);
  }, []);
  const filteredCurrencies = useMemo(() => {
    return allCurrencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allCurrencies, searchTerm]);

  return (
    <View style={styles.container}>
      {/* //searchbar */}
      <Input
        value={searchTerm}
        action={setSearchTerm}
        placeholder="Search currency..."
      />

      <FlatList
        data={filteredCurrencies}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.curContainer}
            onPress={() => setSelectedCurrency(item)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.code}>{item.code}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No currencies found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: "20%",
    padding: "5%",
  },
  curContainer: {
    borderBottomColor: "#cfcfcf",
    borderBottomWidth: 1,
    gap: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "5%",
  },
  code: {
    fontSize: 16,
  },
  name: {
    fontSize: 16,
  },
});
export default NativeCurrency;
