import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const COINGECKO_API = "https://api.coingecko.com/api/v3";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const useCoinChart = (coinId = "bitcoin", days = 1) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cacheKey = `chartData_${coinId}_${days}`;

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);

        // Check AsyncStorage cache
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          const now = new Date().getTime();

          if (now - parsed.timestamp < CACHE_DURATION) {
            setChartData(parsed.data);
            setLoading(false);
            return;
          }
        }

        // Fetch fresh data
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

        // Cache the new data
        await AsyncStorage.setItem(
          cacheKey,
          JSON.stringify({
            data: formattedData,
            timestamp: new Date().getTime(),
          })
        );

        setChartData(formattedData);
      } catch (err) {
        console.error("Chart data fetch error:", err);
        setError(err);

        // ⚠️ Rate limit fallback
        if (err.response?.status === 429) {
          console.warn("⚠️ Using fallback chart data due to rate limit");
          const fallback = [
            [Date.now() - 3600000, 100],
            [Date.now() - 1800000, 102],
            [Date.now(), 105],
          ];
          setChartData(fallback);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [coinId, days]);

  return { chartData, loading, error };
};
