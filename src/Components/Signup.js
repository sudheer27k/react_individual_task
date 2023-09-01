import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [designation, setDesignation] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      console.error("password and confirm password din't matched");
      alert("password and confirm password din'nt match");
      setPasswordsMatch(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, dob, designation }),
      });
      const data = await response.json();
      console.log('Signed up successfully with ID:', data);
      alert("Registration successful");
      navigate('/login');
    }
    catch (error) {
      console.error('Error signing up:', error);
    }
  };
  return (
    <div className='main-container-signup'>
      <div className="auth-form">
        <h2>SIGN UP</h2>
        <form onSubmit={handleSignUp}>
          <div><input
            type="text"
            className="input-field"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          /></div>
          <div><input
            type="email"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /></div>
          <div><input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /></div>
          <div><input
            type="date"
            className="input-field"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          /></div>
          <div><input
            type="text"
            className="input-field"
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          /></div>
          <div><input
            type="password"
            className="input-field"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordsMatch(e.target.value === password);
            }}
            required
          /></div>
          {!passwordsMatch && <p className="error-message">Passwords didn't match</p>}
          <div><button type="submit" className="sign-up-button">Sign Up</button></div>
        </form>
        <Link to="/login" className="login-link">
          Already had an account? Login here.
        </Link>
      </div>
    </div>

  );
};



export default Signup;