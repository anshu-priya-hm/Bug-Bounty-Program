import React from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <a href="https://happymoney.com/">
          <img src="/HMlogonew-removebg.png" alt="Logo" className={styles.logo} />
        </a>
        <nav className={styles.nav}>
          <div className={`${styles.navItem} ${styles.dropdown}`}>
            About Us 
            <span className={styles.dropdownIcon}></span> 
            <div className={styles.dropdownMenu}>
              <a href="https://happymoney.com/company">Our Company</a>
              <a href="https://happymoney.com/careers">Careers</a>
              <a href="https://happymoney.com/lending-partners">Lending Partners</a>
              <a href="https://happymoney.com/press">Press</a>
            </div>
          </div>
          <div className={`${styles.navItem} ${styles.dropdown}`}>
            Resources 
            <span className={styles.dropdownIcon}></span> 
            <div className={styles.dropdownMenu}>
              <a href="https://happymoney.com/support">Support</a>
              <a href="https://happymoney.com/contact">Contact Us</a>
              <a href="https://happymoney.com/articles">Articles</a>
              <a href="https://happymoney.com/privacy-and-legal">Privacy & Legal</a>
            </div>
          </div>
        </nav>
        <div className={styles.headerRight}>
          <a href="https://go.happymoney.com/login" className={styles.loginLink}>Log in</a>
          <button className={styles.headerButton} onClick={() => window.location.href = 'https://go.happymoney.com/create-account'}>
            Check My Rate
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
