// src/components/Logout.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the JWT token exists
    const token = Cookies.get('jwt_token');

    if (token) {
      // Remove the JWT token from cookies
      Cookies.remove('jwt_token');
    }

    // Redirect the user to the login page
    navigate('/login');
    window.location.reload();
  }, [navigate]);

  return (
    <div>
      <h1>Logging you out...</h1>
    </div>
  );
};

export default Logout;
