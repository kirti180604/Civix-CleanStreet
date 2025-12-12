import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSettings = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
      <p>Welcome to your profile!</p>
      <button 
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileSettings;
