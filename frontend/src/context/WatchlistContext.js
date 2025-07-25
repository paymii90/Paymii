import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [email, setEmail] = useState("");

  // Fetch user email from AsyncStorage
  const getUserEmail = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const parsed = JSON.parse(user);
        return parsed.email;
      }
      return null;
    } catch (error) {
      console.error("Error getting user email:", error);
      return null;
    }
  };

  // Load watchlist on mount
  useEffect(() => {
    const loadWatchlist = async () => {
      const userEmail = await getUserEmail();
      if (userEmail) {
        setEmail(userEmail);
        const stored = await AsyncStorage.getItem(`watchlist_${userEmail}`);
        setWatchlist(stored ? JSON.parse(stored) : []);
      }
    };

    loadWatchlist();
  }, []);

  const saveToStorage = async (updatedList) => {
    try {
      await AsyncStorage.setItem(
        `watchlist_${email}`,
        JSON.stringify(updatedList)
      );
    } catch (e) {
      console.error("Error saving watchlist:", e);
    }
  };

  const addToWatchlist = (coin) => {
    const exists = watchlist.find((c) => c.id === coin.id);
    if (!exists) {
      const updated = [...watchlist, coin];
      setWatchlist(updated);
      saveToStorage(updated);
    }
  };

  const removeFromWatchlist = (coinId) => {
    const updated = watchlist.filter((c) => c.id !== coinId);
    setWatchlist(updated);
    saveToStorage(updated);
  };

  const isInWatchlist = (coinId) => {
    return watchlist.some((coin) => coin.id === coinId);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
