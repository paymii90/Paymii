import React, { createContext} from "react";

export const IpContext = createContext();

export const IpProvider = ({ children }) => {
  const ipAddress = "http://192.168.177.1:8080";
  
  return (
    <IpContext.Provider value={{ ipAddress }}>{children}</IpContext.Provider>
  );
};
