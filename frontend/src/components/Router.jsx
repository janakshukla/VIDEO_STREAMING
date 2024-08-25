

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './Login';
import SignupPage from './Signup';
import ProfileDashboard from './ProfileDashboard';
import VideoPage from './VideoPage';
import VideoUpload from './VideoUpload';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfileDashboard />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
        <Route path="/upload" element={<VideoUpload />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
