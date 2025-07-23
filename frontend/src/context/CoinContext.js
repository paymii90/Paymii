import React, { createContext, useState, useEffect, useContext } from "react";
import coinsData from "../../assets/data/cryptocurrencies.json";
import { fetchExchangeRate } from "../api/coinGecko";

export const CoinContext = createContext();

export const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    setCoins(coinsData.sort((a, b) => a.name.localeCompare(b.name)));

    const loadExchangeRate = async () => {
      try {
        const rate = await fetchExchangeRate();
        setExchangeRate(rate);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    loadExchangeRate();
  }, []);
  // console.log("Exchange Rate:", exchangeRate);

  const getCoinById = (id) => coins.find((coin) => coin.id === id);

  return (
    <CoinContext.Provider value={{ coins, getCoinById, exchangeRate }}>
      {children}
    </CoinContext.Provider>
  );
};

export const useCoins = () => useContext(CoinContext);
