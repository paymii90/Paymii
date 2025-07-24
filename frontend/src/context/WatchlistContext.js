import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const load = async () => {
      const userData = await AsyncStorage.getItem("user");
      const parsed = userData ? JSON.parse(userData) : null;
      const userEmail = parsed?.email;
      setEmail(userEmail);
      if (userEmail) {
        const stored = await AsyncStorage.getItem(`watchlist_${userEmail}`);
        if (stored) setWatchlist(JSON.parse(stored));
      }
    };
    load();
  }, [isLoggedIn]);

  const updateStorage = async (newList) => {
    if (email) {
      await AsyncStorage.setItem(`watchlist_${email}`, JSON.stringify(newList));
    }
  };

  const addToWatchlist = (coinId) => {
    if (!watchlist.includes(coinId)) {
      const updated = [...watchlist, coinId];
      setWatchlist(updated);
      updateStorage(updated);
    }
  };

  const removeFromWatchlist = (coinId) => {
    const updated = watchlist.filter((id) => id !== coinId);
    setWatchlist(updated);
    updateStorage(updated);
  };

  const isWatchlisted = (coinId) => watchlist.includes(coinId);

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isWatchlisted }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

//custom hook
export const useWatchlist = () => useContext(WatchlistContext);
