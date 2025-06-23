import React from 'react';

import logo from '../../assets/img/logo.svg';

export default function Header() {
  return (
    <header className="header">
      <img className="fly" src={logo} alt="" />
    </header>
  );
}
