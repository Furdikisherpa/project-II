import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJwt] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedJwt = localStorage.getItem("token"); // Use "token" to be consistent with Artist_Login.jsx
    if (storedJwt) {
      setIsLoggedIn(true);
      setJwt(storedJwt);
    }
    setIsLoading(false);
  }, []);

  function login(token) {
    setIsLoggedIn(true);
    setJwt(token);
    localStorage.setItem("token", token); // Store token using the key "token"
  }

  function logout() {
    setIsLoggedIn(false);
    setJwt(null);
    localStorage.removeItem("token"); // Remove token using the key "token"
  }

  const authValue = {
    isLoggedIn,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, AuthContext };
