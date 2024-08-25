// src/components/SignupPage.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from './Popup';

const SignupPage = () => {
 
  const [showPopup, setShowPopup] = useState(false)

  const navigate = useNavigate()

const handlesubmit = async(e) => {
  e.preventDefault()
   try {
    await axios.post("http://localhost:8000/api/v1/users/register",{
      username: username,
      fullName: fullName,
      email: email,
      password: password
    })
    setShowPopup(true);
    
    
    
  } catch (error) {
    console.log(error)
  }
  
}
const closePopup = () => {
  setShowPopup(false);
  navigate("/login")
};


  const [username, setusername] = useState("")
  const [fullName, setfullName] = useState("")
  const [password, setpassword] = useState("")
  const [email, setemail] = useState("")
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <form>
        <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input type="text" id="username" className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-gray-700">Full Name</label>
            <input type="text" id="fullname" className="w-full p-2 border border-gray-300 rounded"
            onChange={
              (e) => setfullName(e.target.value)
        
            }
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded"
            onChange={
              (e) => setemail(e.target.value)
            }
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded"
            onChange={(e)=>{setpassword(e.target.value)}}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handlesubmit}
          
          >Sign Up</button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
      {showPopup && <Popup message="User registered successfully!" onClose={closePopup} />}
    </div>
  );
};

export default SignupPage;
