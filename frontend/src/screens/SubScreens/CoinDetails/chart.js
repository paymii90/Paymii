import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Chart = ({ selectedRange, setSelectedRange, timeRanges }) => {
  let size;

  switch (selectedRange) {
    case "1H":
      size = 40;
      break;

    case "1D":
      size = 60;
      break;

    case "1W":
      size = 100;
      break;

    case "1M":
      size = 160;
      break;

    case "3M":
      size = 200;
      break;

    case "6M":
      size = 250;
      break;

    case "1Y":
      size = 300;
      break;

    case "ALL":
      size = 200;
      break;

    default:
      size = 30; // fallback
      break;
  }

  return (
    <View>
      <View style={styles.chart}>
        <Text style={{ textAlign: "center", fontSize: size }}>📈</Text>
      </View>
      <View style={styles.rangeSelector}>
        {timeRanges.map((range) => (
          <TouchableOpacity key={range} onPress={() => setSelectedRange(range)}>
            <Text
              style={[
                styles.rangeText,
                range === selectedRange && styles.rangeTextSelected,
              ]}
            >
              {range}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  chart: {
    height: 200,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  rangeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  rangeText: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    color: "#666",
    borderRadius: 10,
  },
  rangeTextSelected: {
    color: "#000",
    fontWeight: "bold",
    backgroundColor: "#e0e0e0",
  },
});
