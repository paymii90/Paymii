import React, { createContext} from "react";

export const IpContext = createContext();

export const IpProvider = ({ children }) => {
  const ipAddress = "http://10.132.59.139:8080";

  return (
    <IpContext.Provider value={{ ipAddress }}>{children}</IpContext.Provider>
  );
};
