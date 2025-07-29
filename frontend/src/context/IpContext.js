import React, { createContext} from "react";

export const IpContext = createContext();

export const IpProvider = ({ children }) => {
  const ipAddress = "http://10.36.52.188:8080";
  
 
  return (
    <IpContext.Provider value={{ ipAddress }}>{children}</IpContext.Provider>
  );
};
