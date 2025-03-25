import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <a href="https://happymoney.com/"><img src="/HMlogonew-removebg.png" alt="Logo" className="logo" /></a>
        <nav className="nav">
          <div className="nav-item dropdown">
            About Us 
            <span className="dropdown-icon">  </span> 
            <div className="dropdown-menu">
              <a href="https://happymoney.com/company">Our Company</a>
              <a href="https://happymoney.com/careers">Careers</a>
              <a href="https://happymoney.com/lending-partners">Lending Partners</a>
              <a href="https://happymoney.com/press">Press</a>
            </div>
          </div>
          <div className="nav-item dropdown">
            Resources 
            <span className="dropdown-icon">  </span> 
            <div className="dropdown-menu">
              <a href="https://happymoney.com/support">Support</a>
              <a href="https://happymoney.com/contact">Contact Us</a>
              <a href="https://happymoney.com/articles">Articles</a>
              <a href="https://happymoney.com/privacy-and-legal">Privacy & Legal</a>
            </div>
          </div>
        </nav>
        <div className="header-right">
        <a href="https://go.happymoney.com/login" className="login-link">Log in</a>
        {/* Add the button here */}
        <button className="header-button" onClick={() => window.location.href = 'https://go.happymoney.com/create-account'}>
            Check My Rate
        </button>
        </div>
      </div>
    </header>
  );
};

export default Header;



