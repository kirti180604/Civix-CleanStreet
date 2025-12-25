import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landingpage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfileSettings from './pages/Profilesettings';
import ReportIssue from './pages/ReportIssue';
import ViewComplaints from './pages/ViewComplaints'; 

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
                <Navigate to="/dashboard" replace />
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
                <Navigate to="/dashboard" replace />
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

          {/* Dashboard Page */}
          

          {/* Report Issue Page - PUBLIC ACCESS (No login required) */}
          <Route 
            path="/report" 
            element={<ReportIssue />} // No login check here
          />

          {/* View Complaints Page - PUBLIC ACCESS (No login required) */}
          <Route 
            path="/complaints" 
            element={<ViewComplaints />} // Add this route
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
