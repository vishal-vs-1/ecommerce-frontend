// src/components/PublicRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PublicRoute: React.FC = () => {
  const token = Cookies.get('jwt_token');

  return token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
