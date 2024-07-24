import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import { AxiosResponse, AxiosError  } from 'axios';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Simulate registration logic
    if (password === confirmPassword) {
      
      await axios.post(`${SERVER_URL}/register?username=${username}&password=${password}`)
      .then((response: AxiosResponse) => {
        navigate('/login'); // Redirect to login after successful registration
        console.log(response);
      })
      .catch((reason: AxiosError) => {
        setError('Passwords do not match');
        console.log(reason);
      });

    } else {
      setError('Passwords do not match');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
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
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
