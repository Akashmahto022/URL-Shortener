import { getCurrentUser } from "../db/apiAuth";
import UseFetch from "../Hooks/UseFetch";
import { createContext, useContext, useEffect } from "react";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = UseFetch(getCurrentUser);

  const isAuthentication = user?.role === "authentication";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthentication }}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = ()=>{
    return useContext(UrlContext)
}

export default UrlProvider;
