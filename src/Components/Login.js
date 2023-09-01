import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const userData = await response.json();
        navigate('/profile', { state: { user: userData } });
      } else {
        const errorData = await response.json();
        console.error('Error logging in:', errorData.error);
      }
    }
    catch (error) {
      console.error('Error logging in:', error);
    }
  };
  return (
    <div className="main-container">
      <div className="container">
        <h1>LOGIN</h1>
        <form className="form" onSubmit={handleLogin}>
          <label className="label">
            E-mail     :
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </label>
          <label className="label">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </label>
          <button type="submit" className="button">
            Log In
          </button>
        </form>
        <Link to="/forgot-password" className="register-link">ForgotPassword</ Link>

        <Link to="/signup" className="register-link">
          Don't have an account? Register here.
        </Link>
      </div>
    </div>

  );
};



export default Login;