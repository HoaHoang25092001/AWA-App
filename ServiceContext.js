import React, { createContext, useState, useContext } from "react";

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [service, setService] = useState("");

  return (
    <ServiceContext.Provider value={{ service, setService }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  return useContext(ServiceContext);
};
