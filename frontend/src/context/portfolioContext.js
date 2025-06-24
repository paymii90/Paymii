import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create context
const PortfolioContext = createContext();

// Provider
export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolio = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://10.80.33.17:8080/api/portfolio", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      setPortfolio(json);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch once when app loads
  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  // Optional: Call this after buy/sell to refresh
  const refreshPortfolio = async () => {
    await fetchPortfolio();
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, loading, refreshPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Hook to use the context
export const usePortfolio = () => useContext(PortfolioContext);
