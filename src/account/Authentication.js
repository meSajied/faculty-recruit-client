import React, {createContext, useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    let cookie = getCookie();
    cookie? setUser(JSON.parse(cookie)): setUser({});
  }, []);

  const isLoggedIn = !!(user?.email && user?.id);

  function login(user) {
    setUser(user);
    setCookies(user);
    return;
  }

  function logout() {
    setUser({});
    Cookies.remove('user');
  }

  return(
      <AuthContext.Provider value={{user, login, isLoggedIn, logout}}>
        {children}
      </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}

function getCookie() {
  return Cookies.get('user');
}

function setCookies(user) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 3);
  Cookies.set('user', JSON.stringify(user), { expires: expirationDate });
  return;
}