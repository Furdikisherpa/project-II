import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJwt] = useState(null);
  const [userId, setUserId] = useState(null);  // Add userId state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedJwt = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (storedJwt && storedUserId) {
      setIsLoggedIn(true);
      setJwt(storedJwt);
      setUserId(storedUserId);
    }
    setIsLoading(false);
  }, []);

  function login(token, id) {
    setIsLoggedIn(true);
    setJwt(token);
    setUserId(id);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);
  }

  function logout() {
    setIsLoggedIn(false);
    setJwt(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }

  const authValue = {
    isLoggedIn,
    jwt,
    userId,
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
