import  { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const User_Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://localhost:3000/api/userlogin', {
        email,
        password
      });
      setSuccess(response.data.msg);
      console.log('Login successful:', response.data);
      navigate('/Profile'); 
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
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default User_Login;
