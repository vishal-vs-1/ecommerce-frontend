// src/components/LoginSignup.tsx
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import './CSS/LoginSignup.css';
import { RegistrationRequest } from '../interfaces/RegistrationRequest';

const LoginSignup: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationRequest>({
    name: '',
    email: '',
    password: '',
    phoneNo: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'phoneNo' ? Number(value) : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/register', formData);
      const token = response.data;

      // Store the JWT token in a cookie
      Cookies.set('jwt_token', token, { expires: 2 }); // Token expires in 7 days

      // Redirect to the home page
      navigate('/');
    } catch (error) {
      console.error('Error during registration:', error);
      // handle error (e.g., show error message)
    }
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={formData.name} 
            onChange={handleChange} 
          />
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
          <input 
            type="text" 
            name="phoneNo" 
            placeholder="Phone Number" 
            value={formData.phoneNo} 
            onChange={handleChange} 
          />
        </div>
        <button onClick={handleSubmit}>Continue</button>
        <p className="loginsignup-login">
          Already have an account? 
          <button onClick={redirectToLogin} className="login-link">
            Login here
          </button>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
