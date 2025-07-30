import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IpContext } from "./IpContext";

export const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [myUserId, setMyUserId] = useState(null);
  const { ipAddress } = useContext(IpContext);

  const fetchBalance = async () => {
    try {
       const stored = await AsyncStorage.getItem("user");
        const parsed = stored ? JSON.parse(stored) : null;
        if (parsed?.id) {
          setMyUserId(parsed.id.toString());
        }

      console.log("Fetching balance for userId:", myUserId);
      const res = await fetch(`${ipAddress}/api/users/${myUserId}`);
      const data = await res.json();
    //   console.log("data:", data);

      setBalance(data.balance || 1000);
    } catch (error) {
      console.error("❌ Failed to fetch balance:", error);
    } finally {
      setLoading(false);
    }
  };

  const deposit = async (amount) => {
    setBalance((prev) => prev + amount);
    // optionally: send update to backend here
  };

  const withdraw = async (amount) => {
    setBalance((prev) => Math.max(0, prev - amount));
    // optionally: send update to backend here
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <BalanceContext.Provider
      value={{ balance, deposit, withdraw, refreshBalance: fetchBalance, loading }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
