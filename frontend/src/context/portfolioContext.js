import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IpContext } from "./IpContext";

// Create context
const PortfolioContext = createContext();

// Provider
export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ipAddress } = useContext(IpContext);

  const fetchPortfolio = useCallback(async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.warn("No token found, skipping fetch");
        setPortfolio([]);
        return;
      }

      const response = await fetch(`${ipAddress}/api/portfolio`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const json = await response.json();
      setPortfolio(json);
    } catch (error) {
      console.error("Error fetching portfolio:", error);

      // 🔁 Fallback: empty list or mock data
      setPortfolio([]);
      // Or for demo fallback:
      // setPortfolio([
      //   {
      //     coin_id: "bitcoin",
      //     coin_symbol: "btc",
      //     coin_image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      //     amount: 0,
      //     totalValue: 0,
      //   },
      // ]);
    } finally {
      setLoading(false);
    }
  }, [ipAddress]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

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
