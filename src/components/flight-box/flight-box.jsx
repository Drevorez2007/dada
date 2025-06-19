import React from 'react';
import PropTypes from 'prop-types';

import classes from './flight-box.module.scss';

export default function FlightBox({ children }) {
  return <div className={classes.flightbox_container}>{children}</div>;
}

FlightBox.propTypes = {
  children: PropTypes.array,
};
