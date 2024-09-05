import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DashboardLayout from './components/DashboardLayout';
import TeamList from './components/TeamList'; 
import EditTeam from './components/EditTeam';
import GroupsList from './components/GroupsList'; 
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Handle login and set authentication state
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Handle logout and clear authentication state
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            {/* DashboardLayout handles routes starting with /dashboard */}
            <Route path="/dashboard/*" element={<DashboardLayout onLogout={handleLogout} />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </>
        )}
        
        {/* Routes outside of the dashboard layout */}
        <Route path="/team-list" element={<TeamList />} />
        <Route path="/edit-team/:id" element={<EditTeam />} />
        <Route path="/groups/:tournamentId" element={<GroupsList />} />
      </Routes>
    </Router>
  );
}

export default App;
