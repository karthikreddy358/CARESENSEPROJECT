import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages
import Demo from "./pages/Demo";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import Solutions from "./pages/Solutions";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Router>
        <Routes>
          {/* Demo page as default landing */}
          <Route path="/" element={<Demo />} />

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected user dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Solutions" element={<Solutions />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
