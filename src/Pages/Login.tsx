// src/components/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './CSS/LoginSignup.css';  // Reuse the same CSS for styling
import { AuthenticateRequest } from '../interfaces/AuthenticateRequest.ts';

const Login: React.FC = () => {
  const [formData, setFormData] = useState<AuthenticateRequest>({
    email: '',
    password: '',
  });


  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', formData);
      const token = response.data;

      // Store the JWT token in a cookie
      Cookies.set('jwt_token', token, { expires: 7 }); // Token expires in 7 days

      // Redirect to the home page
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Error during login:', error);
      alert("invalid credentials")
      // handle error (e.g., show error message)
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            value={formData.email} 
            onChange={handleChange} 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
          />
        </div>
        <button onClick={handleSubmit}>Login</button>
        <p className="loginsignup-login">
          Don't have an account? 
          <button onClick={() => navigate('/signup')} className="login-link">
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
