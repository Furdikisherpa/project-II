import './signup.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');  // State for username
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('user'); // Default to 'user' or 'artist'
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
    
        try {
            const endpoint = userType === 'artist' ? '/api/artistRegister' : '/api/register';
            console.log('Sending request to:', `http://localhost:3000${endpoint}`);
            console.log('Request body:', { username, email, password });

            const response = await axios.post(`http://localhost:3000${endpoint}`, {
                username,
                email,
                password,
            });
            setSuccess(response.data.msg);
            console.log('Signup successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error during signup:', error);
            setError(error.response?.data?.msg || 'An error occurred');
        }
    };
    

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className='signup'>
                <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                    <option value="user">User</option>
                    <option value="artist">Artist</option>
                </select> <br />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                /> <br />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /> <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /> <br />
                <button type="submit">Sign Up</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Signup;
