// src/components/LoginPage.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from './Popup';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate()
  const handlesubmit = async(e) => {
    e.preventDefault()
     try {
      await axios.post("http://localhost:8000/api/v1/users/login",{
        username: username,
        email: email,
        password: password
      },
      { 
        withCredentials: true
       })
      setShowPopup(true);
      
      
      
    } catch (error) {
      console.log(error)
      alert("Invalid credentials or user not found! please try again or signup!")
    }
    
  }

const closePopup = () => {
  setShowPopup(false);
  navigate("/")
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input type="text" id="username" className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded"
            onChange={(e)=>{setEmail(e.target.value)}} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded"
            onChange={(e)=>{setPassword(e.target.value)}} />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handlesubmit}
          >Login</button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </div>
      {showPopup && <Popup message="User logined successfully!" onClose={closePopup} />}
    </div>
  );
};

export default LoginPage;
