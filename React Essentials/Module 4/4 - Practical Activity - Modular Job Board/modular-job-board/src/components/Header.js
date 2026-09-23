import React from 'react';
import logo from '../assets/logo.svg';

// Task 1: the header with a logo image
function Header({ title }) {
  return (
    <header className="header">
      <img src={logo} alt="" className="header__logo" />
      <h1 className="header__title">{title}</h1>
    </header>
  );
}

export default Header;
