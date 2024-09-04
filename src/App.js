import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    if (email === 'test@gmail.com' && password === '123456') {
      setIsAuthenticated(true);
    }
  };

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route path="/" element={<Login login={login} />} />
        ) : (
          <>
            <Route path="/dashboard/*" element={<DashboardLayout />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
