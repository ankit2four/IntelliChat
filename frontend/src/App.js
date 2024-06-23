import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Chat from './components/Chat';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AboutUs from './components/AboutUs';
import Profile from './components/Profile';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.className = isDarkMode ? 'light-mode' : 'dark-mode';
  };



  

  return (
    <Router>
      
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className="main-content">
          <Routes>
            <Route path="/profile" element={<Profile isDarkMode={isDarkMode} />} />
            <Route path="/about" element={<AboutUs isDarkMode={isDarkMode} />} />
            <Route path="/" element={<Auth isDarkMode={isDarkMode} />} />
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <Chat isDarkMode={isDarkMode} />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      
    </Router>
  );
};

export default App;
