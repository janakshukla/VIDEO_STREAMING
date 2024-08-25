// src/components/ProgressBar.js

import React from 'react';

const ProgressBar = ({ completed, color = '#4CAF50', height = '20px', label = null }) => {
  // Ensure the completed value is between 0 and 100
  const progress = Math.max(0, Math.min(completed, 100));
  
  // Inline styles for the progress bar
  const containerStyle = {
    height: height,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    overflow: 'hidden',
    position: 'relative',
  };

  const fillerStyle = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: color,
    transition: 'width 0.3s ease-in-out',
  };

  const labelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <div style={fillerStyle}></div>
      {label && <span style={labelStyle}>{label}</span>}
    </div>
  );
};

export default ProgressBar;
