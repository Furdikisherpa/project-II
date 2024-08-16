import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [jwt, setJwt] = useState(null);
    const [artistId, setArtistId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedJwt = localStorage.getItem("token");
        const storedArtistId = localStorage.getItem("artistId");
        const storedUserId = localStorage.getItem("userId");

        if (storedJwt) {
            setIsLoggedIn(true);
            setJwt(storedJwt);
            if (storedArtistId) {
                setArtistId(storedArtistId);
            } else if (storedUserId) {
                setUserId(storedUserId);
            }
        }
        setIsLoading(false);
    }, []);

    function login(token, id, role) {
        setIsLoggedIn(true);
        setJwt(token);
        if (role === 'artist') {
            setArtistId(id);
            localStorage.setItem("artistId", id);
            localStorage.removeItem("userId"); // Ensure only the relevant ID is stored
        } else if (role === 'user') {
            setUserId(id);
            localStorage.setItem("userId", id);
            localStorage.removeItem("artistId"); // Ensure only the relevant ID is stored
        }
        localStorage.setItem("token", token);
    }

    function logout() {
        setIsLoggedIn(false);
        setJwt(null);
        setArtistId(null);
        setUserId(null);
        localStorage.removeItem("token");
        localStorage.removeItem("artistId");
        localStorage.removeItem("userId");
    }

    const authValue = {
        isLoggedIn,
        jwt,
        artistId,
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
