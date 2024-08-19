// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute: React.FC = () => {
  const token = Cookies.get('jwt_token');

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
