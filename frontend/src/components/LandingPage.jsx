// src/components/LandingPage.js

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import { useState } from "react"; // Import useState for local state management
import axios from "axios"; // Import axios for API calls

import { getWatchHistory } from "../utills/watchhistory";

const LandingPage = () => {
  const watchhistory = getWatchHistory();
  const [videos, setVideos] = useState([]);
  

  const videoItems = videos.slice(0, watchhistory.length + 1);

  useEffect(() => {
    getVideo();
  }, []);

  const navigate = useNavigate();

  const getVideo = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/videos/", {
        withCredentials: true,
      });
      setVideos(response.data.data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold mb-4">
          Lizmotors Mobility Pvt. Ltd.
        </h1>
        <Link to="/profile">
          <button className=" top-4 left-4 bg-gray-800 text-white p-2 rounded-full shadow-md">
            Profile
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videoItems.map((video) => (
          <Link
            key={video._id}
            to={`/video/${video._id}`}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="bg-gray-300 h-40 w-full flex items-center justify-center">
              <span className="text-gray-600">{video.title}</span>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{video.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
