import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);

  const emailKey = user?.email || "guest";
  const STORAGE_KEY = `watchlist_${emailKey}`;

  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          setWatchlist(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Failed to load watchlist", e);
      }
    };

    loadWatchlist();
  }, [user]);

  const saveWatchlist = async (updatedList) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      setWatchlist(updatedList);
    } catch (e) {
      console.error("Failed to save watchlist", e);
    }
  };

  const addToWatchlist = (coin) => {
    const updatedList = [...watchlist, coin];
    saveWatchlist(updatedList);
  };

  const removeFromWatchlist = (coinId) => {
    const updatedList = watchlist.filter((c) => c.id !== coinId);
    saveWatchlist(updatedList);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
