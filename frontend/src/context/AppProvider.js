import React from "react";
import { AuthProvider } from "./AuthContext";
import { CoinProvider } from "./CoinContext";
import { PortfolioProvider } from "./portfolioContext";
import { IpProvider } from "./IpContext";

const AppProvider = ({ children }) => {
  return (
    <IpProvider>
      <AuthProvider>
        <CoinProvider>
          <PortfolioProvider>{children}</PortfolioProvider>
        </CoinProvider>
      </AuthProvider>
    </IpProvider>
  );
};

export default AppProvider;
