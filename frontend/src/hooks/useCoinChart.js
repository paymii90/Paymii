import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const COINGECKO_API = "https://api.coingecko.com/api/v3";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 3 hours

// Dummy fallback chart: 24 data points
const fallbackData = Array.from({ length: 24 }, (_, i) => [
  Date.now() - i * 3600 * 1000,
  100 + Math.random() * 10,
]).reverse();

export const useCoinChart = (coinId = "bitcoin", days = 1) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cacheKey = `chartData_${coinId}_${days}`;

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);

        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          const now = Date.now();

          if (now - parsed.timestamp < CACHE_DURATION) {
            setChartData(parsed.data);
            setLoading(false);
            return;
          }
        }

        const res = await axios.get(
          `${COINGECKO_API}/coins/${coinId}/market_chart`,
          {
            params: {
              vs_currency: "usd",
              days,
            },
          }
        );

        const formattedData = res.data.prices;

        await AsyncStorage.setItem(
          cacheKey,
          JSON.stringify({
            data: formattedData,
            timestamp: Date.now(),
          })
        );

        setChartData(formattedData);
      } catch (err) {
        if (err?.response?.status === 429) {
          console.warn("⚠️ Using fallback chart data due to rate limit");
          setChartData(fallbackData);
        }

        // Log other errors silently without breaking UI
        if (__DEV__) {
          // Only log in dev mode
          console.log("Silent Chart Fetch Error:", err?.message || err);
        }

        setError(null); // suppress error from being passed into components
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [coinId, days]);

  return { chartData, loading, error }; // `error` is null — safe for consumers
};
