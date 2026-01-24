import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landingpage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProfileSettings from './pages/Profilesettings';
import ReportIssue from './pages/ReportIssue';
import ViewComplaints from './pages/ViewComplaints';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    if (token && userName) {
      setIsLoggedIn(true);
    }
  }, []);

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
                localStorage.getItem('userRole') === 'admin' ? 
                  <Navigate to="/admin-dashboard" replace /> : 
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
                <Navigate to="/" replace />
              ) : (
                <Signup />
              )
            } 
          />
          
          {/* Dashboard Page - PROTECTED ROUTE */}
          <Route 
            path="/dashboard" 
            element={
              isLoggedIn ? (
                localStorage.getItem('userRole') === 'admin' ? 
                  <Navigate to="/admin-dashboard" replace /> : 
                  <Dashboard setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          
          {/* Admin Dashboard Page - PROTECTED ROUTE */}
          <Route 
            path="/admin-dashboard" 
            element={
              isLoggedIn && localStorage.getItem('userRole') === 'admin' ? (
                <AdminDashboard setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/dashboard" replace />
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

          {/* Report Issue Page - PROTECTED ROUTE */}
          <Route 
            path="/report" 
            element={
              isLoggedIn ? (
                <ReportIssue />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* View Complaints Page - PROTECTED ROUTE */}
          <Route 
            path="/complaints" 
            element={
              isLoggedIn ? (
                <ViewComplaints />
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