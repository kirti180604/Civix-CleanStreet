import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landingpage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfileSettings from './pages/Profilesettings';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          
          {/* Landing Page */}
          <Route 
            path="/" 
            element={
              <LandingPage 
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            } 
          />
          
          {/* Login Page */}
          <Route 
            path="/login" 
            element={
              isLoggedIn ? (
                <Navigate to="/profile" replace />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            } 
          />
          
          {/* Signup Page */}
          <Route 
            path="/signup" 
            element={
              isLoggedIn ? (
                <Navigate to="/profile" replace />
              ) : (
                <Signup />
              )
            } 
          />
          
          {/* Profile Settings Page */}
          <Route 
            path="/profile" 
            element={
              isLoggedIn ? (
                <ProfileSettings setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
