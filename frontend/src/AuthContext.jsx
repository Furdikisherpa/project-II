import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [jwt, setJwt] = useState(null);
    const [artistId, setArtistId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedJwt = localStorage.getItem("token");
        const storedArtistId = localStorage.getItem("artistId");
        const storedUserId = localStorage.getItem("userId");
        const storedUserRole = localStorage.getItem("userRole");

        if (storedJwt && storedUserRole) {
            setIsLoggedIn(true);
            setJwt(storedJwt);
            setUserRole(storedUserRole);

            if (storedUserRole === 'artist') {
                setArtistId(storedArtistId);
            } else if (storedUserRole === 'user') {
                setUserId(storedUserId);
            }
        }
        setIsLoading(false);
    }, []);

    function login(token, id, role) {
        setIsLoggedIn(true);
        setJwt(token);
        setUserRole(role);

        if (role === 'artist') {
            setArtistId(id);
            setUserId(null);
        } else if (role === 'user') {
            setUserId(id);
            setArtistId(null);
        }

        localStorage.setItem("token", token);
        localStorage.setItem("userRole", role);
        localStorage.setItem(role === 'artist' ? "artistId" : "userId", id);
    }

    function logout() {
        setIsLoggedIn(false);
        setJwt(null);
        setArtistId(null);
        setUserId(null);
        setUserRole(null);

        localStorage.clear();
    }

    const authValue = {
        isLoggedIn,
        jwt,
        artistId,
        userId,
        userRole,
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
