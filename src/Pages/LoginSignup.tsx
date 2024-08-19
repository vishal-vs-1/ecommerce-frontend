import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './CSS/LoginSignup.css';
import { RegistrationRequest } from '../interfaces/RegistrationRequest';

const LoginSignup: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationRequest>({
    name: '',
    email: '',
    password: '',
    phoneNo: '',  // Treating phoneNo as a string for validation
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    // Name validation: "FirstName LastName" format
    const nameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
    if (!nameRegex.test(formData.name)) {
      errors.name = "Name must be in 'FirstName LastName' format.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    // Password length validation
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    // Confirm password validation
    if (formData.password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    // Phone number validation: must be 10 digits
    const phoneNoRegex = /^\d{10}$/;
    if (!phoneNoRegex.test(formData.phoneNo)) {
      errors.phoneNo = "Phone number must be exactly 10 digits.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors({});
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Convert phoneNo to a number before sending
        const finalData = {
          ...formData,
          phoneNo: Number(formData.phoneNo),  // Convert phoneNo to number
        };

        const response = await axios.post('http://localhost:8080/register', finalData);
        const token = response.data;

        // Store the JWT token in a cookie
        Cookies.set('jwt_token', token, { expires: 2 });

        // Redirect to the home page
        navigate('/');
        window.location.reload();
      } catch (error) {
        console.error('Error during registration:', error);
        // handle error (e.g., show error message)
      }
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
          {errors.name && <p className="error">{errors.name}</p>}

          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            value={formData.email} 
            onChange={handleChange} 
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <input 
            type="password" 
            name="confirmPassword" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={handleConfirmPasswordChange} 
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

          <input 
            type="text"
            name="phoneNo" 
            placeholder="Phone Number" 
            value={formData.phoneNo} 
            onChange={handleChange} 
          />
          {errors.phoneNo && <p className="error">{errors.phoneNo}</p>}
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
