// src/components/CustomVideoPlayer.js

import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { addToWatchHistory } from '../utills/watchhistory';

const CustomVideoPlayer = ({ src 
  ,video
}) => {
  const playerRef = useRef(null);
  const [progress, setProgress] = useState(0); // Current playback time
  const [watchedTime, setWatchedTime] = useState(0); // Maximum time user can seek to
  const [playing, setPlaying] = useState(false); // Play/pause state
  const [fullscreen, setFullscreen] = useState(false); // Fullscreen state

  // Load saved progress on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(`video-progress${video._id}`);
    if (savedProgress) {
      const parsedProgress = parseFloat(savedProgress);
      setProgress(parsedProgress);
      if (playerRef.current) {
        playerRef.current.seekTo(parsedProgress, 'seconds');
      }
    }
  }, []);

  // Save progress to local storage
  useEffect(() => {
    if (progress > 0) {
      localStorage.setItem(`video-progress${video._id}`, progress);
    }
  }, [progress]);

  // Update progress and watched time
  const handleProgress = ({ playedSeconds }) => {
    const duration = playerRef.current?.getDuration() || 0;
    if (duration > 0) {
      setProgress(playedSeconds);
      setWatchedTime(playedSeconds);
    }
  };

  // Handle seeking to prevent forwarding
  const handleSeek = (event) => {
    const newTime = parseFloat(event.target.value);
    if (playerRef.current && newTime <= watchedTime) {
      playerRef.current.seekTo(newTime, 'seconds');
      setProgress(newTime);
    }
  };

  // Toggle play/pause
  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  // Toggle fullscreen
  const handleFullscreen = () => {
    if (playerRef.current) {
      if (!fullscreen) {
        if (playerRef.current.wrapper.requestFullscreen) {
          playerRef.current.wrapper.requestFullscreen();
        } else if (playerRef.current.wrapper.mozRequestFullScreen) { // Firefox
          playerRef.current.wrapper.mozRequestFullScreen();
        } else if (playerRef.current.wrapper.webkitRequestFullscreen) { // Chrome, Safari and Opera
          playerRef.current.wrapper.webkitRequestFullscreen();
        } else if (playerRef.current.wrapper.msRequestFullscreen) { // IE/Edge
          playerRef.current.wrapper.msRequestFullscreen();
        }
        setFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
          document.msExitFullscreen();
        }
        setFullscreen(false);
      }
    }
  };
  const handleVideoEnd = () => {
  

    // Add to history
            addToWatchHistory(video._id);
  };

  return (
    <div className={`relative ${fullscreen ? 'fullscreen' : ''}`} style={{ position: 'relative', height: fullscreen ? '100vh' : 'auto' }}>
      <ReactPlayer
        ref={playerRef}
        url={src}
        playing={playing}
        controls={false} 
        onEnded={handleVideoEnd}
        onProgress={handleProgress}
        width="100%"
        height="100%"
      />
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{ height: '5px', background: '#e0e0e0' }}
      >
        <div
          className="absolute bottom-0 left-0"
          style={{
            width: `${(watchedTime / (playerRef.current?.getDuration() || 1)) * 100}%`,
            height: '5px',
            background: '#4CAF50',
          }}
        ></div>
      </div>
      <input
        type="range"
        min="0"
        max={watchedTime}
        step="0.1"
        value={progress}
        onChange={handleSeek}
        style={{ width: '100%', marginTop: '10px' }}
      />
      <div
        className="controls"
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          display: 'flex',
          gap: '10px',
        }}
      >
        <button onClick={handlePlayPause} style={{ background: 'rgba(0, 0, 0, 0.5)', color: 'white', border: 'none', padding: '5px', cursor: 'pointer' }}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button onClick={handleFullscreen} style={{ background: 'rgba(0, 0, 0, 0.5)', color: 'white', border: 'none', padding: '5px', cursor: 'pointer' }}>
          {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
