import React, { createContext} from "react";

export const IpContext = createContext();

export const IpProvider = ({ children }) => {
  const ipAddress = "http://10.132.151.85:8080";
  
 
  return (
    <IpContext.Provider value={{ ipAddress }}>{children}</IpContext.Provider>
  );
};
