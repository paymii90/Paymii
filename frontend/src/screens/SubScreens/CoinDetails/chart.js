import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
  InteractionManager,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useRoute } from "@react-navigation/native";
import { useCoinChart } from "../../../hooks/useCoinChart";
import LottieView from "lottie-react-native";
import { useFormattedCurrency } from "../../../hooks/useFormattedCurrency";

const screenWidth = Dimensions.get("window").width * 0.95;

const rangeLimits = {
  "1H": 2,
  "5H": 6,
  "12H": 12,
  "1D": 24,
};

const dayMap = {
  "1H": 1,
  "5H": 1,
  "12H": 1,
  "1D": 1,
};

const ChartComponent = () => {
  const [selectedRange, setSelectedRange] = useState("12H");
  const scrollRef = useRef(null);
  const tooltipOpacity = useRef(new Animated.Value(0)).current;
  const [tooltip, setTooltip] = useState({
    index: null,
    value: null,
    time: null,
  });

  const formatCurrency = useFormattedCurrency();

  const route = useRoute();
  const { coin } = route.params;
  const { chartData, loading, error } = useCoinChart(
    coin.id,
    dayMap[selectedRange]
  );

  const [filteredPrices, setFilteredPrices] = useState([]);

  useEffect(() => {
    const limit = rangeLimits[selectedRange] || 24;
    const sliced = chartData.slice(-limit);
    setFilteredPrices(sliced);
  }, [selectedRange, chartData]);

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [filteredPrices]);

  const handleTap = (index) => {
    const [timestamp, value] = filteredPrices[index];
    const date = new Date(timestamp);
    const formattedTime = `${date.getHours()}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;

    InteractionManager.runAfterInteractions(() => {
      setTooltip({ index, value, time: formattedTime });

      requestAnimationFrame(() => {
        Animated.timing(tooltipOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            Animated.timing(tooltipOpacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start(() => {
              setTooltip({ index: null, value: null, time: null });
            });
          }, 3000);
        });
      });
    });
  };

  const chart = {
    labels: new Array(filteredPrices.length).fill(""),
    datasets: [
      {
        data: filteredPrices.map(([, price]) => price),
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      {loading || error || filteredPrices.length === 0 ? (
        <LottieView
          source={require("../../../../assets/animations/loading.json")}
          autoPlay
          loop
          style={{ width: 100, height: 100 }}
        />
      ) : (
        <ScrollView
          horizontal
          ref={scrollRef}
          contentContainerStyle={styles.scrollWrapper}
          showsHorizontalScrollIndicator={false}
        >
          <View>
            <LineChart
              data={chart}
              width={Math.max(screenWidth, filteredPrices.length * 40)}
              height={250}
              yAxisLabel="$"
              withVerticalLabels={false}
              withHorizontalLabels={true}
              withInnerLines={false}
              bezier
              style={styles.chart}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
                labelColor: () => `transparent`,
                propsForDots: {
                  r: "3",
                  strokeWidth: "2",
                  stroke: "#2196f3",
                },
              }}
              fromZero={false}
              segments={4}
              animateOnRender
              animationDuration={1000}
            />

            {/* Touch zones */}
            <View
              style={StyleSheet.absoluteFillObject}
              pointerEvents="box-none"
            >
              <View style={{ flexDirection: "row" }}>
                {filteredPrices.map(([, price], index) => (
                  <TouchableOpacity
                    key={index}
                    style={{ width: 40, height: 250 }}
                    onPress={() => handleTap(index)}
                    activeOpacity={1}
                  />
                ))}
              </View>
            </View>

            {/* Tooltip */}
            {tooltip.index !== null && (
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.tooltipContainer,
                  {
                    left: tooltip.index * 40 + 8,
                    opacity: tooltipOpacity,
                  },
                ]}
              >
                <View style={styles.verticalLine} />
                <View style={styles.dotPulse} />
                <View style={styles.tooltipBubble}>
                  <Text style={styles.tooltipText}>
                    {formatCurrency(tooltip.value)}
                  </Text>
                  <Text style={styles.tooltipSub}>{tooltip.time}</Text>
                </View>
              </Animated.View>
            )}
          </View>
        </ScrollView>
      )}

      <View style={styles.rangeSelector}>
        {Object.keys(rangeLimits).map((range) => (
          <TouchableOpacity
            key={range}
            onPress={() => setSelectedRange(range)}
            style={[
              styles.rangeButton,
              selectedRange === range && styles.rangeButtonActive,
            ]}
          >
            <Text
              style={[
                styles.rangeText,
                selectedRange === range && styles.rangeTextActive,
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

export default ChartComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    alignItems: "center",
  },
  scrollWrapper: {
    paddingLeft: 10,
    paddingRight: 20,
  },
  chart: {
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  rangeSelector: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 20,
  },
  rangeButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  rangeButtonActive: {
    backgroundColor: "#2196f3",
  },
  rangeText: {
    color: "#444",
    fontWeight: "500",
  },
  rangeTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  tooltipContainer: {
    position: "absolute",
    top: 40,
    alignItems: "center",
    zIndex: 99,
  },
  tooltipBubble: {
    backgroundColor: "#2196f3",
    padding: 6,
    borderRadius: 6,
    minWidth: 80,
    alignItems: "center",
    marginBottom: 6,
  },
  tooltipText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  tooltipSub: {
    color: "#eee",
    fontSize: 12,
  },
  verticalLine: {
    width: 2,
    height: 170,
    backgroundColor: "#2196f3",
    marginBottom: 4,
  },
  dotPulse: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2196f3",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#2196f3",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 5,
  },
});
