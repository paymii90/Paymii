import React from "react";
import { LineChart } from "react-native-chart-kit";
import { View } from "react-native";
import { useCoinChart } from "../hooks/useCoinChart";

const MiniChart = ({ coinId , backgroundcolor}) => {
  const { chartData, loading, error } = useCoinChart(coinId, 1); // 1-day range

  if (loading || error || chartData.length === 0) return null;

  const prices = chartData.map(([timestamp, price]) => price);

  return (
    <View
      style={{
        backgroundColor: backgroundcolor,
        borderRadius: 6,
        padding: 2,
      }}
    >
      <LineChart
        data={{
          datasets: [{ data: prices }],
        }}
        width={80}
        height={40}
        withDots={false}
        withShadow={false}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLabels={false}
        withHorizontalLabels={false}
        chartConfig={{
          backgroundColor: backgroundcolor,
          backgroundGradientFrom: backgroundcolor,
          backgroundGradientTo: backgroundcolor,
          decimalPlaces: 2,
          color: () => `#00FF94`,
        }}
        style={{
          paddingRight: 0,
          paddingLeft: 0,
        }}
      />
    </View>
  );
};

export default MiniChart;
