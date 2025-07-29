import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { fetchExchangeRate } from "../api/coinGecko";

export const CoinContext = createContext();

const COINGECKO_API = "https://api.coingecko.com/api/v3";
const CACHE_KEY = "cached_coins";
const CACHE_DURATION = 30 * 60 * 1000; // fetch every 30 mins in ms

export const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const loadCoins = async () => {
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          
          const now = Date.now();
          if (now - parsed.timestamp < CACHE_DURATION) {
            setCoins(parsed.data);
            return;
          }
        }

        const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: false,
            price_change_percentage: "24h",
          },
        });

        const sorted = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCoins(sorted);

        await AsyncStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: sorted,
            timestamp: Date.now(),
          })
        );
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };

    const loadExchangeRate = async () => {
      try {
        const rate = await fetchExchangeRate();
        setExchangeRate(rate);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    loadCoins();
    loadExchangeRate();
  }, []);

  const getCoinById = (id) => coins.find((coin) => coin.id === id);

  return (
    <CoinContext.Provider value={{ coins, getCoinById, exchangeRate }}>
      {children}
    </CoinContext.Provider>
  );
};

export const useCoins = () => useContext(CoinContext);
