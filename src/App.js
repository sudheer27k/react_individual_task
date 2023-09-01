import React from 'react';
import Signup from './Components/Signup';
import Login from './Components/Login';
import User_profile from './Components/profile';
// import ForgotPassword from './components/forgot_password';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <div classNameName="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<User_profile/>}/>
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
