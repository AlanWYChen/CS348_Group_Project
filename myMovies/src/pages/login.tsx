import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/authContext';
import axios from 'axios';
import { AxiosResponse, AxiosError } from 'axios';
import './login.css';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

interface Login {
  id:number;
  username:string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate login logic
    
    try {
      const response = await axios.get(`${SERVER_URL}/login?username=${username}&password=${password}`);
      login(response.data[0].id);
      navigate('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('Invalid username or password');
        console.log(error);
      } else {
        console.error('Unexpected error', error);
      }
    }
    
    
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
