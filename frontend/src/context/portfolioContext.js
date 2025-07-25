import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IpContext } from "./IpContext";
import Toast from "react-native-toast-message";

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
      // console.error("Error fetching portfolio:", error);

      Toast.show({
        type: "error",
        text1: "Portfolio Fetch Failed",
        text2: error.message || "Something went wrong. Check your internet.",
      });
      // console.warn("Error fetching portfolio:", error);
      setPortfolio([]);
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
