import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [jwt, setJwt] = useState(null);
    const [artistId, setArtistId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null); // Add userRole state
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedJwt = localStorage.getItem("token");
        const storedArtistId = localStorage.getItem("artistId");
        const storedUserId = localStorage.getItem("userId");
        const storedUserRole = localStorage.getItem("userRole"); // Add stored userRole

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
        setUserRole(role); // Set user role on login
        
        if (role === 'artist') {
            setArtistId(id);
            localStorage.setItem("artistId", id);
            localStorage.removeItem("userId");
            localStorage.setItem("userRole", 'artist'); // Save user role
        } else if (role === 'user') {
            setUserId(id);
            localStorage.setItem("userId", id);
            localStorage.removeItem("artistId");
            localStorage.setItem("userRole", 'user'); // Save user role
        }
        localStorage.setItem("token", token);
    }

    function logout() {
        setIsLoggedIn(false);
        setJwt(null);
        setArtistId(null);
        setUserId(null);
        setUserRole(null); // Clear user role on logout
        localStorage.removeItem("token");
        localStorage.removeItem("artistId");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole"); // Clear user role
    }

    const authValue = {
        isLoggedIn,
        jwt,
        artistId,
        userId,
        userRole, // Provide userRole
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
