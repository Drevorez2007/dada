import React from 'react';
import classes from './main.module.scss';
import PropTypes from 'prop-types';

export default function Main({ children }) {
  return (
    <div className={classes.container}>
      <main>{children}</main>
    </div>
  );
}

Main.propTypes = {
  children: PropTypes.array,
};
