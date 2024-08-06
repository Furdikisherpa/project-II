import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Artist_Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        artistEmail: email,
        artistPassword: password,
      });

      localStorage.setItem('token', response.data.token);
      history.push('/profile');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form noValidate onSubmit={onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={onChangeEmail}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChangePassword}
              />
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <button type="submit" className="btn btn-lg btn-primary btn-block">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Artist_Login;
