import React from 'react';

import logo from '../../assets/img/logo.svg';
import classes from '../header/header.module.scss';

export default function Header() {
  return (
    <header className={classes.header}>
      <img className={classes.fly} src={logo} alt="" />
    </header>
  );
}
