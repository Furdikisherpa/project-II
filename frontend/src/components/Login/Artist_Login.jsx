import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Artist_Login = () => {
    const [artistEmail, setArtistEmail] = useState('');
    const [artistPassword, setArtistPassword] = useState('');
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/artistlogin', {
                artistEmail,
                artistPassword
            });

            // Handle successful login
            console.log('Login successful:', response.data);

            // Store the token in localStorage or context
            localStorage.setItem('token', response.data.token);

            // Redirect to a different page
            navigate('/Profile'); // Redirect to a desired route (e.g., /dashboard)
        } catch (error) {
            if (error.response) {
                const errorData = error.response.data;
                if (errorData.errors) {
                    // Handle validation errors
                    const errorMessages = errorData.errors.reduce((acc, curr) => {
                        acc[curr.path] = curr.msg;
                        return acc;
                    }, {});
                    setErrors(errorMessages);
                } else {
                    // Handle general errors
                    setError(errorData.msg || 'Something went wrong');
                }
            } else {
                setError('Error: ' + error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={artistEmail}
                    onChange={(e) => setArtistEmail(e.target.value)}
                    required
                />
                {errors.artistEmail && <div className="error-message">{errors.artistEmail}</div>}
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={artistPassword}
                    onChange={(e) => setArtistPassword(e.target.value)}
                    required
                />
                {errors.artistPassword && <div className="error-message">{errors.artistPassword}</div>}
            </div>
            <button type="submit">Login</button>
            {error && <div className="error-message">{error}</div>}
        </form>
    );
};

export default Artist_Login;
