// src/pages/ContactUs.tsx
import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Poppins, sans-serif', 
      lineHeight: '1.6', 
      backgroundColor: '#f9f9f9', 
      color: '#333', 
      maxWidth: '800px', 
      margin: 'auto', 
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        marginBottom: '20px', 
        textAlign: 'center', 
        color: '#007BFF' 
      }}>Contact Us</h1>
      
      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          fontSize: '1.8rem', 
          marginBottom: '10px', 
          color: '#333' 
        }}>Get in Touch</h3>
        <p style={{ 
          fontSize: '1.2rem', 
          marginBottom: '20px' 
        }}>
          If you have any questions, concerns, or feedback, we'd love to hear from you! You can reach us through the following methods:
        </p>
      </section>
      
      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          fontSize: '1.8rem', 
          marginBottom: '10px', 
          color: '#333' 
        }}>Customer Support</h3>
        <p style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Email: <a href="mailto:support@shoppin.com" style={{ color: '#007BFF' }}>support@shoppin.com</a></p>
        <p style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Phone: +1 (800) 123-4567</p>
        <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Hours: Monday - Friday, 9 AM - 6 PM</p>
      </section>
      
      <section>
        <h3 style={{ 
          fontSize: '1.8rem', 
          marginBottom: '10px', 
          color: '#333' 
        }}>Follow Us</h3>
        <p style={{ 
          fontSize: '1.2rem', 
          marginBottom: '20px' 
        }}>Stay connected with us on social media:</p>
        <ul style={{ 
          listStyleType: 'none', 
          padding: 0 
        }}>
          <li style={{ 
            marginBottom: '10px', 
            fontSize: '1.2rem' 
          }}>
            <a href="https://www.facebook.com/shoppin" style={{ color: '#007BFF', textDecoration: 'none' }}>Facebook</a>
          </li>
          <li style={{ 
            marginBottom: '10px', 
            fontSize: '1.2rem' 
          }}>
            <a href="https://www.twitter.com/shoppin" style={{ color: '#007BFF', textDecoration: 'none' }}>Twitter</a>
          </li>
          <li style={{ 
            marginBottom: '10px', 
            fontSize: '1.2rem' 
          }}>
            <a href="https://www.instagram.com/shoppin" style={{ color: '#007BFF', textDecoration: 'none' }}>Instagram</a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ContactUs;
