import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="Shopper Logo" />
        <p>SHOPPER</p>
      </div>
      <ul className="footer-links">
        <li onClick={() => navigate('/')}>Products</li> {/* Redirect to home */}
        <li onClick={() => navigate('/about')}>About</li> {/* Redirect to About page */}
        <li onClick={() => navigate('/contact')}>Contact</li> {/* Redirect to Contact page */}
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="Instagram" />
        </div>
        <div className="footer-icons-container">
          <img src={pintester_icon} alt="Pintester" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="WhatsApp" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2023 - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
