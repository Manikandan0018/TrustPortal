import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdminLogin from './admin/AdminLogin';
import Admin from './admin/Admin';
import HomePage from './Home/Home';
import ProtectedRoute from './admin/ProtectRoute';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem('admin');
    setIsLoggedIn(storedLogin === 'true');
  }, []);

  const handleLogin = () => {
    localStorage.setItem('admin', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin handleLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-login"
        element={<AdminLogin onLogin={handleLogin} />}
      />
    </Routes>
  );
};

export default App;
