import React from "react";
import { AuthProvider } from "./AuthContext";
import { CoinProvider } from "./CoinContext";
import { PortfolioProvider } from "./portfolioContext";
import { IpProvider } from "./IpContext";
import { WatchlistProvider } from "./WatchlistContext";

const AppProvider = ({ children }) => {
  return (
    <IpProvider>
      <AuthProvider>
        <CoinProvider>
          <WatchlistProvider>
            <PortfolioProvider>{children}</PortfolioProvider>
          </WatchlistProvider>
        </CoinProvider>
      </AuthProvider>
    </IpProvider>
  );
};

export default AppProvider;
