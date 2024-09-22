// src/components/AdminRoute.tsx
import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const AdminRoute: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // State to store admin check result
  const token = Cookies.get("jwt_token");

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:8080/check/admin/test", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAdmin(response.data); // Set isAdmin based on response
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false); // Redirect if there's an error
      }
    };

    checkAdmin(); // Call the async function inside useEffect
  }, [token]);

  if (isAdmin === null) {
    return <div>Loading...</div>; // Render loading state while waiting for axios
  }

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
