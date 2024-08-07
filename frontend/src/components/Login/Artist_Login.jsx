import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Artist_Login = () => {
    const [artistEmail, setArtistEmail] = useState('');
    const [artistPassword, setArtistPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('http://localhost:3000/api/artistlogin', {
                artistEmail,
                artistPassword
            });
            setSuccess(response.data.msg);

            // Handle successful login
            console.log('Login successful:', response.data);

            // Store the token in localStorage or context
            // localStorage.setItem('token', response.data.token);

            // Redirect to a different page
            // navigate('/Profile'); // Redirect to a desired route (e.g., /dashboard)
        } catch (error) {
            if (error.response && error.response.data) {
              setError(error.response.data.msg || 'An error occurred');
            } else {
              setError('An error occurred');
            }
            console.error('Error logging in:', error);
          }
        };

    return (
        <div>
        <form onSubmit={handleSubmit}>
          
                <input
                    type="email"
                    placeholder="Email"
                    value={artistEmail}
                    onChange={(e) => setArtistEmail(e.target.value)}
                    required
                /> <br />
             
                <input
                    type="password"
                    placeholder="Password"
                    value={artistPassword}
                    onChange={(e) => setArtistPassword(e.target.value)}
                    required
                /> <br />
            <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Artist_Login;
