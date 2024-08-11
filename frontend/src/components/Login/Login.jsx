import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const endpoint = role === 'artist' ? 'http://localhost:3000/api/artistlogin' : 'http://localhost:3000/api/userlogin';
            const response = await axios.post(endpoint, { email , password });

            console.log('Login response:', response.data); // Log the full response
            
            // Assume the response contains user information based on the role
            const userId = role === 'artist' ? response.data.artistId : response.data.userId;
            const token = response.data.token;

            // Check if userId is defined
            if (!userId) {
                throw new Error('No user ID found in response');
            }

            setSuccess(response.data.msg);
            await login(token, userId, role);
            navigate('/profile');
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
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="artist">Artist</option>
                </select>
                <br />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Login</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Login;
