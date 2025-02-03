import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div style={{ backgroundColor: '#232a1c', color: '#eef5eb' }} className="footer" id="footer">
      <div className="footer-content">
        {/* Left Section with "JAVIKA" instead of Logo */}
        <div className="footer-content-left">
          <h1 className="footer-brand">JAVIKA</h1>
          <p>This website is just for my portfolio, it's not a real website.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        {/* Center Section - Company Links */}
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section - Contact Info */}
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="footer-copyright">Copyright 2024 © Tomato.com - All rights reserved.</p>
    </div>
  );
};

export default Footer;
