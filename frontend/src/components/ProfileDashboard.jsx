
import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import { getWatchHistory } from '../utills/watchhistory';
const ProfileDashboard = () => {

  const [user, setuser] = useState({})
  const [Videos, setVideos] = useState([])
  const watchhistory = getWatchHistory();

  const progress = watchhistory.length*100 / Videos.length ;

   const navigate = useNavigate()
  
useEffect(() => {
  getuser()
  getVideo()
}, [])
const getuser = async(e) => {
  try {
   const response = await axios.get("http://localhost:8000/api/v1/users/current-user",
  {
    withCredentials: true
  }
  )
  
   

    setuser(response.data.data)
   
   

  } catch (error) {
    console.log(error.status);
    if (error.status === 401) {
      navigate('/login')
    }


  }
}
const getVideo = async()=>
  {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/videos/",
        {
          withCredentials: true
        }
      )
      setVideos(response.data.data)
  
      
       
        

    } catch (error) {
      console.log(error);
      
    }


  }

  const handlelogout = async() => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/logout",user._id,


        {
          withCredentials: true
        }
      )
      localStorage.clear();
      alert(response.data.message);
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  }


 

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md mx-auto">
        <div className='flex justify-between'>

        <h1 className="text-2xl font-bold mb-4">Profile Dashboard</h1>
        <button className='px-2 py-1 bg-red-600 rounded-xl font-semibold'
         onClick={handlelogout}
          >logout</button>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Username:</h2>
          <p className="text-gray-700">{user.username}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Email:</h2>
          <p className="text-gray-700">{user.email}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Progress:</h2>
          <div className="w-full">
          <ProgressBar
            completed={progress}
            color="#4CAF50"
            height="20px"
            label={`${progress}%`} // Optional label showing progress percentage
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
