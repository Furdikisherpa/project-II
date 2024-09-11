import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; // Import axios for making API calls if needed

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [jwt, setJwt] = useState(null);
    const [artistId, setArtistId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null); // Add userRole state
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); // Add error state for handling login errors

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

    // Login function with error handling
    async function login(email, password) {
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                email,
                password,
            });
            
            const { token, userData } = response.data;

            // Save the JWT and user data to state
            setJwt(token);
            setUserRole(userData.role);
            setIsLoggedIn(true);

            if (userData.role === 'artist') {
                setArtistId(userData.id);
                setUserId(null); // Clear userId if it's an artist login
                localStorage.setItem("artistId", userData.id);
            } else if (userData.role === 'user') {
                setUserId(userData.id);
                setArtistId(null); // Clear artistId if it's a user login
                localStorage.setItem("userId", userData.id);
            }

            localStorage.setItem("token", token);
            localStorage.setItem("userRole", userData.role);
            setError(null); // Clear any previous errors

        } catch (err) {
            setError('Invalid login credentials'); // Set an error message
            console.error('Login error:', err);
        }
    }

    // Function to handle logout
    function logout() {
        setIsLoggedIn(false);
        setJwt(null);
        setArtistId(null);
        setUserId(null);
        setUserRole(null);
        setError(null); // Clear any existing error

        localStorage.clear(); // Clear all localStorage items
    }

    // Function to automatically fetch the JWT from local storage
    useEffect(() => {
        const storedJwt = localStorage.getItem("token");
        const storedUserRole = localStorage.getItem("userRole");

        if (storedJwt && storedUserRole) {
            setJwt(storedJwt);
            setUserRole(storedUserRole);
            setIsLoggedIn(true);

            if (storedUserRole === 'artist') {
                setArtistId(localStorage.getItem("artistId"));
            } else if (storedUserRole === 'user') {
                setUserId(localStorage.getItem("userId"));
            }
        }

        setIsLoading(false);
    }, []);

    // Provide all values via context
    const authValue = {
        isLoggedIn,
        jwt,
        artistId,
        userId,
        userRole, // Provide userRole
        isLoading,
        error, // Provide error state
        login,
        logout,
    };

    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthProvider, AuthContext };
