import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import ProfileSettingsPage from "./profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<ProfileSettingsPage />} />
    </Routes>
  );
}
