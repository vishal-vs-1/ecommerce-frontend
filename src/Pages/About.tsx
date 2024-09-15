// src/pages/About.tsx
import React from 'react';

const About: React.FC = () => {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Poppins, sans-serif', 
      lineHeight: '1.6', 
      backgroundColor: '#f9f9f9', 
      color: '#333', 
      maxWidth: '900px', 
      margin: 'auto', 
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        marginBottom: '20px', 
        textAlign: 'center', 
        color: '#007BFF' 
      }}>About Us</h1>
      
      <section>
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: '10px', 
          color: '#333' 
        }}>Welcome to Shoppin!</h2>
        <p style={{ 
          fontSize: '1.2rem', 
          marginBottom: '30px' 
        }}>
          At Shoppin, we believe in providing our customers with the best shopping experience possible. Founded in 2018, our mission is to bring you high-quality products at affordable prices, all while delivering exceptional customer service.
        </p>
      </section>
      
      <section>
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: '10px', 
          color: '#333' 
        }}>What We Offer</h2>
        <p style={{ 
          fontSize: '1.2rem', 
          marginBottom: '30px' 
        }}>
          We specialize in women’s, men’s, and children’s clothing, as well as accessories and footwear. Our products are carefully curated to ensure they meet our high standards of quality and style. Whether you’re looking for casual wear, formal attire, or the latest fashion trends, we have something for everyone.
        </p>
      </section>
      
      <section>
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: '20px', 
          color: '#333' 
        }}>Our Values</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '1.5rem', color: '#007BFF' }}>Customer Satisfaction</h4>
          <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
            Your happiness is our top priority. We strive to provide excellent customer service and support.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '1.5rem', color: '#007BFF' }}>Quality</h4>
          <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
            We are committed to offering products that are made to last.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '1.5rem', color: '#007BFF' }}>Innovation</h4>
          <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
            We constantly seek out new and exciting fashion trends to add to our collection.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '1.5rem', color: '#007BFF' }}>Sustainability</h4>
          <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
            We are dedicated to making environmentally conscious choices in our product selection and business practices.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
