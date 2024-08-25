// Utility functions for watch history

const getWatchHistory = () => {
    const history = localStorage.getItem('watchHistory');
    return history ? JSON.parse(history) : [];
  };
  
  const addToWatchHistory = (videoId) => {
    const history = getWatchHistory();
    if (!history.includes(videoId)) {
      history.push(videoId);
      localStorage.setItem('watchHistory', JSON.stringify(history));
    }
  };
  export { getWatchHistory, addToWatchHistory };

