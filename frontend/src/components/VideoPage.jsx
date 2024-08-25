// src/components/VideoPage.js

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams
import CustomVideoPlayer from './VideoPlayer';
import axios from 'axios'; 


const VideoPage = () => {
  const [videoItems, setvideoItems] = useState([])


useEffect(() => {
   getVideo()
}, [])








    const getVideo = async()=>
    {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/videos/",
          {
            withCredentials: true
          }
        )
        setvideoItems(response.data.data)
      
         
          

      } catch (error) {
        console.log(error);
        
      }


    }
  const navigate = useNavigate();
  const { videoId } = useParams(); // Get video ID from URL

  // Find the selected video based on the ID
  const video = videoItems.find(v => v._id === videoId);

 
  if (!video) {
    return <div>Video not found</div>;
  }

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="p-4">
      <button
        onClick={handleBackClick}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Back to Landing Page
      </button>

      <h1 className="text-4xl font-bold mb-4">Video Player</h1>
      <CustomVideoPlayer src={video.videoFile} video={video} /> {/* Pass the video source */}
    </div>
  );
};

export default VideoPage;
