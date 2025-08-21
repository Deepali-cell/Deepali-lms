import { createContext, useState } from "react";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [usertoken, setusertoken] = useState(
    localStorage.getItem("usertoken") || null
  );

  const value = {
    backend_url,
    usertoken,
    setusertoken,
  };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export default StateContext;
