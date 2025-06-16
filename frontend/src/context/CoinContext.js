import React, { createContext, useState, useEffect } from "react";
import coinsData from '../../assets/data/cryptocurrencies.json';

export const CoinContext = createContext();

export const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    setCoins(coinsData); // Load dummy data on mount
  }, []);

  const getCoinById = (id) => coins.find((coin) => coin.id === id);

  return (
    <CoinContext.Provider value={{ coins, getCoinById }}>
      {children}
    </CoinContext.Provider>
  );
};
